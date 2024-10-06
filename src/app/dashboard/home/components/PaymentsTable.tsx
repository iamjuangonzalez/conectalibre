"use client";
import styles from "@/app/styles/dashboard.module.css";

const PaymentsTable = () => {
  // Datos simulados de pagos anteriores
  /* const [payments, setPayments] = useState([
    { id: 1, amount: "$100", date: "2024-03-01", status: "Completado" },
    { id: 2, amount: "$50", date: "2024-02-10", status: "Pendiente" },
  ]); */

  /* const handleNewPayment = () => {
    // Lógica para realizar un nuevo pago (simulada)
    const newPayment = {
      id: payments.length + 1,
      amount: "$" + (Math.random() * 100).toFixed(2),
      date: new Date().toISOString().split("T")[0],
      status: "Pendiente",
    };
    setPayments([...payments, newPayment]);
  }; */

  return (
    <div className={styles.apiKeysContainer}>
      <h2>Historial de Pagos</h2>
      <p>Revisa tus pagos anteriores y realiza nuevos pagos</p>
      <table className={styles.apiKeysTable}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}>Estamos trabajando en esto</td>
          </tr>
          {/* {payments.map((key) => (
            <tr key={key.id}>
              <td>{key.date}</td>
              <td>{key.amount}</td>
              <td>{key.status}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
