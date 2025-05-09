import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("blogs")
      .select("*,authors(*), categories(*)")
      .eq("id", id)
      .single();

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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = await params;

  if (!id)
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });

  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });

  return new Response(null, { status: 204 });
}
