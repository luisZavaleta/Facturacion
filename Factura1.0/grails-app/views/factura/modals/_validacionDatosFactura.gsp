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
									<span> Clientes</span> <span class="glyphicon glyphicon-ok"></span>
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
									<span>Productos</span> <span
										class="glyphicon glyphicon-warning-sign"></span>
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
									<span> Forma de pago</span> <span
										class="glyphicon glyphicon-ban-circle"></span>
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
									<span> CABSA de Tabasco</span> <span class="glyphicon"></span>
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