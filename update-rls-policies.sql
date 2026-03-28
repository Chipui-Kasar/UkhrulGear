-- ============================================
-- Summit Rentals — RLS Policy Updates
-- Run this in the Supabase SQL Editor to fix admin gear management
-- ============================================

-- Add missing RLS policies for gear table to allow admin operations
-- These policies allow any authenticated user to perform CRUD operations on gear

-- Allow authenticated users to insert gear (for admin functionality)
create policy "Authenticated users can insert gear" on public.gear 
  for insert with check (auth.role() = 'authenticated');

-- Allow authenticated users to update gear
create policy "Authenticated users can update gear" on public.gear 
  for update using (auth.role() = 'authenticated');

-- Allow authenticated users to delete gear  
create policy "Authenticated users can delete gear" on public.gear 
  for delete using (auth.role() = 'authenticated');

-- Verify the policies were created successfully
select schemaname, tablename, policyname, cmd, roles, qual, with_check 
from pg_policies 
where tablename = 'gear';