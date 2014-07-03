$(document).ready(function() {

	overrideJQueryHtmlHardTrim()

	// testValidacion()<td class="codigo">
	generarFactura()

	mutuallyExclusiveAcordionButton(".p-clientes", ".panel-body .accordion-header button")
	mutuallyExclusiveAcordionButton(".cabsa", "button")
	mutuallyExclusiveAcordionButton(".table.productos", ".val-botones button")
	modalFactura()
	crearEditarProductos()
	modificarDatosCabsa()
	fillFacturas()
	descargarXML()
	descargarPDF()
	cancelarFactura()

	blabla()

});

function generarFactura() {

	$(document).on("click", ".guardar-config", function() {
		crearFactura()
	})

}

function getDatosCliente() {

	var datosCliente = {}

	var clienteId = $(".cliente-clave .clave-text").html()
	var rfc = $(".cliente-rfc .rfc-text").html()
	var nombre = $(".cliente-nombre .nombre-text").html()
	var calle = $(".cliente-direccion .calle").html()
	var exterior = $(".cliente-direccion .exterior").html()
	var interior = $(".cliente-direccion .interior").html()
	var colonia = $(".cliente-colonia span").html()
	var ciudad = $(".cliente-ciudad span").html()
	var estado = $(".cliente-estado span").html()
	var cp = $(".cliente-cp span").html()
	var pais = $(".cliente-pais").html()

	clienteId = fixParameter(clienteId)
	rfc = fixParameter(rfc)
	nombre = fixParameter(nombre)
	calle = fixParameter(calle)
	exterior = fixParameter(exterior)
	interior = fixParameter(interior)
	colonia = fixParameter(colonia)
	ciudad = fixParameter(ciudad)
	estado = fixParameter(estado)
	cp = fixParameter(cp)
	pais = fixParameter(pais)

	datosCliente.clienteId = clienteId;
	datosCliente.rfc = rfc
	datosCliente.nombre = nombre
	datosCliente.calle = calle
	datosCliente.exterior = exterior
	datosCliente.interior = interior
	datosCliente.colonia = colonia
	datosCliente.ciudad = ciudad
	datosCliente.estado = estado
	datosCliente.cp = cp
	datosCliente.pais = pais

	return datosCliente

}

function crearCliente(datosCliente) {

	datosCliente.correo = $(".correoCliente").val()

	if (datosCliente.correo) {
		$(".correoEnviarMail").val(datosCliente.correo)
	}

	$.post(getAbsolutePath("/receptor/save"), datosCliente).done(function(data) {

	})

}

function editarCliente(datosCliente) {

	datosCliente.correo = $(".correoCliente").val()

	if (datosCliente.correo) {
		$(".correoEnviarMail").val(datosCliente.correo)
	}
	$.post(getAbsolutePath("/receptor/edit"), datosCliente).done(function(data) {

	})

}

function validaCliente() {

	var datosCliente = getDatosCliente()

	$.post(getAbsolutePath("/receptor/verify"), datosCliente).done(
			function(data) {

				switch (data.status) {

					case "error":
						styleValidatePanel(".p-clientes", "danger");
						usuarioAcordeon(datosCliente, "RFC y nombre son obligatorios")
						break;
					case "nuevo":
						styleValidatePanel(".p-clientes", "warning")
						usuarioAcordeon(datosCliente, "Se crear\u00e1  un nuevo cliente con RFC: " + datosCliente.rfc,
								"Crear cliente", null, crearCliente, null, datosCliente)
						break;
					case "modificado":
						styleValidatePanel(".p-clientes", "warning")
						usuarioAcordeon(datosCliente, "Se modificar\u00e1n los datos del cliente con RFC: "
								+ datosCliente.rfc, "Modificar cliente", null, editarCliente, null, datosCliente)
						break;
					case "ok":
						styleValidatePanel(".p-clientes", "info")
						usuarioAcordeon(datosCliente, "El usuario con rfc " + datosCliente.rfc + " ya existe", "Editar",
								null, editarCliente, null, datosCliente)
						break;

				}

				if (status == "error") {

				}
			});

}

function styleValidatePanel(panelSelector, type) {

	$(panelSelector).removeClass("panel-success panel-warning panel-danger")
	$(panelSelector).find(".panel-heading .glyphicon").removeClass(
			"glyphicon-ok glyphicon-warning-sign glyphicon-ban-circle")

	switch (type) {
		case "info":
			$(panelSelector).addClass("panel-success")
			$(panelSelector).find(".panel-heading .glyphicon").addClass("glyphicon-ok")
			break;
		case "warning":
			$(panelSelector).addClass("panel-warning")
			$(panelSelector).find(".panel-heading .glyphicon").addClass("glyphicon-warning-sign")
			break;
		case "danger":

			$(panelSelector).addClass("panel-danger")
			$(panelSelector).find(".panel-heading .glyphicon").addClass("glyphicon-ban-circle")

			break;
		default:

	}

}

function testValidacion() {

	$(".guardar-config").on("click", function() {
		styleValidatePanel(".panel.configuracion", "danger")
		styleValidatePanel(".panel.cabsa", "warning")

	})

}

function mutuallyExclusiveAcordionButton(accordionSelector, buttonSelector) {

	var allSelector = accordionSelector + " " + buttonSelector

	$(document).on("click", allSelector, function() {

		var allButtons = ($(this).parent()).find("button")

		$(allButtons).removeClass("btn-primary")

		$(this).addClass("btn-primary")

	})

}

function modalFactura() {

	$(document).on("click", ".boton.factura", function() {

		$(".guardar-config").removeAttr("disabled")

		$('#modal-factura').modal({
			show : true,
			keyboard : false
		})

		validaCliente()
		validaProductos()

		validadFormaDePago()
		validaDatosEmpresa()

	})
}

function direccionCortaParams(datosClienteJSON) {

	var dcp = {}

	dcp.calle = datosClienteJSON.calle
	dcp.noExterior = datosClienteJSON.exterior
	dcp.noInterior = datosClienteJSON.interior

	return dcp

}

function fillDatosUsiario(jsonDatos) {

	if (jsonDatos.clienteId != null) {
		$(".p-clientes  table tr td.texto.idCliente").html(jsonDatos.clienteId)
	}
	if (jsonDatos.rfc != null) {
		$(".p-clientes  table tr td.texto.rfc").html(jsonDatos.rfc)
	}
	if (jsonDatos.nombre != null) {
		$(".p-clientes  table tr td.texto.nombre").html(jsonDatos.nombre)
	}

	if (getDireccionCorta(direccionCortaParams(jsonDatos)) != null) {
		$(".p-clientes  table tr td.texto.direccion").html(getDireccionCorta(direccionCortaParams(jsonDatos)))
	}
	if (jsonDatos.colonia != null) {
		$(".p-clientes  table tr td.texto.colonia").html(jsonDatos.colonia)
	}
	if (jsonDatos.cp != null) {
		$(".p-clientes  table tr td.texto.cp").html(jsonDatos.cp)
	}
	if (jsonDatos.ciudad != null) {
		$(".p-clientes  table tr td.texto.ciudad").html(jsonDatos.ciudad)
	}
	if (jsonDatos.estado != null) {
		$(".p-clientes  table tr td.texto.estado").html(jsonDatos.estado)
	}

	// fucking hack, I kwnow, I suck
	$.post(getAbsolutePath("/receptor/byrfc/" + jsonDatos.rfc)).done(function(dataserver) {

		if (dataserver.correo != null) {
			$(".p-clientes  table tr td.texto.correo .correoCliente").val(dataserver.correo)
			$(".correoEnviarMail").val(dataserver.correo)

		}

	})

}

function usuarioExistented(jsonDatos) {

	$(".p-clientes .panel-body .cliente-body-title span").html("Usuario existente")
	$(".p-clientes .panel-body .cliente-body-title button").css("display", "none")
	fillDatosUsiario(jsonDatos)

}

function usuarioExistente(jsonDatos) {

	$(".p-clientes .panel-body .cliente-body-title span").html("Usuario existente")
	$(".p-clientes .panel-body .cliente-body-title button").css("display", "none")
	fillDatosUsiario(jsonDatos)

}

function usuarioAcordeon(jsonDatos, mensaje, textoBoton1, textoBoton2, btn1Event, btn2Event, datosCliente) {

	$(".p-clientes .panel-body .cliente-body-title span").html(mensaje)

	if (textoBoton1 == null) {
		$(".p-clientes .panel-body .cliente-body-title .boton1").css("display", "none")

	} else {

		var btn1 = $(".p-clientes .panel-body .cliente-body-title .boton1")
		btn1.css("display", "block")
		btn1.html(textoBoton1)
		btn1.unbind()
		btn1.on("click", function() {
			btn1Event(datosCliente)
		})

	}

	if (textoBoton2 == null) {
		$(".p-clientes .panel-body .cliente-body-title .boton2").css("display", "none")
	} else {

		var btn2 = $(".p-clientes .panel-body .cliente-body-title .boton2")
		btn2.css("display", "block")
		btn2.html(textoBoton2)
		btn2.unbind()
		btn2.on("click", function() {
			btn2Event(datosCliente)
		})
	}

	fillDatosUsiario(jsonDatos)

}

function fixParameter(str) {
	if (str == "---") {
		str = null
	}

	return str
}

function getJsonProductosFromHtml() {

	var productos = []

	var tableTrs = $(".productos-table table tr:not(:last-child)")

	$.each(tableTrs, function(index, value) {

		var td = {}

		var codigo = $(value).find(".codigo .text")
		var descripcion = $(value).find(".descripcion .text")
		var unidad = $(value).find(".unidad .text")

		td.codigo = fixParameter(codigo.html())
		td.descripcion = fixParameter(descripcion.html())
		td.unidad = fixParameter(unidad.html())

		productos.push(td)

	});

	return JSON.stringify(productos)

}
/**
 * Hardcoding is like pizza, bad for your healt but the best you can get in 30 minutes
 */
function validaProductos() {

	var jsonProductos = getJsonProductosFromHtml()

	var params = {}

	params.json = jsonProductos

	$.post(getAbsolutePath("/producto/verify"), params).done(function(data) {

		var html = ""

		var error = false
		var warning = false

		$.each(data, function() {

			if (this.status == "error") {
				error = true
			}

			if (this.status == "nuevo" || this.status == "modificado") {
				warning = true
			}

			html += createProductosModalRow(this)

			if (error) {
				styleValidatePanel(".p-productos", "danger")
			} else if (warning) {
				styleValidatePanel(".p-productos", "warning")
			} else {
				styleValidatePanel(".p-productos", "info")
			}

		})

		$("table.table.productos tbody").html(html)

	});

}

function createProductosModalRow(jsonProducto) {

	console.log("nanana")
	console.log("JSON===>")
	console.log(jsonProducto)
	console.log("<======JSON")

	var html = '';

	html += '<tr class="' + getStatusTrClass(jsonProducto.status) + '">';
	html += '	<td class="val-codigo">' + jsonProducto.codigo + '</td>';
	html += '	<td class="val-unidad">' + jsonProducto.unidad + '</td>';
	html += '	<td class="val-descripcion">' + jsonProducto.descripcion + '</td>';
	html += '	<td class="val-botones">';
	html += getButtonsTrClass(jsonProducto.status)
	html += '	</td>';
	html += '</tr>';

	return html;

}

function getStatusTrClass(status) {
	switch (status) {
		case "error":
			return "danger"
			break;
		case "nuevo":
			return "warning"
			break;
		case "modificado":
			return "warning"
			break;
		case "ok":
			return "success"
			break;
	}

}

function getButtonsTrClass(status) {
	switch (status) {
		case "error":
			return "C&oacute;digo y descripci&oacute;n son obligatorios"
			break;
		case "nuevo":
			return getProductoButtons("Crear", "crear")
			break;
		case "modificado":
			return getProductoButtons("Editar", "editar")
			break;
		case "ok":
			return "OK"

			break;
	}

}

function getProductoButtons(texto1, type) {

	var html = ''
	html += '		<button data-type="' + type + '" type="button" class="btn btn-producto">' + texto1 + '</button>';

	return html

}

function crearEditarProductos() {

	$(document).on("click", ".btn-producto", function() {

		var data = {}

		data.codigo = $(this).closest("tr").find(".val-codigo").html()
		data.descripcion = $(this).closest("tr").find(".val-descripcion").html()
		data.unidad = $(this).closest("tr").find(".val-unidad").html()

		var type = $(this).attr("data-type")

		if (type == "editar") {

			$.post(getAbsolutePath("/producto/edit"), data).done(function(data) {

			})

		} else if (type == "crear") {

			$.post(getAbsolutePath("/producto/save"), data).done(function(data) {

			})

		}

	})

}

function tempSaveDoNothing() {

	switch (data.status) {

		case "error":
			styleValidatePanel(".p-productos", "danger");
			usuarioAcordeon(datosCliente, "RFC y nombre son obligatorios")
			break;
		case "nuevo":
			styleValidatePanel(".p-productos", "warning")
			usuarioAcordeon(datosCliente, "Se crear\u00e1  un nuevo cliente con RFC: " + datosCliente.rfc, "Crear cliente",
					"No crear")
			break;
		case "modificado":
			styleValidatePanel(".p-productos", "warning")
			usuarioAcordeon(datosCliente, "Se modificar\u00e1n los datos del cliente con RFC: " + datosCliente.rfc,
					"Modificar cliente", "No modificar")
			break;
		case "ok":
			styleValidatePanel(".p-productos", "info")
			usuarioAcordeon(datosCliente, "El usuario ya existe")
			break;

	}

}

function validadFormaDePago() {

	var formaPago = $(".forma-pago .texto").html()

	if (formaPago != null) {
		if (formaPago.startsWith("Tarjeta")) {

			var cta = $(".numero-cta span").html()

			if (cta == null || cta == "" || cta == "---" || cta == "No aplica") {
				$(".p-forma-pago .fp-texto").html(
						"Cuando el pago es con tarjeta tiene que indicar los  &uacute;ltimos 4 d&iacute;gitos.")
				styleValidatePanel(".p-forma-pago", "danger");
				return;

			}

		}
	}

	$(".p-forma-pago .fp-texto").html("OK")
	styleValidatePanel(".p-forma-pago", "info");

}

function getDatosFactura() {

	var datosFactura = {}
	/**
	 * DATOS GENERALES
	 */
	datosFactura.formaPago = $(".tipo-pago span").html()

	datosFactura.condicionesDePago = $(".condicion-pago .texto").html()

	datosFactura.moneda = getMoneda($(".moneda").html())

	if (getMoneda($(".moneda").html()) != "MXN") {
		datosFactura.tipoCambio = $(".tipo-cambio  .texto").html()
	}

	datosFactura.metodoDePago = $(".forma-pago .texto").html()
	datosFactura.lugarExpedicion = $(".lugar-expedicion-hidden").html()

	datosFactura.numCtaPago = $(".numero-cta span").html()

	/**
	 * Datos del EMISOR ecodex
	 */

	// datosFactura.emisorNombre = "CABSA DE TABASCO S.A. de C.V." // harcoded, modificar
	// datosFactura.emisorRfc = "CTA0803272M7"
	datosFactura.emisorNombre = "Vulcano Software S.A. de C.V." // harcoded, modificar
	datosFactura.emisorRfc = "VSO120910LV5"

	// domicilioFiscalyExpedidonEn()

	datosFactura.emisorRegimenRegimen = $(".regimen-fiscal .regimen-fiscal-text").html()

	datosFactura.receptorRfc = $(".cliente-rfc .rfc-text").html()

	datosFactura.receptorNombre = $(".cliente-nombre .nombre-text").html()

	datosFactura.receptorDomicilioCalle = $(".cliente-direccion .calle").html()
	datosFactura.receptorDomicilioNoExterior = $(".cliente-direccion .exterior").html()
	datosFactura.receptorDomicilioNoInterior = $(".cliente-direccion .interior").html()
	datosFactura.receptorDomicilioColonia = $(".cliente-colonia span").html()
	datosFactura.receptorDomicilioLocalidad = $(".cliente-ciudad span").html()
	datosFactura.receptorDomicilioReferencia = ""
	datosFactura.receptorDomicilioMunicipio = $(".cliente-ciudad span").html()
	datosFactura.receptorDomicilioEstado = $(".cliente-estado span").html()
	datosFactura.receptorDomicilioPais = $(".cliente-pais").html()
	datosFactura.receptorDomicilioCodigoPostal = $(".cliente-cp span").html()

	var trTablaConceptos = $(".productos-table table tr:not(:last-child)")

	// Datos adicionales, no usados en el xml pero que sirver para generar el pdf

	var pdf = {}

	pdf.clave = $(".cliente-clave .clave-text").html()
	pdf.pedido = $(".pedido span").html()
	pdf.entrega = $(".entrega span").html()
	pdf.leyendaPagaremos = $(".pagare .prefix").html() + " " + $(".pagare .posfix").html()
	pdf.leyendaGeneracionInterese = $(".intereses .uno").html() + " " + $(".intereses .dos").html() + " "
			+ $(".intereses .tres").html() + " " + $(".intereses .cuatro").html() + " " + $(".intereses .cinco").html()
	pdf.telefono = $(".telefono span").html()
	pdf.correo = $(".correo span").html()
	pdf.web = $(".web span").html()

	// CONCEPTOS
	var conceptos = []
	var conceptosPdf = []

	$.each(trTablaConceptos, function() {

		var concepto = {}
		var conceptoPdf = {}

		var cantidadz = $(this).find(".cantidad .text").html()
		cantidadz = cantidadz.unformatNumber()

		var valorUnitario = $(this).find(".unitario .text").html()
		valorUnitario = valorUnitario.unformatNumber()

		concepto.cantidad = cantidadz
		concepto.unidad = $(this).find(".unidad .text").html()
		concepto.descripcion = $(this).find(".descripcion .text").html()
		concepto.valorUnitario = valorUnitario

		conceptoPdf.parte = $(this).find(".parte span").html()
		conceptoPdf.cantidad = cantidadz
		conceptoPdf.codigo = $(this).find(".codigo .text").html()
		conceptoPdf.descripcion = $(this).find(".descripcion .text").html()
		conceptoPdf.unidad = $(this).find(".unidad .text").html()
		conceptoPdf.valorUnitario = valorUnitario

		conceptos.push(concepto)
		conceptosPdf.push(conceptoPdf)

	})

	pdf.conceptos = conceptosPdf
	datosFactura.pdf = pdf

	datosFactura.conceptos = conceptos

	return JSON.stringify(datosFactura)

}

function crearFactura() {

	var params = {}
	var correo = $(".correoEnviarMail").val()

	var paginasPorPdf = getPaginasPdf()
	// FACTURA OK
	var datosFactura = getDatosFactura()

	params.email = correo
	params.json = datosFactura

	params.elementospaguno = paginasPorPdf.firstPageElements
	params.paginas = paginasPorPdf.paginas

	$(".guardar-config").prop('disabled', true);
	$.post(getAbsolutePath("/factura/factura"), params).done(function(data, status, jqXHR) {

		if (jqXHR.status === 401) {
			location.reload();
		}

		alert(data) // este si va, avisa el resultado del post

	}).fail(function(data, status, jqXHR) {

		if (jqXHR.status === 401) {
			location.reload();
		}

		alert("hubo un error, verifique los datos de la factura e intente de nuevo");

	}).always(function() {
		$(".guardar-config").removeAttr("disabled")
		$('#modal-factura').modal('hide')

	});

}

function getMoneda(moneda) {// remoce
	if (moneda == "pesos") {
		return "MXN"
	} else if (moneda == "dolares") {
		return "USD"
	} else {
		return "MXN"
	}
}

/**
 * Realmente quería poner esto en comentarios, pero me destroza todo el formato y después es un
 * desmadre componerlo, así que mejor lo dejo aquí
 */
function domicilioFiscalyExpedidonEn() {
	// Domicilio Fiscal
	datosFactura.emisorDomiciliofiscalCalle = "18 de marzo XX"
	datosFactura.emisorDomiciliofiscalNoExterior = "2200"
	datosFactura.emisorDomiciliofiscalNoInterior = "Edificio F 102"
	datosFactura.emisorDomiciliofiscalColonia = "Puerto México"
	datosFactura.emisorDomiciliofiscalLocalidad = "Coatzacoalcos"
	datosFactura.emisorDomiciliofiscalReferencia = "referencia"
	datosFactura.emisorDomiciliofiscalMunicipio = "Coatzacoalcos"
	datosFactura.emisorDomiciliofiscalEstado = "Veracruz"
	datosFactura.emisorDomiciliofiscalPais = "México"
	datosFactura.emisorDomiciliofiscalCodigoPostal = "96510"
	// Expedido en
	datosFactura.emisorExpedidoEnCalle = "18 de marzo XX"
	datosFactura.emisorExpedidoEnNoExterior = "2200"
	datosFactura.emisorExpedidoEnNoInterior = "Edificio F 102"
	datosFactura.emisorExpedidoEnColonia = "Puerto México"
	datosFactura.emisorExpedidoEnLocalidad = "Coatzacoalcos"
	datosFactura.emisorExpedidoEnReferencia = "referencia"
	datosFactura.emisorExpedidoEnMunicipio = "Coatzacoalcos"
	datosFactura.emisorExpedidoEnEstado = "Veracruz"
	datosFactura.emisorExpedidoEnPais = "México"
	datosFactura.emisorExpedidoEnCodigoPostal = "96510"

}

function fillFacturas() {

	$.post(getAbsolutePath("/factura/getall")).done(function(data) {

		var html = ''

		$.each(data, function() {
			html += getTrFacturaHtml(this)
		})

		$(".table-facturas tbody").html(html)

	})
}

function getTrFacturaHtml(data) {
	var html = ''

	html += '<tr>';
	html += '	<td>' + data.folio + '</td>';
	html += '	<td>' + data.uuid + '</td>';
	html += '	<td>' + data.rfc + '</td>';
	html += '	<td class="estatus-factura">' + data.status + '</td>';
	html += '	<td><button data-uuid="' + data.uuid + '" type="button"  class="btn btn-primary btn-pdf">PDF</button></td>';
	html += '	<td><button data-uuid="' + data.uuid + '" type="button"  class="btn btn-primary btn-xml">XML</button></td>';
	html += '	<td><button data-uuid="' + data.uuid
			+ '" type="button"  class="btn btn-danger btn-cancelar-factura">Cancelar</button></td>';
	html += '</tr>';

	return html

}

function cancelarFactura() {

	$(document).on("click", ".btn-cancelar-factura", function() {

		var uuid = $(this).attr("data-uuid")

		var tr = $(this).closest("tr")

		$.post(getAbsolutePath("/factura/cancelar/" + uuid)).done(function(data) {

			if (data == "La factura se canceló correctamente") {

				var statusHtml = tr.find(".estatus-factura")

				statusHtml.html("Cancelada")

			}
			alert(data) // si va avisa el resultado del post
		})

	})

	//

}

function descargarPDF() {

	$(document).on("click", ".btn-pdf", function() {

		var uuid = $(this).attr("data-uuid")

		window.open(getAbsolutePath("/factura/pdf/" + uuid));

	})

}

function descargarXML() {

	$(document).on("click", ".btn-xml", function() {

		var uuid = $(this).attr("data-uuid")

		window.open(getAbsolutePath("/factura/xml/" + uuid));

	})
}

function getDatosEmpresa() {

	var datos = {}

	datos.regimen = $(".regimen-fiscal-text").html()
	datos.correo = $(".correo span").html()
	datos.telefono = $(".telefono span").html()
	datos.web = $(".web span").html()

	return datos

}

function validaDatosEmpresa() {

	var datosEmpresa = getDatosEmpresa()

	setModalDataCabsa(datosEmpresa)

	$.post(getAbsolutePath("/factura/verifyGeneralData"), datosEmpresa).done(function(data) {

		if (data == "ok") {

			styleValidatePanel(".panel-datos-generales-cabsa", "info");

			$(".panel-datos-generales-cabsa .panel-body span").html("<b>OK</b>")
			$(".btn-modificar-cabsa").css("display", "none")

		}

		if (data == "modificado") {

			styleValidatePanel(".panel-datos-generales-cabsa", "warning");

			$(".panel-datos-generales-cabsa .panel-body span").html("¿Modificar los datos de Cabsa?")
			$(".btn-modificar-cabsa").css("display", "block")

		}

	})

}

function modificarDatosCabsa() {

	$(document).on("click", ".btn-modificar-cabsa", function() {

		var data = getDataCabsa()

		$.post(getAbsolutePath("/factura/modifyGeneralData"), data).done(function(data) {

		})

	})

}

function getDataCabsa() {
	var data = {}
	data.regimenFiscal = $(".fc-regimen").html()
	data.telefono = $(".fc-telefono").html()
	data.correo = $(".fc-correo").html()
	data.web = $(".fc-web").html()
	return data;
}

function setModalDataCabsa(datosEmpresa) {

	$(".fc-regimen").html(datosEmpresa.regimen)
	$(".fc-correo").html(datosEmpresa.correo)
	$(".fc-telefono").html(datosEmpresa.telefono)
	$(".fc-web").html(datosEmpresa.web)

}

function getAltoTablaProductos() {

	return $(".productos-table table tbody").height()

}

function getPaginasPdf() {
	var params = {}

	if (getAltoTablaProductos() > 324) {

		params.paginas = 2
		var elementsRawPages = $(".productos-table table tr:lt(21)")

		elementsRawPages = $.makeArray(elementsRawPages)

		getElementsInOnePage(elementsRawPages, params) // 1

		return params

	} else {

		params.paginas = 1

		return params
	}
	// 324

}

function getElementsInOnePage(elementsxw, params) {
	var wdt = 0;
	$.each(elementsxw, function(index, value) {
		wdt += $(value).height()
	})
	if (wdt < 324) {
		params.firstPageElements = elementsxw.length
		return;

	} else {
		elementsxw.pop()
		getElementsInOnePage(elementsxw, params)
	}
}

function blabla() {

	$(".botones .factura a").on("click", function() {
		var ppdf = getPaginasPdf()

		console.log(ppdf)

	})

}
