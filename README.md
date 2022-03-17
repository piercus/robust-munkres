## robust-munkres

A munkres (or [Hungarian algorithm](https://en.wikipedia.org/wiki/Hungarian_algorithm)) implementation with a thresholding mechanism to manage outliers.

This project is a spin off from [Object Tracking measure
](https://github.com/piercus/object-tracking-measure), it is using [munkres-js](https://www.npmjs.com/package/munkres-js), but adding the ability to manage inputs with outliers, using a threshold parameter.

The algorithm comes from Ergys Ristani1, Francesco Solera2, Roger S. Zou1, Rita Cucchiara2, and Carlo Tomasi1 (2016). 
[Performance Measures and a Data Set for Multi-Target, Multi-Camera Tracking](https://arxiv.org/pdf/1609.01775.pdf)

## Explanation

Let's consider the following situation

![problem.png](https://github.com/piercus/robust-munkres/blob/main/problem.png?raw=true)

The normal munkres algorithm will assign it like

![munkres.png](https://github.com/piercus/robust-munkres/blob/main/munkres.png?raw=true)

This is related to the 'outliers', we have 1 person outlier and one task outlier, which should not be assigned to anyone.

But a better assignement (visually) is to do 

![munkres-thresh.png](https://github.com/piercus/robust-munkres/blob/main/munkres-thresh.png?raw=true)

In order to get this asisgnement, we consider that it is better to alone rather than in bad company.

We define a threshold (in the example, threshold will be about distance = 1), and then the assignement is more robust to outliers

## Example

```js
const munkresThresh = require('robust-munkres');

const opts = {
	distFn: function(person, task){
		return (person.x - task.x)*(person.x - task.x) + (person.y - task.y)*(person.y - task.y)
	},
	threshold: 2
};

const people = [
  { x: 5.611769046110567, y: 9.379947298206389 },
  { x: 4.860827526601497, y: 5.985868603922427 },
  { x: 2.86213446201873, y: 7.181521585211158 },
  { x: 3.5748614540789276, y: 1.8990427991375327 },
  { x: 1.0491270869679283, y: -0.1585655678063631 },
  { x: 0.8716550926328637, y: -3.175565072335303 },
  { x: -5.017116699455073, y: -6.640411409549415 },
  { x: -9.633855154912453, y: -9.27094423957169 }
];

const tasks = [
  { x: 5.611769046110567, y: 9.379947298206389 },
  { x: 3.0413599462481216, y: 7.033923204988241 },
  { x: 3.714636463962961, y: 3.749489475041628 },
  { x: 1.2338132617878728, y: 2.1072726100683212 },
  { x: 0.7592891416861676, y: -1.6463659387081861 },
  { x: -3.7789867172541562, y: -10.326655081473291 },
  { x: -5.127920331346104, y: -6.221112919040024 },
  { x: -9.633855154912453, y: -9.27094423957169 }
]

munkresThresh(
	people,
	tasks,
	opts
);

```
