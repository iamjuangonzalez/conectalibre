import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h1>Validación de Profesionales de la Salud</h1>
        <h3>
          Verifique la información legal y profesional con el número de cédula
        </h3>
      </section>
      <nav className={styles.navigation}>
        <a href="/documentacion">Documentacion</a>
        <a href="/consult">Consultas</a>
      </nav>
      <footer className={styles.footer}>
        <p>
          © 2023 Validación de Profesionales de la Salud. Todos los derechos
          reservados.
        </p>
        <small>
          Esta plataforma es solo para fines informativos. Para información
          oficial, contacte a las autoridades sanitarias correspondientes.
        </small>
      </footer>
    </div>
  );
}
