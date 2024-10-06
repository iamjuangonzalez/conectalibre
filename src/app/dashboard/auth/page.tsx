"use client";
import React, { useState } from "react";
import styles from "@/app/styles/login.module.css"; // Reutiliza estilos si es necesario
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../../firebase"; // Importa tu configuración de Firebase
import Image from "next/image";
import loader from "@/public/loader.svg";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [laoding, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [view, setView] = useState("login");

  const router = useRouter();

  // Función para generar una API Key
  function generateApiKey() {
    return "cl_" + Math.random().toString(36).substr(2, 18);
  }

  const handleView = (view: string) => {
    setError("");
    setEmail("");
    setPassword("");
    setView(view);
  };

  const handleLogin = async (e: React.FormEvent) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        const token = await response.user.getIdToken();
        // Establecer la cookie del token en el navegador
        document.cookie = `firebaseToken=${token}; path=/`;

        // Redirigir al dashboard
        setLoading(false);
        router.push("/dashboard/home");
      }
    } catch (error) {
      console.log(error, "Error");
      setLoading(false);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };
  const handleRegister = async (e: React.FormEvent) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response) {
        const apiKey = generateApiKey();
        const token = await response.user.getIdToken();
        // Establecer la cookie del token en el navegador
        document.cookie = `firebaseToken=${token}; path=/`;
        // Datos para almacenar en Firestore
        const apiKeyData = {
          apiKey: apiKey,
          userId: response.user.uid, // UID del usuario de Firebase
          status: "active",
          createdAt: Timestamp.now(),
          lastUsedAt: null, // Inicialmente no se ha usado
        };
        await setDoc(doc(db, "user_apiKeys", response.user.uid), apiKeyData);
        console.log("API Key generada y almacenada:", apiKey);
        setLoading(false);
        // Redirigir al dashboard
        router.push("/dashboard/home");
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "Error");
      setError("Error al registrar tus datos, intenta nuevamente");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const token = await result.user.getIdToken();
        // Establecer la cookie del token en el navegador
        document.cookie = `firebaseToken=${token}; path=/`;
        router.push("/dashboard/home");
      }

      // Redirigir a la página de inicio del dashboard
    } catch (error) {
      console.error("Error en el inicio de sesión con Google:", error);
    }
  };

  return (
    <div className={styles.page_login}>
      <div className={styles.content_login}>
        <Image src="/logo.png" alt="" width={40} height={40} />

        {view == "login" && (
          <div className={styles.card_login}>
            <div className={styles.header}>
              <h2>Iniciar Sesión</h2>
              <small style={{ color: "#000" }}>
                Ingresa tus credenciales para acceder
              </small>
            </div>
            <div>
              <button
                className={styles.btn_google}
                onClick={() => handleGoogleLogin()}
                type="button"
              >
                <Image
                  src="/google.svg"
                  width={34}
                  height={34}
                  alt="Google"
                ></Image>
                Iniciar con Google
              </button>
            </div>
            <form onSubmit={handleLogin} className={styles.card_form}>
              <div className={styles.content}>
                <label className={styles.label} htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  className={styles.input_data_number}
                  type="email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo electrónico"
                  required
                />
              </div>
              <div className={styles.content}>
                <label className={styles.label} htmlFor="password">
                  Contraseña
                </label>
                <input
                  className={styles.input_data_number}
                  type="password"
                  autoComplete="off"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              {error && <p>{error}</p>}
              <div className={styles.buttons_form}>
                <button className={styles.btn_primary} type="submit">
                  {laoding ? (
                    <Image width={22} height={22} src={loader} alt="Loader" />
                  ) : (
                    "Iniciar sesión"
                  )}
                </button>
                <button
                  className={styles.btn_secundary}
                  type="button"
                  onClick={() => handleView("register")}
                >
                  Registrarte
                </button>
                <a
                  style={{
                    color: "#000",
                    textAlign: "center",
                    textDecoration: "underline",
                  }}
                  href="/consulta-profesionales-salud"
                >
                  Volver al inicio
                </a>
              </div>
            </form>
          </div>
        )}
        {view == "register" && (
          <div className={styles.card_login}>
            <div className={styles.header}>
              <h2>Registrarte</h2>
              <small style={{ color: "#000" }}>
                Ingresa tus datos para registrarte en conectalibre
              </small>
            </div>
            <form onSubmit={handleRegister} className={styles.card_form}>
              <div className={styles.content}>
                <label className={styles.label} htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  className={styles.input_data_number}
                  type="email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo electrónico"
                  required
                />
              </div>
              <div className={styles.content}>
                <label className={styles.label} htmlFor="password">
                  Contraseña
                </label>
                <input
                  className={styles.input_data_number}
                  type="password"
                  autoComplete="off"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              {error && <p>{error}</p>}
              <div className={styles.buttons_form}>
                <button className={styles.btn_primary} type="submit">
                  {laoding ? (
                    <Image width={22} height={22} src={loader} alt="Loader" />
                  ) : (
                    "Registrarte"
                  )}
                </button>
                <button
                  className={styles.btn_secundary}
                  type="button"
                  onClick={() => handleView("login")}
                >
                  Iniciar sesión
                </button>
              </div>
              <a
                style={{
                  color: "#000",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
                href="/consulta-profesionales-salud"
              >
                Volver al inicio
              </a>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
