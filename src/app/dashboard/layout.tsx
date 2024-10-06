// app/dashboard/layout.tsx
import { AuthProvider } from "../context/AuthContext"; // Importa el AuthProvider
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children} {/* Aquí es donde se renderizan las páginas del dashboard */}
    </AuthProvider>
  );
}
