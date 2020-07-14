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
	return Math.abs(
		transactions.reduce((total, transaction) => {
			if (transaction.amount < 0) return total + transaction.amount;
			return total;
		}, 0),
	);
}

export function getPortions(transactions) {
	const portions = {
		wants: 0,
		unplannedWants: 0,
		needs: 0,
		unplannedNeeds: 0,
		savings: 0,
		activeSavings: 0,
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
	portions.unplannedWants = -portions.unplannedWants;
	portions.needs = -portions.needs;
	portions.unplannedNeeds = -portions.unplannedNeeds;
	return portions;
}

// https://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase/10425344
function camelCase(input) {
	return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
		return group1.toUpperCase();
	});
}

export function flattenCrossrefMessage(message) {
	const final = { json_dump: message };
	// eslint-disable-next-line no-restricted-syntax
	for (const [key, value] of Object.entries(message)) {
		switch (key) {
			case 'reference-count':
			case 'published-print':
			case 'content-created':
			case 'alternative-id':
			case 'journal-issue':
			case 'issn-type':
			case 'is-referenced-by-count':
			case 'references-count':
			case 'content-domain':
			case 'group-title':
				final[camelCase(key)] = value;
				break;
			case 'indexed':
			case 'created':
			case 'deposited':
				final[key] = value['date-time'];
				break;
			case 'URL':
			case 'ISSN':
				final[key.toLowerCase()] = value;
				break;
			case 'DOI':
				final[key.toLowerCase()] = value.toLowerCase();
				break;
			case 'title':
			case 'subtitle':
				final[key] = value.join('');
				break;
			case 'short-title':
			case 'container-title':
			case 'short-container-title':
			case 'original-title':
				final[camelCase(key)] = value.join('');
				break;
			case 'publisher':
			case 'issue':
			case 'type':
			case 'source':
			case 'page':
			case 'prefix':
			case 'volume':
			case 'member':
			case 'author':
			case 'relation':
			case 'language':
			case 'link':
			case 'score':
			case 'issued':
			case 'reference':
			case 'subtype':
			case 'abstract':
			case 'institution':
			case 'accepted':
			case 'posted':
				final[key] = value;
				break;
			default:
				console.warn('skipping', key, '\n', value);
				break;
		}
	}
	return final;
}

export default function() {
	return null;
}
