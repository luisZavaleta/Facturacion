$(document).ready(function() {
	configRegimenFiscal()

	/*
	 * avoidEmptyFields() cleanDefaultValue()
	 * 
	 * modalConfig() saveConfigurationEvent() autoCompleateRegimenFiscal()
	 */

});

function configRegimenFiscal() {

	var defaultValue = "Persona física con actividades empresariales"

	var element = $(".regimen-fiscal-text")

	element.on("focus")

}

var structure = {}

var regimenFiscal = {}

structure.childs = [ regimenFiscal ]

regimenFiscal.selector = ".regimen-fiscal-text"
regimenFiscal.autocompleate = ""
regimenFiscal.notEmpty = true
regimenFiscal.defaultValue = "Régimen de actividades empresariales y profesionales"
