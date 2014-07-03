$(document).ready(function() {
	notaDeRemision()
	editarClientesx()
	searchCliente()
	editarProductosx()
	searchProducto()
	eliminarCliente()
	saveCorreo()
	searchFactura()
	eliminarProductoxy()//gmail
	formatNumber()

});

$(document).ajaxSend(function(event, request, settings) {
	$('#loading-indicator').show();
});

$(document).ajaxComplete(function(event, request, settings) {
	$('#loading-indicator').hide();
});

function notaDeRemision() {

	$(".nota-remision").on("click", function() {

		var df = getDatosFactura()

		var prms = {}
		prms.json = df

		$.post(getAbsolutePath("/factura/notahack"), prms).done(function(data) {

			window.open(getAbsolutePath("/factura/notapdf/" + data))
		})

	})

}

// autocompleate

function editarClientesx() {
	$(".boton.clientes a").on("click", function() {
		$('#ver-clientes').modal({ // chosen
			show : true,
			keyboard : false
		})
	})
}

function searchCliente() {

	$(document).on("click", ".search-cliente button", function() {

		var text = $(".search-cliente-test").val()

		$.post(getAbsolutePath("/receptor/bynamelike/" + text)).done(function(data) {

			var html = ''

			$.each(data, function(index, value) {
				html += getClienteTr(value)
			})

			$(".table-receptores tbody").html(html)

		})

	})

}

function getClienteTr(receptor) {

	var html = ''

	var correo = receptor.correo
	if (correo == null || correo == "") {
		correo = "---"
	}

	html += '	<tr data-id="' + receptor.id + '">';
	html += '	<td>' + receptor.idCliente + '</td>';
	html += '	<td>' + receptor.rfc + '</td>';
	html += '	<td>' + receptor.nombre + '</td>';
	html += '	<td contenteditable="true" class="no-empty-plz correo-receptor">' + correo + '</td>';
	html += '	<td><button class="btn btn-danger eliminar-receptor"  type="button">Eliminar</button></td>';
	html += '</tr>';

	return html
}

function editarProductosx() {
	$(".btn-producto-x").on("click", function() {

		$('#ver-productos').modal({ // chosen
			show : true,
			keyboard : false
		})
	})

}

function searchProducto() {

	$(document).on("click", ".search-producto button", function() {

		var texto = $(".search-producto-text").val()

		$.post(getAbsolutePath("/producto/byDescripciones/" + texto)).done(function(data) {

			var html = ''

			$.each(data, function(index, value) {
				html += getProductoTr(value)
			})

			$(".table-productos-xy tbody").html(html)

		})

	})

}

/*
 * 
 * 
 */
function getProductoTr(producto) {
	var html = ''

	html += '	<tr data-id="' + producto.id + '">';
	html += '	<td>' + producto.codigo + '</td>';
	html += '	<td>' + producto.descripcion + '</td>';
	html += '	<td>' + producto.unidad + '</td>';
	html += '	<td><button class="btn btn-danger eliminar-producto"  type="button">Eliminar</button></td>';
	html += '</tr>';

	return html

}

function eliminarCliente() {

	$(document).on("click", ".eliminar-receptor", function() {
		var tr = $(this).closest("tr")

		var idCliente = tr.attr("data-id")

		$.post(getAbsolutePath("/receptor/delete/" + idCliente)).done(function(data) {

			if (data == "Cliente eliminado correctamente") {
				tr.remove()
			}
			alert(data)
		})

	})

}

function saveCorreo() {
	$(document).on("focusout", ".correo-receptor", function() {

		var tr = $(this).closest("tr")
		var correo = tr.find(".correo-receptor").html()
		var idx = tr.attr("data-id")

		if (correo != null && correo != "" && correo != "---") {
			var params = {}

			params.id = idx
			params.correo = correo

			$.post(getAbsolutePath("/receptor/editCorreo"), params).done(function(data) {
				alert(data)
			})
		}

	})
}

/*
 * 
 * <div class="input-append search-facturas"> <input class="span2 search-facturas-text"
 * id="appendedInputButton"
 */

function searchFactura() {

	$(document).on("click", ".search-facturas button", function() {

		var valuex = $(".search-facturas-text").val()

		$.post(getAbsolutePath("/factura/rfclike/" + valuex)).done(function(data) {

			var html = ''

			$.each(data, function(index, value) {
				html += getTrFacturaHtml(value)
			})

			$(".table-facturas tbody").html(html)

		})

	})

}

function eliminarProductoxy() {

	$(document).on("click", ".eliminar-producto", function() {
		var tr = $(this).closest("tr")

		var idProducto = tr.attr("data-id")

		$.post(getAbsolutePath("/producto/delete/" + idProducto)).done(function(data) {

			if (data == "Producto eliminado correctamente") {
				tr.remove()
			}
			alert(data)
		})

	})

}

function formatNumber() {

	$(document).on("focusout", ".lxzv-number", function() {

		var text = $(this).html()
		var textfn = text.formatNumber(2)
		$(this).html(textfn)
	})

	$(document).on("focus", ".lxzv-number", function() {
		var text = $(this).html()
		var textfn = text.unformatNumber(2)
		$(this).html(textfn)

	})

}
