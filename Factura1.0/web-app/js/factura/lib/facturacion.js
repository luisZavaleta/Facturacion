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

			
				item.autocomplete({
					source : value.autocompleate
				});

			}

		}
	})

}

function configTablaConceptos(conceptos) {

	// ADD ONE TR ON LOAD IF EMPTY
	var tdSelector = conceptos.selector + " td"

	addTROnLoad(conceptos)
	cleanOnFocus(conceptos, tdSelector)
	preventEmpty(conceptos, tdSelector)

	$(document).on("focusout", tdSelector, function() {
		deleteInnerEmptyTr(conceptos)
		addLastTrIfNotEmpty(conceptos)
	})

	cleanValueAndUnitarioIfNotNumber()
	calculateImporte()

}


