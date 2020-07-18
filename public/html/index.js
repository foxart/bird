window.onload = () => {
	const Map = new LeafletMap();
	Map.init();
	$('#polygon').bind('click', async () => {
		const json = $('#polygon-data').val();
		const data = JSON.parse(json.replace(/\\/g, ''));
		Map.clear;
		const group = Map.group('polygon');
		group.polygon('polygon').set(data);
		group.add('polygon');
		// mapshaper.simplify(data, opts);
		const input = { 'shape.json': data };
		const command = [
			`-i shape.json`,
			// `-i '${JSON.stringify(data)}'`,
			'-lines',
			'-o format=geojson',
			'out.json',
		].join(' ');
		cli.writeFile('shape.json', data);
		console.log(command, input);
		const result = await mapshaper.runCommands(command, input);
		// const map = require('module/mapshaper');
		console.log(result);
		// mapshaper.simplify(data, opts);
		// group.polygon('polygon1').set(data).style('red');
		// group.add('polygon1');
	});
};
// const opts = { method: 'weighted_visvalingam', percentage: 10, no_repair: true, keep_shapes: false, planar: false };
// const input = {};
// const filenames = [];
// data.forEach((value, key) => {
// 	const index = `shape_${key}.tmp`;
// 	if (value) {
// 		filenames.push(index);
// 		input[index] = value;
// 	} else {
// 		console.log(`polygon is empty: ${index}`);
// 	}
// });
// const command = [
// 	`-i ${filenames.join(' ')} combine-files`,
// 	'-merge-layers',
// 	'-dissolve',
// 	'-filter-slivers',
// 	// '-dissolve2',
// 	// `-simplify dp interval=100`,
// 	'-o out.json',
// 	'format=geojson',
// ].join(' ');
// if (data.length !== 0) {
// 	const result = await mapShaper.applyCommands(command, input);
// 	return JSON.parse(result['out.json'].toString());
// }
