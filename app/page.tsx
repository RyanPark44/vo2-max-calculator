import { redirect } from "next/navigation";
import { getSession } from "@/lib";

export default async function Home() {
  const session = await getSession();
  if (!session) redirect("/login");
  else redirect(`/user/${session.userData.athlete.id}`);
}
