import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

/** Client-side Supabase instance — safe to use in the browser (uses anon key). */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-side Supabase instance using the service role key.
 * Only import this from server components, route handlers, or server actions.
 */
export function createServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}

/** Uploads a product image to the `product-images` storage bucket. */
export async function uploadProductImage(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(path, file, { upsert: true, cacheControl: "3600" });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from("product-images")
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
}
