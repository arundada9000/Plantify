"use client";

import PomodoroTimer from "@/components/pomodoro-timer";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export enum RoleEnum {
  USER="USER",
  ADMIN="ADMIN"
}

// ✅ Correct typing: role is a string union, not a tuple
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  avatar?: string;
  is_email_verified?: boolean;
}

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  

  useEffect(() => {
    if (loading) return; // wait for auth context

    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Role-based redirect
    if ((user.role as RoleEnum) === "ADMIN") {
      router.push("/admin");
      return;
    }

    // USER stays on home
  }, [loading, isAuthenticated, user, router]);

  // Prevent flash before redirects
  if (loading || !isAuthenticated || !user) {
    return null;
  }

  // USER view
  return (
    <main className="w-full flex justify-center items-center">
      <PomodoroTimer />
    </main>
  );
}
