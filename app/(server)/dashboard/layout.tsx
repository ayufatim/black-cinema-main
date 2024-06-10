import getCurrentUser from "@/app/_actions/get-user";
import NavbarDashboard from "@/components/NavbarDashboard";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getCurrentUser()

  if (!users) {
    redirect("/signin")
  }
  return (
    <main className="relative flex flex-col h-screen w-full">
      <NavbarDashboard users={users}/>
      <div className="w-full">{children}</div>
    </main>
  );
}
