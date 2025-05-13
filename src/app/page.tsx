"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.includes("auth_token");
    if (!token) {
      router.push("/login"); // Si no hay token, manda al login
    } else {
      router.push("/dashboard"); // Si está autenticado, manda al dashboard
    }
  }, []);

  return <p>Redirigiendo...</p>;
}
