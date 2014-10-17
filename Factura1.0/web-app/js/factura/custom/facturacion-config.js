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
var custom1 = {}
var custom2 = {}

var metodoDePago = {}
var numCtaPago = {}

var telefonoEmisor = {}
var correoEmisor = {}
var webEmisor = {}

structure.conceptos = conceptos

conceptos.selector = ".table-productos tbody"
conceptos.trHtml = getConceptosTr()
conceptos.defaultValue = "---"
conceptos.skip = [ 6 ]

structure.fields = [ regimenFiscal, nombreReceptor, rfcReceptor, calleReceptor, intReceptor, extReceptor, coloniaReceptor,
		cpReceptor, ciudadReceptor, estadoReceptor, paisReceptor, custom1, custom2, metodoDePago, numCtaPago,
		telefonoEmisor, correoEmisor, webEmisor ]

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

custom1.selector = ".custom1"
custom1.defaultValue = "Debemos y pagaremos la cantidad descrita en el presente documento."
addBaseOption(custom1)

custom2.selector = ".custom2"
custom2.defaultValue = "Si esta factura no se paga a su vencimiento generará intereses moratorios del 5% Mensual "
addBaseOption(custom2)

metodoDePago.selector = ".metodoDePago"
metodoDePago.defaultValue = "Efectivo"
addBaseOption(metodoDePago)
metodoDePago.autocompleate = metodoPago

numCtaPago.selector = ".NumCtaPago"
numCtaPago.defaultValue = "No aplica"
addBaseOption(numCtaPago)

telefonoEmisor.selector = ".telefono-emisor"
telefonoEmisor.defaultValue = "---"
addBaseOption(telefonoEmisor)

correoEmisor.selector = ".correo-emisor"
correoEmisor.defaultValue = "---"
addBaseOption(correoEmisor)

webEmisor.selector = ".web-emisor"
webEmisor.defaultValue = "---"
addBaseOption(webEmisor)

/*
 * var telefonoEmisor = {}
var correoEmisor = {}
var webEmisor = {}

 * */

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
