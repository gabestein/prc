export function formatCurrency(amount, code = 'USD') {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: code }).format(amount);
}

export function getTotalOut(transactions) {
	return transactions.reduce((total, transaction) => {
		if (transaction.amount > 0) return total + transaction.amount;
		return total;
	}, 0);
}

export function getTotalIn(transactions) {
	return transactions.reduce((total, transaction) => {
		if (transaction.amount < 0) return total + transaction.amount;
		return Math.abs(total);
	}, 0);
}

export function getPortions(transactions) {
	const portions = {
		wants: 0,
		needs: 0,
		savings: 0,
		income: 0,
		payoffs: 0,
		transfers: 0,
		needsPaybacks: 0,
		wantsPaybacks: 0,
		null: 0,
	};
	transactions.forEach((transaction) => {
		portions[transaction.user_portion] += transaction.amount;
	});
	portions.income = Math.abs(portions.income);
	portions.needsPaybacks = Math.abs(portions.needsPaybacks);
	portions.wantsPaybacks = Math.abs(portions.wantsPaybacks);
	portions.transfers = Math.abs(portions.transfers);
	portions.wants = -portions.wants;
	portions.needs = -portions.needs;
	return portions;
}

export default function() {
	return null;
}
