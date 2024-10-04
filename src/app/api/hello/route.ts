// pages/api/hello.js
import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { validateToken } from "@/app/services/jwt.service";

const allowedMethods = ["GET", "POST", "OPTIONS"];
const allowedHeaders = ["Content-Type", "Authorization"];

function getHeaders() {
  const headers = new Headers();
  // Obtener el origen de la solicitud
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", allowedMethods.join(","));
  headers.set("Access-Control-Allow-Headers", allowedHeaders.join(","));
  return headers;
}

export async function GET() {
  const headers = getHeaders();
  return NextResponse.json({ message: "Hola mundo" }, { headers });
}

export async function OPTIONS() {
  const headers = getHeaders();
  return new NextResponse(null, { status: 204, headers });
}

/* eslint-disable @typescript-eslint/no-explicit-any */

//
const generateRandomNumberString = () => {
  return (Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000).toString();
};

// Get ViewStateInitial
const getViewStateInitial = async () => {
  try {
    // URL de la página inicial donde obtendremos __VIEWSTATE y __EVENTVALIDATION
    const url =
      "https://web.sispro.gov.co/THS/Cliente/ConsultasPublicas/ConsultaPublicaDeTHxIdentificacion.aspx";

    // Hacemos la solicitud GET y esperamos la respuesta
    const response = await axios.get(url);

    // Usamos cheerio para cargar el HTML y extraer el valor de __VIEWSTATE
    const $ = cheerio.load(response.data);
    const viewState = $('input[name="__VIEWSTATE"]').val();

    // Retornamos el valor de __VIEWSTATE
    return viewState;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    throw error;
  }
};

// pages/api/hello.js
export async function POST(req: Request) {
  const headers = getHeaders();

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse(
      JSON.stringify({ error: "Falta el token de autorización" }),
      {
        status: 401,
        headers,
      }
    );
  }
  const token = authHeader.split(" ")[1];

  const result = await validateToken(token);
  if (!result.valid) {
    console.log("El token no es válido:", result.error);
    return new NextResponse(
      JSON.stringify({
        message: "El token no es válido:",
        error: result.error,
      }),
      {
        status: 401,
        headers,
      }
    );
  }

  if (req.method === "POST") {
    console.log("Probando");
    const body = await req.json();
    const { numeroDocumento, tipoDocumento } = body;

    if (!numeroDocumento && !tipoDocumento) {
      return NextResponse.json(
        {
          mensaje: "Error en la consulta, revisa los campos de la petición",
          success: false,
        },
        { status: 500 }
      );
    }

    try {
      const __VIEWSTATE = await getViewStateInitial();
      const formData = new FormData();
      // Agregar propiedades al FormData
      formData.append(
        "ctl00$tlkScriptManager",
        "ctl00$cntContenido$updIdentificationOperations|ctl00$cntContenido$btnVerificarIdentificacion"
      );
      formData.append(
        "ctl00$cntContenido$btnVerificarIdentificacion",
        "Verificar Registro en ReTHUS"
      );
      formData.append(
        "ctl00$cntContenido$ddlTipoIdentificacion",
        tipoDocumento
      ); // Tipo de documento (CC, TI, etc.)
      formData.append(
        "ctl00$cntContenido$txtNumeroIdentificacion",
        numeroDocumento
      ); // Número de identificación
      formData.append(
        "ctl00$cntContenido$txtCatpchaConfirmation",
        generateRandomNumberString()
      );
      formData.append("__ASYNCPOST", "false");
      formData.append("__SCROLLPOSITIONY", "0");
      formData.append("__SCROLLPOSITIONX", "0");
      formData.append("__VIEWSTATEGENERATOR", "FF52F6F0");

      formData.append("__VIEWSTATE", __VIEWSTATE);

      const url_consult =
        "https://web.sispro.gov.co/THS/Cliente/ConsultasPublicas/ConsultaPublicaDeTHxIdentificacion.aspx";

      const response = await axios.post(url_consult, formData, {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>", // ajusta según lo que necesites
          Cookie: "cookiesession1=678A3EA5BEB4B42BD5A72F3758CD86AF",
          Accept: "*/*",
        },
      });
      const $ = cheerio.load(response.data);

      console.log("Probando x2");

      const newViewState = $('input[name="__VIEWSTATE"]').val();
      formData.delete("__VIEWSTATE");
      formData.append("__VIEWSTATE", newViewState);
      formData.delete("ctl00$cntContenido$btnVerificarIdentificacion");
      formData.delete("ctl00$tlkScriptManager");
      formData.append(
        "ctl00$tlkScriptManager",
        "ctl00$cntContenido$uPnlResultadoBasico|ctl00$cntContenido$grdResultadosBasicos$ctl02$LinkButton1"
      );
      formData.append(
        "__EVENTTARGET",
        "ctl00$cntContenido$grdResultadosBasicos$ctl02$LinkButton1"
      );

      const res = await axios.post(url_consult, formData, {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>", // ajusta según lo que necesites
          Cookie: "cookiesession1=678A3EA5BEB4B42BD5A72F3758CD86AF",
          Accept: "*/*",
        },
      });
      console.log("Probando x3");
      const $_1 = cheerio.load(res.data);

      // Extraer la tabla de resultados básicos
      const resultInfoBasic = [];
      const basicResultTable = $_1("#ctl00_cntContenido_grdResultadosBasicos");
      if (basicResultTable.length > 0) {
        const rows = basicResultTable.find("tr");
        rows.each(function () {
          const columns = $(this).find("td");
          if (columns.length > 0) {
            const rowData = {
              tipoIdentificacion: columns.eq(0).text().trim(),
              nroIdentificacion: columns.eq(1).text().trim(),
              primerNombre: columns.eq(2).text().trim(),
              segundoNombre: columns.eq(3).text().trim(),
              primerApellido: columns.eq(4).text().trim(),
              segundoApellido: columns.eq(5).text().trim(),
              estadoIdentificacion: columns.eq(6).text().trim(),
            };

            resultInfoBasic.push(rowData);
          }
        });
      } else {
        console.log("No se encontró la tabla de resultados básicos.");
      }

      // Obtencion de la informacion academica
      const academicResultsTable = $_1(
        "#ctl00_cntContenido_grdResultadosAcademicos"
      );

      const resultAcademicos = [];
      if (academicResultsTable) {
        const rows = academicResultsTable.find("tr");

        rows.each(function () {
          const columns = $(this).find("td");
          if (columns.length > 0) {
            const rowData = {
              tipoPrograma: columns.eq(0).text().trim(),
              origenObtencion: columns.eq(1).text().trim(),
              profesion: columns.eq(2).text().trim(),
              fechaInicioEjercer: columns.eq(3).text().trim(),
              actoAdministrativo: columns.eq(4).text().trim(),
              entidadReportadora: columns.eq(5).text().trim(),
            };

            resultAcademicos.push(rowData);
          }
        });
      }

      console.log("Probando x4");
      // Obtencion de los datos SSO
      const ssoTable = $_1("#ctl00_cntContenido_grdDatosSSO");
      const resultsSSO = [];
      if (ssoTable) {
        const rows = ssoTable.find("tr");

        rows.each(function () {
          const columns = $(this).find("td");
          if (columns.length > 0) {
            const rowData = {
              tipoPrestacion: columns.eq(0).text().trim(),
              tipoLugarPrestacion: columns.eq(1).text().trim(),
              lugarPrestacion: columns.eq(2).text().trim(),
              fechaInicio: columns.eq(3).text().trim(),
              fechaFin: columns.eq(4).text().trim(),
              modalidadPrestacion: columns.eq(5).text().trim(),
              programaPrestacion: columns.eq(6).text().trim(),
              entidadReportadora: columns.eq(7).text().trim(),
            };

            resultsSSO.push(rowData);
          }
        });
      }

      return NextResponse.json(
        {
          message: "Consulta realizada",
          data: {
            info_basic:
              resultInfoBasic.length > 0 ? resultInfoBasic[0] : undefined,
            info_academic:
              resultAcademicos.length > 0 ? resultAcademicos : undefined,
            info_sso: resultsSSO.length > 0 ? resultsSSO : undefined,
            mensaje:
              "La información dispuesta se encuentra en proceso de actualización de conformidad con lo señalado por el Ministerio de Salud y Protección Social. El talento humano en salud puede continuar ejerciendo su profesión u ocupación del área de la salud, presentando los documentos que acreditaron el cumplimiento de los requisitos que se encontraban vigentes (Resolución de autorización de ejercicio en todo el territorio nacional, expedida por este Ministerio o por una Secretaría de Salud, y según la profesión, tarjeta profesional, matrícula profesional, etc.).",
          },
          success: true,
        },
        { status: 200, headers }
      );
    } catch (error) {
      console.error("Error al hacer la consulta:", error);
      return NextResponse.json(
        { mensaje: "Error en la consulta", error, success: false },
        { status: 500, headers }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Método no permitido" },
      { status: 405 }
    );
  }
}
