import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { BiLogIn } from "react-icons/bi";

export default function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 border px-2 py-1 rounded-md bg-gray-900">
      Logout <BiLogIn size={20} />
    </button>
  );
}
