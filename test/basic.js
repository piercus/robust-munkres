const test = require('ava')
const munkresThresh = require('..');


test('munkres-thresh 2', t => {
	const threshold = 5;
	const opts = {
		distFn: function(person, task){
			return Math.sqrt((person.x - task.x)*(person.x - task.x) + (person.y - task.y)*(person.y - task.y))
		},
		threshold
	};

	const people = [
	  { x: 0.8716550926328637, y: -3.175565072335303, id: 5 }
	];

	const tasks = [
	  { x: -3.7789867172541562, y: -10.326655081473291, id: 6 }
	]

	const {cost, match} = munkresThresh(
		people,
		tasks,
		opts
	);
	t.is(match.length, 0)

	t.is(cost, threshold)
	
})

test('munkres-thresh', t => {
	const threshold = 5;
	const opts = {
		distFn: function(person, task){
			return Math.sqrt((person.x - task.x)*(person.x - task.x) + (person.y - task.y)*(person.y - task.y))
		},
		threshold
	};

	const people = [
	  { x: 5.611769046110567, y: 9.379947298206389, id: 0},
	  { x: 4.860827526601497, y: 5.985868603922427, id: 1 },
	  { x: 2.86213446201873, y: 7.181521585211158, id: 2 },
	  { x: 3.5748614540789276, y: 1.8990427991375327, id: 3 },
	  { x: 1.0491270869679283, y: -0.1585655678063631, id: 4 },
	  { x: 0.8716550926328637, y: -3.175565072335303, id: 5 },
	  { x: -5.017116699455073, y: -6.640411409549415, id: 7 },
	  { x: -9.633855154912453, y: -9.27094423957169, id: 8 }
	];

	const tasks = [
	  { x: 5.611769046110567, y: 9.379947298206389 , id: 0},
	  { x: 3.0413599462481216, y: 7.033923204988241, id: 2 },
	  { x: 3.714636463962961, y: 3.749489475041628, id: 3 },
	  { x: 1.2338132617878728, y: 2.1072726100683212, id: 4 },
	  { x: 0.7592891416861676, y: -1.6463659387081861, id: 5 },
	  { x: -3.7789867172541562, y: -10.326655081473291, id: 6 },
	  { x: -5.127920331346104, y: -6.221112919040024, id: 7 },
	  { x: -9.633855154912453, y: -9.27094423957169, id: 8 }
	]

	const {cost, match} = munkresThresh(
		people,
		tasks,
		opts
	);
	match.forEach(([i,j]) => {
		t.is(people[i].id, tasks[j].id)
	})

	t.is(match.length, 7)

	t.true(Math.abs(cost - 11.3282) < 1e-3)
	
})