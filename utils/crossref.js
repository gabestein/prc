import fetch from 'isomorphic-unfetch';

export default class Crossref {
	constructor() {
		this.baseUrl = 'http://api.crossref.org/v1';
		this.options = {
			headers: { 'User-Agent': 'PRC Collector/0.1 (mailto:gabe@knowledgefutures.org)' },
		};
	}

	async works(doi) {
		const res = await fetch(`${this.baseUrl}/works/${doi}`, {
			...this.options,
		});
		return res.json();
	}

	async reviews(doi) {
		const res = await fetch(
			`${this.baseUrl}/works?filter=relation.type:is-review-of,relation.object:${doi}`,
			{
				...this.options,
			},
		);
		return res.json();
	}
}
