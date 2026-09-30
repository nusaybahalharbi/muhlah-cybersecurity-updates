import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Cybersecurity Weekly Progress | Muhlah",
  description: "Muhlah’s weekly cybersecurity delivery, procurement and governance updates.",
};

export default function WeeklyProgressPage() {
  return <Dashboard initialTab="Weekly progress" />;
}
