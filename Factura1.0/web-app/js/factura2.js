$(document).ready(function() {

	avoidEmptyFields()
	cleanDefaultValue()
	// JQUERY HACK CONTENT EDITABLE
	jQueryHackContenteditable()
	// MODAL CONFIG
	modalConfig()
	fileToBase64(".certificado-container", "certificado", ".certificado-base64")
	fileToBase64(".llave-privada-container", "llave-privada", ".llave-privada-base64")
	saveConfigurationEvent()
	autoCompleateRegimenFiscal()
	fillReceptorByClientId()
	autoCompleateRFC()
	autoCompleateNombre()
	checkProductoTable(".productos-table table")
	autocompleateProductoCodigo()
	autocompleateProductoDescripcion()
	fillUnidades()
	veryfyCantidad()
	verifyPrecioUnitario()
	cambiarMoneda()
	autocompleateFormaDePago()
	changeDomicilio()
	changeLugarExpedicion()
	guardarUbicacion()//factura/factura

});

// SAVE CONFIGURATION

function saveConfiguration() {

	var editPath = "/Emisor/config"

	var params = {}
	var edit = false

	var cert = $(".certificado-base64").html()

	var llavePrivada = $(".llave-privada-base64").html()

	var password = $("#pass-llave-privada").val() // encriptar el password antes de mandarlo

	console.log("llave")
	console.log(llavePrivada)
	console.log("password")
	console.log(password)

	if (!empty(cert)) {
		params.cer = cert
		edit = true
	}

	if (!empty(llavePrivada)) {
		params.key = llavePrivada
		edit = true
	}

	if (!empty(password)) {
		params.pass = password
		edit = true
	}

	if (edit) {

		$.post(getAbsolutePath(editPath), params).done(function(data) {

			if (data.errors.length == 0) {
				$('#modal-config').modal('hide')
				changeInfoMesage("alert-success", "Los datos se guardaron correctamente")

			} else if (data.errors.length > 0) {
				changeInfoMesage("alert-success", "Hubo un error al momento de guardar los datos, intente de nuevo")
			}

		});
	}

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

function autoCompleateClienteId() {

}

function autoCompleateTemplate() {

	/*
	 * var availableTags = [ "Actividad empresarial", "Arrendamiento de Inmuebles", "Asalariados",
	 * "Asociaciones religiosas", "Consolidaci\u00f3n fiscal", "Honorarios", "Incorporaci\u00f3n
	 * fiscal", "Personas morales con fines no lucrativos", "Personas morales del r\u00e9gimen
	 * general", "Personas morales del r\u00e9gimen simplificado", "Servicios profesionales" ];
	 */

	var availableTags = [ {
		"label" : "item 1",
		"value" : "item 1",
		"id" : 1
	}, {
		"label" : "item 2",
		"value" : "item 2",
		"id" : 2
	}, {
		"label" : "item 3",
		"value" : "item 3",
		"id" : 3
	} ];

	$(".regimen-fiscal-text").autocomplete({
		source : availableTags,
		select : function(event, ui) {

			$.post(getAbsolutePath("/Receptor/get/" + ui.item.id)).done(function(data) {
				console.log(data)
			});

		}

	});
}

function modalConfig() {
	$(".boton.config").on("click", function() {
		$('#modal-config').modal({
			show : true,
			keyboard : false
		})
	})
}

function modalConfig() {
	$(".editar-facturas").on("click", function() {

		fillFacturas();

		$('#ver-facturas').modal({
			show : true,
			keyboard : false
		})
	})
}

function saveConfigurationEvent() {

	$(".guardar-config-llaves").on("click", function() {
		saveConfiguration()

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

function avoidEmptyProductTable() {

	var notEmpty = {}

	notEmpty.selector = ".productos-table table tr td"
	notEmpty.event = "focusout"
	notEmpty.nonEmpty = "---"

	neverEmpty(notEmpty)

}

function fillReceptorByClientId() {

	$(".cliente-clave span").on("focusout", function() {

		var clienteId = $(".cliente-clave .clave-text").html()

		clienteId = hardTrim(clienteId)

		$.post(getAbsolutePath("/receptor/clienteid/" + clienteId)).done(function(data) {

			if (data.id != null) {
				fillReceptor(data)
			}

		});
	})
}

function fillReceptorById(id) {

	$.post(getAbsolutePath("/receptor/get/" + id)).done(function(data) {

		fillReceptor(data)

	});

}

function fillReceptor(receptorJson) {

	$(".cliente-clave .clave-text").html(notEmptyObjectOrDefault(receptorJson.idCliente), "---")
	$(".cliente-nombre .nombre-text").html(notEmptyObjectOrDefault(receptorJson.nombre), "---")
	$(".cliente-rfc .rfc-text").html(notEmptyObjectOrDefault(receptorJson.rfc), "---")
	$(".cliente-id").html(notEmptyObjectOrDefault(receptorJson.id), "-1")

	if (!empty(receptorJson.domicilio)) {
		var idDomicilio = receptorJson.domicilio.id

		$.post(getAbsolutePath("/domicilio/get/" + idDomicilio)).done(function(data) {
			fillReceptorDireccion(data)
		});
	}

}

function fillReceptorDireccion(direccionJson) {
	$(".cliente-direccion .calle").html(notEmptyObjectOrDefault(direccionJson.calle), "---")
	$(".cliente-direccion .exterior").html(notEmptyObjectOrDefault(direccionJson.noExterior), "---")
	$(".cliente-direccion .interior").html(notEmptyObjectOrDefault(direccionJson.noInterior), "---")
	$(".cliente-colonia span").html(notEmptyObjectOrDefault(direccionJson.colonia), "---")
	$(".cliente-cp span").html(notEmptyObjectOrDefault(direccionJson.codigoPostal), "---")
	$(".cliente-ciudad span").html(notEmptyObjectOrDefault(direccionJson.municipio), "---")
	$(".cliente-estado span").html(notEmptyObjectOrDefault(direccionJson.estado), "---")

	$(".cliente-pais").html(direccionJson.pais)
}

function autocompleateEstado() {
	$(".regimen-fiscal-text").autocomplete({
		source : estados
	});

}

function autocompleatePais() {
	$(".regimen-fiscal-text").autocomplete({
		source : paises
	});
}

function autoCompleateRFC() {
	$(".cliente-rfc span").autocomplete({
		source : getAbsolutePath("/receptor/rfcs"),
		minLength : 3,
		select : function(event, ui) {

			var id = ui.item.idElemento

			fillReceptorById(id)

		}

	});
}

function autoCompleateNombre() {

	$(document).on("keydown.autocomplete", ".cliente-nombre span", function(e) {

		$(this).autocomplete({
			source : getAbsolutePath("/receptor/nameslike"),
			minLength : 4,
			select : function(event, ui) {

				var id = ui.item.idElemento

				fillReceptorById(id)

			}
		});

	});

}

/*
 * function autoCompleateNombreWA() {
 * 
 * $(".cliente-nombre span").autocomplete({ source : getAbsolutePath("/receptor/nameslike"),
 * minLength : 4, select : function(event, ui) {
 * 
 * var id = ui.item.idElemento
 * 
 * fillReceptorById(id) // fillReceptorById(id) }
 * 
 * }); }
 */
function autocompleateProductoCodigo() {

	$(document).on("keydown.autocomplete", ".codigo span", function(e) {

		$(this).autocomplete({
			source : getAbsolutePath("/producto/codigos"),
			minLength : 3,
			select : function(event, ui) {
				var id = ui.item.idElemento
				fillProductos($(this).closest("tr"), id)
			}
		});
	});
}

function autocompleateProductoDescripcion() {

	$(document).on("keydown.autocomplete", ".descripcion span", function(e) {

		$(this).autocomplete({
			source : getAbsolutePath("/producto/descripciones"),
			minLength : 3,
			select : function(event, ui) {
				var id = ui.item.idElemento
				fillProductos($(this).closest("tr"), id)
			}
		});
	});
}

function fillProductos(tr, idProducto) {

	$.post(getAbsolutePath("/producto/get/" + idProducto)).done(function(data) {

		if (data.id != null) {

			$(tr).find(".codigo span").html(notEmptyObjectOrDefault(data.codigo), "---")
			$(tr).find(".descripcion span").html(notEmptyObjectOrDefault(data.descripcion), "---")
			$(tr).find(".unidad span").html(notEmptyObjectOrDefault(data.unidad), "---")
		}

	});

}

function isTrEmpty(tr) {

	var returnx = false
	var tds = $(tr).find("td:not(:last-child) span.text")

	// var tds = $(tr + " td")

	tds.map(function() {
		var txt = hardTrim($(this).html())

		if (!empty(txt) && txt != "---") {
			returnx = true
		}
	})

	return !returnx

}

function deleteInnerEmptyTr(tableSelector) {
	var trs = $(tableSelector + " tbody tr:not(:last-child)")

	trs.map(function() {
		if (isTrEmpty($(this))) {
			$(this).remove()
		}
	})
}

function checkLastTr(tableSelector) {

	var tr = $(tableSelector + " tbody tr:last-child").get(0)

	if (!isTrEmpty(tr)) {

		$(tr).after(getEmptyTr())

	}

}

function checkProductoTable(tableSelector) {

	deleteInnerEmptyTr(tableSelector)
	checkLastTr(tableSelector)

	var allTds = $(tableSelector).find("tr td")

	$(document).on('focusout', '.productos-table table tr td span', function() {

		deleteInnerEmptyTr(tableSelector)
		checkLastTr(tableSelector)

	})

	avoidEmptyProductTable()

}

function testIsEmpty() {
	var vacio = isTrEmpty(".empty-tr")
	var noVacio = isTrEmpty(".not-empty-tr")

}

function getEmptyTr() {

	var html = ''

	html += '<tr class="empty-tr">';
	html += '	<td class="parte "><span class="text no-empty-plz" contenteditable="true">---</span></td>';
	html += '	<td class="cantidad"><span class="text no-empty-plz" contenteditable="true">---</span></td>';
	html += '	<td class="codigo"><span class="text no-empty-plz" contenteditable="true">---</span></td>';
	html += '	<td class="descripcion"><span class="text no-empty-plz" contenteditable="true">---</span></td>';
	html += '	<td class="unidad"><span class="text no-empty-plz" contenteditable="true">---</span></td>';
	html += '	<td class="unitario"><span class="text no-empty-plz lxzv-number" contenteditable="true">---</span></td>';
	html += '	<td class="importe  no-border-right"><span class="text"></span></td>';
	html += '</tr>';

	return html

}

function fillUnidades() {

	$(document).on("keydown.autocomplete", ".unidad span.text", function(e) {

		$(this).autocomplete({
			source : getAbsolutePath("/unidad/get"),
			minLength : 1
		});

	});

}

function veryfyCantidad() {

	$(document).on("focusout", ".cantidad span.text", function(e) {

		var value = hardTrim($(this).html())
		var tr = $(this).closest("tr")
		var unitario = hardTrim(tr.find(".unitario span.text").html())

		value = value.unformatNumber()
		unitario = unitario.unformatNumber()

		if (isNaN(value) || isNaN(unitario)) {
			return;
		}

		var mult = preciseMultiplyOrNull(value, unitario)

		var importez = preciseRound(mult.toString(), 2)
	
		
		importez = importez.formatNumber(2)



		tr.find(".importe span.text").html(importez)

		calcularSubtotal()

	});
}

function verifyPrecioUnitario() {
	$(document).on("focusout", ".unitario span.text", function(e) {

		var unitario = hardTrim($(this).html())
		var tr = $(this).closest("tr")
		var value = hardTrim(tr.find(".cantidad span.text").html())

		value = value.unformatNumber()
		unitario = unitario.unformatNumber()

		if (isNaN(value) || isNaN(unitario)) {
			return;
		}

		var mult = preciseMultiplyOrNull(value, unitario)

		var importez = preciseRound(mult.toString(), 2)

		importez = importez.formatNumber(2)

		tr.find(".importe span.text").html(importez)

		calcularSubtotal()

	});

}

function calcularSubtotal() {

	var importes = $(".importe span.text")

	console.log("importes")
	console.log(importes)

	var subtotal = 0

	$.each(importes, function(i, val) {

		if (i + 1 < importes.length) {

			console.log("val")
			console.log($(val).html())

			var valz = $(val).html()
			valz = valz.unformatNumber()

			subtotal = sumOrNull(subtotal, valz)

			if (subtotal == null) {
				subtotal = "error"
				return false;
			}
		}
	})

	var subtotalz = preciseRound(subtotal, 2)
	var ivaz = preciseRound(subtotal * 0.16, 2)
	var totalz = preciseRound(subtotal * 1.16, 2)

	$(".subtotal span").html(subtotalz.formatNumber(2))
	$(".iva span").html(ivaz.formatNumber(2))
	$(".total span").html(totalz.formatNumber(2))
	fillImporteLetra(totalz)

}

function fillImporteLetra(letra) {
	// var letra = $(".total span").html()

	// letra = hardTrim(letra)

	$.post(getAbsolutePath("/util/letra/" + letra)).done(function(data) {

		$(".importe-letra .cantidad").html(data.letra);
		$(".importe-letra .centavos").html(data.centavos);
	});
}

function cambiarMoneda() {
	$(".importe-letra .moneda").on("click", function() {

		var m = $(this).html()

		if (m == "pesos") {
			$(this).html("dolares")
			$(".importe-letra .sufijo").html("USD")

			$(".tipo-cambio").css("display", "block")

		} else {
			$(this).html("pesos")
			$(".importe-letra .sufijo").html("M.N.")
			$(".tipo-cambio").css("display", "none")
		}

	})

}

function autocompleateFormaDePago() {

	var tipoPago = [ "Efectivo", "Transferencia electr\u00f3nica", "Cheque nominativo", "Tarjeta de d\u00e9bito",
			"Tarjeta de cr\u00e9dito", "Tarjeta de servicio", "Monedero electr\u00f3nico" ]

	$('.forma-pago span').autocomplete({
		source : tipoPago

	});

}

function changeDomicilio() {

	$(".domicilio").on("click", function() {

		$('#modal-domicilio').attr("data-type", "domicilio")

		$('#modal-domicilio .modal-title').html("Modificar datos del domicilio")

		$('#modal-domicilio').modal({
			show : true,
			keyboard : false
		})
	})

}

function changeLugarExpedicion() {

	$(".expedicion").on("click", function() {

		$('#modal-domicilio').attr("data-type", "expedicion")

		$('#modal-domicilio .modal-title').html("Modificar el lugar de expedicion")

		$('#modal-domicilio').modal({
			show : true,
			keyboard : false
		})
	})

}

function guardarUbicacion() {

	$(document).on("click", ".guardar-ubicacion", function(e) {

		var type = $(".guardar-ubicacion").closest("#modal-domicilio").attr("data-type")

		if (type == "domicilio") {
			saveUbicacion()
		}
		if (type == "expedicion") {
			saveLugarExpedicion()
		}

	})
}

function saveUbicacion() {

	var ubicacion = getUbicacionFromWebPage()

	$.post(getAbsolutePath("/domicilio/save?name=ubicacion"), ubicacion).done(function(data) {

		showMessage('#modal-domicilio', data)

		reloadUbicacion()

	});

}

/*
 * 4:00 am dude, I kno it's wrong, just I don't care anymore
 */
function saveLugarExpedicion() {
	var ubicacion = getUbicacionFromWebPage()

	$.post(getAbsolutePath("/domicilio/save?name=expedicion"), ubicacion).done(function(data) {

		showMessage('#modal-domicilio', data)

		reloadExpedicion()

	});

}

function getUbicacionFromWebPage() {

	var ubicacion = {}

	var calle = $("#modal-calle").val()
	var exterior = $("#modal-exterior").val()
	var interior = $("#modal-interior").val()
	var colonia = $("#modal-colonia").val()
	var municipio = $("#modal-municipio").val()
	var estado = $("#modal-estado").val()
	var pais = $("#modal-pais").val()
	var cp = $("#modal-cp").val()

	if (!empty(calle)) {
		ubicacion.calle = calle
	}

	if (!empty(exterior)) {
		ubicacion.noExterior = exterior
	}

	if (!empty(interior)) {
		ubicacion.noInterior = interior
	}

	if (!empty(colonia)) {
		ubicacion.colonia = colonia
	}

	if (!empty(municipio)) {
		ubicacion.municipio = municipio
	}

	if (!empty(estado)) {
		ubicacion.estado = estado
	}
	if (!empty(pais)) {
		ubicacion.pais = pais
	}
	if (!empty(cp)) {
		ubicacion.codigoPostal = cp
	}

	return ubicacion
}

function showMessage(modalSelector, data, successMessage, errorMessage) {

	if (successMessage == null) {
		successMessage = "Los datos se guardaron correctamente"
	}

	if (errorMessage == null) {
		errorMessage = "Hubo un error al momento de guardar los datos, intente de nuevo"

	}

	if (data.errors.length == 0) {
		changeInfoMesage("alert-success", successMessage)
		setTimeout(function() {
			$(modalSelector).modal('hide')
		}, 1200);

	} else if (data.errors.length > 0) {
		changeInfoMesage("alert-success", errorMessage)
	}
}

function reloadUbicacion() {

	$.post(getAbsolutePath("/domicilio/byname/ubicacion")).done(function(data) {

		var texto = getDomicilioTexto(data)

		if (texto == null || texto == "") {
			$(".domicilio span").html("---")
		} else {
			$(".domicilio span").html(texto)
		}

	});

}

function reloadExpedicion() {

	$.post(getAbsolutePath("/domicilio/byname/expedicion")).done(function(data) {

		var texto = getDomicilioTexto(data)

		if (texto == null || texto == "") {
			$(".expedicion span").html("---")
			$(".lugar-expedicion-hidden").html("")
		} else {
			$(".expedicion span").html(texto)
			$(".lugar-expedicion-hidden").html(getLugarExpedicion(data))
		}

		// alert(getLugarExpedicion(data))

	});

}

/**
 * @param calle
 * @param noExterior
 * @param noInterior
 * @param colonia
 * @param municipio
 * @param estado
 * @param pais
 * @param codigoPostal
 */

function getDomicilioTexto(domicilio) {

	var texto = ""
	var comma = false

	texto += getDireccionCorta(domicilio)

	if (domicilio.colonia != null) {
		texto += " Colonia " + domicilio.colonia

	}

	if (domicilio.municipio != null) {

		texto += " " + domicilio.municipio
		comma = true
	}
	if (domicilio.estado != null) {
		if (comma) {
			texto += ","
		}
		texto += " " + domicilio.estado
		comma = true
	}
	if (domicilio.pais != null) {
		if (comma) {
			texto += ","
		}
		texto += " " + domicilio.pais
	}

	if (domicilio.calle != null) {
		texto += " C.P. " + domicilio.codigoPostal
	}

	return texto;
}

function getLugarExpedicion(domicilio) {
	var texto = ''

	if (domicilio.municipio != null) {

		texto += " " + domicilio.municipio
		comma = true
	}
	if (domicilio.estado != null) {
		if (comma) {
			texto += ","
		}
		texto += " " + domicilio.estado
		comma = true
	}

	return texto;

}

/**
 * @param calle
 * @param noExterior
 * @param noInterior
 */

function getDireccionCorta(params) {

	var texto = ""

	if (params.calle != null) {
		texto += "Calle " + params.calle
	}
	if (params.noExterior != null) {
		texto += " No " + params.noExterior
	}
	if (params.noInterior != null) {
		texto += " Int " + params.noInterior
	}

	return texto
}
