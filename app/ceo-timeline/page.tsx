import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "CEO Cybersecurity Timeline | Muhlah",
  description: "Muhlah’s dependency-led cybersecurity delivery timeline through December 2026.",
};

export default function CeoTimelinePage() {
  return <Dashboard initialTab="CEO timeline" />;
}
