var debug = false
var verbose = false

function exists(object) {
	return !!object
}

function empty(object) {
	if (!!object) {
		if (object.length != undefined && object.length <= 0) {
			return true
		} else {
			return false
		}
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

/***************************************************************************************************
 * Add some element to a json or a array, if the element does not exist add the default value
 **************************************************************************************************/

function addValToParameter(val, paramName, params, defaultValue) {

	if (exists(defaultValue) && val.trim() == "") {
		val = defaultValue
	}

	if (exists(val)) {
		params[paramName] = val
	}

}

/***************************************************************************************************
 * Requires BIG.js
 * 
 * @test http://jsfiddle.net/VKehf/
 **************************************************************************************************/
Number.prototype.sumOrNull = function(b) {
	try {
		var sum = Big(this).plus(Big(b))
		return parseFloat(sum.toString())
	} catch (e) {
		return null
	}

}

/***************************************************************************************************
 * Requires BIG.js
 * 
 * @test: http://jsfiddle.net/VKehf/1/
 **************************************************************************************************/

Number.prototype.sumOrFirst = function(b) {
	var sum = this.sumOrNull(b)
	if (sum == null) {
		return this
	} else {
		return sum
	}
}

/***************************************************************************************************
 * Requires BIG.js
 * 
 * @test http://jsfiddle.net/JE83M/
 **************************************************************************************************/

Number.prototype.restOrNull = function(b) {
	return this.sumOrNull(-b)
}

/***************************************************************************************************
 * Requires BIG.js
 * 
 * @test http://jsfiddle.net/JE83M/1/
 **************************************************************************************************/
Number.prototype.multiplyOrNull = function(b) {
	var mult = Big(this).times(Big(b))

	if (!mult) {
		return null
	} else {
		return parseFloat(mult.toString())
	}
}

/***************************************************************************************************
 * Requires Jquery
 * 
 * @test http://jsfiddle.net/JE83M/3/
 **************************************************************************************************/
function numericOrMinusOne(a) {
	return numericOrDefault(a, -1)
}

/***************************************************************************************************
 * Requires Jquery
 * 
 * @test http://jsfiddle.net/JE83M/2/
 **************************************************************************************************/
function numericOrDefault(a, defaultValue) {
	if ($.isNumeric(a)) {
		return parseFloat(a)
	} else {
		return defaultValue
	}
}
/* Return all the inner html of the elements in an array of elements */
function getAllHtml(elements) {

	var retArr = jQuery.map(elements, function(item, index) {
		return objectOrEmptyString($(item).html())
	})

	return retArr

}

/* Return all the text of the elements in an array of elements */
function getAllTexts(elements) {

	var retArr = jQuery.map(elements, function(item, index) {
		return objectOrEmptyString($(item).text())
	})

	return retArr

}

function getAllAttr(elements, type) {

	var retArr = jQuery.map(elements, function(item, index) {

		return objectOrEmptyString($(item).attr(type))
	})

	return retArr

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
		return parseInt(a)
	} else {
		return 0
	}
}

function markEditedElements() {

	$(document).on("input", "*:not(edited)", function(event) {
		$(this).addClass("edited")
		$(this).unbind("input")

	})

}
/**
 * Check if a var is int, accept Strings
 */
function isInt(n) {

	if (typeof n == "string") {
		n = parseFloat(n)
	}

	return +n === n && !(n % 1);
}

/**
 * Check if a var is float, accept Strings
 */
function isFloat(n) {

	if (typeof n == "string") {
		n = parseFloat(n)
	}

	return +n === n;
}

function assert(condition, message) {
	if (!condition) {
		console.error(message || "Assertion failed")
	}
}

/**
 * IMPORTANT!!!!: this function asume that you have a hidden input element with the base url; in
 * grails would be something like this: <input id="baseURL" type="hidden" value ="${resource()}"> I
 * know, I'm so fucking lazy
 */
function getBaseURL() {

	return $("#baseURL").val()

}

/**
 * IMPORTANT!!!!: Read getBaseURL() comment
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

// added 22 Marzo 2014
String.prototype.contains = function(it) {
	return this.indexOf(it) != -1;
};

/***************************************************************************************************
 * @require JQuery
 * @test http://jsfiddle.net/W2Dys/
 **************************************************************************************************/
Array.prototype.contains = function(value, ignoreCase) {
	if (ignoreCase) {
		var contains = false
		var lowerValue = value.toLowerCase();
		$.each(this, function(index, element) {
			if (element.toLowerCase() == lowerValue) {
				contains = true;
				return false;
			}
		})
		return contains
	} else {
		return (this.indexOf(value) != -1)
	}
};

// error management, use webStorage, only supported in Internet Explorer 8+, Firefox, Opera, Chrome,
// and Safari.

// added Abril 20

function addError(error) {
	if (!!error) {
		var errorsInSession;
		if (!!sessionStorage.errors) {
			errorsInSession = JSON.parse(sessionStorage.errors)
		} else {
			errorsInSession = []
		}

		if (!(errorsInSession instanceof Array)) {
			errorsInSession = []
		}

		errorsInSession.push(error)
		sessionStorage.errors = JSON.stringify(errorsInSession)

	}

}

function getErrors() {

	var errorsInSession;
	if (!!sessionStorage.errors) {
		return JSON.parse(sessionStorage.errors)
	} else {
		return null
	}

}

function cleanErrorMessages() {
	sessionStorage.errors = null
}

String.prototype.replaceAll = function(s, r) {
	return this.split(s).join(r)
}

String.prototype.fixTildes = function() {

	var str = this

	alert(str)
	str = str.replaceAll("á", "\u00e1")

	str = str.replaceAll("é", "\u00e9")
	str = str.replaceAll("í", "\u00ed")
	str = str.replaceAll("ó", "\u00f3")
	str = str.replaceAll("ú", "\u00fa")
	str = str.replaceAll("Á", "\u00c1")
	str = str.replaceAll("É", "\u00c9")
	str = str.replaceAll("Í", "\u00cd")
	str = str.replaceAll("Ó", "\u00d3")
	str = str.replaceAll("Ú", "\u00da")
	str = str.replaceAll("ñ", "\u00f1")
	str = str.replaceAll("Ñ", "\u00d1")
	alert(str)
	return str
}

// Added 23 de Marzo 2014

/**
 * IMPORTANT!!!!: this function asume that you have a hidden alert message; for example: <div
 * class="alert alert-warning fade in vulcano-alert"> <button class="close" aria-hidden="true"
 * data-dismiss="alert" type="button">×</button> <span class="message"> <strong>Holy guacamole!</strong>
 * </span> </div> Also that you're usinf twitter bootstrap 2
 * 
 * @param type:
 *        can be success, info, warning or danger
 */

function showMessage(message, type) {

	var alertDiv = $(".vulcano-alert")
	alertDiv.removeClass("alert-success alert-info alert-warning alert-danger")

	switch (type) {
		case "success":
			alertDiv.addClass("alert-success")
			break;
		case "info":
			alertDiv.addClass("alert-info")
			break;
		case "warning":
			alertDiv.addClass("alert-warning")
			break;
		case "danger":
			alertDiv.addClass("alert-danger")
			break;
		default:
			alertDiv.addClass("alert-info")

	}

	alertDiv.find(".message").html(message)

	$(".vulcano-alert").css("display", "block")

}

function closeMessage() {
	$(".vulcano-alert").css("display", "none")

}

// Added 24 de Marzo 2014

function getDateSubstracionInMinutes(date1, date2) {

	// Check for common problems like passing a String with a number instead of a Long

	if (!(date1 instanceof Date)) {
		date1 = new Date(date1)
	}

	if (!(date2 instanceof Date)) {
		date2 = new Date(date2)
	}

	if (date1 instanceof Date && date2 instanceof Date) {

		var dateMilis = Math.abs(date1 - date2);

		return (dateMilis / 1000 / 60)

	} else {
		return null
	}

}

function changeSelectedByValue(selector, value) {

	$(selector + ' option:contains("' + value + '")').prop('selected', true);

	// chosen hack

	if (!!$(".chosen-single")) {
		$(".chosen-single span").html(value)
	}

}

// Added Marzo 26 2014

/**
 * Used for other kind os messages beside errors that want to be stored in the html5 session
 * addMessage("errors", message) = addError()
 */
function addMessage(type, message) {
	if (!!message) {
		var messageInSession;
		if (!!sessionStorage[type]) {
			messageInSession = JSON.parse(sessionStorage[type])
		} else {
			messageInSession = []
		}

		if (!(messageInSession instanceof Array)) {
			messageInSession = []
		}

		messageInSession.push(message)
		sessionStorage[type] = JSON.stringify(messageInSession)

	}

}

// Added Marzo 27 2014

function getHtmlElement(selector, index, parent) {

	if (!!index && !!parent) {
		return ($(parent).find(selector)).eq(index)
	}

	if (!!index) {
		return $(selector).eq(index)
	}

	if (!!parent) {
		return $(parent).find(selector)
	}

	return $(selector)

}

// Added Mayo 26 2014
/*
 * input also works with contenteditable=true
 */
function setEqualHeight(selector, triggerOnInput, triggerOnResize) {
	var elements = $(selector)
	elements.css("height", "auto")
	var max = Number.NEGATIVE_INFINITY;
	$.each(elements, function(index, item) {
		if ($(item).height() > max) {
			max = $(item).height()
		}
	})
	$(selector).css("height", max + "px")

	if (!!triggerOnInput) {
		$(document).on("input", selector, function() {
			setEqualHeight(selector, false, false)

		})
	}

	if (!!triggerOnResize) {
		$(window).resize(function() {
			setEqualHeight(selector, false, false)
		})
	}
}

// Added Mayo 29 2014

JSON.toCssString = function(jsonObject) {
	var cssString = ""

	for (variable in jsonObject) {
		if (jsonObject.hasOwnProperty(variable)) {
			cssString += variable + ":" + jsonObject[variable] + ";"
		}
	}
	return cssString
}

// Added Mayo 30 2014 http://stackoverflow.com/a/6416527/597786

// LAST MODIFIED JUEVES 10 de JULIO

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
	$(document).on(params.event, params.selector, function() {
		var text = $(this).html()
		text = hardTrim(text)
		if (empty($.trim(text))) {
			$(this).html(params.nonEmpty)
		}
	});
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

function preciseMultiplyOrEmpty(a, b, decimals) {

	if (!decimals) {
		decimals = 2
	}
	if ($.isNumeric(a) && $.isNumeric(b)) {

		a = new Big(a)
		b = new Big(b)

		var tms = a.times(b)

		return tms.toFixed(2);

	} else {
		return "";
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

/**
 * Format a number, tranforming it to a String.
 * 
 * @param n:Integer
 *        length of decimal
 * @param x:Integer
 *        length of sections
 */
Number.prototype.formatNumber = function(n, x) {
	var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
};

String.prototype.formatNumber = function(n, x) {

	if (isNaN(this)) {
		return this
	}
	var thiz = parseFloat(this)

	var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return thiz.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
};

String.prototype.unformatNumber = function() {
	return this.split(",").join("");
};

// Added July 15

/***************************************************************************************************
 * fuction to add multiline funcionality to javascript example: var str = multiline(function() {/*
 * <!doctype html> <html> <body>
 * <h1>❤ unicorns</h1>
 * </body> </html> });
 * 
 * @author: Sindre Sorhus
 * @url: https://github.com/sindresorhus/multiline/blob/master/browser.js
 **************************************************************************************************/
!function(e) {
	if ("object" == typeof exports)
		module.exports = e();
	else if ("function" == typeof define && define.amd)
		define(e);
	else {
		var f;
		"undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self
				&& (f = self), f.multiline = e()
	}
}(function() {
	var define, module, exports;
	return (function e(t, n, r) {
		function s(o, u) {
			if (!n[o]) {
				if (!t[o]) {
					var a = typeof require == "function" && require;
					if (!u && a)
						return a(o, !0);
					if (i)
						return i(o, !0);
					throw new Error("Cannot find module '" + o + "'")
				}
				var f = n[o] = {
					exports : {}
				};
				t[o][0].call(f.exports, function(e) {
					var n = t[o][1][e];
					return s(n ? n : e)
				}, f, f.exports, e, t, n, r)
			}
			return n[o].exports
		}
		var i = typeof require == "function" && require;
		for ( var o = 0; o < r.length; o++)
			s(r[o]);
		return s
	})({
		1 : [ function(_dereq_, module, exports) {
			'use strict';
			var stripIndent = _dereq_('strip-indent');

			// start matching after: comment start block => ! or @preserve => optional whitespace =>
			// newline
			// stop matching before: last newline => optional whitespace => comment end block
			var reCommentContents = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;

			var multiline = module.exports = function(fn) {
				if (typeof fn !== 'function') {
					throw new TypeError('Expected a function.');
				}

				var match = reCommentContents.exec(fn.toString());

				if (!match) {
					throw new TypeError('Multiline comment missing.');
				}

				return match[1];
			};

			multiline.stripIndent = function(fn) {
				return stripIndent(multiline(fn));
			};

		}, {
			"strip-indent" : 2
		} ],
		2 : [ function(_dereq_, module, exports) {
			'use strict';
			module.exports = function(str) {
				var match = str.match(/^[ \t]*(?=[^\s])/gm);

				if (!match) {
					return str;
				}

				var indent = Math.min.apply(Math, match.map(function(el) {
					return el.length
				}));
				var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');

				return indent > 0 ? str.replace(re, '') : str;
			};

		}, {} ]
	}, {}, [ 1 ])(1)
});

// Added July 16

/**
 * Clean the html if the value is not a Number, if its a number format it
 * 
 * @selector: selector or element
 * @live: true if the funcion will be valid for elements created in the future
 * @defaultValue: default valu to be put in not Number fields, defaul empty
 */

function cleanIfNotNumber(params) {

	if (!params.defaultValue) {
		params.defaultValue = ""
	}

	if (!!params.live) {
		$(document).on("focusout", params.selector, function() {
			var value = $(this).html()
			value = value.unformatNumber()
			console.log(value)

			if (isFloat(value)) {
				$(this).html(value.formatNumber(2, 3))
			} else {
				$(this).html(params.defaultValue)
			}
		})
	} else {
		$(params.selector).on("focusout", function() {
			var value = $(this).html()
			value = value.unformatNumber()

			if (isFloat(value)) {
				$(this).html(value.formatNumber(2, 3))
			} else {
				$(this).html(params.defaultValue)
			}

		})
	}
}

function isString(str) {
	if (jQuery.type(str) == 'string') {
		return true
	} else {
		return false;
	}
}
