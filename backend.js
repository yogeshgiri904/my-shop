async function loadProducts(type) {
  const env = window.env || {};
  const SUPABASE_URL = env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Missing Supabase config.");
    return { items: [] };
  }else{
    console.error("Supabase Loaded.");
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
    console.error("Error loading pesticides:", error);
    return { items: [] };
  }else{
    console.error("esticides:", data);
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
  console.error("Pesticides ready :", pesticideProducts);
  return pesticideProducts;
}
