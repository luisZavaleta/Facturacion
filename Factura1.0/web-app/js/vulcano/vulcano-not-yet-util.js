var vulcanoUtil = {};

vulcanoUtil.clone = function clone(obj) {
	return jQuery.extend(true, {}, obj);
};

/**
 * Get information from a HTML page, it could get the value of an input or the html of a
 * contenteditable element.
 * 
 * @selector: Jquery selector of the element
 * @type: {value, html}
 */
vulcanoUtil.getTextFromDOM = function(selector, type) {

	switch (type) {
		case "value":
		case "val":
			return $(selector).val();
			break;
		case "html":
			return $(selector).html();
			break;
		default:
			throw "IllegalArgumentException---->" + type;

	}
	;

};

/**
 * Used to get the data (var or html) of a collection of elements, for example to iterate over tr in
 * a table and get all the tds (is needed to provide the td selectors).
 * 
 * @collectionSelector: jquery selector of the container that will be iterated.
 * @childSelectors: Array with the name and type of the individual elements that will be getted. in
 *                  the following format: [{ "selector": "7", "type": "7", "name": "nombre" }, {
 *                  "selector": "7", "type": "7", "name": "nombre" }]
 */
vulcanoUtil.getCollectionFromDOM = function(collectionSelector, childsParams) {

	if (collectionSelector == null || childsParams == null || jQuery.type(childsParams) != "array"
			|| childsParams.length < 1) {

		throw "getCollectionFromDOM - IllegalArgumentException ";
	}

	var returnArray = [];
	var elementsToIterate = $(collectionSelector);

	$.each(elementsToIterate, function(index, singleElement) {

		var childsRet = {};

		$.each(childsParams, function(indxChildSelector, childSelector) {

			var domElement = $(singleElement).find(childSelector.selector);

			childsRet[childSelector.name] = vulcanoUtil.getTextFromDOM(domElement, childSelector.type);

		});
		returnArray.push(childsRet);

	});

	return returnArray;

};

/**
 * Used to get html or values of different elements in a webpage.
 * 
 * @params: json with all the information with the following pattern: [ { "selector" : ".divTest",
 *          "type" : "html", "name" : "test1" }, { "selector" : "tr", "name" : "tabla", "data" : [ {
 *          "selector" : ".hola", "type" : "html", "name" : "hola" }, { "selector" : ".adios",
 *          "type" : "html", "name" : "adios" }, { "selector" : "td input", "type" : "val", "name" :
 *          "ok" } ], "type" : "collection" }, { "selector" : ".divTest2 input", "type" : "val",
 *          "name" : "test2" } ];
 * @jsonExample: http://www.jsoneditoronline.org/?id=931b13e0e98649af2d73709c860603db
 */
vulcanoUtil.getDataFromForm = function(elements) {

	var data = {};

	$.each(elements, function(index, singleElement) {

		if (singleElement.type == "collection") {
			data[singleElement.name] = vulcanoUtil.getCollectionFromDOM(singleElement.selector, singleElement.data);
		} else {
			data[singleElement.name] = vulcanoUtil.getTextFromDOM(singleElement.selector, singleElement.type);
		}

	});

	return data;
};

/**
 * Used to verify if a jquery object really exists, for example $('#notAnElement') returns [object
 * Object], but is an object with 0 elements.
 */
$.fn.exists = function() {
	return this.length !== 0;
}

/**
 * @param templateid: html of the element that will be used as template. example: <br>
 *        <code>
 *      	<div id="mytemplate">
 *				<p>%test%</p>
 *				<p>%word%</p>
 *			</div>
 *  	</code>
 * @param data
 * @returns
 * @xample document.getElementById("my").innerHTML=template("mytemplate",{test:"MYTEST",word:"MYWORD"})
 * @source: http://stackoverflow.com/a/378001/597786
 */
vulcanoUtil.template = function(templateid, data) {
	return templateid.replace(/%(\w*)%/g, function(m, key) {
		return data.hasOwnProperty(key) ? data[key] : "";
	});
}
