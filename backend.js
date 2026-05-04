async function loadProducts(type) {

  let supabaseConnection;
  try {
    supabaseConnection = supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
  } catch (clientError) {
    throw clientError;
  }

  const { data, error } = await supabaseConnection
    .from("products")
    .select("*")
    .eq("category", type);

  if (error) {
    console.error("Error loading pesticides:", error);
    return { items: [] };
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

  return pesticideProducts;
}
