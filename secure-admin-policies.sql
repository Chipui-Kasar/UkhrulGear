-- ============================================
-- Summit Rentals — Secure Admin RLS Policies (Alternative)
-- This version creates a proper admin role system
-- Choose this for production environments
-- ============================================

-- First, create an admin role in the profiles table
alter table public.profiles add column if not exists role text default 'user';

-- Create a function to check if current user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists(
    select 1 from public.profiles 
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Drop existing gear policies (if you want to use this secure version)
drop policy if exists "Authenticated users can insert gear" on public.gear;
drop policy if exists "Authenticated users can update gear" on public.gear;  
drop policy if exists "Authenticated users can delete gear" on public.gear;

-- Create admin-only policies for gear management
create policy "Admins can insert gear" on public.gear 
  for insert with check (public.is_admin());

create policy "Admins can update gear" on public.gear 
  for update using (public.is_admin());

create policy "Admins can delete gear" on public.gear 
  for delete using (public.is_admin());

-- Make yourself an admin (replace with your actual user email)
-- update public.profiles set role = 'admin' where email = 'your-email@example.com';

-- Verify the policies
select schemaname, tablename, policyname, cmd, roles, qual, with_check 
from pg_policies 
where tablename = 'gear';