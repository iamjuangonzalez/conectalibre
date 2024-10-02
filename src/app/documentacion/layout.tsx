import React from "react";
import styles from "@/app/styles/documentation.module.css";

export default function ConsultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page_document}>
      <section className={styles.header}>
        <h1>Documentación API</h1>
        <h3 style={{ color: "#fff" }}>
          Aprende a conectarte y usar nuestra API de Validación de Profesionales
          de la Salud
        </h3>
        <a className={styles.documentation} href="/consult">
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.5862 24.2898L20.4654 18.1691C21.9391 16.2074 22.7346 13.8195 22.7318 11.3659C22.7318 5.09879 17.633 0 11.3659 0C5.09879 0 0 5.09879 0 11.3659C0 17.633 5.09879 22.7318 11.3659 22.7318C13.8195 22.7346 16.2074 21.9391 18.1691 20.4654L24.2898 26.5862C24.5997 26.8631 25.0038 27.011 25.4192 26.9994C25.8346 26.9877 26.2298 26.8175 26.5237 26.5237C26.8175 26.2298 26.9877 25.8346 26.9994 25.4192C27.011 25.0038 26.8631 24.5997 26.5862 24.2898ZM3.24741 11.3659C3.24741 9.76023 3.72355 8.1906 4.61562 6.85552C5.5077 5.52043 6.77563 4.47986 8.2591 3.86539C9.74256 3.25092 11.3749 3.09015 12.9498 3.4034C14.5246 3.71666 15.9712 4.48987 17.1066 5.62526C18.242 6.76066 19.0152 8.20724 19.3284 9.78208C19.6417 11.3569 19.4809 12.9893 18.8664 14.4727C18.252 15.9562 17.2114 17.2241 15.8763 18.1162C14.5412 19.0083 12.9716 19.4844 11.3659 19.4844C9.21355 19.4819 7.15007 18.6257 5.62812 17.1037C4.10616 15.5818 3.24999 13.5183 3.24741 11.3659Z"
              fill="white"
            />
          </svg>
          Consulta
        </a>
      </section>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p style={{ color: "#fff" }}>
          © 2023 Validación de Profesionales de la Salud. Todos los derechos
          reservados.
        </p>
        <small>
          Esta documentación es para desarrolladores autorizados. No compartas
          tu API Key o tokens generados.
        </small>
      </footer>
    </div>
  );
}
