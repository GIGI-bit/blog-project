import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;
  const pageSize = 12;

  if (isNaN(page) || page < 1) {
    return new Response(JSON.stringify({ error: "Invalid page number" }), {
      status: 400,
    });
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from("blogs")
    .select("*,authors(email),categories(*)")
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const { title, imgLink, text, category_id } = body;
  console.log("Request Body:", body);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!title || !text || !imgLink || !category_id) {
    return new Response(JSON.stringify({ error: "Missing required field" }), {
      status: 400,
    });
  }
  const currentDate = new Date().toISOString();
  const { data, error } = await supabase
    .from("blogs")
    .insert({
      title,
      thumbnail: imgLink,
      body: text,
      category: category_id,
      created_at: currentDate,
      author: user?.id,
    })
    .single();

  if (error) {
    console.error("Supabase Insert Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
