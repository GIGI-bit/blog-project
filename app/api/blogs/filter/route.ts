import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const pageParam = searchParams.get("page");
  const title = searchParams.get("title");
  const page = pageParam ? parseInt(pageParam) : 1;
  const pageSize = 12;

  if (isNaN(page) || page < 1) {
    return new Response(JSON.stringify({ error: "Invalid page number" }), {
      status: 400,
    });
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("blogs")
    .select("*,authors(email),categories(*)")
    .range(from, to)
    .order("created_at", { ascending: false });
  if (title) {
    console.log(decodeURIComponent(title));
    query = query.ilike("title", `%${decodeURIComponent(title)}%`);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
