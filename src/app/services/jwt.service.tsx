import { jwtVerify } from "jose";

async function validateToken(token: string) {
  const secretKey = new TextEncoder().encode("s3cr3tK3y!@#2024");

  try {
    const { payload, protectedHeader } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    console.log("Token válido. Payload:", payload);
    console.log("Protected header:", protectedHeader);

    return { valid: true, payload, protectedHeader };
  } catch (error) {
    console.error("Error al validar el token:", error);

    if (error.code === "ERR_JWT_EXPIRED") {
      return { valid: false, error: "Token expirado" };
    } else {
      return { valid: false, error: "Token inválido" };
    }
  }
}

export { validateToken };
