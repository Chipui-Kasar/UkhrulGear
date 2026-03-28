export interface GearItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  long_description: string;
  price_per_day: number;
  image_url: string;
  gallery_images: string[];
  badge: string | null;
  features: string[];
  specs: Record<string, string>;
  available_count: number;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface Review {
  id: string;
  gear_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  trail_name: string | null;
  created_at: string;
}

export interface Rental {
  id: string;
  user_id: string;
  gear_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'active' | 'returned' | 'cancelled';
  created_at: string;
  gear?: GearItem;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}
