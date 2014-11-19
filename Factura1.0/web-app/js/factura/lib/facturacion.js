var debug = true

function facturize(structure) {

	if (debug) {
		console.log("FACTURA STRUCTURE")
		console.log(JSON.stringify(structure))

	}

	// make logo editable
	if (!!structure.logo) {
		makeImageEditable(structure.logo)
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

	console.log("===changeDomicilio======>")
	changeDomicilio()

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

function changeDomicilio() {
	
	console.log("===changeDomicilio== IN ====>")
	var params = {}

	params.selector = ".domicilio-emisor"
	params.title = "Modificar domicilio del emisor"
	params.modalSelector = "#modal-domicilio"
	params.dataSelector = ".main-data"

	//openModalVulcano(params)

	params = jQuery.extend(true, {}, params);
	params.modalSelector = "#modal-lugar"
	params.selector = ".lugar-expedicion"
	//openModalVulcano(params)

}

function editLogo(imageParams) {
	editMyElement()

	makeImageEditable(imageParams)
}

function getDataFromFacturaHtml() {

	var paramsDatosFactura = [ {
		"name": "regimenFiscal",
		"selector" : ".regimen-fiscal",
		"type" : "val"
	}, {
			"name": "regimenFiscal",
			"selector" : ".regimen-fiscal",
			"type" : "val"
		}, 

	{
		"selector" : "tr",
		"name" : "tabla",
		"data" : [ {
			"selector" : ".hola",
			"type" : "html",
			"name" : "hola"
		}, {
			"selector" : ".adios",
			"type" : "html",
			"name" : "adios"
		}, {
			"selector" : "td input",
			"type" : "val",
			"name" : "ok"
		} ],
		"type" : "collection"

	}, {
		"selector" : ".divTest2 input",
		"type" : "val",
		"name" : "test2"
	} ];

}
