import { redirect } from "next/navigation";
import { getAuthUrl } from "@/lib/youtube";

export async function GET() {
  const url = getAuthUrl();
  redirect(url);
}
