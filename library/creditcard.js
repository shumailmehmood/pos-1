var _stripe;

module.exports = class creditcard {
	static async charge(card, amount) {
		creditcard.ensureStripe();
		let token = await creditcard.createCardToken(card);
		let charge = await _stripe.charges.create({
			amount: parseFloat(amount) * 100,
			currency: 'usd',
			source: token.id
		});
		return charge;
	}

	static async createCardToken(card) {
		creditcard.ensureStripe();
		const token = await _stripe.tokens.create({
			card: {
				number: card.number,
				exp_month: card.month,
				exp_year: card.year,
				cvc: card.cvc,
			},
		});
		return token;
	}

	static ensureStripe() {
		if (!_stripe) {
			_stripe = require('stripe')(global.config.stripe.key);
		}
	}

	static hasExpired(card) {
		let nowMonth = new Date().getMonth();
		let nowYear = new Date().getFullYear();
		if (card.year === nowYear) {
			if (card.month < nowMonth) {
				return true;
			} else {
				return false;
			}
		} else if (card.year < nowYear) {
			return true;
		} else {
			return false;
		}
	}
};
