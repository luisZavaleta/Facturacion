<style type="text/css">
@CHARSET "UTF-8";

@page {
	size: 8.5in 11in;
}

html {
	font-family: helvetica; /*27*/
	font-size: 62.5%; /*259*/
}

body .factura-container { /*264*/
	margin: 0; /*33*/
	color: #333333;
	font-family: helvetica;
	font-size: 11px;
	line-height: 1.42857;
	margin-left: auto;
	margin-right: auto;
}

img { /*294*/
	vertical-align: middle;
}

.container { /*668*/
	margin-left: auto;
	margin-right: auto;
	padding-left: 15px;
	padding-right: 15px;
}

.container:before,.container:after { /*675*/
	content: " ";
}

.container:after { /*680*/
	clear: both;
}

.container:before,.container:after { /*684*/
	content: " ";
}

.container:after { /*680*/
	clear: both;
}

.container:after { /*689*/
	clear: both;
}

.row { /*711*/
	margin-left: -15px;
	margin-right: -15px;
}

.row:before,.row:after { /*716*/
	content: " ";
}

.row:after { /*721*/
	clear: both;
}

.row:before,.row:after { /*725*/
	content: " ";
}

.row:after { /*730*/
	clear: both;
}

.col-xs-1,.col-sm-1,.col-md-1,.col-lg-1,.col-xs-2,.col-sm-2,.col-md-2,.col-lg-2,.col-xs-3,.col-sm-3,.col-md-3,.col-lg-3,.col-xs-4,.col-sm-4,.col-md-4,.col-lg-4,.col-xs-5,.col-sm-5,.col-md-5,.col-lg-5,.col-xs-6,.col-sm-6,.col-md-6,.col-lg-6,.col-xs-7,.col-sm-7,.col-md-7,.col-lg-7,.col-xs-8,.col-sm-8,.col-md-8,.col-lg-8,.col-xs-9,.col-sm-9,.col-md-9,.col-lg-9,.col-xs-10,.col-sm-10,.col-md-10,.col-lg-10,.col-xs-11,.col-sm-11,.col-md-11,.col-lg-11,.col-xs-12,.col-sm-12,.col-md-12,.col-lg-12
	{ /*734*/
	min-height: 1px;
	padding-left: 15px;
	padding-right: 15px;
	position: relative;
}

.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12
	{ /*1112*/
	float: left;
}

.col-md-12 { /*1116*/
	width: 100%;
}

.col-md-9 { /*1125*/
	width: 75%;
}

.col-md-4 { /*1140*/
	width: 33.3333%;
}

table { /*1431*/
	max-width: 100%;
}

.col-md-3 { /*1143*/
	width: 25%;
}

.table { /*1440*/
	margin-bottom: 20px;
	/*width: 100%;  QUITAR */
}

.table>thead>tr>th,.table>tbody>tr>th,.table>tfoot>tr>th,.table>thead>tr>td,.table>tbody>tr>td,.table>tfoot>tr>td
	{ /*1445*/
	border-bottom: 1px solid #DDDDDD;
	line-height: 1.42857;
	padding: 0px;
	vertical-align: top;
}

#loading-indicator {
	position: absolute;
	left: 10px;
	top: 10px;
	bottom: 10px;
}

.factura-container {
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
}

.factura-container .content .logo {
	width: 100%;
	height: 100%;
}

table tr {
	padding-top: 0px;
	padding-bottom: 0px;
	padding-left: 0px;
	padding-right: 0px;
}

table tr td {
	padding: 0px !important;
	text-align: center;
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

.productos table tbody tr td {
	overflow: hidden;
}

.productos table tbody tr td.parte {
	width: .3in;
}

.productos table tbody tr td.cantidad {
	width: .3in;
}

.productos table tbody tr td.codigo {
	width: 2.25in;
}

.productos table tbody tr td.descripcion {
	width: 3.56in;
}

.productos table tbody tr td.unidad {
	width: 0.475in;
}

.productos table tbody tr td.unitario {
	width: 0.72in;
}

.productos table tbody tr td.importe {
	width: 0.72in;
	text-align: right;
}

.productos table tbody tr td.importe span {
	padding-right: 2px;
}

.productos table {
	font-family: helvetica;
	font-size: 10.8px;
}

.productos {
	height: 100%;
	overflow-y: scroll;
	overflow: -moz-scrollbars-vertical;
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

#fondo-imag {
	width: 100%;
	height: 100%;
}

.factura-container {
	width: 8.5in;
	height: 11in;
	position: relative;
}

#fondo-imag img {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 100%;
	height: 100%;
	z-index: -1;
}

/*DATA CSS*/
.factura-container div {
	position: absolute;
	background-color: transparent;
}

.factura-container .col-md-12 {
	position: relative;
	padding-left: 0px;
	padding-right: 0px;
}

.factura-container .row.productos {
	position: relative;
	margin-left: 0;
	margin-right: 0;
}

.factura-container div span {
	position: relative;
	min-width: 20px;
}

.factura-container .folio {
	top: .75in;
	left: .1in;
	position: absolute;
	width: 2.45in;
	text-align: center
}

.factura-container .folio span {
	
}

.factura-container .certificado-sat {
	top: 1.11in;
	left: .1in;
	width: 2.45in;
	text-align: center
}

.factura-container .certificado-sat span {
	
}

.factura-container .serie-certificado-sat {
	top: 1.47in;
	left: .1in;
	width: 2.45in;
	text-align: center
}

.factura-container .serie-certificado-sat span {
	
}

.factura-container .factura {
	top: .75in;
	left: 5.95in;
	width: 2.45in;
	text-align: center
}

.factura-container .factura span {
	
}

.factura-container .fecha-certificacion {
	top: 1.11in;
	left: 5.95in;
	width: 2.45in;
	text-align: center
}

.factura-container .fecha-certificacion span {
	
}

.factura-container .regimen-fiscal {
	top: 1.47in;
	left: 5.95in;
	width: 2.45in;
	text-align: center
}

.factura-container .regimen-fiscal span {
	
}

.factura-container .cliente-clave {
	left: 0.77in;
	text-align: center;
	top: 1.777in;
	width: 1.72in;
}

.factura-container .cliente-clave span {
	
}

.factura-container .cliente-nombre {
	left: 0.81in;
    text-align: center;
    top: 1.96in;
    width: 4.04in;
}

.factura-container .cliente-nombre span {
	
}

.factura-container .cliente-direccion {
	left: 0.77in;
	text-align: center;
	top: 2.143in;
	width: 4.14in;
}

.factura-container .cliente-direccion span {
	
}

.factura-container .cliente-colonia {
	left: 0.77in;
	text-align: center;
	top: 2.322in;
	width: 1.73in;
}

.factura-container .cliente-colonia span {
	
}

.factura-container .cliente-ciudad {
	left: 0.77in;
	text-align: center;
	top: 2.507in;
	width: 1.71in;
}

.factura-container .cliente-ciudad span {
	
}

.factura-container .cliente-cp {
	left: 3.205in;
	text-align: center;
	top: 2.325in;
	width: 1.7in;
}

.factura-container .cliente-cp span {
	
}

.factura-container .cliente-rfc span {
	position: relative;
}

.factura-container .cliente-rfc {
	left: 3.205in;
	text-align: center;
	top: 1.777in;
	width: 1.7in;
}

.factura-container .cliente-estado {
	left: 3.205in;
	text-align: center;
	top: 2.51in;
	width: 1.7in;
}

.factura-container .pedido {
	left: 5in;
    text-align: center;
    top: 1.964in;
    width: 2.02in;
}

.factura-container .pedido span {
	
}

.factura-container .entrega {
	left: 5in;
    text-align: center;
    top: 2.32in;
    width: 2in;
}

.factura-container .entrega span {
	
}

.factura-container .fecha-expedicion {
	left: 7.185in;
	text-align: center;
	top: 1.98in;
	width: 1.23in;
}

.factura-container .fecha-expedicion span {
	
}

.factura-container .condicion-pago {
	left: 7.15in;
	text-align: center;
	top: 2.35in;
	width: 1.23in;
}

.factura-container .condicion-pago span {
	
}

.factura-container .importe-letra {
	left: 0.1in;
	text-align: center;
	top: 6.64in;
	width: 6.45in;
}

.factura-container .importe-letra span {
	
}

.factura-container .subtotal {
	left: 7.26in;
	text-align: center;
	top: 6.44in;
	width: 1.15in;
	text-align: right;
}

.factura-container .subtotal span {
	
}

.factura-container .iva {
	left: 7.26in;
	text-align: center;
	top: 6.64in;
	width: 1.15in;
	text-align: right;
}

.factura-container .iva span {
	
}

.factura-container .total {
	left: 7.26in;
	text-align: center;
	top: 6.82in;
	width: 1.15in;
	text-align: right;
}

.factura-container .total span {
	
}

.factura-container .pagare {
	left: 0.1in;
	text-align: center;
	top: 7.15in;
	width: 8.3in;
}

.factura-container .pagare span {
	
}

.factura-container .intereses {
	left: 0.1in;
	text-align: center;
	top: 7.32in;
	width: 8.3in;
}

.factura-container .intereses span {
	
}

.factura-container .sello-digital {
	left: 1.77in;
	text-align: center;
	top: 8.02in;
	width: 6.65in;
}

.factura-container .sello-digital span {
	
}

.factura-container .sello-sat {
	left: 1.77in;
	text-align: center;
	top: 8.83in;
	width: 6.65in;
}

.factura-container .sello-sat span {
	
}

.factura-container .cadena-original {
	left: 1.77in;
	text-align: center;
	top: 9.37in;
	width: 6.65in;
	text-align: center;
}

.factura-container .cadena-original span {
	
}

.factura-container .codigo-bidimensional {
	height: 1.6in;
	left: 0.105in;
	text-align: center;
	top: 7.95in;
	width: 1.6in;
}

.factura-container .codigo-bidimensional span {
	
}

.factura-container .forma-pago {
	left: 0.1in;
	text-align: center;
	top: 10.415in;
	width: 1.715in;
}

.factura-container .forma-pago span {
	
}

.factura-container .numero-cta {
	left: 0.1in;
	text-align: center;
	width: 1.715in;
	text-align: center;
	top: 10.77in;
}

.factura-container .numero-cta span {
	
}

.factura-container .domicilio {
	left: 2.28in;
	text-align: center;
	top: 10.05in;
	width: 6.13in;
}

.factura-container .domicilio span {
	
}

.factura-container .expedicion {
	left: 2.28in;
	text-align: center;
	top: 10.43in;
	width: 6.13in;
}

.factura-container .expedicion span {
	
}

.factura-container .rfc {
	left: 2.28in;
	text-align: center;
	top: 10.80in;
	width: 1.49in;
}

.factura-container .rfc span {
	
}

.factura-container .telefono {
	left: 3.82in;
	text-align: center;
	top: 10.80in;
	width: 1.49in;
}

.factura-container .telefono span {
	
}

.factura-container .correo {
	left: 5.361in;
	text-align: center;
	top: 10.80in;
	width: 1.49in;
	font-size: 10px;
}

.factura-container .correo span {
	
}

.factura-container .web {
	left: 6.9in;
	text-align: center;
	top: 10.80in;
	width: 1.49in;
}

.factura-container .web span {
	
}

.factura-container .tipo-pago {
	left: 2.28in;
	text-align: center;
	top: 10.98in;
	width: 6.12in;
}

}
.factura-container .tipo-pago span {
	
}

.factura-container .representacion-impresa {
	left: 2.28in;
	text-align: center;
	top: 11.18in;
	width: 6.12in;
	text-align: center;
}

.factura-container .representacion-impresa span {
	
}

.factura-container .productos-table {
	height: 3.67in;
	left: 0.067in;
	text-align: center;
	top: 3.02in;
	width: 8.36in;
	height: 3.27in
}

.factura-container .productos-table span {
	
}

.alert {
	text-align: center;
	margin-bottom: 2px;
}

.ui-helper-hidden-accessible {
	display: none;
}

.tipo-cambio {
	left: 5in;
	top: 6.82in;
}

.tipo-cambio .tag {
	background-color: #95CEEF;
	font-weight: bold;
}

.tipo-cambio .texto {
	padding-left: .2in;
}

.table-receptores-div {
	max-height: 300px;
	overflow: scroll;
}
</style>