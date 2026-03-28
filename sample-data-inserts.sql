-- ============================================
-- Summit Rentals — Sample Data Inserts
-- Run this after the main schema to populate sample data
-- ============================================

-- BLOG POSTS
insert into public.blog_posts (title, slug, excerpt, content, image_url, author, author_avatar, category, tags, reading_time, featured, published) values
('Trekking the Hidden Trails of Manipur', 'trekking-hidden-trails-manipur', 'Discover the breathtaking landscapes and untouched beauty of Manipur''s remote mountain trails.', 'Manipur, the "Jewel of India," offers some of the most spectacular and least explored trekking opportunities in the country. From the rolling hills of Ukhrul to the pristine valleys around Imphal, this northeastern state is a paradise for adventure seekers.

## The Magic of Ukhrul Hills

The Ukhrul district presents a landscape that changes dramatically with the seasons. During spring, the hills come alive with blooming rhododendrons and wild orchids, creating a natural carpet of colors that stretches as far as the eye can see.

**Best Time to Visit**: March to May for flora, October to February for clear mountain views.

The trails here are challenging but rewarding, offering panoramic views of the surrounding valleys and distant peaks. Local guides from the Tangkhul community can provide invaluable insights into the region''s rich cultural heritage.

## Essential Gear for Manipur Treks

**Navigation Equipment**: GPS devices and detailed topographic maps are essential, as trail markers can be sparse.

**Weather Protection**: Manipur''s weather can change rapidly. Pack layers including:
- Waterproof jacket for sudden downpours
- Warm fleece for cool evenings
- Sun hat for exposed ridge walks

**Footwear**: Technical trekking boots with good ankle support are crucial for the rocky terrain.

## Cultural Immersion

One of the unique aspects of trekking in Manipur is the opportunity to experience the rich tribal culture. Many trails pass through traditional villages where you can witness age-old customs and perhaps even participate in local festivals if your timing is right.

**Responsible Trekking**: Always seek permission before entering tribal areas and respect local customs. Consider hiring local guides to ensure you''re contributing to the community.

## Wildlife and Flora

Manipur''s forests are home to diverse wildlife including the rare brow-antlered deer (Sangai), various species of hornbills, and if you''re extremely lucky, the elusive clouded leopard. The region is also a botanist''s dream with over 500 species of orchids.

The best photography opportunities come during the golden hours when the morning mist lifts from the valleys, revealing the intricate patterns of terraced agriculture and traditional houses built on stilts.

Remember to travel responsibly and leave these pristine environments as beautiful as you found them.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 'Priya Sharma', 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&q=80', 'Adventure', ARRAY['Manipur','Trekking','Northeast India','Cultural'], 12, true, true),

('Essential Gear for Monsoon Trekking in Northeast India', 'essential-gear-monsoon-trekking-northeast-india', 'Navigate the challenging but rewarding monsoon season in Northeast India with the right gear and preparation.', 'Monsoon trekking in Northeast India offers a unique experience - lush green landscapes, gushing waterfalls, and crystal-clear streams. However, it also presents unique challenges that require specialized gear and preparation.

## Waterproof Everything

**Rain Gear**: A high-quality rain jacket with pit zips for ventilation is non-negotiable. Look for jackets with a minimum 10,000mm waterproof rating.

**Footwear**: Waterproof trekking boots with excellent grip are essential. The trails can be slippery, and you''ll often be walking through streams.

**Pack Protection**: Use a waterproof pack cover and pack everything in dry bags. Even "waterproof" packs can fail in heavy downpours.

## Layering Strategy

Despite the warmth, temperatures can drop significantly, especially at higher altitudes and during heavy rain.

**Base Layer**: Merino wool or synthetic materials that wick moisture away from your skin.

**Insulation**: A lightweight down or synthetic jacket that compresses well and maintains insulation when damp.

## Navigation and Safety

Monsoon conditions can severely limit visibility. GPS devices become crucial, and emergency signaling devices are highly recommended.

**Emergency Kit**: Include waterproof matches, emergency shelter, first aid supplies, and water purification tablets.

The rewards of monsoon trekking include witnessing nature at its most vibrant and experiencing the true wilderness character of Northeast India.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', 'Arjun Patel', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', 'Gear Guide', ARRAY['Monsoon','Gear','Northeast India','Safety'], 8, false, true),

('Photography Tips for Mountain Adventures', 'photography-tips-mountain-adventures', 'Capture stunning mountain landscapes and adventure moments with these essential photography techniques and gear recommendations.', 'Mountain photography combines technical challenges with incredible artistic opportunities. Whether you''re documenting your trek through the Manipur hills or capturing sunrise over the Himalayas, these tips will help you create memorable images.

## Essential Camera Gear

**Camera Body**: A weatherproof DSLR or mirrorless camera that can handle temperature changes and moisture. Full-frame sensors excel in low light conditions common during golden hour.

**Lenses**: 
- Wide-angle lens (14-24mm) for dramatic landscape shots
- Standard zoom (24-70mm) for versatility
- Telephoto (70-200mm) for wildlife and distant peaks

**Protection**: Lens filters are crucial - UV filters protect your lens, polarizing filters reduce glare from water and enhance sky contrast, and ND filters allow longer exposures for silky waterfalls.

## Composition Techniques

**Leading Lines**: Use trails, rivers, or ridge lines to guide the viewer''s eye through your composition.

**Foreground Interest**: Include rocks, flowers, or interesting textures in the foreground to create depth and context.

**Scale**: Include people or familiar objects to convey the massive scale of mountain landscapes.

## Dealing with Challenging Conditions

Mountain weather can change rapidly, creating both opportunities and challenges.

**Golden Hour**: The hour after sunrise and before sunset provides the warmest, most flattering light. Plan your shots around these times.

**Blue Hour**: The period just after sunset offers beautiful deep blue skies that contrast beautifully with artificial lights from distant villages.

**Weather Drama**: Don''t pack away your camera when storms approach. Some of the most dramatic mountain photos capture the interplay between light and stormy weather.

## Technical Considerations

**Hyperfocal Distance**: Learn to use hyperfocal distance focusing to keep both foreground and background sharp in landscape shots.

**Exposure**: Mountain scenes often have extreme contrast. Consider HDR techniques or graduated ND filters to capture the full dynamic range.

**Battery Life**: Cold temperatures drain batteries quickly. Keep spare batteries warm and consider external battery packs for longer shoots.

Remember, the best camera is the one you have with you. Don''t let gear limitations stop you from capturing and sharing the beauty of mountain adventures.', 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80', 'Maya Singh', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80', 'Photography', ARRAY['Photography','Mountains','Landscape','Gear'], 10, false, true);

-- PARTNER LOCATIONS (Ukhrul and Imphal)
insert into public.partner_locations (name, description, address, city, state, zip_code, phone, email, website, image_url, services, specialties, hours, coordinates, featured, active) values
('Ukhrul Adventure Base', 'Your gateway to Manipur''s most spectacular trekking destinations. We provide comprehensive outdoor gear, local guides, and expedition support for exploring the Ukhrul hills and surrounding tribal areas.', 'Kamjong Road, Near DC Office', 'Ukhrul', 'Manipur', '795142', '+91-9862-123456', 'info@ukhrulbase.com', 'https://ukhrulbase.com', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', ARRAY['Gear Rental','Guided Tours','Camping Equipment','Emergency Support'], ARRAY['Tribal Area Treks','Rhododendron Trails','Cultural Tourism','Wildlife Photography'], '{"monday":"8:00-18:00","tuesday":"8:00-18:00","wednesday":"8:00-18:00","thursday":"8:00-18:00","friday":"8:00-18:00","saturday":"8:00-19:00","sunday":"9:00-17:00"}', '{"lat":25.0979,"lng":94.7308}', true, true),

('Imphal Valley Expeditions', 'Premier outdoor adventure company serving Imphal and the greater Manipur region. Specializing in multi-day treks, cultural tours, and sustainable adventure tourism that supports local communities.', 'Thangmeiband, Opposite Manipur University', 'Imphal', 'Manipur', '795001', '+91-9856-789012', 'hello@imphalexpeditions.com', 'https://imphalexpeditions.com', 'https://images.unsplash.com/photo-1464822759844-d150baec4863?w=800&q=80', ARRAY['Adventure Tours','Cultural Programs','Photography Workshops','Eco Tours'], ARRAY['Loktak Lake Expeditions','Keibul Lamjao Visits','Traditional Craft Tours','Sangai Spotting'], '{"monday":"7:00-19:00","tuesday":"7:00-19:00","wednesday":"7:00-19:00","thursday":"7:00-19:00","friday":"7:00-20:00","saturday":"6:00-20:00","sunday":"8:00-18:00"}', '{"lat":24.8170,"lng":93.9368}', true, true);

-- REVIEWS
-- Note: Reviews require existing gear_id and user_id values from your database
-- First, let's see what gear is available with this query:
-- SELECT id, name FROM public.gear LIMIT 5;

-- Once you have actual gear IDs, you can insert reviews like this:
-- Replace the gear_id values below with actual IDs from your gear table
-- Replace the user_id values with actual user IDs (these get created when users sign up)

/*
-- Example reviews - uncomment and update IDs after finding actual gear IDs
insert into public.reviews (gear_id, user_id, user_name, rating, comment, trail_name, created_at) values
-- Use actual gear_id from: SELECT id, name FROM public.gear WHERE name LIKE '%Backpack%' LIMIT 1;
('<REPLACE_WITH_ACTUAL_GEAR_ID>', '<REPLACE_WITH_ACTUAL_USER_ID>', 'Rajesh Kumar', 5, 'Excellent backpack for the Ukhrul trek! Comfortable even with heavy loads and the rain cover saved my gear during unexpected downpours. The local team recommended this and it was perfect for the terrain.', 'Shirui Peak Trail', now() - interval '5 days'),
('<REPLACE_WITH_ACTUAL_GEAR_ID>', '<REPLACE_WITH_ACTUAL_USER_ID>', 'Priti Das', 4, 'Good quality tent that handled the monsoon well. Setup was quick even in windy conditions on the ridgeline. Only minor issue was condensation in high humidity, but overall very satisfied.', 'Dzuko Valley Trek', now() - interval '12 days'),
('<REPLACE_WITH_ACTUAL_GEAR_ID>', '<REPLACE_WITH_ACTUAL_USER_ID>', 'Amit Thokchom', 5, 'Perfect trekking shoes for Northeast terrain. Excellent grip on wet rocks and the waterproofing held up throughout the entire monsoon trek. Highly recommend for anyone planning Manipur adventures.', 'Kangchup-Khayang Peak', now() - interval '18 days'),
('<REPLACE_WITH_ACTUAL_GEAR_ID>', '<REPLACE_WITH_ACTUAL_USER_ID>', 'Sunita Sharma', 4, 'Great gear quality and the pickup service in Imphal was very convenient. The navigation kit was essential for the remote trails. Staff provided excellent local knowledge about weather patterns.', 'Moreh Border Trek', now() - interval '25 days'),
('<REPLACE_WITH_ACTUAL_GEAR_ID>', '<REPLACE_WITH_ACTUAL_USER_ID>', 'David Meitei', 5, 'Outstanding service! The team customized the gear package for our cultural photography expedition. Everything was clean, well-maintained, and perfectly suited for the unique challenges of documenting tribal life.', 'Tangkhul Villages Circuit', now() - interval '30 days');
*/

-- For now, we'll skip reviews and add them through the admin interface later
-- You can add reviews manually at: /admin (when implemented) or through the gear detail pages

-- SITE CONTENT
insert into public.site_content (key, title, content, metadata, published) values
('hero_main', 'Main Hero Section', 'Adventure Awaits in India''s Northeast', '{"subtitle":"Premium outdoor gear rentals for exploring Manipur, Nagaland, and the Seven Sisters","cta_text":"Explore Gear","cta_link":"/gear","background_image":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"}', true),

('about_northeast', 'Northeast India Focus', 'Specializing in adventure gear for the unique challenges of Northeast India - from the rolling hills of Manipur to the remote valleys of Arunachal Pradesh. We understand the terrain, weather, and cultural considerations that make this region special.', '{"section":"about","region":"northeast_india"}', true),

('services_local', 'Local Expertise', 'Our team includes local guides and adventure experts who know Northeast India intimately. We provide not just gear, but regional knowledge, weather insights, and cultural guidance to make your adventure safe and meaningful.', '{"section":"services","focus":"local_knowledge"}', true),

('contact_locations', 'Our Locations', 'Serving Imphal, Ukhrul, and surrounding areas with pickup/delivery service. Extended coverage across Manipur, Nagaland, and other northeastern states for multi-day expeditions.', '{"section":"contact","coverage":"northeast_india"}', true),

('seasonal_info', 'Best Times to Visit', 'Spring (March-May): Perfect for rhododendron blooms and clear mountain views. Monsoon (June-September): Lush landscapes but challenging conditions. Winter (October-February): Ideal for trekking with clear skies and cool temperatures.', '{"section":"planning","type":"seasonal_guide"}', true),

('cultural_respect', 'Cultural Guidelines', 'Northeast India is home to diverse tribal communities with rich traditions. We provide cultural orientation and ensure all our adventures respect local customs, support communities, and follow sustainable tourism practices.', '{"section":"guidelines","focus":"cultural_sensitivity"}', true);

-- TESTIMONIALS
insert into public.testimonials (name, location, quote, rating, image_url, gear_used, adventure_type, featured, published) values
('Kiran Manipur', 'Imphal, Manipur', 'Summit Rentals made exploring my home state feel like a completely new adventure! Their gear recommendations were perfect for the Shirui hills, and the cultural insights helped me appreciate places I thought I knew well.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', 'Trekking Package, Photography Kit', 'Local Explorer', true, true),

('Ananya Chattopadhyay', 'Kolkata, West Bengal', 'As a solo female traveler, I was nervous about trekking in remote Northeast areas. Summit Rentals connected me with trustworthy local guides and provided safety gear that gave me confidence to explore Ukhrul''s beautiful trails.', 5, 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&q=80', 'Safety Kit, Communication Device, Women''s Trekking Gear', 'Solo Adventure', true, true),

('Robert Thomson', 'London, UK', 'Incredible experience exploring Manipur''s tribal areas! Summit Rentals'' cultural orientation program was invaluable, and their gear performed flawlessly in challenging monsoon conditions. This is authentic adventure tourism done right.', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80', 'Monsoon Gear, Cultural Tour Package', 'International Trek', true, true),

('Dr. Shamim Ahmed', 'Mumbai, Maharashtra', 'The team''s knowledge of medicinal plants and traditional healing practices in the region added an educational dimension to our trek. Perfect blend of adventure and learning. The gear quality exceeded expectations.', 4, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80', 'Research Equipment, Botanical Kit', 'Educational Expedition', false, true),

('Tenzin Norbu', 'Gangtok, Sikkim', 'Excellent service for our photography expedition! The high-altitude gear worked perfectly for capturing the sunrise over Kangchup peak. Local guide recommendations were spot-on. Will definitely book again.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', 'Camera Protection, High-Altitude Gear', 'Photography Trek', false, true),

('Leima Shangningam', 'Ukhrul, Manipur', 'It''s wonderful to see a company that truly understands and respects our local culture. They supported our community-based tourism initiatives and helped visitors experience authentic Tangkhul hospitality.', 5, 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80', 'Community Tour Package', 'Cultural Immersion', true, true),

('Captain (Retd.) Singh', 'Dimapur, Nagaland', 'As a retired Army officer familiar with Northeast terrain, I appreciate quality gear. Summit Rentals provides military-grade equipment that can handle the region''s challenging conditions. Their emergency support is exemplary.', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80', 'Military-Grade Kit, Emergency Equipment', 'Tactical Expedition', false, true);

-- IMPORTANT NOTES:
-- 1. Reviews are commented out above because they require existing gear_id and user_id values
-- 2. To add reviews later:
--    - First run: SELECT id, name FROM public.gear; to get actual gear IDs
--    - Then uncomment the reviews section and replace placeholder IDs
--    - Or add reviews through your admin interface once users start signing up
-- 3. All other data (blog posts, partners, testimonials, site content) will work immediately
-- 4. You can manage all this content through your admin interfaces at /admin