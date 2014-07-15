var test = true

$(document).ready(function() {
	console.log("hola")
	if (test) {
		testIsTrEmpty()
	}
});

function testIsTrEmpty() {

	var tr = '	<tr>';
	tr += '			<td></td>';
	tr += '			<td>hola</td>';
	tr += '			<td></td>';
	tr += '			<td>hola</td>';
	tr += '			<td></td>';
	tr += '		<tr>';

	var tr2 = '	<tr>';
	tr2 += '			<td><span>mundo</span></td>';
	tr2 += '			<td><span></span></td>';
	tr2 += '			<td><span></span></td>';
	tr2 += '			<td><span></span></td>';
	tr2 += '			<td><span>yeiiii</span></td>';
	tr2 += '		<tr>';

	var params = {}

	params.defaultValue = "hola"
	params.tr = $(tr)
	assert(isTrEmpty(params), "test uno FAILED")

	var params2 = {}
	params2.skip = [ 1, 3 ]
	params2.tr = $(tr)
	assert(isTrEmpty(params2), "test dos FAILED")

	var params3 = {}
	params3.defaultValue = "mundo"
	params3.skip = [ 4 ]
	params3.wrapper = "span"
	params3.tr = $(tr2)
	assert(isTrEmpty(params3), "test tres FAILED")

	var params4 = {}
	params4.defaultValue = "mundo"
	params4.skip = [ 4 ]
	params4.wrapper = "span"
	params4.tr = $(tr2)
	assert(isTrEmpty(params4), "test cuatro FAILED")

	var params5 = {}
	params5.skip = [ 4 ]
	params5.wrapper = "span"
	params5.tr = $(tr2)

	
	assert(!isTrEmpty(params5), "test cinco  FAILED")


	var params6 = {}
	params6.skip = [ 4 ]
	params6.wrapper = "span"
	params6.tr = $(tr2)

	assert(isTrEmpty(params6), "FAIL ON PURPOUSE")

}