"use client";

import React from "react";
import { ShowcaseFeed } from "@/modules/new-home/components/ShowcaseFeed";

export default function NewHomePage() {
  return (
    // No pt-[100px] so it sits under the global sticky/fixed navbar
    <main className="relative min-h-screen bg-[var(--bg-primary)]">
      <ShowcaseFeed />
    </main>
  );
}
