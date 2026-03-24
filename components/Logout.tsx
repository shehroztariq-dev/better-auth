import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { BiLogIn } from "react-icons/bi";

export default function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 border px-2 py-1 rounded-lg">
      Logout <BiLogIn size={20} />
    </button>
  );
}
