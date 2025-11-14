"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccountPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to dashboard, skipping account setup for MVP
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
