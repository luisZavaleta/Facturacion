
/**
 * @selector: image selector
 * @redirect: {true | false} -define if the image will have a redirection attribute or not
 * @event: event to be used to open the modal
 * @css: css attributes in a map (json object).
 * @modalselector: Modal selector, only needed when you're gonna provide your own modal.
 * @parentSelector: Parent of the selector, find a child with selector, if no selector is defined,
 *                  then uses img as child selector
 * @image: Image to be shown by default in the modal, if an image is no indicated, it use the
 *         clicked image.
 * @-NOTE: width and height deprecated, use css instead.
 */
function makeImageEditable(params) {

	// Create composite selector in case parentSelector is setter
	if (!!params.selector || !!params.parentSelector) {
		if (!!params.parentSelector) {
			if (!!params.selector) {
				params.selector = params.parentSelector + " " + params.selector;
			} else {
				params.selector = params.parentSelector + " img";
			}
		}

		// Remove a previously-attached event handler from the element
		$(params.selector).unbind();
		imageEditor(params);
	} else {
		console.error("Can't edit image, selector not found");
	}
}

/**
 * @selector:
 * @redirect: {true | false} -define if the image will have a redirection attribute or not
 * @width: define the width of the normal image in px, by default 200px
 * @event:
 * @image: main image
 * @parent: parent selector (the closest element with this selector is the parent)
 * @addIndex: Boolean, indicates if the index relatively to the parent ins needed
 * @deprecated: id <-- id of the image
 */

function imageEditor(paramsBase) {

	var modalParams = {}

	modalParams.openFunction = null;
	modalParams.closeFunction = closingImageModal
	modalParams.css = paramsBase.css

	vulcanoModal.init();

	$(document).on("click", paramsBase.selector, function(e) {

		var params = vulcanoUtil.clone(paramsBase);

		// stop events propagation
		e.preventDefault();
		e.stopPropagation();

		// set global domElementModal variable it store the last element that trigger a modal window
		modalParams.element = e.target;
		modalParams.modalHtml = imageEditorConfigModal(params, e.target);
		vulcanoModal.openModal(modalParams);

	});

}

/**
 * Add some attribute to the parameters, this attibutes will be used to render the modal window
 * correctly
 * 
 * @refreshDimensions: True if we want to refresh the with and height attributes
 * @refreshImage: true if we want to replace the image in the params for the image in the webpage.
 * @deprecated: imageWidth & imageHeight are deprecated, we sustitute it with css.
 */

function imageEditorConfigModal(params, thiz) {

	// if no default image is setted, set clicked image
	if (!params.image) {
		params.image = $(thiz).attr("src");
	}

	return generateHtmlImageEditor(params.image);

}

function closingImageModal() {
	setImageToPage($("#vulcano-modal"));
}

/**
 * @param thiz: modal window
 * @param imageInMainPageSelector: selector in main page
 * @param index: index used with imageInMainPageSelector in case of collections
 * @param parent:
 * @event modal.setImage.before
 * @event modal.setImage.after
 */
function setImageToPage(thiz) {

	var element = vulcanoModal.getElement(); // clicked element

	$(element).trigger("modal.setImage.before");
	var previewImage = $(thiz).find(".fileinput-preview img:first");

	if (!!previewImage) {
		var image = previewImage.attr("src");

		$(element).attr("src", image);

		touch(element); // indicates that the element had been modfied

	}

	$(element).trigger("modal.setImage.after");
}

/**
 * @param image
 * @returns {String} Retrieves html for the body of the modal of the image selector.
 */
function generateHtmlImageEditor(image) {

	var html = '';

	html += '<div class="fileinput fileinput-new" data-provides="fileinput" style="max-width:100%">';
	html += '	<div class="fileinput-new thumbnail">';
	html += '		<img  src="' + image + '" alt="..." />';
	html += '	</div>';
	html += '	<div class="fileinput-preview fileinput-exists thumbnail"  />';
	html += '	<div>';
	html += '		<span class="btn btn-default btn-file">';
	html += '			<span class="fileinput-new">Seleccionar...</span>';
	html += '			<span class="fileinput-exists">Cambiar</span>';
	html += '			<input type="file" name="..." />';
	html += '		</span>';
	html += '		<a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Eliminar</a>';
	html += '	</div>';
	html += '</div>';

	return html;
}
