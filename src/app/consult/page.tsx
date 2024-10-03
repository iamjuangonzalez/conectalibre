// pages/index.js
"use client";
import { useState } from "react";
import styles from "@/app/page.module.css";
import loader from "@/public/loader.svg";
import Image from "next/image";

export default function Home() {
  const [numeroDocumento, setNumer] = useState("");
  const [tipoDocumento, setDocumentType] = useState(""); // Declaración de documentType
  const [isLoading, setIsLoading] = useState(false);
  const [dataResponse, setDataResponse] = useState(null);
  const token_consult =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiSnVhbiBQw6lyZXoiLCJyb2xlIjoiYWRtaW4iLCJhcGlfa2V5IjoiMSIsImV4cCI6MTcyODUyMjIxOX0.UDJZ6P1sjt11966wiP6Ppur8xVlojZD0xRwbV2Zw2OM";

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDocumentType(e.target.value); // Uso de documentType
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      if (tipoDocumento === "")
        return alert("Debes seleccionar el tipo de documento");

      if (
        numeroDocumento === "" ||
        numeroDocumento === undefined ||
        numeroDocumento === null
      )
        return alert("Agrega una identificación valida");
      setIsLoading(true);
      e.preventDefault();
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_consult}`,
        },
        body: JSON.stringify({ numeroDocumento, tipoDocumento }), // Aquí envías el dato como JSON
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
              defaultValue={numeroDocumento}
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
          {!dataResponse.info_sso &&
            !dataResponse.info_academic &&
            !dataResponse.info_basic && (
              <div
                className={styles.error_message}
                style={{ marginTop: 20, textAlign: "center" }}
              >
                <p>No existe el usuario.</p>
              </div>
            )}

          {dataResponse.info_basic && (
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
          )}
          {dataResponse.info_academic && (
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
          {dataResponse.info_sso && (
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
