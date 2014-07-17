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

	var lengthx = trs.length

	trs.map(function() {
		if (lengthx > 1) {
			lengthx--;
			params.tr = $(this)
			if (isTrEmpty(params)) {
				$(this).remove()
			}
		}
	})

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

/**
 * If the table is empty it adds a empty TR.
 */
function addTROnLoad(conceptos) {

	var tabla = $(conceptos.selector)
	var trs = tabla.find("tr:not('.dummie')")
	if (trs.length == 0) {
		tabla.prepend(conceptos.trHtml)
		trs = tabla.find("tr:not('.dummie')")
	}

	var tds = trs.find("td")

	$.map(tds, function(td, i) {
		if (!$(td).html()) {
			$(td).html(conceptos.defaultValue)
		}
	});
}

/**
 * If a td gain focus and has the default value it is cleaned
 */
function cleanOnFocus(conceptos, tdSelector) {
	$(document).on("focus", tdSelector, function() {

		if (hardTrim($(this).html()) == hardTrim(conceptos.defaultValue)) {
			$(this).html("")
		}
	})
}

/**
 * Prevent any td from being empty, if it's empty it inserts a default value instead.
 */
function preventEmpty(conceptos, tdSelector) {

	if (!conceptos.defaultValue) {
		conceptos.defaultValue = "---"
	}
	var notEmptyParams = {}
	notEmptyParams.selector = tdSelector
	notEmptyParams.event = "focusout"
	notEmptyParams.nonEmpty = conceptos.defaultValue
	neverEmpty(notEmptyParams)
}

/**
 * Check if the value given to cantidad and valor unitario are not numbers, in that case delete the
 * value.
 */
function cleanValueAndUnitarioIfNotNumber() {

	var params = {}
	params.selector = ".cantidad"
	params.live = true
	params.defaultValue = "---"
	cleanIfNotNumber(params)

	params.selector = ".valorUnitario"
	cleanIfNotNumber(params)
}

/**
 * If cantidad and valor unitario has valid values then calculate and insert the Importe.
 */
function calculateImporte() {

	$(document).on("focusout", ".cantidad, .valorUnitario", function() {

		var cantidad = $(this).parent().find(".cantidad").html()
		var valor = $(this).parent().find(".valorUnitario").html()

		cantidad = cantidad.unformatNumber()
		valor = valor.unformatNumber()

		if (!!cantidad && !!valor && !isNaN(cantidad) && !isNaN(valor)) {

			var importex = preciseMultiplyOrEmpty(cantidad, valor)
			var importe = $(this).parent().find(".importe")
			importe.html(importex.toString().formatNumber(2, 3))
			calcularTotales()

		}

	})
}

function calcularTotales(iva) {
	if (!iva) {
		iva = new Big(0.16)
	} else {
		iva = new Big(iva)
	}

	var importes = $(".importe:not('.colored')")
	var subtotal = new Big(0)

	importes.map(function() {
		var value = $(this).html()
		value = value.unformatNumber()
		if (!!value && !isNaN(value)) {
			subtotal = subtotal.plus(value)
		}
	})

	var factorTotal = iva.plus(1)
	var total = subtotal.times(factorTotal)

	$(".subtotal").html("$" + subtotal.toString().formatNumber(2, 3))
	$(".iva").html("$" + subtotal.times(iva))

	$(".total").html("$" + total)

	fillImporteLetra(total.toString().formatNumber(2, 999))

}

function fillImporteLetra(letra) {

	$.post(getAbsolutePath("/util/letra/" + letra)).done(function(data) {

		$(".importe-letra").html(data);

	});
}