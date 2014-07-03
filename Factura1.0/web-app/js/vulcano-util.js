var debug = false
var verbose = false

function exists(object) {
	if (object != null && object != undefined) {

		if (jQuery.isFunction(object)) {
			return true
		}

		if (object.length != undefined && object.length <= 0) {
			return false
		}
		return true
	}
	return false

}

function empty(object) {
	if (object != null && object != undefined && object != "") {
		if (object.length != undefined && object.length <= 0) {
			return true
		}
		return false
	}
	return true
}

function objectOrEmptyString(object) {
	if (exists(object)) {
		return object
	} else {
		return ""
	}
}

function objectOrNull(object) {
	if (empty(object)) {
		return null
	} else {
		return object
	}
}

function objectOrDefault(object, defaultObject) {
	if (exists(object)) {
		return object
	} else {
		return defaultObject
	}
}

function notEmptyObjectOrDefault(object, defaultObject) {
	if (exists(object) && object != "" && object != "null") {
		return object
	} else {
		return defaultObject
	}
}

function hasEmptyElements(objColletion) {

	for ( var idx in objColletion) {
		if (empty(objColletion[idx])) {
			return true
		}
	}

	return false

}

function allEmpty(objColletion) {

	for ( var idx in objColletion) {
		if (!empty(objColletion[idx])) {
			return false
		}
	}

	return true

}

function rowsSize(tableSelector) {
	return $(tableSelector + ' tr').length
}

Object.byString = function(o, s) {
	s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	s = s.replace(/^\./, ''); // strip leading dot
	var a = s.split('.');
	while (a.length) {
		var n = a.shift();
		if (n in o) {
			o = o[n];
		} else {
			return;
		}
	}
	return o;
}

function addValToParameter(val, paramName, params, defaultValue) {

	if (exists(defaultValue) && val.trim() == "") {
		val = defaultValue
	}

	if (exists(val)) {
		params[paramName] = val
	}

}

function jsonToHarcodedParams(jsonObject) {

	var retParam = "?"

	for ( var idx in jsonObject) {

		if (!empty(jsonObject[idx])) {

			retParam += idx
			retParam += "="
			retParam += jsonObject[idx]
			retParam += "&"
		}

	}

	return retParam

}

function getRelativeUrlInIndex(url, alwaysSubpage) {

	if (alwaysSubpage == true) {
		return "../" + url
	}

	if ((location.pathname).indexOf("index", (location.pathname).lastIndexOf("/")) == -1) {

		return url

	} else {

		return "../" + url
	}

}

function sumOrNull(a, b) {
	if ($.isNumeric(a) && $.isNumeric(b)) {
		return (parseFloat(a) + parseFloat(b));
	} else {
		return null;
	}
}

function sumOrFirst(a, b) {
	if ($.isNumeric(a) && $.isNumeric(b)) {
		return (parseFloat(a) + parseFloat(b));
	} else {
		return a;
	}
}

function restOrNull(a, b) {
	if ($.isNumeric(a) && $.isNumeric(b)) {
		return (parseFloat(a) - parseFloat(b));
	} else {
		return null;
	}
}

function multiplyOrNull(a, b) {
	if ($.isNumeric(a) && $.isNumeric(b)) {

		return (a * b);
	} else {
		return null;
	}
}

function multiplyOrErrorMessage(a, b, errror) {

	var mult = multiplyOrNull(a, b)

	if (mult != null) {
		return mult
	} else {
		return errror
	}

}

function numericOrMinusOne(a) {
	if ($.isNumeric(a)) {
		return parseFloat(a)
	} else {
		return -1
	}
}

function numericOrDefault(a, defaultValue) {
	if ($.isNumeric(a)) {
		return parseFloat(a)
	} else {
		return defaultValue
	}
}

/*
 * type = //see anexo
 */

/*
 * @param type: {html, val or any attribute} // see ANEXO 1 @param container: selector of the
 * container in which the element will be searched @param selector: selector of the element to be
 * searched
 */

/**
 * @param type:
 *        {val || html || text or any attribute name}
 * @param container:
 *        container selector or container element
 * @param selector:
 *        element selector
 * @param map =
 *        {true || false} default false
 * @DEPRECATED BECAUSE I DON'T FUCKING UNDESTAND WHAT I DID AND I DIDN'T DOCUMENTED IT. use
 *             getDataFromWebPage Instead
 */
function getValueHtmlOrAttribute(params) {
	if (params.map) {
		return getDataFromDOMElementList(params)
	} else {
		return getDataFromDOMElement(params)
	}
}

/**
 * Return always an array could be one item eempty or more, bacause that the fucking way jquery
 * works.
 * 
 * @description: Get data from a HTML Page, the kind of data retrieved is defined by the type
 *               parameter.
 * @param type:
 *        {val || html || text or any attribute name}
 * @param containerSelector
 * @param itemSelector
 */

function getDataFromWebPage(params) {

	var domElements;

	if (empty(params.containerSelector)) {
		domElements = $(params.itemSelector)
	} else {
		domElements = $(params.containerSelector).find(params.itemSelector)
	}

	// var elements = params.container.find(params.selector)

	switch (params.type) {
		case "val":
			return getAllValues(domElements)
			break;
		case "html":
			return getAllHtml(domElements)
			break;
		case "text":
			return getAllTexts(domElements)
			break;
		default:
			return getAllAttr(domElements, params.type)
			break;
	}

}

/**
 * @param json:
 *        json used to store data
 * @param attrName:
 *        example: json.attrName = valorObtenido
 * @param type:
 *        {val || html || text or any attribute name}
 * @param container
 * @param selector
 * @param list:
 *        {true || false}, define if we'll retrieve a single element or a list of elements
 */

function saveDataIfExists(params) {

	if (params.list == true) {

		var data = getDataFromDOMElementList(params)

		if (!empty(data) && data.length > 0) {
			params.json[params.attrName] = data
		}

	} else {

		var data = getDataFromDOMElement(params)

		if (!empty(data)) {
			params.json[params.attrName] = data
		}
	}
}

/**
 * @param type: =
 *        {val | html | text | any attibute name |}
 * @param container:
 * @param selector:
 */

function getDataFromDOMElement(params) {

	var wrapper;

	if (empty(params.container)) {
		wrapper = $(params.selector)
	} else {
		wrapper = $(params.container).find(params.selector)
	}

	switch (params.type) {
		case "val":
			return $.trim(wrapper.val())
			break;
		case "html":
			return $.trim(wrapper.html())
			break;
		case "text":
			return $.trim(wrapper.text())
			break;
		default:
			return $.trim(wrapper.attr(params.type))
			break;

	}

}

function getDataFromDOMElementList(params) {

	var wrapper;

	if (empty(params.container)) {
		wrapper = $(params.selector)
	} else {
		wrapper = $(params.container).find(params.selector)
	}

	// var elements = params.container.find(params.selector)

	switch (params.type) {
		case "val":
			return getAllValues(wrapper)
			break;
		case "html":
			return getAllHtml(wrapper)
			break;
		case "text":
			return getAllTexts(wrapper)
			break;
		default:
			return getAllAttr(wrapper, params.type)
			break;

	}

}

/* @Deprecated use listOfObjectsOrEmptyStrings */
function getAllValues() {

	var retArr = jQuery.map(elements, function(item, index) {
		return objectOrEmptyString($(item).val())
	})

	return retArr

}

/*
 * get an array and check every element to see if it have a valid value, if it doen't substituted it
 * with a empty string
 */
function listOfObjectsOrEmptyStrings() {

	var retArr = jQuery.map(elements, function(item, index) {
		return objectOrEmptyString($(item).val())
	})
	return retArr

}

function getAllHtml(elements) {

	var retArr = jQuery.map(elements, function(item, index) {
		return objectOrEmptyString($(item).html())
	})

	return retArr

}

function getAllTexts(elements) {

	var retArr = jQuery.map(elements, function(item, index) {
		return objectOrEmptyString($(item).text())
	})

	return retArr

}

function getAllAttr(elements, type) {

	var retArr = jQuery.map(elements, function(item, index) {
		console.log(item)
		return objectOrEmptyString($(item).attr(type))
	})

	return retArr

}

function setValueOrAttribute(type, containerx, selector, value) {

	var container = null

	if (containerx instanceof jQuery) {
		container = containerx
	} else {
		container = $(containerx)
	}

	if (type.trim() == "val") {
		return objectOrEmptyString($(container).find(selector).val(value))
	} else if (type.trim() == "html") {
		return objectOrEmptyString($(container).find(selector).html(value))
	} else {
		return objectOrEmptyString($(container).find(selector).attr(type, value))
	}
}

/*
 * FORMAT EXAMPLE: var dParams = []
 * 
 * dParams["hereda"] ={"selector": ".hereda", "value": "html"} dParams["nombre"] ={"selector":
 * ".hereda", "value": "val"} dParams["id"] ={"selector": ".hereda", "value": "val"} dParams["foto"]
 * ={"selector": ".hereda", "value": "val"}
 * 
 */

function getDataFromHtml(jobject, thiz) {

	if (empty(thiz)) {
		thiz = $("body")
	}

	var data = {}

	for ( var key in jobject) {
		data[key] = valueOrAttribute(jobject[key].value, jobject[key].selector, thiz)
	}

	return data
}

function setDataToHtml(jobject, thiz) {

	if (empty(thiz)) {
		thiz = $("body")
	}

	var data = {}

	for ( var key in jobject) {
		data[key] = valueOrAttribute(jobject[key].value, jobject[key].selector, thiz, jobject[key].val)
	}

}

/*
 * var params1 = {} params.fromType = "val" params.fromContainer = ".testData.from"
 * params.fromSelector = ".inputFrom" params.toType = "val" params.toContainer = ".testData.to"
 * params.toSelector = ".inputTo"
 */

function transferData(params) {

	var value = getValueHtmlOrAttribute(params.fromType, params.fromContainer, params.fromSelector)

	if (debug) {
		console.log("transferData BEGIN")
		console.log(params.fromType)
		console.log(params.fromContainer)
		console.log("selector xxx--->" + params.fromSelector)
		console.log(value.substring(0, 100))
		console.log("transferData END")

	}

	if (!(params.blank == false && empty(value))) {
		setValueOrAttribute(params.toType, params.toContainer, params.toSelector, value)
	}

	return value
}

/*
 * First list must be the list in which we're looking for, list2 must contain the values that we're
 * looking
 */
function getRepeatedValues(list1, list2) {
	var lookup = {};
	var vals = {}
	vals.repeated = []
	vals.notRepeated = []

	for ( var j in list2) {
		lookup[list2[j]] = list2[j];
	}

	for ( var i in list1) {
		if (typeof lookup[list1[i]] != 'undefined') {
			vals.repeated.push(list1[i])
		} else {
			vals.notRepeated.push(list1[i])
		}
	}

	return vals;
}

function getRepeatedValuesInOneList(list1, list2) {
	var lookup = {};
	var vals = []

	for ( var j in list2) {
		lookup[list2[j]] = list2[j];
	}

	for ( var i in list1) {
		if (typeof lookup[list1[i]] != 'undefined') {
			vals.push({
				"value" : list1[i],
				"repeated" : true
			})
		} else {
			vals.push({
				"value" : list1[i],
				"repeated" : false
			})
		}
	}

	return vals;
}

function sortArrayNumber(array) {

	array.sort(function(a, b) {
		return a - b
	});

	return array

}

function deleteArrayDuplicates(array) {

	if (array.length < 2) {
		return array
	}

	var arrTemp = array[0]

	var noDuplicatesArray = []

	noDuplicatesArray.push(array[0])

	for ( var i = 1; i < array.length; i++) {

		if (arrTemp != array[i]) {
			noDuplicatesArray.push(array[i])
		}
		arrTemp = array[i]

	}

	return noDuplicatesArray

}

function removeTr(params) {

	$(params.innerTrSelector).unbind()
	$(params.innerTrSelector).on("click", function() {
		$(this).parents("tr").remove()

		if (exists(params.executeFunction)) {
			params.executeFunction()
		}
	})

}

// =====================NOT IN MAIN FILE BEGIN==========================

function appendIfNotExists(selector, itemToAppend) {

	var html = $(selector).html()
	html = safeTrim(html)

	if (html.indexOf(itemToAppend) != (html.length - itemToAppend.length)) {
		$(selector).html(html + itemToAppend)
	}
}

/* return empty string or default value */
function safeTrim(value, defaultValue) {
	if (exists(value)) {
		return value.trim();
	} else {
		if (exists(defaultValue)) {
			return defaultValue;
		} else {
			return "";
		}
	}
}

/**
 * @param element:
 *        json with element data or the selector
 * @param containerSelector:
 *        outermost element to be deleted
 * @param event
 *        default click
 * @param onFinish
 */

function removeElement(params) {

	var event = objectOrDefault(params.event, "click")
	var elementParams = objectOrDefault(params.element, ".icon-remove")
	var containerSelector = objectOrDefault(params.containerSelector, "li")

	var element = getElements(elementParams)

	element = $(params.containerSelector).find(element)

	$(element).unbind(event);
	$(element).on(event, function() {

		var removeOuterMostElement = $(this).closest(params.containerSelector)

		if (exists(params.onFinish)) {
			params.onFinish(removeOuterMostElement)
		}

		(removeOuterMostElement).remove()

	})

}

/**
 * @description: remove a parent element given the father
 * @param inner:
 *        inner element to be deleted
 * @param outter:
 *        selector for the outermost element to be deleted
 * @param onFinish:
 *        function to be executed once the element is removed
 */

function simpleRemoveElement(params) {

	var removableElement = $(params.inner).closest(params.outter)
	removableElement.remove()

	if (exists(params.onFinish)) {
		params.onFinish()
	}

}

function removeLi(removeIconSelector) {

	$(removeIconSelector).unbind("click")
	$(removeIconSelector).on("click", function() {
		$(this).closest("li").remove()
	})
}

function preventLinkRedirect(selector) {

	if (!exists(selector)) {
		selector = "a"
	}

	$(selector).unbind()
	$(selector).on("click", function(event) {
		event.preventDefault();
	})
}

function getLinkTextElement(element, classSelector) {

	if (empty(classSelector)) {

		if (element.is("a")) {
			return element
		} else {
			return element.find("a") // not tested

		}

	} else {
		return element.find("." + classSelector)
	}
}

/**
 * @param containerSelector
 * @param containerIndex
 * @param selector
 */

function getMaxWidth(params) {

	var elements = getElements(params)
	var widths = elements.map(function() {
		return $(this).width()
	})

	var widths = ($.makeArray(widths))
	var max = Math.max.apply(Math, widths)
	return max

}

function getMaxHeight(params) {

	var elements = getElements(params)
	var height = elements.map(function() {
		return $(this).height()
	})

	var height = ($.makeArray(height))
	var max = Math.max.apply(Math, height)
	return max

}

/**
 * @param containerSelector
 * @param containerIndex
 * @param selector
 * @param selectorIndex
 *        Can send a string as parameter and the function use it as selector
 * @url http://jsfiddle.net/luisZavaleta/a23kH/1/
 */
function getElements(params) {
	var container;
	if (jQuery.type(params) == "string") {
		container = $(params)
	} else {
		if (isValidIndex(params.selectorIndex)) {
			switch (elementStatus(params.containerSelector)) {
				case "undefined":
					// index yes, container no
					var elements = $(params.selector)
					return elements[params.selectorIndex]
					break;
				case "exists":
					// index yes, container, yes
					if (isValidIndex(params.containerIndex)) {
						elements = $(params.containerSelector + ":nth(" + params.containerIndex + ")")
						elements = elements.find(params.selector + ":nth(" + params.selectorIndex + ")")
						return elements

					} else {
						var elements = $(params.containerSelector).find(params.selector)
						return elements[params.selectorIndex]
					}
					break;
				case "empty":
					// index yes, container empty
					return null
					break;
			}
		} else {
			switch (elementStatus(params.containerSelector)) {
				case "undefined":
					// index no, container no
					return $(params.selector)
					break;
				case "exists":
					// index no, container yes
					if (isValidIndex(params.containerIndex)) {
						return $(params.containerSelector + ":nth(" + params.containerIndex + ")").find(params.selector)
					} else {
						return $(params.containerSelector).find(params.selector)
					}
					break;
				case "empty":
					// index no, container empty
					return null
					break;
			}
		}
	}
	return container;
}

/**
 * Verify if the value given exists and is a integer (throw an error if it exists but it's not an
 * integer)
 * 
 * @param index
 * @returns
 */

function isValidIndex(index) {
	if (index == undefined) {
		return false
	} else {
		if (isInt(index)) {
			return true
		} else {

			if (jQuery.type(index) == "string") {
				index = parseInt(index)
				if (isNaN(index)) {
					throw "index-like value exists but it is not a integer"
				} else {

					return isValidIndex(index)

				}

			} else {
				throw "index-like value exists but it is not a integer"
			}
		}

	}
}

/**
 * Posibles states: "undefined", "empty", "exists"
 */

function elementStatus(element) {

	if (element == undefined) {
		return "undefined"
	} else if (exists(element)) {
		return "exists"
	} else {
		return "empty"

	}

}

/**
 * @param containerSelector
 * @param containerIndex
 * @param selector
 * @param subelement
 */
function getSubElements(params) {
	var container;
	if (exists(params.containerSelector)) {
		alert("not tested, none")
		container = $(containerSelector).find(params.selector)
		if (exists(params.containerIndex)) {
			container = container[parseInt(params.containerIndex)]
		}
	} else {
		container = $(params.selector)
		if (exists(params.containerIndex)) {
			alert("not tested")
			container = container[parseInt(params.containerIndex)]
		}
	}
	return container;
}

/**
 * @param containerSelector
 * @param containerIndex
 * @param outerSelector
 * @param innerSelector
 */

function setMaxHeight(params) {

	var paramsMaxHeight = {}

	paramsMaxHeight.containerSelector = params.containerSelector
	paramsMaxHeight.containerIndex = params.index
	paramsMaxHeight.selector = params.innerSelector

	var max = getMaxHeight(paramsMaxHeight) // funciona hasta aqu�

	paramsMaxHeight.selector = params.outerSelector
	var elements = getElements(paramsMaxHeight)

	console.log(elements)
	console.log(params.outerSelector)

	$(elements).css("height", max)

}

/**
 * this motherfucker function give me the "empty" space in a div...
 * 
 * @param outerSelector
 * @param innerSelectorsArray
 * @param
 */
function restHeight(params) {
	var usedWidth = 0;

	var outerElement = $(params.outerSelector)

	$.each(params.innerSelectorsArray, function(index, value) {

		usedWidth += (outerElement.find(value)).outerHeight()
	})

	return (outerElement.height() - usedWidth)

}

/**
 * Used to get a json object no mater
 */
function safeParseJson(json) {

	if (json instanceof String) {
		json = $.parseJSON(json);
	}

	return json

}

function numericOrZero(a) {
	if ($.isNumeric(a)) {
		return parseFloat(a)
	} else {
		return 0
	}
}

/**
 * @param elements
 * @param container:
 *        Used as pivot to add the new element, default elements itselves
 * @param html
 * @param event:
 *        //default click
 * @param insertPosition:
 *        //default before after or before
 * @param elementEvents
 * @param triggerInput =
 *        {true | false}
 */

function addElement(params) {
	console.log(params)

	var event = objectOrDefault(params.event, "click")
	var elements = getElements(params.elements)

	console.log(params.elements)
	console.log(elements)
	console.log($(".icon-plus"))

	if (!empty(params.container)) {
		elements = $(params.container).find(elements)
	}

	$(elements).unbind(event)
	$(elements).on(event, function(evx) {

		console.log(params.container)
		var containerx = getContainerElement(this, params.container)
		console.log(containerx)

		switch (params.insertPosition) {

			case "after":
				$(containerx).after(params.html)
				break;
			case "before":
			default:
				$(containerx).before(params.html)

		}

		if (exists(params.elementEvents)) {
			params.elementEvents(this)
		}

		if (params.triggerInput) {
			var tiparams = {}
			tiparams.selector = this

			triggerInput(tiparams)
		}

	})

}

/**
 * @DEPRECATED use getContainerElement2 (there is no getContainerElement2 dumbass)
 */
function getContainerElement(element, container) {
	if (empty(container)) {
		return element
	} else {
		return ($(element).closest(container))
	}
}

function markEditedElements() {
	$("*:not(edited)").on("input", function(event) {
		$(this).addClass("edited")
		$(this).unbind("input")

	})

}

function isInt(n) {
	return +n === n && !(n % 1);
}

function isFloat(n) {
	return +n === n;
}

function assert(condition, message) {
	if (!condition) {
		throw message || "Assertion failed";
	}
}

function triggerInput(elementParams) {

	var elmnt = getElements(elementParams)
	console.log(elmnt)
	$(elmnt).trigger("input")

}

/**
 * IMPORTANT!!!!: this function asume that you have a hidden input element with the base url in
 * grails would be something like this: <input id="baseURL" type="hidden" value ="${resource()}"> I
 * know, I'm so fucking lazy
 */
function getBaseURL() {

	return $("#baseURL").val()

}

/**
 * IMPORTANT!!!!: Read getBaseURL() commet
 */
function getAbsolutePath(relative) {
	return getBaseURL() + relative
}

/* Kind of extending jquery on function */
function onx(event, selector, funcion) {
	switch (event) {
		case "enter":
			$(selector).keyup(function(e) {
				if (e.keyCode == 13) {
					funcion(this)
				}
			});
			break;
	}
}

/* Remove empty elements in a list */

function removeEmptyElemetsInList(lista) {

	var retArr = jQuery.map(lista, function(item, index) {

		if (empty(item)) {
			return null
		} else {
			return item
		}

	})

	return retArr

}

/**
 * Fake that the element had been modified
 */

function touch(selector) {
	$(selector).trigger("input")
}

/**
 * Used to prevent a element have a empty content, made to be used when we want to edit the content
 * directly with the contenteditable=true because when a element is completely empty, it disappears
 * U_U
 * 
 * @param selector
 * @param event
 * @param nonEmptyString:
 *        String to be put instead empty
 */
function neverEmpty(params) {

	var element = $(params.selector)

	// if (exists(element)) {

	$(document).on(params.event, params.selector, function() {

		var text = $(this).html()
		text = hardTrim(text)

		if (empty($.trim(text))) {
			$(this).html(params.nonEmpty)
		}

	});

	// element.on(, function() {

	// });

	// }

}

/**
 * Trims but includs &nbsp and <br/>, etc
 * 
 * @param text
 */
function hardTrim(text) {

	if (!exists(text)) {
		return ""
	}
	text = text.replace(/^\&nbsp\;|<br?\>*/gi, "").replace(/\&nbsp\;|<br?\>$/gi, "").trim();

	return text
}

// File shits, required jansy file uploader and jquery

function getFileBase64(idFileInput, fileBase64Container) {

	if (window.File && window.FileReader && window.FileList && window.Blob) {

		var files = document.getElementById(idFileInput).files;
		var file = files[0];

		if (files && file) {
			var reader = new FileReader();

			reader.onload = function(readerEvt) {
				var binaryString = readerEvt.target.result;
				var b64x = btoa(binaryString)
				// functionToBeExecuted(b64x)

				$(fileBase64Container).html(b64x)
			};

			reader.readAsBinaryString(file);
		}

	} else {
		alert('Utiliza un navegador moderno, como Firefox � Chrome');
	}

}

/**
 * @fileContainer: �ber container
 * @idFileInput: id of the input with type file
 * @fileBase64Container: container where the file encoded in base64 will be stored.
 */

function fileToBase64(fileContainer, idFileInput, fileBase64Container) {

	$('#' + idFileInput).on('change.bs.fileinput', function() {

		alert("nana")
		getFileBase64(idFileInput, fileBase64Container)

	});

	$(fileContainer + ' .close').on('click', function() {

		$(fileBase64Container).html("")

	});

}

function changeInfoMesage(type, message) {
	$(".alert").removeClass("alert-success alert-info alert-warning alert-danger")
	$(".alert").addClass(type)
	$(".alert").html(message)
	$(".alert").fadeIn('normal');

	setTimeout(function() {
		$(".alert").fadeOut('slow');
	}, 3500);

}

/**
 * Jquery hack to make contenteditable have some propeties normally reserved for input (forexample
 * autocompleate)
 */
function jQueryHackContenteditable() {
	// Modificacion
	(function($) {
		var original = $.fn.val;
		$.fn.val = function() {
			if ($(this).is('[contenteditable]')) {
				return $.fn.text.apply(this, arguments);
			}
			;
			return original.apply(this, arguments);
		};
	})(jQuery);
}

function preciseRound(num, decimals) {
	return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * BEGIN REQUIRES BIG.JS
 */

function preciseMultiplyOrNull(a, b) {
	if ($.isNumeric(a) && $.isNumeric(b)) {

		a = new Big(a)
		b = new Big(b)

		var tms = a.times(b)

		return tms;

	} else {
		return null;
	}
}

/**
 * END REQUIRES BIG.JS
 */

// requiere
String.prototype.startsWith = function(str) {
	return (this.match("^" + str) == str)
}

function overrideJQueryHtmlHardTrim() {

	(function($) {
		// Save a reference to the original html function
		jQuery.fn.originalHtml = jQuery.fn.html;
		// Let's redefine the html function to include a custom event
		jQuery.fn.html = function() {

			var currentHtml = this.originalHtml();

			if (arguments.length) {
				jQuery.fn.originalHtml.apply(this, arguments);
				return this
			} else {

				if (currentHtml) {
					currentHtml = currentHtml.replace(/\t/g, '')
					currentHtml = currentHtml.replace(/\n/g, ' ')
					return hardTrim(currentHtml)
				} else {
					return this.originalHtml();
				}
			}

			// return hardTrim(currentHtml)

		}
	})(jQuery);

}

function jQueryHtmlToNormal() {

	if (jQuery.fn.originalHtml != null) {
		jQuery.fn.html = jQuery.fn.originalHtml
	}
}

// formating number
Number.prototype.formatNumber = function(n, x) {
	var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
};


String.prototype.formatNumber = function(n, x) {
	


	if(isNaN(this)){
		return this
	}
	var thiz = parseFloat(this)

	var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return thiz.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
};


String.prototype.unformatNumber = function() {
	return this.split(",").join("");
};


