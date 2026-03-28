-- ============================================
-- Summit Rentals — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================

create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Public profiles viewable" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'), new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users for each row execute procedure public.handle_new_user();

-- GEAR
create table public.gear (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  category text not null,
  description text not null,
  long_description text default '',
  price_per_day numeric(10,2) not null,
  image_url text default '',
  gallery_images text[] default '{}',
  badge text,
  features text[] default '{}',
  specs jsonb default '{}',
  available_count integer default 1,
  rating numeric(2,1) default 0,
  review_count integer default 0,
  created_at timestamptz default now()
);
alter table public.gear enable row level security;
-- Allow everyone to read gear
create policy "Gear is publicly readable" on public.gear for select using (true);
-- Allow authenticated users to insert gear (for admin functionality)
create policy "Authenticated users can insert gear" on public.gear for insert with check (auth.role() = 'authenticated');
-- Allow authenticated users to update gear
create policy "Authenticated users can update gear" on public.gear for update using (auth.role() = 'authenticated');
-- Allow authenticated users to delete gear
create policy "Authenticated users can delete gear" on public.gear for delete using (auth.role() = 'authenticated');

-- REVIEWS
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  gear_id uuid references public.gear on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  user_name text not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text default '',
  trail_name text,
  created_at timestamptz default now()
);
alter table public.reviews enable row level security;
create policy "Reviews are publicly readable" on public.reviews for select using (true);
create policy "Users can create reviews" on public.reviews for insert with check (auth.uid() = user_id);

-- RENTALS
create table public.rentals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  gear_id uuid references public.gear on delete cascade not null,
  start_date date not null,
  end_date date not null,
  total_price numeric(10,2) not null,
  status text default 'pending' check (status in ('pending','confirmed','active','returned','cancelled')),
  created_at timestamptz default now()
);
alter table public.rentals enable row level security;
create policy "Users can view own rentals" on public.rentals for select using (auth.uid() = user_id);
create policy "Users can create rentals" on public.rentals for insert with check (auth.uid() = user_id);

-- CONTACT MESSAGES
create table public.contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text default '',
  message text not null,
  created_at timestamptz default now()
);
alter table public.contact_messages enable row level security;
create policy "Anyone can send a message" on public.contact_messages for insert with check (true);

-- BLOG POSTS
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text not null,
  image_url text default '',
  author text not null,
  author_avatar text default '',
  category text not null,
  tags text[] default '{}',
  reading_time integer default 5,
  featured boolean default false,
  published boolean default true,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.blog_posts enable row level security;
create policy "Blog posts are publicly readable" on public.blog_posts for select using (published = true);
create policy "Authenticated users can manage blog posts" on public.blog_posts for all using (auth.role() = 'authenticated');

-- FAQ ITEMS
create table public.faqs (
  id uuid default uuid_generate_v4() primary key,
  question text not null,
  answer text not null,
  category text not null,
  order_index integer default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.faqs enable row level security;
create policy "FAQs are publicly readable" on public.faqs for select using (published = true);
create policy "Authenticated users can manage FAQs" on public.faqs for all using (auth.role() = 'authenticated');

-- PARTNER LOCATIONS
create table public.partner_locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  phone text default '',
  email text default '',
  website text default '',
  image_url text default '',
  services text[] default '{}',
  specialties text[] default '{}',
  hours jsonb default '{}',
  coordinates jsonb default '{}',
  featured boolean default false,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.partner_locations enable row level security;
create policy "Partner locations are publicly readable" on public.partner_locations for select using (active = true);
create policy "Authenticated users can manage partner locations" on public.partner_locations for all using (auth.role() = 'authenticated');

-- TESTIMONIALS
create table public.testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  location text default '',
  quote text not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  image_url text default '',
  gear_used text default '',
  adventure_type text default '',
  featured boolean default false,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.testimonials enable row level security;
create policy "Testimonials are publicly readable" on public.testimonials for select using (published = true);
create policy "Authenticated users can manage testimonials" on public.testimonials for all using (auth.role() = 'authenticated');

-- SITE CONTENT (for dynamic content blocks like hero sections, about us, etc.)
create table public.site_content (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  title text not null,
  content text not null,
  metadata jsonb default '{}',
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.site_content enable row level security;
create policy "Site content is publicly readable" on public.site_content for select using (published = true);
create policy "Authenticated users can manage site content" on public.site_content for all using (auth.role() = 'authenticated');

-- SEED DATA
insert into public.gear (name, slug, category, description, long_description, price_per_day, image_url, badge, features, specs, available_count, rating, review_count) values
('Trekking Backpacks', 'trekking-backpacks', 'Packs', '50L-75L expedition packs from Osprey, Deuter and Gregory. Fitted to your frame.', 'Our premium trekking backpacks are selected from the top outdoor brands. Each pack is professionally fitted to your frame before rental. Featuring adjustable torso lengths, hip belt sizing, and rain covers included.', 12.00, 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=800&q=80', 'Popular', ARRAY['Adjustable torso fit','Rain cover included','Hydration compatible','Multiple access points','Hip belt pockets'], '{"Volume":"50L-75L","Weight":"1.4-2.2 kg","Material":"Ripstop Nylon","Frame":"Aluminum","Brands":"Osprey, Deuter, Gregory"}', 15, 4.8, 124),
('Camping Tents', 'camping-tents', 'Shelter', '2-4 person ultralight and 4-season tents. Waterproof and wind-tested.', 'Sleep under the stars with confidence. Our tent collection ranges from ultralight 2-person shelters to bomber 4-season tents built for alpine conditions. Every tent is seam-sealed and waterproof-rated to 3000mm+.', 18.00, 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', null, ARRAY['Freestanding design','Seam-sealed waterproof','Footprint included','Color-coded setup','Vestibule storage'], '{"Capacity":"2-4 person","Weight":"1.2-3.5 kg","Waterproof":"3000mm+","Seasons":"3 and 4 season","Brands":"MSR, Big Agnes, Nemo"}', 10, 4.7, 89),
('Hiking Boots', 'hiking-boots', 'Footwear', 'Trail runners to mountaineering boots. All sizes, professionally fitted.', 'The right footwear makes or breaks a hike. Our boot wall covers everything from lightweight trail runners to burly mountaineering boots. Each pair is professionally fitted and UV sanitized between rentals.', 8.00, 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', null, ARRAY['Professional fitting','UV sanitized','All sizes available','Ankle support options','Vibram soles'], '{"Sizes":"US 5-15","Types":"Trail runner, Mid-cut, Mountaineering","Sole":"Vibram","Waterproof":"Gore-Tex options","Brands":"Salomon, La Sportiva, Scarpa"}', 25, 4.6, 156),
('Navigation Kit', 'navigation-kit', 'Electronics', 'GPS devices, compasses, topo maps and satellite communicators for backcountry.', 'Never lose your way in the backcountry. Our navigation kits include handheld GPS units, baseplate compasses, regional topographic maps, and satellite communicators for emergency SOS.', 10.00, 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80', 'New', ARRAY['Garmin inReach GPS','SOS emergency beacon','Topo maps included','Waterproof case','Pre-loaded waypoints'], '{"GPS":"Garmin inReach Mini 2","Battery":"Up to 14 days","SOS":"Global coverage","Maps":"USGS 1:24000","Compass":"Silva baseplate"}', 8, 4.9, 67),
('Lighting & Safety', 'lighting-safety', 'Safety', 'Headlamps, lanterns, first-aid kits and emergency shelters for any situation.', 'Be prepared for anything with our curated safety bundles. Each kit includes a high-lumen rechargeable headlamp, a compact camp lantern, a comprehensive wilderness first-aid kit, and an emergency bivy.', 5.00, 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80', null, ARRAY['400+ lumen headlamp','Rechargeable batteries','Wilderness first-aid','Emergency bivy included','Firestarter kit'], '{"Headlamp":"Black Diamond Spot 400","Lumens":"400","Battery":"Rechargeable USB-C","First Aid":"Wilderness-rated","Weight":"0.8 kg total"}', 20, 4.5, 93),
('Trekking Poles', 'trekking-poles', 'Accessories', 'Carbon and aluminum poles with ergonomic grips. Foldable and adjustable.', 'Take the pressure off your knees and power up those ascents. Our trekking poles come in both carbon fiber and aluminum options. All poles feature ergonomic cork or foam grips and adjustable wrist straps.', 6.00, 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80', null, ARRAY['Carbon and aluminum options','Cork/foam grips','Foldable to 38cm','Adjustable length','Snow baskets included'], '{"Material":"Carbon fiber / 7075 Aluminum","Weight":"180g-280g per pole","Collapsed":"38 cm","Extended":"100-135 cm","Grip":"Cork and EVA foam"}', 18, 4.7, 71);

-- SAMPLE FAQ DATA
insert into public.faqs (question, answer, category, order_index, published) values
('How far in advance should I book?', 'We recommend booking at least 48 hours in advance, especially during peak seasons (summer and early fall). For specialized or high-demand gear, booking a week ahead ensures availability.', 'Booking', 1, true),
('What if the weather turns bad during my rental?', 'Safety first! If conditions become unsafe, please return to a safe location. Weather-related early returns receive partial refunds for unused days. Our gear is designed for various conditions, but we prioritize your safety.', 'Weather', 2, true),
('Can I extend my rental if I need the gear longer?', 'Absolutely! Contact us as soon as you know you need an extension. Extensions are subject to availability and additional daily rates. We can often accommodate same-day extension requests.', 'Booking', 3, true),
('Do you provide gear recommendations for specific trails?', 'Yes! Our team knows Colorado&apos;s trails intimately. Tell us your planned adventure and we&apos;ll recommend the perfect gear package for your skill level and the conditions you&apos;ll encounter.', 'Gear', 4, true),
('What happens if gear gets damaged during my rental?', 'Normal wear and tear is expected and included. For significant damage, our protection plans cover repair or replacement costs. Without protection, you&apos;re responsible for repair costs up to the item&apos;s replacement value.', 'Policies', 5, true),
('Can I pick up gear the night before my trip?', 'Yes! We offer evening pickup (6-8 PM) for early morning departures. This popular service requires advance arrangement and may include a small convenience fee.', 'Pickup', 6, true),
('Do you sanitize gear between rentals?', 'Absolutely. All gear undergoes thorough cleaning and UV sanitization between rentals. Sleeping gear gets extra attention with antimicrobial treatment and full drying cycles.', 'Safety', 7, true),
('What&apos;s included with tent rentals?', 'All tents include footprint/tarp, guylines, stakes appropriate for Colorado soil, and repair kit. Many also include color-coded setup guides for quick assembly in the field.', 'Gear', 8, true),
('Can I rent gear for someone else?', 'Yes, but the primary renter must be present for pickup and remains responsible for the gear. For corporate or group bookings, we offer special arrangements with centralized billing.', 'Booking', 9, true),
('What if I return gear late?', 'Late returns incur additional daily charges. If you&apos;re running late, please call us! We&apos;re often flexible for genuine emergencies and can arrange after-hours drop-off for small fees.', 'Returns', 10, true);

-- SAMPLE BLOG POST DATA  
insert into public.blog_posts (title, slug, excerpt, content, image_url, author, author_avatar, category, tags, reading_time, featured, published) values
('Essential Gear for Colorado 14ers', 'essential-gear-colorado-14ers', 'Conquering Colorado&apos;s peaks over 14,000 feet requires the right preparation and gear. Here&apos;s your complete guide.', 'Colorado boasts 58 peaks over 14,000 feet, each offering unique challenges and breathtaking rewards. Whether you&apos;re tackling your first fourteener or going for your 58th, having the right gear can make the difference between a memorable summit and a miserable experience.

## The Big Three: Boots, Pack, and Layers

**Footwear is everything** on a fourteener. You&apos;ll encounter loose scree, wet rock, possible snow, and thousands of feet of elevation gain. We recommend starting with a good pair of hiking boots or approach shoes with:
- Vibram sole for grip on Colorado&apos;s notorious loose rock  
- Ankle support for uneven terrain
- Waterproof membrane for unexpected weather
- Proper fit (feet swell at altitude!)

**Pack Smart** with a 35-45L daypack that includes:
- Hydration system (you&apos;ll need 3-4L of water)
- Multiple compartments for organization  
- External attachment points for trekking poles
- Rain cover for afternoon thunderstorms

**Layer Like a Pro** because you&apos;ll start in darkness and potentially finish in afternoon storms:
- Moisture-wicking base layer
- Insulating mid-layer (fleece or down jacket)  
- Hard shell for wind and precipitation
- Extra insulation for extended summit time

## Navigation and Safety

Getting lost above treeline can be deadly. Essential navigation gear includes:
- GPS unit with extra batteries
- Detailed topographic map in waterproof case
- Compass as backup
- Headlamp with extra batteries
- Emergency shelter/bivy

## The Wild Cards: Trekking Poles and Microspikes

**Trekking Poles** aren&apos;t just for old folks - they&apos;re game-changers for:
- Reducing knee impact on long descents
- Stability on loose scree
- Rhythm setting during ascents  
- Emergency shelter support

**Microspikes or Crampons** for shoulder seasons when you might encounter:
- Packed snow on north-facing slopes
- Early morning ice on rock
- Late season conditions above 12,000 feet

## Timing and Weather

The 14er game is all about timing:
- **Start Early**: 4-6 AM starts are common
- **Turn Around Time**: Be off the summit by noon
- **Weather Windows**: Afternoon thunderstorms are real and dangerous
- **Season Considerations**: July-September are prime months

Most fourteeners can be dangerous or impossible in winter conditions, requiring mountaineering skills and equipment beyond typical hiking gear.

Remember: the summit is optional, coming home is mandatory. Don&apos;t let gear become a substitute for good judgment, physical preparation, and respect for Colorado&apos;s dramatic mountain weather.', 'https://images.unsplash.com/photo-1464822759844-d150baec4863?w=800&q=80', 'Sarah Johnson', 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&q=80', 'Adventure', ARRAY['14ers','Colorado','Hiking','Gear Guide'], 8, true, true),
('Winter Camping in Colorado: A Complete Guide', 'winter-camping-colorado-guide', 'Colorado&apos;s winter landscapes offer unparalleled beauty, but require serious preparation and the right gear to camp safely.', 'There&apos;s something magical about waking up in a snow-covered tent with crystalline mountain views stretching in every direction. Winter camping in Colorado offers solitude, stunning scenery, and a profound connection with nature that summer camping simply can&apos;t match.

But winter camping isn&apos;t summer camping with extra layers. It&apos;s a completely different activity requiring specialized gear, advanced skills, and a healthy respect for the serious consequences of mistakes.

## Temperature Zones and Conditions

Colorado&apos;s winter camping ranges from mild Front Range foothills to brutal high-altitude environments:

**Below 8,000 feet**: Temperatures typically range from -10°F to 30°F. Snow depth varies but rarely exceeds 2-3 feet on south-facing slopes.

**8,000-10,000 feet**: Expect -20°F to 20°F with consistent snow cover of 2-6 feet. This is the sweet spot for winter camping - cold enough for real winter conditions but not alpine brutal.

**Above 10,000 feet**: Temperatures from -30°F to 10°F with extreme wind and snow depths that can exceed 10 feet. This is mountaineering territory.

## The Four-Season Shelter System

Your tent becomes your lifeline in winter conditions:

**Four-Season Tents** are non-negotiable. They feature:
- Strong pole systems rated for snow loads
- Full-coverage rain flies for wind protection  
- Vestibules for gear storage and cooking
- Ventilation systems to prevent condensation

**Sleeping Systems** require the &quot;big three&quot;:
1. **Sleeping Pad**: R-value of 5+ is essential. Many winter campers use two pads.
2. **Sleeping Bag**: Rated 10-20°F below expected temps. Down vs synthetic is personal preference.
3. **Shelter**: Tent plus optional bivy for extra warmth/emergency backup.

## Staying Warm and Dry

**Layering Strategy**:
- Base layer: Merino wool or synthetic, never cotton
- Insulation: Down or synthetic jacket, down pants for extreme cold
- Shell: Hardshell jacket and pants for wind/precipitation
- Extremities: Insulated boots, warm socks, liner gloves + insulated gloves, warm hat + sun hat

**Heat Management**:
- Start cool - you&apos;ll warm up quickly when active
- Ventilate to prevent sweating
- Change clothes before sleeping
- Use chemical warmers sparingly (backup only)

## Water and Food Strategy  

**Water Management** becomes complex in winter:
- Keep water bottles inside your sleeping bag overnight
- Insulated bottle sleeves prevent freezing during the day
- Know how to melt snow efficiently (hint: don&apos;t just melt snow - add some water first)
- Drink constantly - dehydration happens faster in winter

**Food Considerations**:
- Calories become critical - plan 4,000-5,000 per day
- Fats provide sustained energy and warmth
- Hot meals boost morale and core temperature
- Freeze-dried meals work great but require reliable stove performance  

## Site Selection and Safety

**Campsite Selection**:
- Avoid avalanche terrain and study forecast/conditions
- Look for natural wind protection (trees, rock formations)
- South-facing slopes get morning sun for warmth
- Flat spots save energy vs building tent platforms

**Emergency Protocols**:
- Always tell someone your exact plans and check-in schedule
- Carry emergency communication device  
- Know signs of hypothermia and frostbite
- Have bailout plans for deteriorating weather

Winter camping in Colorado is incredibly rewarding but demands respect, preparation, and the right gear. Start with car camping or short trips to test your systems before committing to multi-day adventures.

The mountains will wait - make sure you&apos;re ready for them.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', 'Mike Rodriguez', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80', 'Winter', ARRAY['Winter Camping','Colorado','Cold Weather','Gear'], 12, true, true),
('Trail Running Gear Essentials for Colorado', 'trail-running-gear-colorado', 'From technical mountain trails to rolling foothills, Colorado trail running requires specific gear for safety and performance.', 'Trail running in Colorado isn&apos;t just running on trails - it&apos;s an entirely different sport that blends endurance athletics with mountaineering skills. Whether you&apos;re tackling technical single track in the San Juans or flowing trails in the Boulder foothills, the right gear makes the difference between a transcendent experience and a dangerous situation.

## Footwear: Your Foundation

**Trail Running Shoes** vs hiking boots - for most Colorado trails, dedicated trail runners are the way to go:

**For Technical Terrain** (loose rock, steep grades, root-crossed trails):
- Aggressive lugs for grip on varied surfaces
- Rock plate protection for sharp Colorado granite 
- Low-drop design for better ground feel
- Tight heel cup to prevent blisters on descents

**For High-Output Days** (long runs, races, fastpacking):
- Lightweight construction to reduce fatigue
- Breathable uppers for comfort during high exertion
- Responsive midsole foam that maintains energy return
- Quick-lacing systems for efficiency

## Hydration Strategy

Colorado&apos;s combination of altitude, dry air, and intense UV makes hydration complex:

**For Runs Under 2 Hours**:
- Handheld bottles (16-20oz) with electrolyte mix
- Vest with soft flasks for longer efforts within this range
- Know water sources along your route

**For Epic Adventures** (3+ hours):
- Hydration pack with 2-3L capacity
- Water filtration system for natural sources  
- Electrolyte replacement strategy (tablets, mix, whole foods)
- Emergency backup water source

## Navigation and Safety

Getting lost during a trail run can quickly become a survival situation:

**Essential Navigation**:
- GPS watch with preloaded routes and good battery life
- Smartphone with offline maps as backup
- Basic map and compass skills  
- Share your route with others

**Emergency Kit**:
- Whistle for emergency signaling
- Emergency bivy or space blanket
- First aid basics (blister treatment, pain relief)
- Emergency food (energy gels, bars)

## Clothing Systems  

**Base Layers**: Moisture management is everything
- Merino wool or high-end synthetics only
- Avoid cotton completely  
- Consider anti-odor treatments for long adventures

**Insulation Layer**:
- Lightweight fleece or insulated vest
- Packable design for carrying when not needed
- Wind-resistant preferred for Colorado conditions

**Shell Protection**:
- Ultra-light rain jacket for afternoon thunderstorms
- Wind shirt for alpine starts and summits
- Packability is key - you&apos;ll carry it more than wear it

## Altitude Considerations

**Acclimatization Strategy**:
- Arrive in Colorado 3-5 days before big efforts
- Sleep low, train high when possible
- Increase training intensity gradually
- Stay hydrated and avoid alcohol

**Performance Expectations**:
- Expect 15-30% reduction in pace above 8,000 feet
- Heart rate will be higher for same perceived effort  
- Recovery takes longer at altitude
- Weather changes dramatically with elevation gain

## Colorado-Specific Challenges

**Weather Variability**:
- Morning temperatures can be 40°F different than afternoon
- Afternoon thunderstorms with lightning risk above treeline
- Sudden weather changes with altitude gain
- UV intensity increases significantly with elevation

**Terrain Features**:
- Loose scree requiring adapted foot placement
- Stream crossings without bridges  
- Exposure to serious consequences from falls
- Wildlife encounters (bears, mountain lions, aggressive moose)

**Trail Etiquette**:
- Yield appropriately to hikers, horses, mountain bikers
- Stay on designated trails to prevent erosion
- Pack out all trash and minimize impact
- Respect private property boundaries

## Training Progression

**Building Colorado Fitness**:
- Start with maintained trails before technical terrain
- Build vertical gain gradually (add 500ft per week)
- Practice hiking steep uphills - power hiking is faster than running
- Train descent technique to save your quads

**Mental Game**:
- Embrace the suffer-fest mentality
- Learn to read weather and make go/no-go decisions
- Practice navigation skills in safe environments
- Develop turn-around protocols for safety

Trail running in Colorado offers some of the world&apos;s most spectacular experiences, but the mountains demand respect, preparation, and the right gear. Start conservatively, build skills progressively, and always prioritize safety over summit fever.

The trails will be there tomorrow - make sure you are too.', 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80', 'Alex Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', 'Trail Running', ARRAY['Trail Running','Colorado','Gear Guide','Training'], 10, false, true);

-- SAMPLE PARTNER LOCATIONS DATA
insert into public.partner_locations (name, description, address, city, state, zip_code, phone, email, website, image_url, services, specialties, hours, coordinates, featured, active) values
('Boulder Adventure Outfitters', 'Boulder&apos;s premier adventure gear shop with 25 years of Colorado expertise.', '2510 47th Street', 'Boulder', 'CO', '80301', '(303) 444-5533', 'info@boulderadventure.com', 'https://boulderadventure.com', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', ARRAY['Gear Sales','Repairs','Rentals','Guidebooks'], ARRAY['Climbing','Hiking','Camping','Winter Sports'], '{"monday":"9:00-19:00","tuesday":"9:00-19:00","wednesday":"9:00-19:00","thursday":"9:00-19:00","friday":"9:00-20:00","saturday":"8:00-20:00","sunday":"9:00-18:00"}', '{"lat":40.0150,"lng":-105.2705}', true, true),
('Vail Mountain Sports', 'Full-service outdoor retailer in the heart of Vail with expert local knowledge.', '193 Gore Creek Drive', 'Vail', 'CO', '81657', '(970) 476-1233', 'vail@mountainsports.com', 'https://vailmountainsports.com', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80', ARRAY['Equipment Sales','Ski Rentals','Bike Rentals','Repairs'], ARRAY['Skiing','Snowboarding','Mountain Biking','Hiking'], '{"monday":"8:00-20:00","tuesday":"8:00-20:00","wednesday":"8:00-20:00","thursday":"8:00-20:00","friday":"8:00-21:00","saturday":"7:00-21:00","sunday":"8:00-20:00"}', '{"lat":39.6403,"lng":-106.3742}', true, true),
('Aspen Expeditions', 'Guided adventures and premium gear rentals in the Roaring Fork Valley.', '308 South Hunter Street', 'Aspen', 'CO', '81611', '(970) 925-7625', 'adventures@aspenexp.com', 'https://aspenexpeditions.com', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', ARRAY['Guided Tours','Gear Rentals','Custom Adventures','Photography Tours'], ARRAY['Backcountry Skiing','Mountaineering','Photography','Wilderness Survival'], '{"monday":"7:00-19:00","tuesday":"7:00-19:00","wednesday":"7:00-19:00","thursday":"7:00-19:00","friday":"7:00-20:00","saturday":"6:00-20:00","sunday":"7:00-18:00"}', '{"lat":39.1911,"lng":-106.8175}', true, true),
('Colorado Springs Gear Co', 'Gateway to Pikes Peak and Garden of the Gods adventures.', '25 North Tejon Street', 'Colorado Springs', 'CO', '80903', '(719) 635-2877', 'info@cospringsgear.com', 'https://cospringsgear.com', 'https://images.unsplash.com/photo-1445366285935-f2c0dc7dade9?w=800&q=80', ARRAY['Outdoor Gear','Rock Climbing Equipment','Camping Supplies','Trail Maps'], ARRAY['Rock Climbing','Hiking','Camping','14er Preparation'], '{"monday":"9:00-18:00","tuesday":"9:00-18:00","wednesday":"9:00-18:00","thursday":"9:00-18:00","friday":"9:00-19:00","saturday":"8:00-19:00","sunday":"10:00-17:00"}', '{"lat":38.8339,"lng":-104.8214}', false, true),
('Telluride Sports', 'Adventure headquarters in the San Juan Mountains.', '150 West Colorado Avenue', 'Telluride', 'CO', '81435', '(970) 728-4477', 'info@tellsports.com', 'https://telluridesports.com', 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80', ARRAY['Ski Rentals','Summer Gear','Bike Rentals','Guided Services'], ARRAY['Alpine Skiing','Mountain Biking','Hiking','Backcountry'], '{"monday":"8:00-18:00","tuesday":"8:00-18:00","wednesday":"8:00-18:00","thursday":"8:00-18:00","friday":"8:00-19:00","saturday":"7:00-19:00","sunday":"8:00-18:00"}', '{"lat":37.9375,"lng":-107.8123}', false, true),
('Fort Collins Adventure Center', 'Northern Colorado&apos;s hub for outdoor enthusiasm and gear expertise.', '3825 South Mason Street', 'Fort Collins', 'CO', '80525', '(970) 221-0544', 'foco@adventurecenter.com', 'https://fortcollinsadventure.com', 'https://images.unsplash.com/photo-1527004760525-621e0b5b0f67?w=800&q=80', ARRAY['Gear Sales','Repairs','Classes','Group Outings'], ARRAY['Hiking','Camping','Fishing','Photography'], '{"monday":"9:00-19:00","tuesday":"9:00-19:00","wednesday":"9:00-19:00","thursday":"9:00-19:00","friday":"9:00-20:00","saturday":"8:00-20:00","sunday":"9:00-18:00"}', '{"lat":40.5853,"lng":-105.0844}', false, true);

-- SAMPLE TESTIMONIALS DATA
insert into public.testimonials (name, location, quote, rating, image_url, gear_used, adventure_type, featured, published) values
('Marcus Thompson', 'Denver, CO', 'Summit Rentals made my first 14er attempt absolutely perfect. The gear was pristine, the fit was professional, and their advice on Mount Elbert was spot-on. I felt confident and prepared every step of the way.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', 'Backpack, Trekking Poles, Navigation Kit', '14er Hiking', true, true),
('Sarah Rodriguez', 'Austin, TX', 'As someone new to winter camping, I was nervous about the gear requirements. Summit Rentals&apos; winter package was perfectly curated - every item had a purpose and I stayed warm all night at 10,000 feet!', 5, 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&q=80', 'Winter Tent, Sleeping System, Winter Clothing', 'Winter Camping', true, true),
('Jake Wilson', 'Chicago, IL', 'The Maroon Bells loop was a dream trip made possible by Summit Rentals. Five days of backpacking gear that performed flawlessly. Their pre-trip consultation saved us from overpacking and gave us confidence in the backcountry.', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80', 'Backpacking Pack, Tent, Cooking System', 'Multi-day Backpacking', true, true),
('Emily Chen', 'San Francisco, CA', 'I rent gear from Summit Rentals every time I visit Colorado. The quality is consistently excellent, pickup is easy, and they always remember my preferences. It&apos;s like having a gear closet in Colorado!', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80', 'Various Day Hiking Gear', 'Day Hiking', false, true),
('David Park', 'Boulder, CO', 'As a local, I use Summit Rentals to try expensive gear before buying. Their rental program let me test three different backpacks before finding my perfect fit. Smart business model and great service.', 4, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80', 'Backpacking Packs, Technical Gear', 'Gear Testing', false, true),
('Lisa Anderson', 'Phoenix, AZ', 'Solo female traveler here - Summit Rentals made me feel safe and prepared for my Colorado adventures. Their safety briefings and emergency gear recommendations gave me confidence to explore independently.', 5, 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80', 'Solo Hiking Package, Safety Gear', 'Solo Hiking', true, true);

-- SAMPLE SITE CONTENT DATA
insert into public.site_content (key, title, content, metadata, published) values
('hero_main', 'Main Hero Section', 'Adventure Awaits in Colorado&apos;s Backcountry', '{"subtitle":"Premium outdoor gear rentals for every Colorado adventure","cta_text":"Browse Gear","cta_link":"/gear","background_image":"https://images.unsplash.com/photo-1464822759844-d150baec4863?w=1600&q=80"}', true),
('about_mission', 'Company Mission', 'To make premium outdoor gear accessible to every adventurer while promoting sustainable practices that protect the wilderness we all love.', '{"section":"about"}', true),
('contact_hours', 'Business Hours', 'Monday-Friday: 8:00 AM - 7:00 PM\nSaturday-Sunday: 7:00 AM - 8:00 PM\nEmergency Support: 24/7', '{"section":"contact"}', true);

-- Create updated_at triggers for timestamp maintenance
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_blog_posts_updated_at before update on public.blog_posts
  for each row execute procedure public.handle_updated_at();

create trigger handle_faqs_updated_at before update on public.faqs
  for each row execute procedure public.handle_updated_at();

create trigger handle_partner_locations_updated_at before update on public.partner_locations
  for each row execute procedure public.handle_updated_at();

create trigger handle_testimonials_updated_at before update on public.testimonials
  for each row execute procedure public.handle_updated_at();

create trigger handle_site_content_updated_at before update on public.site_content
  for each row execute procedure public.handle_updated_at();
