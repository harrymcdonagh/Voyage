import getSession from "@/src/lib/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function Page() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?CallbackUrl=/admin");
  }

  if (user.role !== "admin") {
    return (
      <main className="mx-auto my-10">
        <p className="text-center">You are not authorised to view this page</p>
      </main>
    );
  }

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}
