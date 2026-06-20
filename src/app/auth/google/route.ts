import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAuthUrl } from "@/lib/youtube";

export async function GET() {
  const session = await getSession();
  if (!session) redirect("/login");

  const url = getAuthUrl();
  redirect(url);
}
