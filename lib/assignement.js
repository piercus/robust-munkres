const munkres = require('munkres-js');

module.exports = function (preds0, preds1, {distFn}) {
	if (preds0.length === 0 || preds1.length === 0) {
		return {
			matched: [],
		};
	}

	const distMatrix = preds0.map(p0 => preds1.map(p1 => distFn(p0, p1)));

	const matches = munkres(distMatrix);

	const matched = matches
		.map(indexes => ({indexes, dist: distMatrix[indexes[0]][indexes[1]]}))
		.sort((a, b) => a.dist - b.dist);

	const matchCost = matched.map(a => a.dist);

	const cost = matchCost.reduce((a, b) => a + b, 0);

	return {
		matched,
		cost,
		matchCost,
	};
};
