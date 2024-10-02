import styles from "@/app/offCanvas.module.css"; // Asegúrate de importar los estilos CSS

const Offcanvas = ({ show, onClose, data_consult }) => {
  return (
    <div className={`${styles.offcanvas} ${show ? styles.show : ""}`}>
      <div className={styles.offcanvas_content}>
        <button onClick={onClose} className={styles.close_button}>
          &times;
        </button>
        <div className={styles.result_info}>
          <div className={styles.card_header}>
            <h3>Resultado de la Búsqueda</h3>
          </div>
          <div className={styles.card_body_info}>
            <div className={styles.content_value}>
              <label htmlFor="" style={{ fontWeight: 600 }}>
                Nombres
              </label>
              <span>
                {data_consult.primerNombre + " " + data_consult.segundoNombre}
              </span>
            </div>
            <div className={styles.content_value}>
              <label htmlFor="" style={{ fontWeight: 600 }}>
                Apellidos
              </label>
              <span>
                {data_consult.primerApellido + " " + data_consult.segundoApellido}
              </span>
            </div>
            <div className={styles.content_value}>
              <label htmlFor="" style={{ fontWeight: 600 }}>
                Identificación
              </label>
              <span>{data_consult.nroIdentificacion}</span>
            </div>
            <div className={styles.content_value}>
              <label htmlFor="" style={{ fontWeight: 600 }}>
                Estado Identificación
              </label>
              <span>{data_consult.estadoIdentificacion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offcanvas;
