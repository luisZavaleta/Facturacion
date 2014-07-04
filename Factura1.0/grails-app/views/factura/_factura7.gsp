<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<style type="text/css">
@CHARSET "UTF-8";

@page {
	size: 8.5in 11in;
	background-color: red;
}

.factura-container {
	width: 7.02in !important;
	height: 9.7in !important;
	float: none !important;
	margin-left: auto !important;
	margin-right: auto !important;
	padding: 0 !important;
	box-sizing: content-box !important;
	font-size: 11px;
	/**TEPORAL**/
	border-bottom: 2px solid red;
}

.factura-inner-container {
	width: 100% !important;
	height: 100% !important;
	background-color: white !important;
}

td.colored {
	background-color: #95ceef;
	font-weight: bold;
}

table.bordered {
	border: 2px solid #0084cf !important;
	border-collapse: separate !important;
	border-spacing: 0 !important;

	/*font-size: 10px*/
}

table.bordered td {
	border-top: 1px solid #ddd;
}

.table-0 {
	width: 2.2in;
	text-align: center;
	float: left;
}

.table-0 tr {
	line-height: 14px !important;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.table-0 tr td {
	border: 1px;
	padding: 1px;
}

.logo-company {
	width: 2.62in;
	background-color: yellow;
	float: left;
	height: 100px;
}

table.table-datos-cliente {
	width: 7.02in;
	float: left;
	margin-top: 15px;
	table-layout: fixed;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

table.table-datos-cliente tr td.fecha {
	width: 22%;
}

table.table-datos-cliente tr td.titulo {
	width: 8%;
}

table.table-datos-cliente tr td.titulo-texto {
	width: 40%;
}

table.table-datos-cliente tr td {
	padding-left: 4px;
}
</style>
</head>
<body>
	<div class="factura-container">
		<div class="factura-inner-container">
			<table class="table-0 bordered">
				<tbody>
					<tr>
						<td class="colored">Folio fiscal</td>
					</tr>
					<tr>
						<td>
							<span style="visibility: hidden">A</span>
						</td>
					</tr>
					<tr class="">
						<td class="colored">No Certificado del SAT</td>
					</tr>
					<tr>
						<td>
							<span style="visibility: hidden">A</span>
						</td>
					</tr>
					<tr class="">
						<td class="colored">No de Serie Certificado SAT</td>
					</tr>
					<tr>
						<td>
							<span style="visibility: hidden">A</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="logo-company"></div>
			<table class="table-0 bordered">
				<tbody>
					<tr>
						<td class="colored">Factura</td>
					</tr>
					<tr>
						<td>
							<span style="visibility: hidden">A</span>
						</td>
					</tr>
					<tr class="">
						<td class="colored">Fecha de Certificación</td>
					</tr>
					<tr>
						<td>
							<span style="visibility: hidden">A</span>
						</td>
					</tr>
					<tr class="">
						<td class="colored">Régimen fiscal</td>
					</tr>
					<tr>
						<td>
							<span style="visibility: hidden">A</span>
						</td>
					</tr>
				</tbody>
			</table>
			<table class="table-datos-cliente bordered">
				<tbody>
					<tr>
						<td class=" colored titulo">Cliente:</td>
						<td class="titulo-texto"></td>
						<td colspan="2" class=" "></td>
						<td colspan="2" class=" colored">RFC:</td>
						<td colspan="6" class=" c1-text b-right"></td>
						<td colspan="1" class="fecha colored">Fecha expedición</td>
					</tr>
					<tr>
						<td class=" colored">Calle:</td>
						<td class=" "></td>
						<td colspan="2" class=" "></td>
						<td colspan="2" class=" colored">Int.:</td>
						<td colspan="2" class=" c1-text"></td>
						<td colspan="2" class=" colored">Ext:</td>
						<td colspan="2" class=" c1-text b-right"></td>
						<td colspan="1" class=" "></td>
					</tr>
					<tr>
						<td class=" colored">Colonia:</td>
						<td class=" "></td>
						<td colspan="2" class=" "></td>
						<td colspan="2" class=" colored">C.P.:</td>
						<td colspan="6" class=" c1-text b-right"></td>
						<td colspan="1" class="fecha colored">Condición de pago</td>
					</tr>
					<tr>
						<td class=" colored">Ciudad:</td>
						<td colspan="11"></td>
						<td class="fecha" rowspan="2"></td>
					</tr>
					<tr>
						<td class=" colored titulo">Estado:</td>
						<td class="titulo-texto"></td>
						<td colspan="2" class=" colored">Pais:</td>
						<td colspan="8" class=" c1-text b-right"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>