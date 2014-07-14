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

	$(".regimen-fiscal-text").autocomplete({
		source : availableTags

	});
}

