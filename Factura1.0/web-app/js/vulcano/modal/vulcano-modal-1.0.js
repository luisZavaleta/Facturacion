/***************************************************************************************************
 * The objetive of this module is to use modals as helpers to add data to the main page. I mean open
 * a custom modal and once the user "save" the data that data will be attached to some element in
 * the main html page. This element can be visible or invisible if we just want to store the data,
 * this data will be obtained later with javascript and normally wiil be send to the server using
 * ajax, but that last part is not cover in this module.
 **************************************************************************************************/

/**
 * Opens a modal to change some address
 * 
 * @selector: Selector of the element to be clicked in order to open the modal.
 * @modalSelector: Selector of the modal html (Must be hidden in the main page)
 * @title: Title of the modal
 * @dataId: Id used to differenciate a modal from another when is closed if not defined then it use
 *          the selector
 * @mainpageContainer: Selector of the container where the elements will be stored onece the user
 *                     click the "save" button, default selector.
 */
function openModalVulcano(params) {

	if (!params.modalSelector) {
		params.modalSelector = "#vulcano-modal"
	}

	if (!params.dataId) {
		params.dataId = params.selector
	}

	if (!params.mainpageContainer) {
		params.mainpageContainer = params.selector
	}

	$(params.selector).on("click", function() {
		$(params.modalSelector).attr("data-id", params.dataId)
		$(params.modalSelector).attr("data-container", params.dataId)
		$(params.modalSelector + ' .modal-title').html(params.title)// convention over configuration
		$(params.modalSelector).modal({
			show : true,
			keyboard : false
		})
	})

	console.log("closeModalVulcano===(params)===>")
	closeModalVulcano(params)
}

/**
 * @selector: Selector of the element to be clicked in order to open the modal.
 * @modalSelector: Selector of the modal html (Must be hidden in the main page)
 * @dataSelector: Optiona, define a common inner sub-selector, while main data will be store using
 *                this sub-selector, data-modal prefix and data-modal-sufix won't use it.
 */
var cont = 0;
function closeModalVulcano(params) {

	console.log("closeModalVulcano======>")

	$(document).off("click", params.modalSelector + " .guardar-modal");

	$(document).on("click", params.modalSelector + " .guardar-modal", function() {

		console.log("GUARDANDO== a====> OUT")

		$('input[data-main-selector]').each(function(index, value) {

			console.log("GUARDANDO== a====>" + cont++)
			var val = $(value).val()
			var element = $(params.selector + " " + $(this).attr("data-main-selector"))

			if (!val) {

				if (!!params.dataSelector) {

					var span = element.find(params.dataSelector).detach()
					span.empty()
					element.empty()
					element.append(span)

				}

				return true;
			}

			if (!!params.dataSelector) {

				var span = element.find(params.dataSelector).detach()

				element.empty()
				element.append(span)
				element.find(params.dataSelector).html(val)

				element = element.find(params.dataSelector)

			} else {
				element.html(val)
			}

			if ($(this).attr("data-modal-prefix")) {
				element.before($(this).attr("data-modal-prefix"))
			}

			if ($(this).attr("data-modal-sufix")) {
				element.after($(this).attr("data-modal-sufix"))
			}

		})
	})

}

function getModalHtml() {

	var html = '';

	html += '<div id="vulcano-modal" class="modal fade" tabindex="-1" data-width="auto" style="display: none;">';
	html += '	<div class="modal-body modal-body-vcms">Este texto se modificará de forma dinámica</div>';
	html += '	<div class="modal-footer">';
	html += '		<button type="button" data-dismiss="modal" class="btn btn-default">Cerrar</button>';
	html += '		<button type="button" class="btn btn-primary guardar-modal-vcms" data-dismiss="modal">Guardar</button>';
	html += '	</div>';
	html += '</div>';

	return html;

}

function addBaseModal() {
	
	console.log("ADD BASE MODAL VULCANO MODAL 1.0")
	var htmlModal = getModalHtml();
	$("body").append(htmlModal);
}

/***************************************************************************************************
 * Elements in the modal most have the arttribute data-main-selector indicating the selector of the
 * main page, this selector must be inside the modalSelector.
 **************************************************************************************************/
