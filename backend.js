async function loadProducts(type) {
  const env = window.env || {};
  const SUPABASE_URL = env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Missing Supabase config.");
    return { items: [] };
  }else{
    console.log("Supabase connected successfully.");
  }

  let supabaseConnection;
  try {
    supabaseConnection = supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
  } catch (clientError) {
    console.error(clientError);
  }

  const { data, error } = await supabaseConnection
    .from("products")
    .select("*")
    .eq("category", type);

  if (error) {
    console.error(`Error loading ${type}:`, error);
    return { items: [] };
  }else{
    console.log(`Loaded ${type}:`, data);
  }

  const pesticideProducts = {
    items: (data || []).map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: Number(p.price),
      imageUrl: p.image_url,
      unit: p.stock
    }))
  };
  console.log(`Final Object ${type}:`, pesticideProducts);
  return pesticideProducts;
}
