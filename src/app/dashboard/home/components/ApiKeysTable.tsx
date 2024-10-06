"use client";

import styles from "@/app/styles/dashboard.module.css";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../../../../../firebase";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { SignJWT } from "jose";
import Image from "next/image";

const ApiKeysTable = () => {
  const [dataApiKey, setDataApikey] = useState(null); // Estado para almacenar la API Key
  const [user_data, setUserData] = useState(null); // Estado para almacenar la API Key
  const [loadingApiKey, setLoadingApiKey] = useState(false); // Estado para manejar la carga
  const [loadingGT, setLoadingGToken] = useState(false); // Estado para manejar la carga
  const [newToken, setNewToken] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [tokenList, setTokenList] = useState([]); // Lista de tokens generados
  const [selectedValidity, setSelectedValidity] = useState(""); // Estado para la validez seleccionada

  // Función para consultar los tokens por apiKey y actualizar el estado
  const getTokensByApiKey = useCallback(async (apiKey) => {
    const q = query(
      collection(db, "user_tokens"),
      where("apiKey", "==", apiKey)
    );
    try {
      const querySnapshot = await getDocs(q);
      const tokens = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          token: data.token,
          createdAt: data.createdAt.toDate(), // Convertimos a formato de fecha
          expiresAt: data.expiresAt.toDate(), // Convertimos a formato de fecha
        };
      });
      setTokenList(tokens); // Actualizamos la lista de tokens en el estado
      console.log("Tokens obtenidos:", tokens);
    } catch (error) {
      console.error("Error al obtener los tokens:", error);
    }
  }, []);

  // Función para consultar la API Key del usuario
  const getUserApiKey = useCallback(
    async (user) => {
      try {
        const { uid } = user;
        const apiKeyRef = doc(db, "user_apiKeys", uid);
        const apiKeyDoc = await getDoc(apiKeyRef);

        if (apiKeyDoc.exists()) {
          const apiKeyData = apiKeyDoc.data();
          console.log(apiKeyData);
          setDataApikey(apiKeyData); // Actualizamos el estado con la API Key obtenida
          setLoadingApiKey(false); // Desactivamos el indicador de carga
          getTokensByApiKey(apiKeyData.apiKey); // Llamamos a la función para obtener los tokens de esta API Key
        } else {
          console.log("No se encontró API Key para este usuario.");
          setDataApikey(null);
          setError("No se encontró API Key para este usuario.");
          setLoadingApiKey(false); // Desactivamos el indicador de carga
        }
      } catch (error) {
        console.error("Error al obtener la API Key:", error);
        setError(error);
        setLoadingApiKey(false); // Desactivamos el indicador de carga
      }
    },
    [getTokensByApiKey]
  );

  const generateApi = async () => {
    try {
      const api_key = generateApiKey();
      const apiKeyData = {
        apiKey: api_key,
        userId: user_data.uid, // UID del usuario de Firebase
        status: "active",
        createdAt: Timestamp.now(),
        lastUsedAt: null, // Inicialmente no se ha usado
      };
      await setDoc(doc(db, "user_apiKeys", user_data.uid), apiKeyData);
      setDataApikey(apiKeyData);
      console.log();
    } catch (error) {
      console.log(error, "Error al generar el apiKey del usuario");
    }
  };
  // Función para generar el token‰
  async function generateToken() {
    if (!dataApiKey?.apiKey) {
      return alert("No existe un apiKey valido");
    }
    let expirationTime;
    switch (selectedValidity) {
      case "1d":
        expirationTime = "24h";
        break;
      case "1w":
        expirationTime = "168h"; // 1 semana = 7 días = 168 horas
        break;
      case "1m":
        expirationTime = "720h"; // Aproximadamente 30 días = 720 horas
        break;
      default:
        return alert("Por favor selecciona un período de validez válido.");
    }

    setLoadingGToken(true);
    const secretKey = new TextEncoder().encode("s3cr3tK3y!@#2024"); // Clave secreta
    const payload = {
      user: user_data.email, // Datos del usuario (pueden variar según tu aplicación)
      apiKey: dataApiKey.apiKey,
    };

    // Definir la duración del token según la selección del usuario

    try {
      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime(expirationTime)
        .sign(secretKey);

      // Crear un objeto con el token generado y las fechas
      const tokenInfo = {
        token,
        createdAt: new Date(),
        expiresAt: new Date(
          Date.now() + convertToMilliseconds(selectedValidity)
        ),
        apiKey: dataApiKey.apiKey,
      };

      setTokenList([...tokenList, tokenInfo]); // Añadir el token a la lista
      setLoadingGToken(false);

      await addDoc(collection(db, "user_tokens"), tokenInfo);
      console.log("API Key generada y almacenada:", tokenInfo);
      setNewToken(false);
    } catch (error) {
      console.error("Error al generar el token:", error);
    }
  }

  // Función para copiar el token al portapapeles
  const copyToClipboard = (token: string) => {
    navigator.clipboard.writeText(token);
    alert("Token copiado al portapapeles");
  };

  // Escucha en tiempo real de la autenticación del usuario
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserApiKey(user); // Si el usuario está autenticado, obtener la API Key
        setUserData(user);
      } else {
        console.log("No hay usuario autenticado.");
        setDataApikey(null); // Limpia el estado si el usuario no está autenticado
      }
    });
    return () => unsubscribe();
  }, [getUserApiKey]);

  // Función para convertir tiempo en formato "1d", "1w", "1m" a milisegundos
  const convertToMilliseconds = (time: string): number => {
    const timeValue = parseInt(time.slice(0, -1), 10);
    const timeUnit = time.slice(-1);

    switch (timeUnit) {
      case "d":
        return timeValue * 24 * 60 * 60 * 1000; // días a milisegundos
      case "w":
        return timeValue * 7 * 24 * 60 * 60 * 1000; // semanas a milisegundos
      case "m":
        return timeValue * 30 * 24 * 60 * 60 * 1000; // meses a milisegundos (aproximado)
      default:
        throw new Error("Unidad de tiempo no válida");
    }
  };

  const truncateToken = (token) => {
    return token.length > 15
      ? token.slice(0, 10) + "..." + token.slice(-5)
      : token;
  };

  // Función para generar una API Key
  function generateApiKey() {
    return "cl_" + Math.random().toString(36).substr(2, 18);
  }

  return (
    <>
      <div className={styles.apiKeysContainer}>
        <h2>Tu API Key</h2>
        {!loadingApiKey && (
          <pre className={styles.code}>
            {dataApiKey && dataApiKey.apiKey}
            {!dataApiKey && error && `Error al cargar la API Key del usuario`}
            {/* {loading &&  ? "Cargando..." : }
          {!loading && error && `Error al cargar la API Key: ${error.message}`}
          {!loading &&
            !error &&
            !apiKey &&
            "No se encontró una API Key para este usuario."} */}
          </pre>
        )}
        {!loadingApiKey && !dataApiKey && (
          <button className={styles.generateBtn} onClick={() => generateApi()}>
            Crear APIkey
          </button>
        )}
      </div>
      <div className={styles.apiKeysContainer}>
        <h2>Tus Tokens</h2>
        <p>Administra tus token para peticiones</p>

        <div className={styles.table_container}>
          <table className={styles.apiKeysTable}>
            <thead>
              <tr>
                <th>API Token</th>
                <th>Registro</th>
                <th>Expiración</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tokenList.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    No hay tokens generados para esta API Key.
                  </td>
                </tr>
              ) : (
                tokenList.map((key) => (
                  <tr key={key.token}>
                    <td title={key.token}>{truncateToken(key.token)}</td>
                    <td>{key.createdAt.toLocaleString()}</td>
                    <td>{key.expiresAt.toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => copyToClipboard(key.token)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outlineColor: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          color: "#000",
                          cursor: "pointer",
                        }}
                      >
                        <Image
                          width={20}
                          height={20}
                          src="/clip.svg"
                          alt="Loader"
                        />
                        Copiar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <button
          className={styles.generateBtn}
          onClick={() => setNewToken(true)}
        >
          Generar Nueva API Key
        </button>
      </div>
      {newToken && (
        <div className={styles.apiKeysContainer}>
          <h2>Genera un Nuevo TokenApi</h2>
          <p>Complete el formulario para generar TokenAPI</p>

          <div className={styles.generate_token_header}>
            <select
              value={selectedValidity}
              onChange={(e) => setSelectedValidity(e.target.value)}
              className={styles.input_data_number}
            >
              <option value="">Selecciona la validez del token</option>
              <option value="1d">1 Día</option>
              <option value="1w">1 Semana</option>
              <option value="1m">1 Mes</option>
            </select>

            {/* Botón para generar el token */}
            <button
              onClick={() => generateToken()}
              disabled={loadingGT}
              className={styles.btn_primary}
            >
              {loadingGT ? "Generando Token..." : "Generar Token"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ApiKeysTable;
