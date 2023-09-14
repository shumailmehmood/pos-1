const lib = require('../library');

module.exports = class credits {
	static async purchase(org_id, card_id, amount) {
		let card = await lib.orm.creditcards.fetch(card_id);

		if (card.is_bad) {
			return false;
		}

		let isExpired = lib.creditcard.hasExpired(card);
		if (isExpired) {
			await lib.orm.creditcards.save({ card_id: card_id, is_bad: true, is_bad_reason: 'expired' });
			return false;
		}

		let charge = await lib.creditcard.charge(card, amount);
		if (charge.status === 'succeeded') {
			let purchase_id = lib.util.guid.generate();
			await lib.orm.credits_purchases.save({
				purchase_id: purchase_id,
				org_id: org_id,
				charge_id: charge.id,
				type: 'creditcard',
				source: card_id,
				credits: amount,
				created_at: new Date().getTime()
			});

			let credit = await lib.orm.credits.fetch(org_id);
			if (!credit) {
				credit = {
					org_id: org_id,
					credits: 0
				};
			}
			credit.credits = credit.credits + Number(amount);
			await lib.orm.credits.save(credit);
			return true;
		} else {
			await lib.orm.creditcards.save({ card_id: card_id, is_bad: true, is_bad_reason: 'charge_failed' });
			return false;
		}
	}
};
