<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<style type="text/css">
@CHARSET "UTF-8";

@page {
	size: 8.5in 11in;
}

table tr td {
	padding: 0px;
	text-align: center;
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
	line-height: 1.3;
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
	border-bottom: 1px solid #ddd;
}

.border-gray-right {
	border-right: 1px solid #ddd;
}

.border-gray-left {
	border-left: 1px solid #ddd;
}

.border-gray-top td {
	border-top: 1px solid #ddd;
}

.border-color-right {
	border-right: 2px solid #0084cf !important;
}

.border-color-left {
	border-left: 2px solid #0084cf !important;
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
	height: 16px;
}

.table-productos tr td,.table-opcional  tr td,.table-forma-pago tr td,.table-datos-empresa tr td
	{
	height: 16px;
}

.logo-company {
	width: 2.62in;
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

table.table-productos tr  td {
	text-align: left;
}

table.table-productos tr.title  td {
	text-align: center;
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

.left-title {
	text-align: left;
	padding-left: 5px;
}

.right-title {
	text-align: right;
	padding-right: 5px;
}

.center-title {
	text-align: center;
}

.sello-digital-emisor,.sello-digital-sat,.cadena-original {
	height: 50px;
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
							${data?.folioFiscal ?: 'Dato proveído por el SAT'}
						</td>
					</tr>
					<tr class="">
						<td class="colored">No Certificado del SAT</td>
					</tr>
					<tr>
						<td>
							${ data?.noCertificadoSAT ?: 'Dato proveído por el SAT'}
						</td>
					</tr>
					<tr class="">
						<td class="colored">No de Serie Certificado SAT</td>
					</tr>
					<tr>
						<td>
							${data?.noSerieCertifiado ?: 'Dato proveído por el SAT'}
						</td>
					</tr>
				</tbody>
			</table>
			<div class="logo-company">LOGO DE LA COMPAÑIA</div>
			<table class="table-0 bordered">
				<tbody>
					<tr>
						<td class="colored">Factura</td>
					</tr>
					<tr>
						<td>
							${ data?.idFactura ?: 'Dato proveído por el sistema' }
						</td>
					</tr>
					<tr class="">
						<td class="colored">Fecha de Certificación</td>
					</tr>
					<tr>
						<td>
							${ data?.fechaCertificacion ?: 'Dato proveído por el SAT'}
						</td>
					</tr>
					<tr class="">
						<td class="colored">Régimen fiscal</td>
					</tr>
					<tr>
						<td>
							<span class="regimen-fiscal"> ${data?.regimenFiscal ?: "---"}</span>
						</td>
					</tr>
				</tbody>
			</table>
			<table class="table-datos-cliente bordered">
				<tbody>
					<tr>
						<td class="colored titulo right-title">Cliente:</td>
						<td class="titulo-texto left-title">
							<span class="nombre-receptor"> ${data?.nombre ?: 'Escriba el nombre del cliente'}
							</span>
						</td>
						<td colspan="2" class=" colored right-title">RFC:</td>
						<td colspan="6" class=" left-title">
							<span class="rfc-receptor"> ${ data?.rfcReceptor ?: 'Escriba el RFC del Cliente'}
							</span>
						</td>
						<td colspan="1" class="fecha colored  border-color-left">Fecha
							expedición</td>
					</tr>
					<tr>
						<td class="colored right-title">Calle:</td>
						<td class="left-title">
							<span class="calle-receptor"> ${ data?.calle ?: 'Escriba la calle del domicilio del cliente'}
							</span>
						</td>
						<td colspan="2" class=" colored right-title">Ext.</td>
						<td colspan="2" class=" left-title">
							<span class="int-receptor"> ${ data?.exterior ?: '---'}
							</span>
						</td>
						<td colspan="2" class=" colored right-title">Int.</td>
						<td colspan="2" class="left-title">
							<span class="ext-receptor"> ${ data?.interior ?: '---'}
							</span>
						</td>
						<td colspan="1" class="border-color-left left-title">
							${ data?.fechaExpedicion ?: 'Fecha de expedición'}
						</td>
					</tr>
					<tr>
						<td class=" colored right-title">Colonia:</td>
						<td class="left-title">
							<span class="colonia-receptor"> ${ data?.colonia ?: 'Escriba la colonia del domicilio del cliente'}</span>
						</td>
						<td colspan="2" class=" colored right-title">C.P.:</td>
						<td colspan="6" class="left-title">
							<span class="cp-receptor"> ${ data?.cp ?: 'Escriba C.P. del cliente'}</span>
						</td>
						<td colspan="1" class="fecha colored border-color-left">País</td>
					</tr>
					<tr>
						<td class=" colored titulo right-title">Ciudad:</td>
						<td class="left-title">
							<span class="ciudad-receptor"> ${ data?.ciudad ?: 'Escriba la ciudad del domicilio del cliente'}</span>
						</td>
						<td colspan="2" class="colored right-title pais-titulo">Estado:</td>
						<td colspan="6" class="left-title">
							<span class="estado-receptor"> ${ data?.estado ?: 'Estado del dom. del cliente'}</span>
						</td>
						<td class="border-color-left left-title">
							<span class="pais-receptor"> ${ data?.pais ?: 'México'}</span>
						</td>
					</tr>
				</tbody>
			</table>
			<table class="table-productos bordered">
				<thead>
					<tr class="title">
						<td class="parte colored">Parte</td>
						<td class="cantidad colored">Cant.</td>
						<td class="codigo colored">Código</td>
						<td class="descripcion colored">Descripción</td>
						<td class="unidad colored">Unds</td>
						<td class="unitario colored">P.unitario</td>
						<td class="importe colored">Importe</td>
					</tr>
				</thead>
				<tbody style="height: 150px; min-height: 150px;">
					<%--	<tr class="title">
						<td>Parte</td>
						<td>Cant.</td>
						<td>Código</td>
						<td>Descripción</td>
						<td>Unds</td>
						<td>P.unitario</td>
						<td>Importe</td>
					</tr>
					 --%>
					<g:each in="${data?.productos}">
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
								<g:formatNumber number="${(it.unitario)?.toBigDecimal()}"
									format="###,###.00" />
							</td>
							<td class="importe  no-border-right">
								<g:formatNumber number="${(it.importe)?.toBigDecimal()}"
									format="###,###.00" />
							</td>
						</tr>
					</g:each>
					<tr>
						<td
							style="overflow: hidden; height: 0px ! important; max-height: 0px ! important;"></td>
					</tr>
				</tbody>
				<tfoot>
					<tr class="border-gray-top">
						<td colspan="4" class="colored b-top">Importe con letras</td>
						<td colspan="2" class="colored b-top right-title">Subtotal:</td>
						<td class="b-top">
							<g:formatNumber number="${(data?.subtotal)?.toBigDecimal() ?:0 }"
								format="\$ ###,###.00" />
						</td>
					</tr>
					<tr>
						<td colspan="4" rowspan="2" class="b-top">
							${data?.importeLetra ?: 'Importe con letras'}
						</td>
						<td colspan="2" class="colored b-top right-title">I.V.A:</td>
						<td class="b-top">
							<g:formatNumber number="${(data?.iva)?.toBigDecimal() ?: 0}"
								format="\$ ###,###.00" />
						</td>
					</tr>
					<tr>
						<td colspan="2" class="colored b-top right-title">Total:</td>
						<td class="b-top">
							<g:formatNumber number="${(data?.total)?.toBigDecimal() ?: 0}"
								format="\$ ###,###.00" />
						</td>
					</tr>
				</tfoot>
			</table>
			<div class="factura-bottom">
				<table class="table-opcional bordered">
					<tbody>
						<tr>
							<td>
								${ data?.custom1 ?: 'Debemos y pagaremos  la cantidad descrita en el presente documento'}
							</td>
						</tr>
						<tr>
							<td style="width: 100%">
								${ data?.custom2 ?: 'Si esta factura no se paga a su vencimiento generará intereses moratorios del 8% Mensual'}
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table-datos-sat bordered">
					<tbody>
						<tr>
							<td rowspan="7" class="bcode border-right">
								<div>
									<img src="${data?.qrCode}" style="border: 0px"
										alt="El codigo de barras se generará automaticamente" />
								</div>
							</td>
						</tr>
						<tr>
							<td class="colored active b-left center-title">SELLO DÍGITAL
								DEL EMISOR</td>
						</tr>
						<tr>
							<td class="sello-digital-emisor break-word">
								${ data?.selloDigitalEmisor ?: 'El Sello digital del emisor se generará automaticamente'}
							</td>
						</tr>
						<tr>
							<td class="colored b-left center-title">SELLO DIGITAL DEL
								SAT</td>
						</tr>
						<tr>
							<td class="sello-digital-sat break-word">
								${ data?.selloDigitalSat ?: 'El Sello digital del SAT se generará automaticamente'}
							</td>
						</tr>
						<tr>
							<td class="colored b-left center-title break-word">CADENA
								ORIGINAL DE COMPLEMENTO DE CERTIFICADO DIGITAL DEL SAT</td>
						</tr>
						<tr>
							<td class=" break-word cadena-original">
								${ data?.cadenaOriginal ?: 'La cadena original de complemento de certificado dígital del SAT se generará automaticamente ' }
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
								${ data?.formaPago ?: 'Efectivo'}
							</td>
						</tr>
						<tr>
							<td class="colored">
								${ data?.noCuenta}
							</td>
						</tr>
						<tr>
							<td></td>
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
								${ data?.domicilio ?: 'Click Aquí para establecer el domicilio del emisor' }
							</td>
						</tr>
						<tr>
							<td class="colored" colspan="4">Lugar de expedición</td>
						</tr>
						<tr>
							<td colspan="4">
								${ data?.lugarExpedicion ?: 'Click aquí para establecer el lugar en donde se expedi la presente factura'}
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
								${ data?.rfcEmisor ?: 'RFC del Emisor'}
							</td>
							<td class="border-right">
								${ data?.telefono ?: 'Teléfono del Emisor'}
							</td>
							<td class="border-right">
								${ data?.correo ?: 'Correo del Emisor'}
							</td>
							<td>
								${ data?.web}
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
