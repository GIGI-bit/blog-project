import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import HomePage from "./blogs/home/page";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/blogs/home");
}
