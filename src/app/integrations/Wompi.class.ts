import axios from "axios";

const WOMPI_STATUS = {
  ERROR: "ERROR",
  VOIDED: "VOIDED",
  DECLINED: "DECLINED",
  APPROVED: "APPROVED",
};

/**
 * @param {string} _summaryProducts
 * @param {string} _consecutive
 * @param {string} _transaction_ID
 */
export default class WompiCoreClass {
  checkout;
  constructor() {}
  WidgetCheckout;

  /**
   * @param {string} status
   */
  verifyStatusTransaction(status) {
    switch (status) {
      case WOMPI_STATUS.APPROVED:
        // console.lo(("transacion aprovada");
        break;

      case WOMPI_STATUS.DECLINED:
        // console.lo(("transacion declinada");
        break;

      case WOMPI_STATUS.VOIDED:
        // console.lo(("transacion vacia");
        break;

      default:
        // console.lo(("error en la transacion");
        break;
    }
  }

  triggerWidget(userData, amountInCents) {
    this.checkout = new this.WidgetCheckout({
      currency: "COP",
      amountInCents,
      reference: this.referencePayment(),
      publicKey: process.env.WOMPI_PUB_KEY,
      redirectUrl: "http://localhost:3000/dashboard/home",
      customerData: {
        email: userData.userMail,
        fullName:
          userData.userName?.lenght > 0
            ? userData.userName
            : userData.companyName,
        phoneNumber: userData.userNumber,
        phoneNumberPrefix: "+57",
      },
    });

    this.checkout.open((result) => {
      return result.transaction;
    });
  }

  referencePayment = () => {
    const date = new Date();
    const reference = date.getTime();
    return reference;
  };

  /**
   *
   * @param {string} transaction_id
   * @returns Error || object
   */
  async getTransactionByID(transaction_id) {
    const wompiURITransaction = `http://localhost:3000/transactions/${transaction_id}`;

    try {
      const transaction = await axios.get(wompiURITransaction);
      return transaction.data.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al tratar de obtener la transacción");
    }
  }

  /**
   *
   * @param {string} id
   * @param {string} status
   * @param {object} transaction
   * @returns Error || object
   */
  async updateTransaction(id, _status, data) {
    let status = _status;
    const endpoint = `http://localhost:3000/update_status`;

    switch (status) {
      case "APPROVED":
        status = "payment-confirmed";
        break;

      default:
        status = "payment-declined";
        break;
    }

    try {
      const response = await axios.put(endpoint, { id, status, data });
      // const response = await axios.get('http://localhost:3500/api/omnibot/deals/hola');
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
