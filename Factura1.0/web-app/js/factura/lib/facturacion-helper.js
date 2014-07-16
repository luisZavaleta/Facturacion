/**
 * True if all the tds in a given tr are empty
 * 
 * @defaultValue: default value, the element is "empty" event if the td have this value
 * @skip: Array with indexes (0-index) of the TD that will be skiped in order.
 * @wrapper: Optional selector of the wrapper for the real text, for example in
 *           <td><span></span>
 *           <td> the span tag is the wrapper and the fuction check if the span is empty.
 * @tr: Tr to be searched
 */
function isTrEmpty(params) {
	var isEmpty = true;
	var tds;
	if (!!params.wrapper) {
		tds = $(params.tr).find("td " + params.wrapper)
	} else {
		tds = $(params.tr).find("td")
	}
	var skipCont = 0
	$.each(tds, function(i, val) {
		if (!!params.skip && i == params.skip[skipCont]) {
			skipCont++;
		} else {
			var txt = hardTrim($(this).html())
			if (!!txt && txt != params.defaultValue) {
				isEmpty = false;
				return false;// this only break the each but doesn't return a value
			}
		}
	})
	return isEmpty;
}

/**
 * Delete TR if empty
 * 
 * @selector:table selector
 * @defaultValue: default value, the element is "empty" event if the td have this value
 * @skip: Array with indexes (0-index) of the TD that will be skiped in order.
 * @wrapper: Optional selector of the wrapper for the real text, for example in
 *           <td><span></span>
 *           <td> the span tag is the wrapper and the fuction check if the span is empty.
 */
function deleteInnerEmptyTr(params) {

	var trs = $(params.selector + " tr:not('.dummie'):not(:last-child)")

	if (trs.length > 1) {

		trs.map(function() {
			params.tr = $(this)
			if (isTrEmpty(params)) {
				$(this).remove()
			}
		})
	}
}

/**
 * Add a new empty TR at the end of the table if last TR is not empty *
 * 
 * @selector:table selector
 * @defaultValue: default value, the element is "empty" event if the td have this value
 * @skip: Array with indexes (0-index) of the TD that will be skiped in order.
 * @wrapper: Optional selector of the wrapper for the real text, for example in
 *           <td><span></span>
 *           <td> the span tag is the wrapper and the fuction check if the span is empty.
 * @trHtml: tr html
 */
function addLastTrIfNotEmpty(params) {
	var lastTr = $(params.selector + " tr:not('.dummie')").last()
	if (!!lastTr) {
		params.tr = lastTr
		if (!isTrEmpty(params)) {
			$(lastTr).after(params.trHtml)
		}
	}
}
