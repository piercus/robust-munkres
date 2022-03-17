const assignement = require('./assignement')
module.exports= function(people, tasks, options){
	const {logger, distFn, threshold, thresholdFn} = options;
	
	
	const vp = people.map((_, pIndex) => ({pIndex})).concat(tasks.map((_, fTIndex) => ({fTIndex})));
	const vt = people.map((_, fPIndex) => ({fPIndex})).concat(tasks.map((_, tIndex) => ({tIndex})));
	
	
	const distFnModified = function({pIndex, fPIndex}, {tIndex, fTIndex}){
		if (typeof (pIndex) === 'number' && typeof (tIndex) === 'number') {
			return distFn(people[pIndex], tasks[tIndex])
		} else if(typeof (pIndex) === 'number'){
			if(typeof(thresholdFn) === 'function'){
				return thresholdFn(people[pIndex]);
			}
			return threshold/2
		} else if(typeof (tIndex) === 'number'){
			if(typeof(thresholdFn) === 'function'){
				return thresholdFn(tasks[tIndex]);
			}
			return threshold/2
		} else {
			return 0
		}
	}
	

	const {matched, unmatched, cost} = assignement(
		vp,
		vt,
		{
			threshold: 2*threshold,
			distFn: distFnModified
		}
	);
	
	if (unmatched[0].length > 0 || unmatched[1].length > 0) {
		throw (new Error('Should not have unmatched assignement'));
	}
	
	const idtpSet = matched.filter(({indexes}) => typeof (vp[indexes[0]].pIndex) === 'number' && typeof (vt[indexes[1]].tIndex) === 'number');
	const match = idtpSet.map(({indexes}) => [vp[indexes[0]].pIndex, vt[indexes[1]].tIndex]);
		
	return {match, cost};
}