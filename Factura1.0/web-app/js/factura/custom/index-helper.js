function modalConfig() {
	$(".boton.config").on("click", function() {
		$('#modal-config').modal({
			show : true,
			keyboard : false
		})
	})
}

function avoidEmptyFields() {
	var notEmpty = {}

	notEmpty.selector = ".no-empty-plz"
	notEmpty.event = "focusout"
	notEmpty.nonEmpty = "---"

	neverEmpty(notEmpty)

}

function cleanDefaultValue() {

	$(document).on("focus", ".no-empty-plz", function() {

		if ($(this).html() == "---") {
			$(this).html("")
		}

	})
}

function saveConfigurationEvent() {

	$(".guardar-config-llaves").on("click", function() {
		saveConfiguration()

	})
}

function autoCompleateRegimenFiscal() {

	var availableTags = [ "Actividad empresarial", "Arrendamiento de Inmuebles", "Asalariados", "Asociaciones religiosas",
			"Consolidaci\u00f3n fiscal", "Honorarios", "Incorporaci\u00f3n fiscal",
			"Personas morales con fines no lucrativos", "Personas morales del r\u00e9gimen general",
			"Personas morales del r\u00e9gimen simplificado", "Servicios profesionales" ];

	$(".regimen-fiscal-text").autocomplete({
		source : availableTags

	});
}