<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<style type="text/css">
@CHARSET "UTF-8";

@page {
	size: 8.5in 11in;
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
	position: relative;
}

.factura-inner-container {
	width: 100% !important;
	height: 100% !important;
	background-color: white !important;
	position: relative;
}

.factura-inner-container .bcode div {
	width: 130px;
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

.border-top td,.border-top {
	border-top: 2px solid #0084cf !important;
}

.border-right {
	border-right: 2px solid #0084cf !important;
}

table.bordered td {
	border-top: 1px solid #ddd;
}

.border-gray-right {
	border-right: 1px solid #ddd;
}

.border-gray-left {
	border-left: 1px solid #ddd;
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
	margin-top: 10px;
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

table.table-productos {
	width: 7.02in;
	float: left;
	margin-top: 10px;
	table-layout: auto;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

table.table-productos tr.td-producto td,table.table-productos tr.title td
	{
	border-right: 1px solid #ddd;
}

table.table-productos tr.td-producto td,table.table-productos tr.title td
	{
	border-right: 1px solid #ddd;
}

table.table-productos tr.title {
	border-right: 1px solid #ddd;
}

table.table-productos tr.title  td.parte {
	width: 5%;
}

table.table-productos tr.title  td.cantidad {
	width: 5%;
}

table.table-productos tr.title  td.codigo {
	width: 7%;
}

table.table-productos tr.title  td.descripcion {
	width: 53%;
}

table.table-productos tr.title  td.unidad {
	width: 5%;
}

table.table-productos tr.title  td.unitario {
	width: 11%;
}

table.table-productos tr.title  td.importe {
	width: 14%;
}

table.table-opcional {
	width: 7.02in;
	float: left;
	bottom: 5px;
	table-layout: auto;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

table.table-datos-sat {
	width: 7.02in;
	float: left;
	margin-top: 10px;
	table-layout: auto;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.break-word {
	font-family: "Courier New", Courier, monospace;
}

.factura-bottom {
	position: absolute;
	bottom: 0;
}

table.table-forma-pago {
	margin-top: 10px;
	float: left;
	width: 20%;
}

table.table-datos-empresa {
	margin-top: 10px;
	float: right;
	width: 78%;
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
						<td colspan="1" class="fecha colored  border-gray-left">Fecha
							expedición</td>
					</tr>
					<tr>
						<td class=" colored">Calle:</td>
						<td class=" "></td>
						<td colspan="2" class=" "></td>
						<td colspan="2" class=" colored">Int.:</td>
						<td colspan="2" class=" c1-text"></td>
						<td colspan="2" class=" colored">Ext:</td>
						<td colspan="2" class=" c1-text b-right"></td>
						<td colspan="1" class="border-gray-left"></td>
					</tr>
					<tr>
						<td class=" colored">Colonia:</td>
						<td class=" "></td>
						<td colspan="2" class=" "></td>
						<td colspan="2" class=" colored">C.P.:</td>
						<td colspan="6" class=" c1-text b-right"></td>
						<td colspan="1" class="fecha colored border-gray-left">Condición
							de pago</td>
					</tr>
					<tr>
						<td class=" colored">Ciudad:</td>
						<td colspan="11"></td>
						<td class="fecha border-gray-left" rowspan="2"></td>
					</tr>
					<tr>
						<td class=" colored titulo">Estado:</td>
						<td class="titulo-texto"></td>
						<td colspan="2" class=" colored">Pais:</td>
						<td colspan="8" class=" c1-text b-right"></td>
					</tr>
				</tbody>
			</table>
			<table class="table-productos bordered">
				<tbody>
					<tr class="title">
						<td class="parte colored">Parte</td>
						<td class="cantidad colored">Cant.</td>
						<td class="codigo colored">Código</td>
						<td class="descripcion colored">Descripción</td>
						<td class="unidad colored">Unds</td>
						<td class="unitario colored">P.unitario</td>
						<td class="importe colored">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr class="td-producto">
						<td class="parte">Parte</td>
						<td class="cantidad">Cant.</td>
						<td class="codigo">Código</td>
						<td class="descripcion">Descripción</td>
						<td class="unidad">Unds</td>
						<td class="unitario">P.unitario</td>
						<td class="importe">Importe</td>
					</tr>
					<tr>
						<td colspan="4" class="colored b-top">Importe con letras</td>
						<td colspan="2" class="colored b-top">Subtotal</td>
						<td class="b-top">Un trillon</td>
					</tr>
					<tr>
						<td colspan="4" rowspan="2" class="b-top">Dos trillones de
							dolares</td>
						<td colspan="2" class="colored b-top">I.V.A.</td>
						<td class="b-top">Tres trillones</td>
					</tr>
					<tr>
						<td colspan="2" class="colored b-top">Total.</td>
						<td class="b-top">
							<span style="visibility: hidden">A</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="factura-bottom">
				<table class="table-opcional bordered">
					<tbody>
						<tr>
							<td>Debemos y pagaremos</td>
						</tr>
						<tr>
							<td style="width: 100%">Si esta factura no se paga a su
								vencimiento generará intereses moratorios del 8% Mensual.</td>
						</tr>
					</tbody>
				</table>
				<table class="table-datos-sat bordered">
					<tbody>
						<tr>
							<td rowspan="7" class="bcode border-gray-right">
								<div>barcode</div>
							</td>
						</tr>
						<tr>
							<td class="sellos active b-left">SELLO DÍGITAL DEL EMISOR</td>
						</tr>
						<tr>
							<td class="b-left break-word ">
								1234567-101234567-201234567-301234567-MMMMMMMMM-501234567-601234567-701234567-80
								1234567-101234567-201234567-301234567-401234567-501234567-601234567-701234567-80
								1234567-101234567-201234567-301234567-401234567-501234567-601234567-701234567-80
								1234567-101234567-201234567-301234567-401234567-501234567-601234567-701234567-80
								1234567-.........-201234567-301234567-401234567-501234567-601234567-701234567-80
							</td>
						</tr>
						<tr>
							<td class="active b-left">SELLO DIGITAL DEL SAT</td>
						</tr>
						<tr>
							<td class="b-left break-word">
								1234567-101234567-201234567-301234567-MMMMMMMMM-501234567-601234567-701234567-80
								1234567-101234567-201234567-301234567-401234567-501234567-601234567-701234567-80
								1234567-101234567-201234567-301234567-401234567-501234567-601234567-701234567-80
								1234567-101234567-201234567-301234567-401234567-501234567-601234567-701234567-80
							</td>
						</tr>
						<tr>
							<td class="active b-left">CADENA ORIGINAL DE COMPLEMENTO DE
								CERTIFICADO DIGITAL DEL SAT</td>
						</tr>
						<tr>
							<td class="b-left break-word">
								1234567-101234567-201234567-301234567-MMMMMMMMM-501234567-601234567-701234567-80
								1234567-101234567-201234567-301234567-401234567-501234567-601234567-701234567-80
								1234567-101234567-201234567-301234567-401234567-501234567-601234567-701234567-80
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table-forma-pago bordered">
					<tbody>
						<tr>
							<td class="colored">Forma de Pago</td>
						</tr>
						<tr>
							<td>
								<span style="visibility: hidden">A</span>
							</td>
						</tr>
						<tr>
							<td class="colored">No de Cuenta</td>
						</tr>
						<tr>
							<td>
								<span style="visibility: hidden">A</span>
							</td>
						</tr>
						<tr style="height: 45px">
							<td class="colored">Pago en una sola exibición.</td>
						</tr>
					</tbody>
				</table>
				<table class="table-datos-empresa bordered">
					<tbody>
						<tr>
							<td class="colored" colspan="4">Domicilio</td>
						</tr>
						<tr>
							<td colspan="4">
								<span style="visibility: hidden">A</span>
							</td>
						</tr>
						<tr>
							<td class="colored" colspan="4">Lugar de expedición</td>
						</tr>
						<tr>
							<td colspan="4">
								<span style="visibility: hidden">A</span>
							</td>
						</tr>
						<tr class="border-top">
							<td class="b-top  colored border-right " style="width: 25%">RFC</td>
							<td class="b-top  colored border-right " style="width: 25%">Teléfono</td>
							<td class="b-top  colored border-right " style="width: 25%">Correo</td>
							<td class="b-top colored" style="width: 25%">Web</td>
						</tr>
						<tr>
							<td class="border-right">
								<span style="visibility: hidden">A</span>
							</td>
							<td class="border-right">
								<span style="visibility: hidden">A</span>
							</td>
							<td class="border-right">
								<span style="visibility: hidden">A</span>
							</td>
							<td>
								<span style="visibility: hidden">A</span>
							</td>
						</tr>
						<tr class="border-top" style="text-align: center">
							<td colspan="4" class="b-top">
								<strong> ESTE DOCUMENTO ES UNA REPRESENTACIN IMPRESA DE
									UN CFDI </strong>
								.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
</html>