<!-- VENTA /img/loader.gif -->
<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'btn-custom.css')}" type="text/css" />

<meta name="layout" content="mainLayout">
<style type="text/css">
.row {
	margin-top: 30px
}
</style>

<script type="text/javascript">
	$(document).ready(function() {

		$(".inventario").on("click", function(event) {		
			window.location.replace("inventario/index");
		});
		$(".productos").on("click", function(event) {
			window.location.replace("almacen/entrada");
		});
		$(".reportes").on("click", function(event) {
			window.location.replace("venta/venta");
		});
		$(".clientes").on("click", function(event) {
			window.location.replace("producto");
		});
		$(".proveedores").on("click", function(event) {
			window.location.replace("cliente");
		});
		$(".facturacion").on("click", function(event) {
			window.location.replace("datosGenerales");
		});

	});
</script>

</head>

<body>
	<div class="container">
		<div class="row">
			<div class="span4">
				<button class="btn btn-block btn-custom-alpha inventario"
					style="height: 250px" type="button">INVENTARIOS</button>

			</div>
			<div class="span4">
				<button class="btn btn-block btn-custom-lima productos"
					style="height: 250px" type="button">ALMACEN</button>
			</div>
			<div class="span4">
				<button class="btn btn-block btn-custom-india reportes"
					style="height: 250px" type="button">VENTAS Y FACTURACIÓN</button>
			</div>
		</div>
		<div class="row">
			<div class="span4">
				<button class="btn btn-block btn-custom-foxtrot clientes"
					style="height: 250px" type="button">PRODUCTOS</button>
			</div>
			<div class="span4">
				<button class="btn btn-block btn-custom-vulcano proveedores"
					style="height: 250px" type="button">CLIENTES</button>
			</div>
			<div class="span4">
				<button class="btn btn-block btn-custom-v2 facturacion"
					style="height: 250px" type="button">DATOS GENERALES</button>
			</div>
		</div>
	</div>



</body>
</html>