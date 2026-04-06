"use client";
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const user = authClient.useSession();
  return (
    <div className="">
      <h1 className="text-2xl">
        Welcome,<span className="font-bold"> {user.data?.user.name}</span>
      </h1>
    </div>
  );
}
