<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<r:require modules="jqueryui" />
<r:require modules="bootstrap" />
<r:require modules="factura" />
<r:require modules="index" />
<r:require modules="indexcss" />
<r:require modules="jasny" />
<r:require modules="modalVulcano" />

<meta name="layout" content="main" />
<title>-</title>

<g:javascript src="listas.js" />
<g:javascript src="big.min.js" />
</head>
<body>
	<img src="${resource(dir: 'images', file: 'ajax-loader.gif')}"
		id="loading-indicator"
		style="display: none; width: 45px; height: 45px; z-index: 999999" />
	<div class="row">
		<div class="alert alert-success" style="display: none"></div>
	</div>
	<div class="row">
		<div class="col-md-9">
			<div style="margin-top: 25px; margin-bottom: 25px">
				<g:render template="factura7" />
			</div>
		</div>
		<div class="col-md-3">
			<div class="row">
				<div class="col-md-12 botones">
					<div class="col-md-12 boton factura">
						<a href="#responsive"
							class="btn btn-block btn-factura btn-primary generar-factura">
							<span class="glyphicon glyphicon-list-alt"></span> <span
								class="texto">GENERAR FACTURA</span> <span></span>
						</a>
					</div>
					
					<div class="col-md-12 boton clientes">
						<a href="#responsive" class="btn btn-block btn-factura btn-uno">
							<span class="glyphicon glyphicon-user"></span> <span
								class="texto">DATOS DE CLIENTES</span> <span></span>
						</a>
					</div>
				
					<div class="col-md-12 boton config">
						<a href="#" class="btn btn-block btn-factura btn-dos">
							<span class="glyphicon glyphicon-cog"></span>
							<span class="texto">CONFIGURACIÓN DEL SITEMA</span>
						</a>
					</div>
				
					<div class="col-md-12 boton">
						<a href="#"
							class="btn btn-block btn-factura btn-info editar-facturas">
							<span class="glyphicon glyphicon-eye-open"></span> <span
								class="texto">VER Y CANCELAR FACTURAS</span>
						</a>
					</div>
					<div class="col-md-12 boton">
						<a href="#"
							class="btn btn-block btn-factura btn-cua btn-producto-x">
							<span class="glyphicon glyphicon-barcode"></span> <span
								class="texto">DATOS DE LOS PRODUCTOS</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<g:render template="modals/domicilio" model="[id:'modal-domicilio']" />
	<g:render template="modals/domicilio" model="[id:'modal-lugar']" />
	<input id="baseURL" type="hidden" value="${resource()}">
</body>
</html>
