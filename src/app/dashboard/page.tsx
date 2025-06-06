"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isSessionActive, autoLogoutOnInactivity } from "@/utils/authUtils";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isSessionActive()) {
      router.push("/login");
    } else {
      autoLogoutOnInactivity(15); // 15 minutos
    }
  }, []);

  return <div>Bienvenido</div>;
}
