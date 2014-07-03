<!DOCTYPE html>
<html lang="en" class="no-js">
<head>


<title>-</title>


<link href="../css/bootstrap-theme.min.css"
	rel="stylesheet" type="text/css" />
<style type="text/css">
@CHARSET "UTF-8";

.factura-container {
	width: 18cm;
	height: 11in;
	float: none;
	margin-left: auto;
	margin-right: auto;
	padding-top: 0.5in;
	padding-bottom: 0.5in;
	padding-left: 0in;
	padding-right: 0in;
}

.factura-container .content {
	width: 100%;
	height: 100%;
	background-color: white;
}

.factura-container .content .logo {
	width: 100%;
	height: 100%;
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

table tr.active  td,table tr td.active {
	font-weight: bold;
	font-size: 10px;
}

.logo {
	margin-top: 20px;
}

.cliente table tr td.generales {
	width: 60%;
}

.cliente table tr td.pedido {
	width: 25%;
}

.cliente table tr td.fecha {
	width: 15%;
}

.cliente table tr td.generales-titulo {
	width: 10%;
}

.cliente table tr td.c1,.cliente table tr td.c3 {
	width: 10%;
	text-align: right;
	padding-right: 2px !important;
}

.cliente table tr td.c1-text,.cliente table tr td.c3-text {
	text-align: left;
	padding-left: 10px !important;
}

.cliente table tr td.c2,.cliente table tr td.c4 {
	width: 20%;
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

.productos table tbody tr td.parte {
	width: 4%;
	max-width: 4%;
}

.productos table tbody tr td.cantidad {
	width: 4%;
	max-width: 4%;
}

.productos table tbody tr td.codigo {
	width: 27%;
	max-width: 27%;
}

.productos table tbody tr td.descripcion {
	width: 43%;
	max-width: 43%;
}

.productos table tbody tr td.unidad {
	width: 6%;
	max-width: 6%;
}

.productos table tbody tr td.unitario {
	width: 8%;
	max-width: 8%;
}

.productos table tbody tr td.importe {
	width: 8%;
	max-width: 8%;
}

.productos table td {
	border-right: 2px solid #0084cf;
}

.productos table td:last-child {
	border-right: none;
}

.productos table {
	font-size: 10px;
	font-family: "Times New Roman", Times, serif;
}

.productos {
	height: 4in;
}

.bcode {
	width: 20%;
}

.sellos {
	width: 80%;
}

.break-word {
	word-break: break-all;
	word-wrap: break-word;
	font-size: 10px;
}

.table>thead>tr>.active,.table>tbody>tr>.active,.table>tfoot>tr>.active,.table>thead>.active>td,.table>tbody>.active>td,.table>tfoot>.active>td,.table>thead>.active>th,.table>tbody>.active>th,.table>tfoot>.active>th
	{
	background-color: #95ceef;
}
</style>
</head>
<body>
	<div class="factura-container">
		<div class="content container">
			
			<div class="row cliente">
				<div class="col-md-12">
					<table class="table">
						<tbody>
							<tr>
								<td class="c1 active ">Cliente:</td>
								<td colspan="3" class="c1-text b-right">1234567</td>
								<td class="pedido active b-right">Pedido</td>
								<td class="fecha active">Fecha</td>
							</tr>
							<tr>
								<td class="c1 active ">Nombre:</td>
								<td colspan="3" class="c1-text b-right">Vulcano Software
									S.A de C.V.</td>
								<td class="b-right">CIN-175-13</td>
								<td>f</td>
							</tr>
							<tr>
								<td class="c1 active ">Dirección:</td>
								<td colspan="3" class="c1-text b-right">18 de marzo 2200
									Col. Vistalmar</td>
								<td class="active b-right">Entrega</td>
								<td class="active">Fecha de expedición</td>
							</tr>
							<tr>
								<td class="c1 active">Colonia:</td>
								<td class="c2 c1-text">Vistalmar</td>
								<td class="c3 active">C.P.:</td>
								<td class="c4 c1-text b-right">96259</td>
								<td rowspan="2" class="b-right">Almacén la Venta Tabasco na
									na na na batman XD</td>
								<td rowspan="2">18-12-2013</td>
							</tr>
							<tr>
								<td class="c1 active">Ciudad:</td>
								<td class="c2 c1-text">Coatzacoalcos</td>
								<td class="c3 active">RFC:</td>
								<td class="c4 c1-text b-right">VSO120910LV5</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="row productos">
				<div class="col-md-12">
					<table class="table">
						<tbody>
							<tr class="active">
								<td class="parte">Parte</td>
								<td class="cantidad">Cant.</td>
								<td class="codigo">Código</td>
								<td class="descipcion">Descripción</td>
								<td class="unidad">Unds</td>
								<td class="unitario">P.unitario</td>
								<td class="importe">Importe</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2</td>
								<td>123456789-123456789-123456789-12345</td>
								<td>CODO AC sin costura medio cople niuple A-23</td>
								<td>PZA</td>
								<td>1000</td>
								<td>2000</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2</td>
								<td>123456789-123456789-123456789-12345</td>
								<td>CODO AC sin costura medio cople niuple t A-23</td>
								<td>PZA</td>
								<td>1000</td>
								<td>2000</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2</td>
								<td>123456789-123456789-123456789-12345</td>
								<td>CODO AC sin costura medio cople niuple A-23</td>
								<td>PZA</td>
								<td>1000</td>
								<td>2000</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2</td>
								<td>123456789-123456789-123456789-12345</td>
								<td>CODO AC sin costura medio cople niuple A-23</td>
								<td>PZA</td>
								<td>1000</td>
								<td>2000</td>
							</tr>
							<tr>
								<td colspan="4" class="active b-top">Importe con letras</td>
								<td colspan="2" class="active b-top">Subtotal</td>
								<td class="b-top">200d0</td>
							</tr>
							<tr>
								<td colspan="4" rowspan="2" class="b-top">Veinty tres mis
									docientos veinti cuatro pesos</td>
								<td colspan="2" class="active b-top">I.V.A.</td>
								<td class="b-top">2000</td>
							</tr>
							<tr>
								<td colspan="2" class="active b-top">Total.</td>
								<td class="b-top">2000</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<table class="table">
						<tbody>
							<tr>
								<td>Debemos y pagaré(mos) incondicionalmente por este
									pagaré a la orden de CABSA DE TABASCO, S.A. de C.V. El Día</td>
							</tr>
							<tr>
								<td style="width: 100%">Si esta factura no se paga a su
									vencimiento generará intereses moratorios del 8% Mensual. Toda
									devolución causará un 20% de cargo por manejo de material.</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<table class="table">
						<tbody>
							<tr>
								<td rowspan="7" class="bcode">CODIGO BIDIMENCIONAL</td>
							</tr>
							<tr>
								<td class="sellos active b-left">SELLO DÍGITAL DEL EMISOR</td>
							</tr>
							<tr>
								<td class="b-left break-word">
									<p>||1.0|5CF3BE94-351C-D25B-38A9-3BDCFD3E3FE3|2013-12-
										24T21:12:01|W6KQr8DsxDsn07WcFrEw8ymDTOpdQ8nt0Y1egq80D8588QbZEO2ZpfwTomOtgqbvGbeULI2SMsCXhsx9kLHGw+pnmEWwbEoi546uTM7SW0tYkWCfR5ruggNya/b3I0u+5/ivdBJueZphE1uXbEXl9
										1I2n40qMdiwwAChP3wRDUw=|00001000000202771790||</p>
								</td>
							</tr>
							<tr>
								<td class="active b-left">SELLO DIGITAL DEL SAT</td>
							</tr>
							<tr>
								<td class="b-left break-word">||1.0|5CF3BE94-351C-D25B-38A9-3BDCFD3E3FE3|2013-12-
									24T21:12:01|W6KQr8DsxDsn07WcFrEw8ymDTOpdQ8nt0Y1egq80D8588QbZEO2ZpfwTomOtgqbvGbeULI2SMsCXhsx9kLHGw+pnmEWwbEoi546uTM7SW0tYkWCfR5ruggNya/b3I0u+5/ivdBJueZphE1uXbEXl9
								</td>
							</tr>
							<tr>
								<td class="active b-left">CADENA ORIGINAL DE COMPLEMENTO DE
									CERTIFICADO DIGITAL DEL SAT</td>
							</tr>
							<tr>
								<td class="b-left break-word">||1.0|5CF3BE94-351C-D25B-38A9-3BDCFD3E3FE3|2013-12-
									24T21:12:01|W6KQr8DsxDsn07WcFrEw8ymDTOpdQ8nt0Y1egq80D8588QbZEO2ZpfwTomOtgqbvGbeULI2SMsCXhsx9kLHGw+pnmEWwbEoi546uTM7SW0tYkWCfR5ruggNya/b3I0u+5/ivdBJueZphE1uXbEXl9
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3">
					<table class="table" style="margin-top:29px">
						<tbody style="padding-bottom:29px">
							<tr>
								<td class="active">Forma de Pago</td>
							</tr>
							<tr>
								<td>CTA0803272M7</td>
							</tr>
							<tr>
								<td class="active">No de Cuenta</td>
							</tr>
							<tr>
								<td>CTA0803272M7</td>
							</tr>
						
						</tbody>
					</table>
				</div>
				<div class="col-md-9">
					<table class="table">
						<tbody>
							<tr>
								<td class="active" colspan="4">Domicilio</td>
							</tr>
							<tr>
								<td colspan="4">Calle huimanguillo No 104 Plaza
									Villahemosa, Villahemosa, Centro, Tabasco. C.P. 861779</td>
							</tr>
							<tr>
								<td class="active" colspan="4">Lugar de expedición</td>
							</tr>
							<tr>
								<td colspan="4">Calle Prolongación de Hidalgo #1919 Col.
									Benito Juarez Norte Coatzacoalcos, Ver.</td>
							</tr>
							<tr class="active">
								<td class="b-top b-right" style="width: 25%">RFC</td>
								<td class="b-top b-right" style="width: 25%">Teléfono</td>
								<td class="b-top b-right" style="width: 25%">Correo</td>
								<td class="b-top" style="width: 25%">Web</td>
							</tr>
							<tr>
								<td class="b-right">CTA0803272M7</td>
								<td class="b-right">921 21 00 128</td>
								<td class="b-right">ventas@cabsaTabasco.com</td>
								<td>www.cabsatabasco.com</td>
							</tr>
							<tr>
								<td colspan="4" class="b-top">
									<strong>Pago en una sola exibición</strong>
									.
								</td>
							</tr>
							<tr>
								<td colspan="4" class="b-top">
									<strong>ESTE DOCUMENTO ES UNA REPRESENTACIÓN IMPRESA
										DE UN CFDI</strong>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>