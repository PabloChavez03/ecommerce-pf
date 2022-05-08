const axios = require("axios");

class PaymentService {
	constructor(productsAndDelivery, email) {
		this.products = productsAndDelivery;
		this.email = email;
	}

	async createPayment() {
		const url = "https://api.mercadopago.com/checkout/preferences";

		const body = {
			payer_email: this.email,
			items: [...this.products],
			back_urls: {
				failure: "http://localhost:3001/",
				pending: "http://localhost:3001/",
				success: "http://localhost:3001/",
			},
		};

		const payment = await axios.post(url, body, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
			},
		});

		return payment.data;
	}

	//   async createSubscription() {
	//     const url = "https://api.mercadopago.com/preapproval";

	//     const body = {
	//       reason: "Suscripción de ejemplo",
	//       auto_recurring: {
	//         frequency: 1,
	//         frequency_type: "months",
	//         transaction_amount: 10,
	//         currency_id: "ARS"
	//       },
	//       back_url: "https://google.com.ar",
	//       payer_email: "test_user_46945293@testuser.com"
	//     };

	//     const subscription = await axios.post(url, body, {
	//       headers: {
	//         "Content-Type": "application/json",
	//         Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
	//       }
	//     });

	//     return subscription.data;
	//   }
}

module.exports = PaymentService;
