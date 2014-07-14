var debug = true

$(document).ready(function() {

	/*
	 * configRegimenFiscal() /* avoidEmptyFields() cleanDefaultValue()
	 * 
	 * modalConfig() saveConfigurationEvent() autoCompleateRegimenFiscal()
	 */

	facturize(structure)

});

var regimenFiscal = {}
var nombreReceptor = {}
var rfcReceptor = {}
var calleReceptor = {}
var intReceptor = {}
var extReceptor = {}
var coloniaReceptor = {}
var cpReceptor = {}
var ciudadReceptor = {}
var estadoReceptor = {}
var paisReceptor = {}

var structure = [ regimenFiscal, nombreReceptor, rfcReceptor, calleReceptor, intReceptor, extReceptor, coloniaReceptor,
		cpReceptor, ciudadReceptor, estadoReceptor, paisReceptor ]

var baseOptions = {}

baseOptions.editable = true
baseOptions.notEmpty = true
baseOptions.defaultValue = "---"
baseOptions.blankOnDefault = true

function addBaseOption(params) {

	params.editable = true
	params.notEmpty = true

	params.blankOnDefault = true

}

/***************************************************************************************************
 * * Régimen Fiscal
 **************************************************************************************************/

addBaseOption(regimenFiscal)
regimenFiscal.selector = ".regimen-fiscal"
regimenFiscal.autocompleate = regimenesFiscales

/***************************************************************************************************
 * * Nombre Receptor
 **************************************************************************************************/
nombreReceptor.selector = ".nombre-receptor"
nombreReceptor.defaultValue = "Escriba el nombre del cliente"
addBaseOption(nombreReceptor)

rfcReceptor.selector = ".rfc-receptor"
rfcReceptor.defaultValue = "Escriba el RFC del Cliente"
addBaseOption(rfcReceptor)

calleReceptor.selector = ".calle-receptor"
calleReceptor.defaultValue = "Escriba la calle del domicilio del cliente"
addBaseOption(calleReceptor)

intReceptor.selector = ".int-receptor"
intReceptor.defaultValue = "---"
addBaseOption(intReceptor)

extReceptor.selector = ".ext-receptor"
extReceptor.defaultValue = "---"
addBaseOption(extReceptor)

coloniaReceptor.selector = ".colonia-receptor"
coloniaReceptor.defaultValue = "Escriba la colonia del domicilio del cliente"
addBaseOption(coloniaReceptor)

cpReceptor.selector = ".cp-receptor"
cpReceptor.defaultValue = "Escriba C.P. del cliente"
addBaseOption(cpReceptor)

ciudadReceptor.selector = ".ciudad-receptor"
ciudadReceptor.defaultValue = "Escriba la ciudad del domicilio del cliente"
addBaseOption(ciudadReceptor)

estadoReceptor.selector = ".estado-receptor"
estadoReceptor.defaultValue = "Estado del dom. del cliente"
addBaseOption(estadoReceptor)

paisReceptor.selector = ".pais-receptor"
paisReceptor.defaultValue = "México"
addBaseOption(paisReceptor)

function facturize(structure) {

	if (debug) {
		console.log("FACTURA STRUCTURE")
		console.log(JSON.stringify(structure))

	}

	$.each(structure, function(index, value) {

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

					if (item.html() == value.defaultValue) {
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