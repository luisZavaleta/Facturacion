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

var structure = {}

var conceptos = {}

structure.conceptos = conceptos

conceptos.selector = ".table-productos tbody"
conceptos.trHtml = getConceptosTr()
conceptos.defaultValue = "---"
conceptos.skip = [ 6 ]

structure.fields = [ regimenFiscal, nombreReceptor, rfcReceptor, calleReceptor, intReceptor, extReceptor, coloniaReceptor,
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

function getConceptosTr() {
	var conceptosTr = multiline(function() {/*
				<tr class="title">
					<td contenteditable="true">---</td>
					<td class="cantidad" contenteditable="true">---</td>
					<td contenteditable="true">---</td>
					<td class="descripcion" contenteditable="true">---</td>
					<td class="unidad" contenteditable="true">---</td>
					<td class="valorUnitario" contenteditable="true">---</td>
					<td class="importe">0</td>
				</tr>
			*/
	});

	return conceptosTr;
}
