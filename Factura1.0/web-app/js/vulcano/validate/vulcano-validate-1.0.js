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
 * All the contraits try to emulate Grails contraints, but the behavior might be different.
 * 
 * @param type:
 *        type of the element
 * @param value:
 *        base object val()
 * @param referee:
 *        Object that contains a value that will be use as a base for the comparation (can eb a
 *        lisr, regular expression, a object, etc)
 * @params ignoreCase : Boolean
 **************************************************************************************************/
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
		case 'inList':
			return validateInList(params.value, params.referee, params.ignoreCase)
			break;
		case 'matches':
			return ((params.value).search(params.referee) > 0)
			break;
		case 'max':
			return validateMax(params.value, params.referee, params.ignoreCase)
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
				.search(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$/gi) > 0) {
			return true;
		}

	} else {
		if (value
				.search(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$/g) > 0) {
			return true;
		}
	}
	return false;

}

function validateEmail(value, ignoreCase) {

	if (!value) {
		return false;
	}

	if (!value && $.type(value) == 'string') {
		return false;
	}

	if (ignoreCase) {
		if (value.search(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/gi) > 0) {
			return true;
		}
	} else {
		if (value.search(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/g) > 0) {
			return true;
		}
	}
	return false;
}

function validateInList(value, list, ignoreCase) {

	if (!value || !list || jQuery.type(list) != 'array') {
		return false;
	}

	return list.contains(value, ignoreCase)

}

function validateMatches(value, regex) {

	if (!value || !regex) {
		return false;
	}

	if (value.search(regex) > 0) {
		return true;
	} else {

		return false;
	}

}

/***************************************************************************************************
 * JUST USE THE > operator
 **************************************************************************************************/

function validateMax(value, referee, ignoreCase) {

	var tempValue = value;
	var tempReferee = referee;

	if ($.type(value) != value$.type(referee)) {
		return false
	}

	if (!!ignoreCase) {

		if ($.type(value) == 'string') {
			tempValue = tempValue.toLoweCase()
			tempReferee = tempReferee.toLoweCase()
		} else {
			throw "InvalidParameterException - ignoreCase"
		}
	}

	return (tempValue <= tempReferee)

}

function validateMaxSize(value, referee) {

	if ($.type(value) != 'string' && $.type(value) != 'array') {
		return false;
	}

	if ($.type(value) != value$.type(referee)) {
		return false;
	}
	// length

	return (value.length <= referee.length)

}




function validateMin(value, referee, ignoreCase) {

	var tempValue = value;
	var tempReferee = referee;

	if ($.type(value) != value$.type(referee)) {
		return false
	}

	if (!!ignoreCase) {

		if ($.type(value) == 'string') {
			tempValue = tempValue.toLoweCase()
			tempReferee = tempReferee.toLoweCase()
		} else {
			throw "InvalidParameterException - ignoreCase"
		}
	}

	return (tempValue >= tempReferee)

}

function validateMinSize(value, referee) {

	if ($.type(value) != 'string' && $.type(value) != 'array') {
		return false;
	}

	if ($.type(value) != value$.type(referee)) {
		return false;
	}
	// length

	return (value.length >= referee.length)

}



/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
