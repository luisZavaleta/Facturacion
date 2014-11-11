var domElementModal = null // used to store temporally any webPage element that is using during the
// modal

function initCMS(siteConfig) {
	if (!siteConfig.structure.skipModal) {
		/** add hidden modal * */
		addBaseModal()

		/** delete domElementModal used to temporally store the clicked element * */
		closeModalEvent()
	}
	/** add save button and instanciate saveCMS() on save butto click * */
	addSaveButton(siteConfig)

	/** makes element editable * */
	makeElemetsEditable(siteConfig.structure)

	if (!siteConfig.structure.skipModal) {

		/** add edited class to all editable elements * */
		markEditedElements()

		/** Config Image picker in modal * */
		fileInputConfig()

		/** Defines actions to be made when the user click "Guardar" in the modal. * */
		saveModal()

		/** Add default delete element funcionality * */
		makeElementsDeletable()

		/** Add default create element funcionality * */
		makeElementsAddable()
	}

}

function makeElemetsEditable(structure) {

	/*
	 * In makeElemetsEditable to get the element that will be modified we use only the id(selector),
	 * because all "similar" elements will be modified in the same way, os we don't need to identify
	 * the elements one by one.
	 * 
	 */
	if (!!structure.unbindAHref) {
		unbindHref(structure)
	}

	preprocessEditableElement(structure)

	switch (structure.type) {
		case "Body":
			break;
		case "Nav":
			break;
		case "Div":

			if (!!structure.customParameters) {
				var params = structure.customParameters
				params.selector = structure.id;
				makeDivEditable(params)
			}
			break;
		case "Img":
			var imageEditableParams = structure.customParameters;

			imageEditableParams.selector = structure.id;

			imageEditableParams.parent = structure.parent
			imageEditableParams.addIndex = structure.addIndex
			imageEditableParams.addParent = structure.addParent

			makeImageEditable(imageEditableParams);
			break;
		case "Span":
			var spanParams = structure.customParameters
			spanParams.selector = structure.id;

			makeSpanEditable(structure.customParameters)
			break;

		case "A":
			var params = structure.customParameters
			params.selector = structure.id;

			makeAEditable(params)
			break;

		case "P":
			var params = structure.customParameters
			params.selector = structure.id;
			makePEditable(params)
			break;
		case "Li":
			var params = structure.customParameters
			params.selector = structure.id;
			makeLiEditable(params)
			break;

		case "H1":
		case "H2":
		case "H3":
		case "H4":
		case "H5":
			var spanParams = structure.customParameters
			spanParams.selector = structure.id;

			makeSpanEditable(structure.customParameters)
			break;

		case "Strong":
			var spanParams = structure.customParameters
			spanParams.selector = structure.id;

			makeStrongEditable(structure.customParameters)
			break;
		case "Section":
			break;
		default:
			alert("element not editable --->" + structure.type) // leave it alone
			console.log("element not editable --->" + JSON.stringify(structure))

	}
	if (!!structure.customAction) {
		$(structure.id).on(structure.customAction.event, function() {
			structure.customAction.funcion()

		})

	}

	if (!structure.childStructures) {

		return;

	}

	var childStructures = structure.childStructures

	$.each(childStructures, function(index, childStructure) {
		makeElemetsEditable(childStructure)
	})

}

// common functions

/**
 * @id: id of the image
 * @selector
 * @redirect: {true | false} -define if the image will have a redirection attribute or not
 * @width: define the width of the normal image in px, by default 200px
 * @height: define the height of the normal image in px, by default 150px
 * @modalselector: get image first parent with the given selector, by default div
 * @event:
 * @image: main image
 * @parent: parent selector (the closest element with this selector is the parent)
 * @addIndex: Boolean, indicates if the index relatively to the parent ins needed
 * @addParent: Boolean, indicates if the parent ins needed to recognize the element
 */

function imageEditor(params) {

	$(document).on("click", params.selector, function(e) {

		e.preventDefault();
		e.stopPropagation()
		/**
		 * On click we will attach the assign clicked element to the domElementModal, once the
		 * element is closed we will use this element and then delete it
		 */
		domElementModal = e.target

		imageEditorConfigModal(params, e.target)

		if (params.redirect) {
			$(params.modalselector).attr("data-vwe-type", "image-redirect")
		} else {
			$(params.modalselector).attr("data-vwe-type", "image")
		}

		if (params.addIndex) {
			$(params.modalselector).attr("data-vwe-index", $(params.selector).index(this))
		}

		if (params.addParent) {
			$(params.modalselector).attr("data-vwe-parent", params.parent)
		}

		$(params.modalselector).attr("data-vwe-selector", params.selector)

	});

	// closeModal("#vulcano-cms-modal")
}

// modal-scrollable

/**
 * Add some attribute to the parameters, this attibutes will be used to render the modal window
 * correctly
 * 
 * @refreshDimensions: True if we want to refresh the with and height attributes
 * @imageWidth: Width of the image in the modal including unit
 * @imageHeight: Height of the image in the modal including unit
 * @refreshImage: true if we want to replace the image in the params for the image in the webpage.
 */

function imageEditorConfigModal(params, thiz) {

	if (!params.css) {
		params.css = {}
	}

	if (!!params.refreshDimensions || !params.css["width"]) {
		params.css["width"] = thiz.width + "px"

	}

	if (!!params.refreshDimensions || !params.css["height"]) {
		params.css["height"] = thiz.height + "px"
	}
	if (!!params.refreshImage || !params.image) {
		params.image = $(thiz).attr("src")
	}

	if (!!params.redirect) {
		var href = $(thiz).closest("a").attr("href") // It's ok.

		if (exists(href)) {
			params.redirecturl = href
		}
	}

	// Add default values if needed
	setImageEditorDefaultValues(params)

	var html = generateHtmlImageEditor(params) // structure-helper.js

	$(params.modalselector).html(html)

	$("#vulcano-cms-modal").modal({
		width : getModalWidth(params)
	})

}

/**
 * @param modalselector
 */
/*
 * function closeModal(modalSelector) {
 * 
 * $(modalSelector).unbind('hidden.bs.modal')
 * 
 * $(modalSelector).on('hidden.bs.modal', function(e) { }) }
 */
/**
 * This fucntion ensure that the we have the parameters needed in order to create the modal, if we
 * don't have it put default parameters.
 */
function setImageEditorDefaultValues(params) {

	setGeneralDefaultValues(params)
	params.width = numericOrDefault(params.width, 200)
	params.height = numericOrDefault(params.height, 150)

	if (!!params.modalWidth) {
		params.width = params.modalWidth
	}

	if (!!params.modalHeight) {
		params.height = params.modalHeight
	}

	if (!!params.imageClass) {
		params.imageClass = "";
	}

}

/**
 * @param thiz:
 *        modal window
 * @param imageInMainPageSelector:
 *        selector in main page
 * @param index:
 *        index used with imageInMainPageSelector in case of collections
 * @param parent:
 * @event modal.setImage.before
 * @event modal.setImage.after
 */
function setImageToPage(thiz, imageInMainPageSelector, index, parent) {

	$(element).trigger("modal.setImage.before");

	var previewImage = $(thiz).find(".fileinput-preview img:first")

	if (!exists(previewImage)) {
		previewImage = $(thiz).find(".fileinput-new.thumbnail img:first")
	}

	if (exists(previewImage)) {

		var element = domElementModal // clicked element

		// getHtmlElement(imageInMainPageSelector, index, parent)

		var image = previewImage.attr("src")

		$(element).attr("src", image)

		touch(element) // indicates that the element had been modfied

	}

	$(element).trigger("modal.setImage.after");
}

/**
 * @selector: image selector
 * @redirect: true if the image has a redirection (on click, for example)
 * @event: event to be used to open the modal
 */
function makeImageEditable(params) {
	/*
	 * imageEditableParams.selector = structure.id; imageEditableParams.parent = structure.parent //
	 * imageEditableParams.collection = structure.collection imageEditableParams.addIndex =
	 * structure.addIndex imageEditableParams.addParent = structure.addParent
	 */
	$(params.selector).unbind() // take out all the events that were used in the image of the
	// original webpage

	// var params = {}
	// params.selector = "#logo-jca"
	// params.redirect = false
	// params.event = "click"
	imageEditor(params)

}

/**
 * @param preventDefault:
 *        String of events name, separated by a space
 * @param stopPropagation:
 *        String of events name, separated by a space
 * @param unbind:
 *        boolean
 */
function preprocessEditableElement(params) {

	if (!!params.unbind) {
		$(params.id).unbind()
	}

	if (!!params.stopPropagation) {
		$(params.id).on(params.stopPropagation, function(event) {
			event.stopPropagation()
		})
	}

	if (!!params.preventDefault) {
		$(params.id).on(params.preventDefault, function(event) {
			event.preventDefault()
		})
	}

	if (!!params.deleteItem) {
		if (!params.deleteItem.customDeleteFunction) {
			defaultDeleteItem(params)
		} else {

			customDeleteItem(params)

		}

	}

	if (!!params.addItem) {

		if (!params.addItem.customAddFunction) {
			defaultAddItem(params)
		} else {
			customAddItem(params)
		}

	}

}

/**
 * @editable: true for contenteditable=true
 * @selector: span selector
 */
function makeSpanEditable(params) {

	if (params.editable) {

		$(params.selector).unbind()
		$(params.selector).attr("contenteditable", true)
	}

}

function makeStrongEditable(params) {

	if (params.editable) {
		$(params.selector).unbind()
		$(params.selector).attr("contenteditable", true)
	}

}

/**
 * @editable: true for contenteditable=true
 * @selector: span selector
 */
function makeH(params) {

	if (params.editable) {
		$(params.selector).attr("contenteditable", true)
	}

}

/**
 * @editable: true for contenteditable=true
 * @modal: edit using a modal
 * @redirect: add redirect edition (only works with modal = true)
 */

function makeAEditable(params) {

	if (params.modal) {
		alert("editar a en modal no ha sido implementado todavía")
		return;
	}

	if (params.editable) {
		$(params.selector).attr("contenteditable", true)
	}

}// 

/**
 * @editable: true for contenteditable=true
 * @modal: edit using a modal
 * @redirect: add redirect edition (only works with modal = true)
 */

function makePEditable(params) {

	if (params.modal) {
		alert("editar a en modal no ha sido implementado todavía")
		return;
	}

	if (params.editable) {
		$(params.selector).attr("contenteditable", true)
	}

}

function makeDivEditable(params) {

	if (!!params.modal) {
		alert("editar a en modal no ha sido implementado todavía")
		return;
	}

	if (!!params.editable) {
		$(params.selector).attr("contenteditable", true)
	}

	if (!!params.addButton) {

	}

}

/**
 * @editable: true for contenteditable=true
 * @modal: edit using a modal
 * @redirect: add redirect edition (only works with modal = true)
 */

function makeLiEditable(params) {

	if (params.modal) {
		alert("editar li en modal no ha sido implementado todavía")
		return;
	}

	if (params.editable) {
		$(params.selector).attr("contenteditable", true)
	}

}

/**
 * For image picker, use the input-new with and height and put it in the imput-preview
 */
function fileInputConfig() {

	$(document).on("change.bs.fileinput", ".fileinput", function() {

		var originalImage = $(this).find(".fileinput-new img")

		// Workaround to get width anf height because originalImage.css("height") returns 0px when
		// height = auto
		var style = originalImage.attr("style")

		if (!!style) {
			var styles = style.split(";")

			var height = ""
			var width = ""

			$.each(styles, function(index, singleStyle) {

				if (singleStyle.contains("height")) {
					height = (singleStyle.split(":"))[1]
				}

				if (singleStyle.contains("width")) {
					width = (singleStyle.split(":"))[1]
				}
			})

			/*
			 * var wdth = originalImage.css("width") var hght = originalImage.css("height")
			 */

			var previewImage = $(this).find(".fileinput-preview img")

			previewImage.css("width", width)
			previewImage.css("height", height)
		}

	})

}

// Save button for the modal
function saveModal() {

	$(document).on(
			"click",
			".guardar-modal-vcms",
			function() {

				var data = getAttrDataFromModal($("#vulcano-cms-modal"), [ "data-vwe-type", "data-vwe-selector",
						"data-vwe-index", "data-vwe-parent" ])

				switch (data["data-vwe-type"]) {

					case "image":
						setImageToPage($("#vulcano-cms-modal"), data["data-vwe-selector"], data["data-vwe-index"],
								data["data-vwe-parent"])
						break;
					/**
					 * @x case "image-redirect":
					 * @x notImplementedYet()
					 * @x break;
					 * @x case "li-array": // setHmlLiLinkToPage(this, data.id)
					 * @x setHmlLinkToPage(this, data.id)
					 * @x break;
					 * @x case "link":
					 * @x setLinkToPage(this, data.id)
					 * @x break;
					 * @x case "image-redirect-array":
					 * @x setImageArrayToPage(this, data.id)
					 * @x break;
					 * @x case "image-array":
					 * @x setImageArrayToPage(this, data.id)
					 * @x break;
					 */
					default:
						alert("not implemented yet---->" + data["data-vwe-type"])

				}

			})
}



/*
 * function saveInDatabase(params, queuedStructure) { } sacsa-clients-logo
 */

// addable-item alert("addable
