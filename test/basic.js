const test = require('ava');
const munkresThresh = require('..');

const threshold = 5;
const options = {
	distFn(person, task) {
		return Math.sqrt(((person.x - task.x) * (person.x - task.x)) + ((person.y - task.y) * (person.y - task.y)));
	},
	threshold,
};
test('munkres-thresh 2', t => {
	const people = [
		{x: 0.871_655_092_632_863_7, y: -3.175_565_072_335_303, id: 5},
	];

	const tasks = [
		{x: -3.778_986_717_254_156_2, y: -10.326_655_081_473_291, id: 6},
	];

	const {cost, match} = munkresThresh(
		people,
		tasks,
		options,
	);
	t.is(match.length, 0);

	t.is(cost, threshold);
});

test('munkres-thresh', t => {
	const people = [
		{x: 5.611_769_046_110_567, y: 9.379_947_298_206_389, id: 0},
		{x: 4.860_827_526_601_497, y: 5.985_868_603_922_427, id: 1},
		{x: 2.862_134_462_018_73, y: 7.181_521_585_211_158, id: 2},
		{x: 3.574_861_454_078_927_6, y: 1.899_042_799_137_532_7, id: 3},
		{x: 1.049_127_086_967_928_3, y: -0.158_565_567_806_363_1, id: 4},
		{x: 0.871_655_092_632_863_7, y: -3.175_565_072_335_303, id: 5},
		{x: -5.017_116_699_455_073, y: -6.640_411_409_549_415, id: 7},
		{x: -9.633_855_154_912_453, y: -9.270_944_239_571_69, id: 8},
	];

	const tasks = [
		{x: 5.611_769_046_110_567, y: 9.379_947_298_206_389, id: 0},
		{x: 3.041_359_946_248_121_6, y: 7.033_923_204_988_241, id: 2},
		{x: 3.714_636_463_962_961, y: 3.749_489_475_041_628, id: 3},
		{x: 1.233_813_261_787_872_8, y: 2.107_272_610_068_321_2, id: 4},
		{x: 0.759_289_141_686_167_6, y: -1.646_365_938_708_186_1, id: 5},
		{x: -3.778_986_717_254_156_2, y: -10.326_655_081_473_291, id: 6},
		{x: -5.127_920_331_346_104, y: -6.221_112_919_040_024, id: 7},
		{x: -9.633_855_154_912_453, y: -9.270_944_239_571_69, id: 8},
	];

	const {cost, match} = munkresThresh(
		people,
		tasks,
		options,
	);
	for (const [i, j] of match) {
		t.is(people[i].id, tasks[j].id);
	}

	t.is(match.length, 7);

	t.true(Math.abs(cost - 11.3282) < 1e-3);
});
