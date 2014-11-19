/***************************************************************************************************
 * The objetive of this module is to use modals as helpers to add data to the main page. I mean open
 * a custom modal and once the user "save" the data that data will be attached to some element in
 * the main html page. This element can be visible or invisible if we just want to store the data,
 * this data will be obtained later with javascript and normally wiil be send to the server using
 * ajax, but that last part is not cover in this module.
 **************************************************************************************************/

/**
 * Open modal function contant some temporal values that will ve valid only in the scope of a modal,
 * it should be created before the modal windows opens and cleared after the modal window is closes.
 */
var vulcanoModalParams = {}
vulcanoModalParams.element = null;
vulcanoModalParams.openFunction = null;
vulcanoModalParams.closeFunction = null;

var vulcanoModal = {}

vulcanoModal.getElement = function() {
	return vulcanoModalParams.element;

}

/**
 * @return {void}
 */
vulcanoModal.init = function() {
	addBaseModal();

}

/**
 * Function to be executed before the modal opens, it change the html of the modal and add all the
 * recesary variables, also clean everything once the modal is closed. // *
 * 
 * @param {HTMLElement} element: Selector of the clickable element that will be triger the opening
 *        of the modal.
 * @param {function()} openFunction: Function that will be executed before the element opens.
 * @param {function()} closeFunction: Function that will be executed before the element close.
 * @param {String} modalHtml: Html that will be setted in the body of the modal, before the modal
 *        opens.
 * @param {JSONObject} css: CSS that we want to aply to an element once the modal is created, we add
 *        a extra attribute called selected that indicates the delector of the elements in which the
 *        css will be applied. Example: <br>
 *        <code>
 * 				imageParams.css = {
 * 					"selector" : ".fileinput-new img, .fileinput-preview img",
 *					"width" : '2.63in',
 *					"height" : '100px'
 *				}
 * 		</code>
 */
vulcanoModal.openModal = function(params) {

	modalEvents()

	console.log(JSON.stringify())
	if (params.element) {
		vulcanoModalParams.element = params.element;
	}
	if (params.openFunction) {
		vulcanoModalParams.openFunction = params.openFunction;
	}
	if (params.closeFunction) {
		vulcanoModalParams.closeFunction = params.closeFunction;
	}

	$("#vulcano-modal .modal-body").html(params.modalHtml);

	setModalCss(params.css)

	$('#vulcano-modal').bind("DOMSubtreeModified", function() {
		setModalCss(params.css)
	});

	$("#vulcano-modal").modal({

	});

	// saveModal(params.closeFunction)
	// closeModalEvent(params.closingFunction);
}

/**
 * @params selector: Selector of the element that all the css attributes will be applied on, if null
 *         then css attributes will be applied over ".modal-body-vcms" that is the modal body
 *         container.
 * @params x: Any css valid attribute.
 */
function setModalCss(params) {

	if (!!params) {
		if (!params.selector) {
			params.selector = ".modal-body-vcms"
		}

		for (variable in params) {
			if (params.hasOwnProperty(variable) && variable != "selector") {

				$(params.selector).css(variable, params[variable])

			}
		}
	}

}

/**
 * @returns {String} Base modal html.
 */
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

/**
 * Add base modal html to the webpage.
 */
function addBaseModal() {
	var modal = $("#vulcano-modal");

	if (!modal.exists()) {
		var htmlModal = getModalHtml();
		$("body").append(htmlModal);
	}
}

/**
 * Manage different modal events.
 * 
 * @param {function} openFunction: Function to be executed instants after the modals open.
 * @param {function} closeFunction: Function to be executes instants before the modals closes.
 */
function modalEvents(openFunction, closeFunction) {

	$("#vulcano-modal").on("show.bs.modal", function(e) {

		if (!!vulcanoModalParams.openFunction) {
			vulcanoModalParams.openFunction();
		}

	})

	$("#vulcano-modal").on("hide.bs.modal", function(e) {

		if (!!vulcanoModalParams.closeFunction) {
			vulcanoModalParams.closeFunction();
		}

	})

	$("#vulcano-modal").on("hidden.bs.modal", function(e) {
		cleanModalParams()
	})

}

/**
 * Cleans everything global variables and othher stuffs created in this modal.
 */
function cleanModalParams() {

	vulcanoModalParams.element = null;
	vulcanoModalParams.openFunction = null;
	vulcanoModalParams.closeFunction = null;

	$(document).off("click", ".guardar-modal-vcms");
	$(document).off("modal.setImage.after");
	$("#vulcano-modal .modal-body").html("");

}
