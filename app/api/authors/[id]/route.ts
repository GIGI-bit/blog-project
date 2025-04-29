import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = context;
  const { id } = await params;
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("blogs")
      .select("*,authors(*), categories(*)")
      .eq("author", id);

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
