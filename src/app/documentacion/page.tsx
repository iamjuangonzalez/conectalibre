// app/documentation/page.tsx
"use client";
import styles from "@/app/styles/documentation.module.css"; // Reutiliza estilos si es necesario
import { useState } from "react";
import { SignJWT } from "jose";

export default function Documentation() {
  const [defaultView, setDefaultView] = useState("api");
  const [isToken, setIsToken] = useState(null);
  const [tokenG, setTokenG] = useState(null);
  const [api_key, setInputKey] = useState(null);

  const handleViewApi = (view: string) => {
    if (view === "api") {
      setDefaultView("api");
    }
  };

  const api_key_validates = [
    "1",
    "sk_test_51ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_98765432109876543210987654321098765",
    "api_key_987654321abcdefghijklmnopqrstuvwxyz",
    "sk_test_52ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_87654321098765432109876543210987654",
    "api_key_876543210abcdefghijklmnopqrstuvwxyz",
    "sk_test_53ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_76543210987654321098765432109876543",
    "api_key_765432109abcdefghijklmnopqrstuvwxyz",
    "sk_test_54ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_65432109876543210987654321098765432",
    "api_key_654321098abcdefghijklmnopqrstuvwxyz",
    "sk_test_55ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_54321098765432109876543210987654321",
    "api_key_543210987abcdefghijklmnopqrstuvwxyz",
    "sk_test_56ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_43210987654321098765432109876543210",
    "api_key_432109876abcdefghijklmnopqrstuvwxyz",
    "sk_test_57ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_32109876543210987654321098765432109",
    "api_key_321098765abcdefghijklmnopqrstuvwxyz",
    "sk_test_58ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_21098765432109876543210987654321098",
    "api_key_210987654abcdefghijklmnopqrstuvwxyz",
    "sk_test_59ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_10987654321098765432109876543210987",
    "api_key_109876543abcdefghijklmnopqrstuvwxyz",
    "sk_test_60ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_09876543210987654321098765432109876",
    "api_key_098765432abcdefghijklmnopqrstuvwxyz",
    "sk_test_61ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_98765432109876543210987654321098765",
    "api_key_987654321abcdefghijklmnopqrstuvwxyz",
    "sk_test_62ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_87654321098765432109876543210987654",
    "api_key_876543210abcdefghijklmnopqrstuvwxyz",
    "sk_test_63ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_76543210987654321098765432109876543",
    "api_key_765432109abcdefghijklmnopqrstuvwxyz",
    "sk_test_64ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_65432109876543210987654321098765432",
    "api_key_654321098abcdefghijklmnopqrstuvwxyz",
    "sk_test_65ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_54321098765432109876543210987654321",
    "api_key_543210987abcdefghijklmnopqrstuvwxyz",
    "sk_test_66ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_43210987654321098765432109876543210",
    "api_key_432109876abcdefghijklmnopqrstuvwxyz",
    "sk_test_67ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_32109876543210987654321098765432109",
    "api_key_321098765abcdefghijklmnopqrstuvwxyz",
    "sk_test_68ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_21098765432109876543210987654321098",
    "api_key_210987654abcdefghijklmnopqrstuvwxyz",
    "sk_test_69ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_10987654321098765432109876543210987",
    "api_key_109876543abcdefghijklmnopqrstuvwxyz",
    "sk_test_70ABCDEfghijklmnopqrstuvwxyz0123456789",
    "pk_live_09876543210987654321098765432109876",
    "api_key_098765432abcdefghijklmnopqrstuvwxyz",
  ];

  // Función para generar el token
  async function generateToken() {
    if (!api_key) {
      return alert("Ingresa un apiKey válido");
    }

    // Asegurarse de validar correctamente la API key
    const validateKey = validateApiKey();

    if (!validateKey) {
      return alert("La apiKey proporcionada no es válida");
    }

    const secretKey = new TextEncoder().encode("s3cr3tK3y!@#2024"); // Clave secreta
    // El payload debe ser un objeto
    const payload = {
      user: "Juan Pérez", // Datos que quieras incluir
      role: "admin",
      api_key,
    };

    try {
      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("188h")
        .sign(secretKey);

      setIsToken(true);
      setTokenG(token);
      return token;
    } catch (error) {
      console.error("Error al generar el token:", error);
      throw error;
    }
  }

  const handleViewToken = (view: string) => {
    if (view === "token") {
      setDefaultView("token");
    }
  };

  const validateApiKey = () => {
    return api_key_validates.includes(api_key);
  };

  return (
    <div className={styles.content_documentation}>
      <div className={styles.navigation}>
        <button
          className={`${styles.btn_view} ${
            defaultView === "token" ? styles.active : ""
          }`}
          onClick={() => handleViewApi("api")}
        >
          Conexión a la API
        </button>
        <button
          className={`${styles.btn_view} ${
            defaultView === "api" ? styles.active : ""
          }`}
          onClick={() => handleViewToken("token")}
        >
          Generación de Token
        </button>
      </div>
      {defaultView == "api" && (
        <div className={styles.card_form}>
          <div className={styles.content_header}>
            <p>Conexión a la API</p>
            <small style={{ fontSize: 12, color: "#7F7F7F" }}>
              Aprende cómo conectarte a nuestra API RESTful
            </small>
          </div>
          <div className={styles.content}>
            <div className={styles.item_content}>
              <label style={{ fontWeight: 600 }} htmlFor="">
                Endpoint Base
              </label>
              <code className={styles.code}>
                https://conectalibre.vercel.app/api
              </code>
            </div>
            <div className={styles.item_content}>
              <label style={{ fontWeight: 600 }} htmlFor="">
                Autenticación
              </label>
              <label
                style={{ fontSize: 12, color: "#7F7F7F" }}
                className={styles.label}
              >
                Todas las solicitudes deben incluir un token de autenticación en
                el encabezado:
              </label>
              <code>Authorization: Bearer YOUR_TOKEN_HERE</code>
            </div>
            <div className={styles.item_content}>
              <label style={{ fontWeight: 600 }} htmlFor="">
                Ejemplo de Solicitud
              </label>
              <code className={styles.code}>POST /hello</code>
            </div>
            <div className={styles.item_content}>
              <label style={{ fontWeight: 600 }} htmlFor="">
                Body de la solicitud (JSON):
              </label>
              <pre className={styles.code}>
                {`{
"tipoDocumento": "CC",
"numeroDocumento": "1234567890"
}`}
              </pre>
            </div>
            <div className={styles.item_content}>
              <label style={{ fontWeight: 600 }} htmlFor="">
                Tipos de documento
              </label>
              <pre className={styles.code}>
                {`{
  "CC": "Cédula de ciudadanía",
  "TI": "Tarjeta de identidad",
  "CE": "Cédula de extranjería",
  "PT": "Permisos por protección temporal"
}`}
              </pre>
            </div>
            <div className={styles.item_content}>
              <label style={{ fontWeight: 600 }} htmlFor="">
                Ejemplo de Respuesta
              </label>
              <pre className={styles.code}>
                {`{
"message": "Consulta realizada",
"data": {
  "info_basic": {
    "tipoIdentificacion": "CC",
    "nroIdentificacion": "123456789",
    "primerNombre": "JUAN",
    "segundoNombre": "CARLOS",
    "primerApellido": "PEREZ",
    "segundoApellido": "GOMEZ",
    "estadoIdentificacion": "Vigente"
  },
  "info_academic": 
  [
    {
      "tipoPrograma": "UNV",
      "origenObtencion": "Local",
      "profesion": "MEDICINA",
      "fechaInicioEjercer": "2000-01-01",
      "actoAdministrativo": "12345",
      "entidadReportadora": "UNIVERSIDAD NACIONAL"
    }
  ],
  "info_sso": 
  [
    {
      "tipoPrestacion": "Presto SSO",
      "tipoLugarPrestacion": "Local",
      "lugarPrestacion": "COLOMBIA|BOGOTA|CHAPINERO",
      "fechaInicio": "2010-10-10",
      "fechaFin": "2015-10-10",
      "modalidadPrestacion": "Prestación de Servicios Profesionales de Salud en IPS Habilitada",
      "programaPrestacion": "Medicina",
      "entidadReportadora": "HOSPITAL SAN JOSE"
    }
  ],
  "mensaje": 
  "La información dispuesta se encuentra en proceso de actualización de conformidad con lo señalado por el Ministerio de Salud y Protección Social. El talento humano en salud puede continuar ejerciendo su profesión u ocupación del área de la salud, presentando los documentos que acreditaron el cumplimiento de los requisitos que se encontraban vigentes (Resolución de autorización de ejercicio en todo el territorio nacional, expedida por este Ministerio o por una Secretaría de Salud, y según la profesión, tarjeta profesional, matrícula profesional, etc.)."
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
      {defaultView == "token" && (
        <div className={styles.card_form}>
          <div className={styles.content_header}>
            <p>Generación de Token</p>
            <small style={{ fontSize: 12, color: "#7F7F7F" }}>
              Genera un token de autenticación para usar la API
            </small>
          </div>
          <div className={styles.content}>
            <div className={styles.item_content}>
              <label style={{ fontWeight: 600 }} htmlFor="">
                API Key
              </label>
              <input
                className={styles.input_data_number}
                type="text"
                maxLength={64}
                minLength={30}
                placeholder="Ingrese su api Key"
                defaultValue={api_key}
                onChange={(e) => setInputKey(e.target.value)}
              />
              <button
                className={styles.btn_generator_token}
                onClick={() => generateToken()}
              >
                Generar token
              </button>
            </div>
            {isToken && tokenG && (
              <div className={styles.item_content}>
                <label style={{ fontWeight: 600 }} htmlFor="">
                  Token generado
                </label>
                <pre className={styles.code}>{tokenG}</pre>
                <span style={{ fontSize: 12, color: "#7F7F7F" }}>
                  Este token es válido por 24 horas. Úsalo en el encabezado de
                  tus solicitudes a la API.
                </span>
              </div>
            )}
            <div className={styles.item_content}>
              <label style={{ fontWeight: 600 }} htmlFor="">
                Autenticación
              </label>
              <label
                style={{ fontSize: 12, color: "#7F7F7F" }}
                className={styles.label}
              >
                Todas las solicitudes deben incluir un token de autenticación en
                el encabezado:
              </label>
              <code>Authorization: Bearer YOUR_TOKEN_HERE</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
