
-- ==========================================
-- PHASE 4: SOCIAL MODERATION & SECURITY UPDATE
-- ==========================================

-- به‌روزرسانی تابع برای نمایش فقط ردپاهای تایید شده توسط AI یا ادمین
CREATE OR REPLACE FUNCTION get_nearby_footprints(
  px_lat float8,
  px_lng float8,
  px_radius float8 DEFAULT 2000
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  lat float8,
  lng float8,
  user_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.content,
    ST_Y(f.location::geometry) as lat,
    ST_X(f.location::geometry) as lng,
    p.username as user_name,
    f.created_at
  FROM footprints f
  JOIN profiles p ON f.user_id = p.id
  WHERE 
    ST_DWithin(
      f.location,
      ST_SetSRID(ST_MakePoint(px_lng, px_lat), 4326),
      px_radius
    )
    AND f.is_verified = TRUE -- قانون طلایی: فقط محتوای سالم نمایش داده شود
  ORDER BY f.created_at DESC
  LIMIT 50;
END;
$$;
