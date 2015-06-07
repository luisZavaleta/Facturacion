/**
 * @fileName editMyFormJS.js
 * 
 * This page is used to create a form inside a modal, and on close we put all the modal values in
 * the a html page. The form is based inbootstrpa, so the grid system is the same with 12 colums.
 * 
 * @author LuisZavaleta
 */

/**
 * @param selector{String} Selector of the element that will be "clicked" in order to open the
 *        modal.
 * @param containerSelector{String} Selector of the container in the html that will be used as
 *        parend container for the elements that will be setted in the html.
 * @param event{String} Event that will triger the open of the modal, default value is "click".
 * @param openFunction{function()} Function that will be executed right after the modal open.
 * @param closeFunction{function()} Function that will be executed right before the modal closes.
 * @param css{JSON} general css attributesin a map.
 * @param formType{none | horizontal | inline} horizontal, title in the left and input in the right;
 *        inline, title in the top, input in the bottom; default horizontal. *
 * @param screenSize{extraSmall | xm | small | sm | medium | md | large | lg } Size of the screen
 *        {extraSmall: Phones (<768px)} {small:Tablets (≥768px < 922px)} {medium:Desktop (≥992px) <
 *        1200px)} {large:Desktop ≥ 1200px)}
 *        ==================================================================================
 *        ==================================================================================
 * @param fields{Array} Contains the information of all the field that will be displayed inside the
 *        form.
 * @param field.columnSize{Array} Size in columns of all the row, default for all sizes, The values
 *        in the array are used acording the format defined in Note A. and Sizes defined in Note B.
 * @param field.id{String} Input Id.
 * @param field.title{String} Title of the row.
 * @param field.inputType{input | textarea | checkbox | radioButton | select} Type of input.
 * @param field.titleColumnSize{Number} Size in colums of the title, default 12 for horizontal, 2
 *        for inline.
 * @param field.inputColumnSize{Array} Size in colums of the input , default 12 for horizontal, 10
 *        for inline.
 * @param field.heightSize{large | normal | medium }
 * @param field.css{JSON} element css attributes in a map.
 * @param field.selector{String} Child selector of the element where the input value will be setted,
 *        if input as value, else as inner html.
 * @param field.status{none | disable | readOnly}
 * @param field.context{active | success | info | warning | danger}
 */

function getMyFormHtml(params) {
	var formHTML = '';
	var formCSSClass = "";

	switch (params.formType) {
		case "horizontal":
			formCSSClass = "form-horizontal";
			break;
		case "inline":
			formCSSClass = "form-inline";
			break;
		default:
	}

	formHTML = '<form class="' + formCSSClass + '" role="form">';

	$.each(fields, function(index, value) {
		getMyMyFormRow(params.formType, value);
	});

}

/**
 * @param formType{none | horizontal | inline}
 * @param columnSize{Array} Size in columns of all the row, default Value: 12, the values in the
 *        array are used acording to the format defined in Note A. and Sizes defined in Note B.
 * @param id{String} Input Id.
 * @param titleColumnSize{Array} Size in colums of the title, default 12 for horizontal, 2 for
 *        inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 * @paran inputColumnSize{Array} Size in colums of the input , default 12 for horizontal, 10 for
 *        inline, , the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 * @returns
 */
function getMyMyFormRow(formType, params) {

	var form = $("#emfForm").cloneNode(true);

	if (!params.columnSize) {
		params.columnSize = [ 12 ]
	}

	form = vulcanoUtil.template(form, {
		formClass : getSizeCssClass(params.columnSize)
	})

	// form += generateRowContentHTML(type, params);

}

alert("hola")
/**
 * @param type{inline | horizontal | general}
 * @param params.titleColumnSize
 * @param params.inputColumnSize
 */
function generateRowContentHTML(type, params) {

	var rowContentHtml = "";

	switch (type) {
		case "inline":
			return generateInlineRowContentlHTML(params);
			break;
		case "horizontal":
			return generateHorizontalRowContentHTML(params);
		default:
			return generateGeneralRowContentHtml(params);
			break;
	}

}

/**
 * <code>
 * 	<div class="form-group col-md-8">
 * 		<label class="sr-only" for="exampleInputEmail2">Email address</label>
 * 		<input id="exampleInputEmail2" class="form-control" type="email" placeholder="Enter email" style="width: 100%"/>
 * 	</div>
 * </code>
 * 
 * @param id{String} Input Id.
 * @param title{String} Title of the row.
 * @param elementType {input | textarea | checkbox | radioButton | select} Input type to be
 *        generated, default input;
 * @param params.inputType {color | email | hidden | number | password | tel | url} Some element are
 *        only available in HTML5
 * @param params.placeholder {String} Placegolder text.
 * @param params.titleColumnSize {Array} Size in colums of the title, default 12 for horizontal, 2
 *        for inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 * @param inputColumnSize{Array} Size in colums of the input , default 12 for horizontal, 10 for
 *        inline, , the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 */

function generateInlineRowContentlHTML(params) {

	var inlineContent = '';
	inlineContent += '<div class="form-group ' + getSizeCssClass(params.inputColumnSize) + '">';
	inlineContent += generateInlineLabelHTML(params);
	inlineContent += generateInlineInputElement(params);
	inlineContent += "</div>"

}

/**
 * @param id{String} Input Id.
 * @param title{String} Title of the row.
 */

function generateInlineLabelHTML(params) {

	return '<label class="sr-only" for="' + params.id + '">' + params.title + '</label>'

}

/**
 * @params id{String}
 * @param elementType {input | textarea | checkbox | radioButton | select} Input type to be
 *        generated, default input;
 * @param params.inputType {color | email | hidden | number | password | tel | url} Some element are
 *        only available in HTML5
 * @param params.placeholder {String} Placegolder text.
 * @param params.texareaRows{Number} Number of rows that the text area will have.
 * @===========Check box parameters BEGIN=========
 * @param checkboxType{inline | horizontal}, Default horizontal.
 * @param checkBoxesParams{Array} Array with the text and value of the check boxes
 * @param checkBoxesParams[*].value{String} Value of the input.
 * @param checkBoxesParams[*].text{String} Text of the info in front of the checkbox.
 * @param checkBoxesParams[*].id{String} checkbox Id.
 * @param checkBoxesParams[*].checkboxColumnSize{Array} Size of each checkbox in columns, for
 *        inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B. *
 * @===========Check box parameters END=========
 */
/**
 * <code>
 *		<input id="exampleInputEmail2" class="form-control" type="email" placeholder="Enter email" style="width: 100%"/>
 *		<textarea class="form-control" rows="3" placeholder="Textarea" style="width: 100%"></textarea>
 *	</code>
 */
function generateInlineInputElement(elementType, params) {

	switch (elementType) {
		case "input":
		default:
			return '<input id="' + params.id + '" class="form-control" type="' + params.inputType + '" placeholder="'
					+ params.placeholder + '" style="width: 100%"/>';

			break;
		case "textarea":
			return '<textarea id="' + params.id + '"  class="form-control" rows="' + params.texareaRows + '" placeholder="'
					+ params.placeholder + '" style="width: 100%"></textarea>';
			break;
		case "checkbox":
			return getCheckBox(checkboxType, checkBoxesParams)
			break;
		case "radiobutton":
			break;
		case "select":
			break;

	}

}

function getRadioButton() {
	switch (radiobuttonType) {
		case "inline":
			return getInlineRadioButton(radioButtonParams);
			break;
		default:
		case "horizontal":
			return getHorizontalRadioButton(radioButtonsParams);
			break;
	}
}

function getHorizontalRadioButtons(radioButtonsParams) {

	var radioButton = '';

	$.each(radioButtonsParams, function() {
		radioButton += getHorizontalRadioButton(radioButtonsParams);
	})

}

/**
 * HORIZONTAL RADIO <br>
 * <code>		
 *   	<div class="radio">
 *       	<label>
 *         		<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="">
 *         		Option one is this and that&mdash;be sure to include why it's great
 *     		</label>
 *     	</div>
 *     	<div class="radio">
 *        	<label>
 *        		<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
 *          	Option two can be something else and selecting it will deselect option one
 *        	</label>
 *      </div>
 * </code>
 */

function getHorizontalRadioButton(radioButtonsParams) {

	var radioButton = '';

}

function getInlineRadioButtons(radioButtonParams) {

}

/**
 * @param checkboxType{inline | horizontal}, Default horizontal.
 * @param checkBoxesParams{Array} Array with the text and value of the check boxes
 * @param checkBoxesParams[*].value{String} Value of the input.
 * @param checkBoxesParams[*].text{String} Text of the info in front of the checkbox.
 * @param checkBoxesParams[*].id{String} checkbox Id.
 * @param checkBoxesParams[*].checkboxColumnSize{Array} Size of each checkbox in columns, for
 *        inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 */
function getCheckBox(checkboxType, checkBoxesParams) {

	switch (checkboxType) {
		case "inline":
			return getInlineCheckBoxes(checkBoxesParams)
			break;
		default:
		case "horizontal":
			return getHorizontalCheckBoxes(checkBoxesParams);
			break;
	}

}

/**
 * @param checkBoxesParams{Array} Array with the text and value of the check boxes
 * @param checkBoxesParams[*].value{String} Value of the input.
 * @param checkBoxesParams[*].text{String} Text of the info in front of the checkbox.
 * @param checkBoxesParams[*].id{String} checkbox Id.
 */
function getHorizontalCheckBoxes(checkBoxesParams) {

	var checkboxes = "";

	$.each(checkBoxesParams, function(index, value) {
		checkboxes += getHorizontalCheckBox(value);
	})

	return checkboxes;

}

/**
 * @param checkBoxesParams{Array} Array with the text and value of the check boxes.
 * @param checkBoxesParams[*].id{String} checkbox Id.
 * @param checkBoxesParams[*].value{String} Value of the input.
 * @param checkBoxesParams[*].text{String} Text of the info in front of the checkbox. <code>
 * @param checkBoxesParams[*].checkboxColumnSize{Array} Size of each checkbox in columns, 
 *        for inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 */

function getInlineCheckBoxes(checkBoxesParams) {

	var checkboxes = '<div style="width:100%" class="checkbox">';

	$.each(checkBoxesParams, function(index, value) {
		checkboxes += getInlineCheckBox(params);
	})

	checkboxes += '</div>';

	return checkboxes;

}

/**
 * @param id{String} checkbox Id.
 * @param value{String} Value of the input.
 * @param text{String} Text of the info in front of the checkbox.
 */

function getHorizontalCheckBox(params) {
	var checkboxHTML = '<div class="checkbox" style="width:100%">';
	checkboxHTML += '	<label>';
	checkboxHTML += '		<input type="checkbox" id="' + params.id + '" value="' + params.value + '">';
	checkboxHTML += params.text;
	checkboxHTML += '	</label>';
	checkboxHTML += '</div>';
	return checkboxHTML;
}

/**
 * @param id{String} checkbox Id.
 * @param value{String} Value of the input.
 * @param text{String} Text of the info in front of the checkbox. <code>
 * @param checkboxColumnSize{Array} Size of each checkbox in columns, 
 *        for inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 * 
 * 		<label class="checkbox-inline col-sm-3">
 *        	<input type="checkbox" id="inlineCheckbox1" value="option1"> 1
 *     	</label>
 * </code>
 */

function getInlineCheckBox(params) {

	var columnSize = "";

	if (!!params.checkboxColumnSize) {
		columnSize = getSizeCssClass(params.checkboxColumnSize)
	}

	var checkBoxHtml = '';
	checkBoxHtml += '<label class="checkbox-inline ' + columnSize + '">';
	checkBoxHtml += '<input type="checkbox" id="' + params.id + '" value="' + params.value + '">';
	checkBoxHtml += params.text;
	checkBoxHtml += '</label>';

	return checkBoxHtml;

}

/**
 * <code>
 * 		
 * 			<div class="checkbox" style="width:100%">
 * 				<label>
 * 					<input type="checkbox" value="">
 * 					Option one is this and that—be sure to include why it's great
 * 				</label>
 * 			</div>
 * 			<div class="checkbox" style="width:100%"="">
 *				<label>
 *					<input type="checkbox" value="">
 *					Option two is disabled
 *				</label>
 *			</div>
 * 		
 * </code>
 */

function generateHorizontalRowContentHTML(params) {

}

function generateGeneralRowContentHtml(params) {

}

/**
 * <code>
 * 	<div class="form-group col-md-8">
 * 		<label class="sr-only" for="exampleInputEmail2">Email address</label>
 * 		<input id="exampleInputEmail2" class="form-control" type="email" placeholder="Enter email" style="width: 100%"/>
 * 	</div>
 * </code>
 */

function generateHorizontalLabelHTML() {

}

function generateGeneralLabelHtml() {

}

/**
 * @param screenSize{extraSmall | xm | small | sm | medium | md | large | lg } Size of the screen
 *        {extraSmall: Phones (<768px)} {small:Tablets (≥768px < 922px)} {medium:Desktop (≥992px) <
 *        1200px)} {large:Desktop ≥ 1200px)}
 * @param columns{Number} Number of clumns in the row.
 * @param defaultValue{Number} Columns by default
 * @DEPRECATED
 */
function getMyColumnSizeClass(screenSize, columns, defaultValue) {

	if (!columns) {
		if (!defaultValue)
			throw "getMyColumnSizeClass - Column size must be indicated";

		columns = defaultValue;
	}

	switch (type) {
		case !type:
		case "medium":
		case "md":
			return ".col-sm-" + columns;
			break;
		default:
			throw "getMyColumnSizeClass - Screen Size " + screenSize + " not valid";
	}

}

/**
 * @param columns{Array} Array with the width in columns of the element, the number of elements in
 *        the array defines the use of them as follow --------------->: {1 : [0 : xm, sm, md, lg]},
 *        {2: [0:xm, sm][1: md, lg]}, {2: [0 : xm, sm][1: md, lg]}, {3: [0 : xm, sm][1: md][2: lg]},
 *        {3: [0:xm][1:sm][2: md][3: lg]}
 * @test http://jsfiddle.net/mfaj9bkn/
 * @return String with the classes that define the widh in columns in bootstrap;
 */
function getSizeCssClass(columns) {

	switch (columns.length) {
		case 0:
			throw "getSizeCssClass ---> InvalidParameterException"
			break;
		case 1:
			return " col-xs-" + columns[0] + " col-sm-" + columns[0] + " col-md-" + columns[0] + " col-lg-" + columns[0]
					+ " ";
			break;
		case 2:
			return " col-xs-" + columns[0] + " col-sm-" + columns[0] + " col-md-" + columns[1] + " col-lg-" + columns[1]
					+ " ";
			break;
		case 3:
			return " col-xs-" + columns[0] + " col-sm-" + columns[0] + " col-md-" + columns[1] + " col-lg-" + columns[2]
					+ " ";
			break;
		case 4:
			return " col-xs-" + columns[0] + " col-sm-" + columns[1] + " col-md-" + columns[2] + " col-lg-" + columns[3]
					+ " ";
			break;
		default:
			throw "getSizeCssClass ---> InvalidParameterException"

	}

}

/**
 * NOTES: <code>
 * Note A: 
 * 		{1 : 	[0: xm , sm , md , lg ] }, 
 * 		{2: 	[0: xm, sm] , [1: md, lg] }, 
 * 		{3: 	[0 :xm, sm] , [1: md] , [2: lg]}, 
 * 		{4: 	[0:xm] , [1:sm] , [2: md] , [3: lg]}
 * 
 * 
 *  Note B: 
 *  	{xm: Phones (<768px)} 
 *  	{sm: Tablets (≥768px < 922px)} 
 *  	{md:Desktop (≥992px) < 1200px)} 
 *  	{lg:Big Desktop ≥ 1200px)}
 * 		
 * 
 * 
 * 
 * </code>
 */

/**
 * <code>
 *  <div class="form-group">
 *       	<label for="exampleInputPassword1">Password</label>
 *      		<div class="radio">
 *				<label>
 *					<input type="radio" id="optionsRadios1" checked="" value="option1" name="optionsRadios">
 *					Option one is this and thatasdad asd asd
 *			</label>
 *			<div class="radio">
 *				<label>
 *					<input type="radio" id="optionsRadios1" checked="" value="option1" name="optionsRadios">
 *					Option one is this and thatasdad asd asd
 *			</label>
 * 		</div>
 *	</div>
 * </code>
 */

function generateHorizontalInputElement(type, inputType) {

}

function generateGeneralInputElement(type, inputType) {

}

// ABORT MISSION, we will change everything, now we will use: vulcanoUtil.template
// (vulcano-not-yet-utils)
