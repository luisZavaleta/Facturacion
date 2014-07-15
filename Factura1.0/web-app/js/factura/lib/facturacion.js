var debug = true

function facturize(structure) {

	if (debug) {
		console.log("FACTURA STRUCTURE")
		console.log(JSON.stringify(structure))

	}

	configTablaConceptos(structure.conceptos)

	$.each(structure.fields, function(index, value) {

		var item = $(value.selector)

		if (!!item) {

			if (!!value.editable) {
				item.attr("contenteditable", true)
			}

			if (!!value.notEmpty) {

				if (!value.defaultValue) {
					value.defaultValue = "---"
				}

				var notEmptyParams = {}

				notEmptyParams.selector = value.selector
				notEmptyParams.event = "focusout"
				notEmptyParams.nonEmpty = value.defaultValue

				neverEmpty(notEmptyParams)
			}

			if (!!value.blankOnDefault) {
				item.on("focus", function() {
					if (hardTrim(item.html()) == hardTrim(value.defaultValue)) {
						item.html("")
					}
				})

			}

			if (!!value.autocompleate) {

				console.log("AUTOCOMPLEATE")
				item.autocomplete({
					source : value.autocompleate
				});

			}

		}
	})

}

function configTablaConceptos(conceptos) {

	var tdSelector = conceptos.selector + " td"

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

	// blank of default and focus
	$(tdSelector).on("focus", function() {

		if (hardTrim($(this).html()) == hardTrim(conceptos.defaultValue)) {
			$(this).html("")
		}
	})

	// never empty

	if (!conceptos.defaultValue) {
		conceptos.defaultValue = "---"
	}

	var notEmptyParams = {}
	notEmptyParams.selector = tdSelector
	notEmptyParams.event = "focusout"
	notEmptyParams.nonEmpty = conceptos.defaultValue
	neverEmpty(notEmptyParams)

	$(document).on("focusout", tdSelector, function() {

		console.log("focusOut")
		addLastTrIfNotEmpty(conceptos)

	})

}
