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

export default function() {
	return null;
}
