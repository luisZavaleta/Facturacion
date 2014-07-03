<html>
<head>
<style type="text/css">
body {
	background: #FFFFFF;
	color: #000000;
}

table,td {
	border: 1px solid #CCC;
	border-collapse: collapse;
	font: small/1.5 "Tahoma", "Bitstream Vera Sans", Verdana, Helvetica,
		sans-serif;
}

table {
	border: none;
	border: 1px solid #CCC;
	width: 100%
}

thead th,tbody th {
	color: #666;
	padding: 5px 10px;
	border-left: 1px solid #CCC;
}

tbody th {
	background: #fafafb;
	border-top: 1px solid #CCC;
	text-align: left;
	font-weight: normal;
}

tbody tr td {
	padding: 5px 10px;
	color: #666;
}

tbody tr:hover td {
	color: #454545;
}

tfoot td,tfoot th {
	border-left: none;
	border-top: 1px solid #CCC;
	padding: 4px;
	color: #666;
}

caption {
	text-align: left;
	font-size: 120%;
	padding: 10px 0;
	color: #666;
}

table a:link {
	color: #666;
}

table a:visited {
	color: #666;
}

table a:hover {
	color: #003366;
	text-decoration: none;
}

table a:active {
	color: #003366;
}

.container {
	width: 700px;
}

.facturaElectronica {
	width: 640px;
	margin-top: 30px;
	margin-right: 30px;
	margin-left: 30px;
}

.row-first {
	margin-bottom: 5px;
}

.logo {
	width: 47%;
	padding-left: 30px;
	float: left;
}

.facturaElectronica div {
	float: left;
}

.folio {
	width: 47%;
	float: left;
	text-align: center;
	font-size: 27px;
	margin-top: 5px;
}

.row-second div {
	width: 100%;
	margin-bottom: 5px;
}

.row-second {
	
}

.row-third {
	margin-top: 20px;
}

.row-table {
	margin-top: 40px;
}

.table .codigo {
	font-size: 9px;
}

.total {
	float: right !important;
	font-weight: bold;
	margin-top: 3px;
	margin-right: 20px;
}

.table thead tr th {
	background-color: #95CEEF;
	font-size: 9px;
	padding: 0 0 0 0;
}

.table tbody tr td {
	padding: 0 2 0 2;
}

.b-right {
	border-right: 2px solid #0084cf;
}

.b-left {
	border-left: 2px solid #0084cf;
}

.b-top {
	border-top: 2px solid #0084cf !important;
}

.b-bottom {
	border-bottom: 2px solid #0084cf !important;
}

table {
	border: 2px solid #0084cf;
	border-collapse: separate;
	border-spacing: 0;
	border-radius: 5px;
	-moz-border-radius: 5px;
	font-size: 10px;
}

table tr {
	padding-top: 0px;
	padding-bottom: 0px;
	padding-left: 0px;
	padding-right: 0px;
}

table tr td {
	padding: 0px !important;
	text-align: center
}
</style>
</head>
<body>
	<div class="container">
		<div class="facturaElectronica">
			<div class="row-first" style="width: 100%">
				<div class="logo">
					<img src="${logo}" alt="una imagen" />
				</div>
				<div class="folio">Nota de remisión</div>
			</div>
			<div class="row-third">
				<div>
					<div style="width: 125px">
						<b>Cliente:</b>
					</div>
					<div style="width: 500px">
						${json.receptorNombre}
					</div>
				</div>
				<div style="margin-top:5px">
					<div style="width: 125px">
						<b>Direccion:</b>
					</div>
					<div style="width: 500px">
						${direccion}
					</div>
				</div>
				<div style="margin-top:5px">
					<div style="width: 125px">
						<b>Condiciones:</b>
					</div>
					<div style="width: 500px">
						${json.condicionesDePago}
					</div>
				</div>
			</div>
			<div class="row-table" style="width: 100%">
				<table class="table">
					<thead>
						<tr>
							<th style="width: 5%">Part.</th>
							<th style="width: 5%">Cant.</th>
							<th style="width: 10%">Código.</th>
							<th style="width: 50%">Descripción.</th>
							<th style="width: 8%">Unidad.</th>
							<th style="width: 8%">Unitario.</th>
							<th style="width: 8%">Importe.</th>
						</tr>
					</thead>
					<tbody>
					<g:set var="total" value="0"/>
						<g:each in="${json.pdf.conceptos}">
							<tr>
								<td class="parte">
									${it.parte}
								</td>
								<td class="cantidad">
									${it.cantidad}
								</td>
								<td class="codigo">
									${it.codigo}
								</td>
								<td class="descripcion">
									${it.descripcion}
								</td>
								<td class="unidad">
									${it.unidad}
								</td>
								<td class="unitario">
									${it.valorUnitario}
								</td>
								<td class="importe  no-border-right">
									${it.cantidad?.toBigDecimal() * it.valorUnitario?.toBigDecimal()}
									<g:set var="total" value="${total?.toBigDecimal() + (it.cantidad?.toBigDecimal() * it.valorUnitario?.toBigDecimal()) }"/>
								</td>
							</tr>
						</g:each>
				
					</tbody>
				</table>
			</div>
			<div class="total">
				Total: $
				<span class="cantidad">${total }</span>
			</div>
			<div style="width: 100%">
				*este documento
				<b>no</b>
				es un comprobante fiscal.
			</div>
			<div style="margin-top: 50px; width: 100%; text-align: center"
				class="footer">
				<div style="width: 100%" class="b-bottom b-right b-left b-top">
					<div style="width: 33%; float: left" class=" b-right">
						<b>Teléfono</b>
					</div>
					<div style="width: 33%; float: left" class=" b-right">
						<b>Correo</b>
					</div>
					<div style="width: 33%; float: left" class="text ">
						<b>Web</b>
					</div>
					<div style="width: 33%; float: left" class="b-top text">21432</div>
					<div style="width: 33%; float: left" class="b-top text">wawa@wawa</div>
					<div style="width: 33%; float: left" class="b-top text">www.google.com</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
