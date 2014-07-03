<!-- MODAL DE CONFIGURACIÓN DE CERTIFICADO, LLAVE PRIMARIA Y CONTRASEÑA  -->
<div id="modal-config" class="modal fade" tabindex="-1" data-width="760"
	style="display: none;">
	<div>
		<div class="alert alert-success" style="display: none"></div>
	</div>
	<div class="modal-header">
		<h4 class="modal-title">Configuración para factura electrónica</h4>
	</div>
	<div class="modal-body">
		<div class="row">
			<div class="col-md-12">
				<form class="form-horizontal" role="form">
					<div class="form-group">
						<label for="inputEmail3" class="col-sm-2 control-label">Certificado</label>
					</div>
					<div class="form-group">
						<label for="inputPassword3" class="col-sm-2 control-label">Llave
							privada</label>
						<div class="col-sm-10">
							<div
								class="fileinput fileinput-new col-sm-12 llave-privada-container"
								data-provides="fileinput">
								<span class="col-sm-9">
									<span class="fileinput-filename"></span>
									<a href="#" class="close fileinput-exists"
										data-dismiss="fileinput" style="float: none">&times;</a>
								</span>
								<span class="col-sm-3">
									<span class="btn btn-default btn-file">
										<span class="fileinput-new">Seleccionar...</span>
										<span class="fileinput-exists">Cambiar</span>
										<input type="file" id="llave-privada" name="...">
									</span>
								</span>
								<span class="llave-privada-base64" style="display: none"></span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="pass-llave-privada" class="col-sm-2 control-label">Contraseña</label>
						<div class="col-sm-10">
							<input type="password" class="form-control"
								id="pass-llave-privada"
								placeholder="Escribe la contrasella de tu llave privada">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="btn btn-danger">Cerrar</button>
		<button type="button" class="btn btn-primary guardar-config-llaves">Guardar</button>
	</div>
</div>
<!-- ######################################---MODAL DIRECCION---###################################### -->
<!-- ######################################---MODAL DIRECCION---###################################### -->
<div id="modal-domicilio" class="modal fade" tabindex="-1"
	data-width="760" style="display: none;">
	<div>
		<div class="alert alert-success" style="display: none"></div>
	</div>
	<div class="modal-header">
		<h4 class="modal-title">Ubicación</h4>
	</div>
	<div class="modal-body">
		<div class="row">
			<div class="col-md-12">
				<form class="form-horizontal" role="form">
					<div class="form-group">
						<label for="modal-calle" class="col-sm-3 control-label">Calle</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-calle"
								placeholder="Avenida, calle, camino o carretera">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-exterior" class="col-sm-3 control-label">Número
							exterior</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-exterior"
								placeholder="Número particular en donde se da la ubicación sobre una calle dada">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-interior" class="col-sm-3 control-label">Número
							interior</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-interior"
								placeholder="Información adicional para especificar la ubicación">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-colonia" class="col-sm-3 control-label">Colonia</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-colonia"
								placeholder="Colonia en donde se da la ubicación">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-municipio" class="col-sm-3 control-label">Municipio</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-municipio"
								placeholder="Municipio o delegación  en donde se da la ubicación">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-estado" class="col-sm-3 control-label">Estado</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-estado"
								placeholder="Estado o entidad federativaa">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-pais" class="col-sm-3 control-label">País</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-pais"
								placeholder="País donde se da la ubicación.">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-cp" class="col-sm-3 control-label">Código
							Postal.</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-cp"
								placeholder="Código postal en donde se da la ubicación.">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="btn btn-danger">Cancelar</button>
		<button type="button" class="btn btn-primary guardar-ubicacion">Guardar</button>
	</div>
</div>
<!-- ######################################---VERIFICAR DATOS---###################################### -->
<!-- ######################################---VERIFICAR DATOS---###################################### -->
<!-- ######################################---VERIFICAR DATOS---###################################### -->
<div id="modal-factura" class="modal fade modal-verificar" tabindex="-1"
	data-width="1000" style="display: none;">
	<div>
		<div class="alert alert-success" style="display: none"></div>
	</div>
	<div class="modal-header">
		<h4 class="modal-title">Validación de datos de la factura</h4>
	</div>
	<div class="modal-body">
		<div class="row">
			<div class="col-md-12">
				<div class="panel-group" id="accordion">
					<div class="panel panel-success p-clientes">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion"
									href="#collapseOne">
									<span> Clientes</span>
									<span class="glyphicon glyphicon-ok"></span>
								</a>
							</h4>
						</div>
						<div id="collapseOne" class="panel-collapse collapse">
							<div class="panel-body">
								<div class="row accordion-header">
									<div class="col-md-12 cliente-body-title">
										<span>¿Crear un nuevo usuario?</span>
										<button type="button" class="btn boton1">Crear
											usuario</button>
										<button type="button" class="btn boton2">
											<b>NO</b>
											crear usuario
										</button>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<table class="datos-cliente" style="width: 100%">
											<tr>
												<td class="titulo">
													<span>Cliente:</span>
												</td>
												<td class="texto idCliente"></td>
											</tr>
											<tr>
												<td class="titulo">
													<span>RFC:</span>
												</td>
												<td class="texto rfc"></td>
											</tr>
											<tr>
												<td class="titulo">
													<span>Nombre:</span>
												</td>
												<td class="texto nombre"></td>
											</tr>
											<tr>
												<td class="titulo">
													<!-- un nuevo cliente -->
													<span>Correo:</span>
												</td>
												<td class="texto correo">
													<input type="email" class="correoCliente"
														style="width: 500px" placeholder="Escriba el correo" />
												</td>
											</tr>
											<tr>
												<td class="titulo">
													<span>Direccion:</span>
												</td>
												<td class="texto direccion"></td>
											</tr>
											<tr>
												<td class="titulo">
													<span>Colonia:</span>
												</td>
												<td class="texto colonia"></td>
											</tr>
											<tr>
												<td class="titulo">
													<span>Código postal:</span>
												</td>
												<td class="texto cp"></td>
											</tr>
											<tr>
												<td class="titulo">
													<span>Ciudad:</span>
												</td>
												<td class="texto ciudad"></td>
											</tr>
											<tr>
												<td class="titulo">
													<span>Estado:</span>
												</td>
												<td class="texto estado"></td>
											</tr>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="panel panel-warning p-productos">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion"
									href="#collapseTwo">
									<span>Productos</span>
									<span class="glyphicon glyphicon-warning-sign"></span>
								</a>
							</h4>
						</div>
						<div id="collapseTwo" class="panel-collapse collapse">
							<div class="panel-body">
								<div class="row">
									<div class="col-md-12">
										<table class="table productos" style="width: 100%">
											<thead>
												<tr>
													<th class="val-codigo">Código.</th>
													<th class="val-titulo">Unid.</th>
													<th class="val-descripcion">Descripcion</th>
													<th class="val-botones">-</th>
												</tr>
											</thead>
											<tr>
												<td class="val-codigo">AAAAAAAAAA</td>
												<td class="val-unidad">Unad</td>
												<td class="val-descripcion">Descripcion</td>
												<td class="val-botones">
													<button type="button" class="btn">Editar</button>
													<button type="button" class="btn">
														<b>No</b>
														editar
													</button>
												</td>
											</tr>
											<tr>
												<td class="val-codigo">123456789 123456789 123456789</td>
												<td class="val-unidad">Unad</td>
												<td class="val-descripcion">Descripcion</td>
												<td class="val-botones">
													<button type="button" class="btn">Crear</button>
													<button type="button" class="btn">
														<b>No</b>
														crear
													</button>
												</td>
											</tr>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="panel panel-danger p-forma-pago">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion"
									href="#collapseThree">
									<span> Forma de pago</span>
									<span class="glyphicon glyphicon-ban-circle"></span>
								</a>
							</h4>
						</div>
						<div id="collapseThree" class="panel-collapse collapse">
							<div class="panel-body">
								<div class="row accordion-header">
									<form class="form-horizontal" role="form">
										<div class="form-group">
											<label class="col-sm-12 control-label fp-texto"
												style="text-align: left; padding-left: 25px">Su pago
												fué con tarjeta, tiene que indicar los últimos 4 dígitos de
												esta.</label>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div class="panel panel-default cabsa panel-datos-generales-cabsa">
						<div class="panel-heading info">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion"
									href="#collapseFour">
									<span> CABSA de Tabasco</span>
									<span class="glyphicon"></span>
								</a>
							</h4>
						</div>
						<div id="collapseFour" class="panel-collapse collapse">
							<div class="panel-body">
								<div class="col-md-12">
									<span class="texto">¿Modificar los datos de Cabsa?</span>
									<button type="button" class="btn btn-modificar-cabsa">Modificar
										datos</button>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<table class="datos-cabsa" style="width: 100%">
										<tr>
											<td class="titulo">
												<span>Régimen fiscal:</span>
											</td>
											<td class="texto fc-regimen">12345</td>
										</tr>
										<tr>
											<td class="titulo">
												<span>Correo:</span>
											</td>
											<td class="texto fc-correo">12345</td>
										</tr>
										<tr>
											<td class="titulo">
												<span>Teléfono:</span>
											</td>
											<td class="texto fc-telefono">12345</td>
										</tr>
										<tr>
											<td class="titulo">
												<span>Web:</span>
											</td>
											<td class="texto fc-web">12345</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<div style="float: left">
				<b style="margin-right: 25px">Correo de envío:</b>
				<input type="email" class="correoEnviarMail" style="width: 500px"
					placeholder="Escriba el correo">
			</div>
			<button type="button" data-dismiss="modal" class="btn btn-danger">Cerrar</button>
			<button type="button" class="btn btn-primary guardar-config">Enviar
				correo</button>
		</div>
	</div>
</div>
<!-- MODAL DE CONFIGURACIÓN DE VISUALIZAR FACTURAS  -->
<!-- MODAL DE CONFIGURACIÓN DE VISUALIZAR FACTURAS  -->
<!-- MODAL DE CONFIGURACIÓN DE VISUALIZAR FACTURAS  -->
<!-- MODAL DE CONFIGURACIÓN DE VISUALIZAR FACTURAS  -->
<!-- MODAL DE CONFIGURACIÓN DE VISUALIZAR FACTURAS  -->
<!-- MODAL DE CONFIGURACIÓN DE VISUALIZAR FACTURAS  -->
<!-- MODAL DE CONFIGURACIÓN DE VISUALIZAR FACTURAS  -->
<div id="ver-facturas" class="modal fade" tabindex="-1"
	data-width="1000" style="display: none;">
	<div>
		<div class="alert alert-success" style="display: none"></div>
	</div>
	<div class="modal-header">
		<b>RFC Cliente:</b>
		<div class="input-append search-facturas">
			<input class="span2 search-facturas-text" id="appendedInputButton"
				style="width: 900px" type="text">
			<button type="submit" class="btn">
				<span class="glyphicon glyphicon-search"></span>
			</button>
		</div>
	</div>
	<div class="modal-body">
		<div class="row">
			<div class="col-md-12" style="max-height: 300px; overflow-y: scroll;">
				<table class="table table-condensed table-facturas">
					<thead>
						<tr>
							<th>FOLIO</th>
							<th>UUID</th>
							<th>RFC</th>
							<th>Estatus</th>
							<th>PDF</th>
							<th>XML</th>
							<th>Cancelar</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>a</td>
							<td>a</td>
							<td class="estatus-factura">a</td>
							<td>a</td>
							<td>a</td>
							<td>a</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="btn btn-info">Cerrar</button>
	</div>
</div>
<!--==============================---MODAL DE CLIENTES---=============================-->
<!--==============================---MODAL DE CLIENTES---=============================-->
<!--==============================---MODAL DE CLIENTES---=============================-->
<!--==============================---MODAL DE CLIENTES---=============================-->
<div id="ver-clientes" class="modal fade" tabindex="-1"
	data-width="1000" style="display: none;">
	<div>
		<div class="alert alert-success" style="display: none"></div>
	</div>
	<div class="modal-header">
		<b>Nombre cliente:</b>
		<div class="modal-title">
			<div class="input-append search-cliente">
				<input class="span2 search-cliente-test" id="appendedInputButton"
					style="width: 900px" type="text">
				<button type="submit" class="btn">
					<span class="glyphicon glyphicon-search"></span>
				</button>
			</div>
		</div>
	</div>
	<div class="modal-body">
		<div class="row">
			<div class="col-md-12 table-receptores-div">
				<table class="table table-condensed table-receptores">
					<thead>
						<tr>
							<th>ID CLIENTE</th>
							<th>RFC</th>
							<th>NOMBRE</th>
							<th>CORREO</th>
							<th>Eliminar</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="btn btn-info">Cerrar</button>
	</div>
</div>
<!--==============================---MODAL DE PRODUCTOS---=============================-->
<!--==============================---MODAL DE PRODUCTOS---=============================-->
<!--==============================---MODAL DE PRODUCTOS---=============================-->
<div id="ver-productos" class="modal fade" tabindex="-1"
	data-width="1000" style="display: none;">
	<div>
		<div class="alert alert-success" style="display: none"></div>
	</div>
	<div class="modal-header">
		<b>Nombre producto:</b>
		<div class="modal-title">
			<div class="input-append search-producto">
				<input class="span2 search-producto-text" id="appendedInputButton"
					style="width: 900px" type="text">
				<button type="submit" class="btn">
					<span class="glyphicon glyphicon-search"></span>
				</button>
			</div>
		</div>
	</div>
	<div class="modal-body">
		<div class="row">
			<div class="col-md-12" style="max-height: 300px; overflow-y: scroll;">
				<table class="table table-condensed table-productos-xy">
					<thead>
						<tr>
							<th>CODIGO</th>
							<th>DESCRIPCIÓN</th>
							<th>UNIDAD</th>
							<th>ELIMINAR</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="btn btn-info">Cerrar</button>
	</div>
</div>