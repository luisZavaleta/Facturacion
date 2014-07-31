//regular expresions
/*
var tarjetaCredito = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$/g
var alfanumerico = /^[a-zA-Z0-9]+$/g
var alfanumericoEspacio = /^[a-zA-Z0-9 ]+$/g
var alfabetico = /^[a-zA-Z]+$/g
var americanExpress = /^(3[47][0-9]{13})*$/g
// formato de fecha 30/01/1983 ó 30-01-1983
var fechaYYYYMMDD = /^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$/g
var digitos = /^[0-9]+$/g
var correo = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/g;
var ip = /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$/g
var minusculas = /^([a-z])*$/g
var mayusculas = /^([A-Z])*$/g
var url = /^((http|https|ftp)://)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]/+=%&_\.~?\-]*)$/g
*/

/***************************************************************************************************
 * @selector: selector del elemento.
 * @expressionName: tiene que ser el nombre de una variable que contenga una expresión regular y que
 *                  esté atachado a window.
 * @loose: if loose it send warning instead of error and accepts the value.
 * @x: We can use jQueryHackContenteditable() to use this function with conteneditable elements
 **************************************************************************************************/

function validate(params) {

	$(params.selector).on("focusout", function() {
		var txt = $(this).val()

		if (txt.match(window[params.expressionName])) {
			true
		} else {
			false
		}

	})

}

/***************************************************************************************************
 * @param type:
 *        type of the element
 * @param value:
 *        val()
 * @param list:
 *        Array used only with inList type
 * @params ignoreCase : Boolean
 */
function validate2(params) {

	switch (type) {
		case 'blank':
			if (!!value) {
				return true;
			}
			break;
		case 'creditCard':
			return validateCreditCard(params.value, params.ignoreCase)
			break;
		case 'email':
			return validateEmail(params.value, params.ignoreCase)
			break;
		case 'inList': validateInList(params.list, params.value, params.ignoreCase) 
			break;
		case 'matches':
			break;
		case 'max':
			break;
		case 'maxSize':
			break;
		case 'min':
			break;
		case 'minSize':
			break;
		case 'notEqual':
			break;
		case 'range':
			break;
		case 'size':
			break;
		case 'url':
			break;
		case 'validator':
			break;

	}
}

function validateCreditCard(value, ignoreCase) {
	if (!value) {
		return false;
	}

	if (ignoreCase) {
		if (value
				.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$/gi)) {
			return true;
		}

	} else {
		if (value
				.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$/g)) {
			return true;
		}
	}
	return false;

}

function validateEmail(value, ignoreCase) {

	if (!value) {
		return false;
	}

	if (!value && value instanceof String) {
		return false;
	}

	if (ignoreCase) {
		if (value.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/gi)) {
			return true;
		}
	} else {
		if (value.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/g)) {
			return true;
		}
	}
	return false;
}

function validateInList(list, value, ignoreCase) {

	if (!value || !list || jQuery.type(list) != 'array') {
		return false;
	}

	return list.contains(value, ignoreCase)

}