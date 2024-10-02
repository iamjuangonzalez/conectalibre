// pages/index.js
"use client";
import { useState } from "react";
import styles from "@/app/page.module.css";
import loader from "@/public/loader.svg";
import Image from "next/image";

export default function Home() {
  const [number, setNumer] = useState("");
  const [documentType, setDocumentType] = useState(""); // Declaración de documentType
  const [isLoading, setIsLoading] = useState(false);
  const [dataResponse, setDataResponse] = useState(null);
  const token_consult =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiSnVhbiBQw6lyZXoiLCJyb2xlIjoiYWRtaW4iLCJhcGlfa2V5IjoiMSIsImV4cCI6MTcyODUyMjIxOX0.UDJZ6P1sjt11966wiP6Ppur8xVlojZD0xRwbV2Zw2OM";

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDocumentType(e.target.value); // Uso de documentType
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      if (documentType === "")
        return alert("Debes seleccionar el tipo de documento");

      if (number === "" || number === undefined || number === null)
        return alert("Agrega una identificación valida");
      setIsLoading(true);
      e.preventDefault();
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_consult}`,
        },
        body: JSON.stringify({ number, documentType }), // Aquí envías el dato como JSON
      });

      const data = await res.json();
      if (data.success) {
        setDataResponse(data.data);
      }
    } catch (error) {
      console.log(error, "Error en la consulta");
    } finally {
      setIsLoading(false);
    }
  };

  /* const datafake = {
    primerNombre: "ALVARO",
    segundoNombre: "ENRIQUE",
    primerApellido: "SOLANO",
    segundoApellido: "BERRIO",
    nroIdentificacion: "6862949",
    estadoIdentificacion: "Vigente",
    tipo: "CC",
    fechaConsulta: "2024-09-30→10:25:22 AM",
    informacionAcademica: [
      {
        tipoPrograma: "UNV",
        origenObtencion: "Local",
        profesion: "MEDICINA",
        fechaInicioEjercer: "1981-04-22",
        actoAdministrativo: "3560",
        entidadReportadora: "COLEGIO MEDICO COLOMBIANO",
      },
      {
        tipoPrograma: "ESP",
        origenObtencion: "Local",
        profesion: "ESPECIALIZACION EN PSIQUIATRIA",
        fechaInicioEjercer: "1990-09-28",
        actoAdministrativo: "56923",
        entidadReportadora: "COLEGIO MEDICO COLOMBIANO",
      },
      {
        tipoPrograma: "ESP",
        origenObtencion: "Local",
        profesion: "ESPECIALIZACION EN PSIQUIATRIA",
        fechaInicioEjercer: "1990-09-28",
        actoAdministrativo: "56923",
        entidadReportadora: "COLEGIO MEDICO COLOMBIANO",
      },
      {
        tipoPrograma: "ESP",
        origenObtencion: "Local",
        profesion: "ESPECIALIZACION EN PSIQUIATRIA",
        fechaInicioEjercer: "1990-09-28",
        actoAdministrativo: "56923",
        entidadReportadora: "COLEGIO MEDICO COLOMBIANO",
      },
    ],
    datosSSO: [
      {
        tipoPrestacion: "Presto SSO",
        tipoLugarPrestacion: "Local",
        lugarPrestacion: "COLOMBIA|CÓRDOBA|CANALETE",
        fechaInicio: "1976-06-01",
        fechaFin: "1977-06-01",
        modalidadPrestacion:
          "Prestación de Servicios Profesionales de Salud en IPS Habilitada",
        programaPrestacion: "Medicina",
        entidadReportadora: "COLEGIO MEDICO COLOMBIANO",
      },
      {
        tipoPrestacion: "Presto SSO",
        tipoLugarPrestacion: "Local",
        lugarPrestacion: "COLOMBIA|CÓRDOBA|CANALETE",
        fechaInicio: "1976-06-01",
        fechaFin: "1977-06-01",
        modalidadPrestacion:
          "Prestación de Servicios Profesionales de Salud en IPS Habilitada",
        programaPrestacion: "Medicina",
        entidadReportadora: "COLEGIO MEDICO COLOMBIANO",
      },
      {
        tipoPrestacion: "Presto SSO",
        tipoLugarPrestacion: "Local",
        lugarPrestacion: "COLOMBIA|CÓRDOBA|CANALETE",
        fechaInicio: "1976-06-01",
        fechaFin: "1977-06-01",
        modalidadPrestacion:
          "Prestación de Servicios Profesionales de Salud en IPS Habilitada",
        programaPrestacion: "Medicina",
        entidadReportadora: "COLEGIO MEDICO COLOMBIANO",
      },
    ],
    mensaje:
      "La información dispuesta se encuentra en proceso de actualización de conformidad con lo señalado por el Ministerio de Salud y Protección Social. El talento humano en salud puede continuar ejerciendo su profesión u ocupación del área de la salud, presentando los documentos que acreditaron el cumplimiento de los requisitos que se encontraban vigentes (Resolución de autorización de ejercicio en todo el territorio nacional, expedida por este Ministerio o por una Secretaría de Salud, y según la profesión, tarjeta profesional, matrícula profesional, etc.).",
  }; */

  return (
    <div className={styles.content_container}>
      <div className={styles.card_form}>
        <div className={styles.card_header}>
          <h3>Consulta de Profesionales</h3>
          <small>Ingrese el número de cédula del profesional de la salud</small>
        </div>
        <form className={styles.card_body} onSubmit={handleSubmit}>
          <div className={styles.area_label}>
            <label htmlFor="type_document">Tipo de Documento</label>
            <select
              id="type_document"
              className={styles.input_data_number}
              defaultValue=""
              onChange={handleSelectChange}
            >
              <option disabled value="">
                Seleccione el tipo de documento
              </option>
              <option value="CC">Cédula de ciudadanía</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="CE">Cédula de extranjería</option>
              <option value="PT">Permisos por protección temporal</option>
            </select>
          </div>
          <div className={styles.area_label}>
            <label htmlFor="number">Número de Documento</label>
            <input
              className={styles.input_data_number}
              id="number"
              min={1}
              maxLength={12}
              type="number"
              value={number}
              onChange={(e) => setNumer(e.target.value)}
              placeholder="Número de Cédula"
            />
          </div>
          <button
            className={styles.send_form}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Image width={30} height={30} src={loader} alt="Loader" />
            ) : (
              "Buscar"
            )}
          </button>
        </form>
      </div>
      {/* <div className={styles.result_info}>
        <div className={styles.card_header}>
          <h3>Resultado de la Búsqueda</h3>
        </div>
        <div className={styles.more_content}>
          <h3>Informacion general</h3>
          <div className={styles.replace}>
            <div className={styles.content_item}>
              <label htmlFor="" style={{ fontWeight: "600" }}>
                Nombres
              </label>
              <span>
                {datafake?.primerNombre + " " + datafake?.segundoNombre}
              </span>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="" style={{ fontWeight: "600" }}>
                Apellidos
              </label>
              <span>
                {datafake?.primerApellido + " " + datafake?.segundoApellido}
              </span>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="" style={{ fontWeight: "600" }}>
                Identificación
              </label>
              <span>{datafake.nroIdentificacion + " " + datafake.tipo}</span>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="" style={{ fontWeight: "600" }}>
                Estado Id
              </label>
              <span>{datafake.estadoIdentificacion}</span>
            </div>
          </div>
        </div>
        <div className={styles.more_content}>
          <h3>Informacion academica</h3>
          <div className={styles.replace}>
            <div className={styles.content_item}>
              <label htmlFor="" style={{ fontWeight: "600" }}>
                Programa
              </label>
              <span>
                {datafake?.tipoPrograma}
              </span>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="" style={{ fontWeight: "600" }}>
                Obtención
              </label>
              <span>
                {datafake?.origenObtencion}
              </span>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="" style={{ fontWeight: "600" }}>
                Profesión
              </label>
              <span>
                {datafake?.profesion}
              </span>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="" style={{ fontWeight: "600" }}>
                Fecha Acto
              </label>
              <span>
                {datafake?.fechaInicioEjercer}
              </span>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="" style={{ fontWeight: "600" }}>
                Acto
              </label>
              <span>
                {datafake?.actoAdministrativo}
              </span>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="" style={{ fontWeight: "600" }}>
                Entidad
              </label>
              <span>
                {datafake?.entidadReportadora}
              </span>
            </div>
          </div>
        </div>
      </div> */}
      {dataResponse && !isLoading && (
        <>
          {dataResponse.info_sso.length === 0 &&
            dataResponse.info_academic.length === 0 &&
            dataResponse.info_basic.length === 0 && (
              <div
                className={styles.error_message}
                style={{ marginTop: 20, textAlign: "center" }}
              >
                <p>No existe el usuario.</p>
              </div>
            )}

          {dataResponse.info_basic.length > 0 ||
            (dataResponse.info_basic && (
              <div className={styles.table_wrapper}>
                <div className={styles.card_header}>
                  <h3>Resultado de la Búsqueda</h3>
                </div>
                <table className={styles.fl_table}>
                  <thead>
                    <tr>
                      <th>Nombres</th>
                      <th>Apellidos</th>
                      <th>Identificación</th>
                      <th>Estado Identificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {dataResponse?.info_basic?.primerNombre +
                          " " +
                          dataResponse?.info_basic?.segundoNombre}
                      </td>
                      <td>
                        {dataResponse?.info_basic?.primerApellido +
                          " " +
                          dataResponse?.info_basic?.segundoApellido}
                      </td>
                      <td>
                        {dataResponse?.info_basic?.tipoIdentificacion +
                          " " +
                          dataResponse?.info_basic?.nroIdentificacion}
                      </td>
                      <td>{dataResponse?.info_basic?.estadoIdentificacion}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          {dataResponse.info_academic.length > 0 && (
            <div className={styles.table_wrapper}>
              <div className={styles.card_header}>
                <h3>Información Académica</h3>
              </div>
              <table className={styles.fl_table}>
                <thead>
                  <tr>
                    <th>Programa</th>
                    <th>Obtención</th>
                    <th>Profesión</th>
                    <th>Fecha Acto</th>
                    <th>Acto</th>
                    <th>Entidad</th>
                  </tr>
                </thead>
                <tbody>
                  {dataResponse.info_academic.map((info, index) => (
                    <tr key={index}>
                      <td>{info.tipoPrograma}</td>
                      <td>{info.origenObtencion}</td>
                      <td>{info.profesion}</td>
                      <td>{info.fechaInicioEjercer}</td>
                      <td>{info.actoAdministrativo}</td>
                      <td>{info.entidadReportadora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {dataResponse.info_sso.length > 0 && (
            <div className={styles.table_wrapper}>
              <div className={styles.card_header}>
                <h3>Datos SSO</h3>
              </div>
              <table className={styles.fl_table}>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Lugar</th>
                    <th>Lugar</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Modalidad</th>
                    <th>Programa</th>
                    <th>Entidad</th>
                  </tr>
                </thead>
                <tbody>
                  {dataResponse?.info_sso.map((info, index) => (
                    <tr key={index}>
                      <td>{info.tipoPrestacion}</td>
                      <td>{info.tipoLugarPrestacion}</td>
                      <td>{info.lugarPrestacion}</td>
                      <td>{info.fechaInicio}</td>
                      <td>{info.fechaFin}</td>
                      <td>{info.modalidadPrestacion}</td>
                      <td>{info.programaPrestacion}</td>
                      <td>{info.entidadReportadora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
