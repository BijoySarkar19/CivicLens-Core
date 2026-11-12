"use client";

import { GovtModeProvider } from "@/lib/govt-mode";

export function Providers({ children }: { children: React.ReactNode }) {
  return <GovtModeProvider>{children}</GovtModeProvider>;
}
