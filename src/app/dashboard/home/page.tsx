"use client";
// app/dashboard/home/page.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Importa el hook de autenticación
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "./../../../../firebase";
import styles from "@/app/styles/dashboard.module.css";
import ApiKeysTable from "./components/ApiKeysTable";
import PaymentsTable from "./components/PaymentsTable";
import Image from "next/image";

const HomePage = () => {
  const { user, loading } = useAuth();
  const [defaultView, setDefaultView] = useState("api");
  const router = useRouter();

  const handleViewApi = () => {
    setDefaultView("api");
  };

  const handleViewPayment = () => {
    setDefaultView("payments");
  };
  // Función para cerrar sesión
  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("Sesión cerrada correctamente");

      document.cookie = `firebaseToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      // Aquí puedes redirigir al usuario a la página de login o inicio
      window.location.href = "/dashboard/auth"; // Cambia la ruta según tu aplicación
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      // Si no hay usuario y ya terminó de cargar, redirigir al login
      router.push("/dashboard/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.page_dashboard}>
      <div className={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/logo.png" width={30} height={30} alt="Logo"></Image>
          <h3>Dashboard</h3>
        </div>
        <button className={styles.btn_primary} onClick={() => handleLogout()}>
          Cerrar sesión
        </button>
      </div>
      <div className={styles.control_view}>
        <div className={styles.buttons}>
          <button
            className={`${styles.btn_view} ${
              defaultView === "api" ? styles.active : ""
            }`}
            onClick={() => handleViewApi()}
          >
            API Keys
          </button>
          <button
            className={`${styles.btn_view} ${
              defaultView === "payments" ? styles.active : ""
            }`}
            onClick={() => handleViewPayment()}
          >
            Pagos
          </button>
        </div>
        {defaultView === "api" && <ApiKeysTable />}
        {defaultView === "payments" && <PaymentsTable />}
      </div>
    </div>
  );
};

export default HomePage;
