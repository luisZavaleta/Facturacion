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
								<span class="col-sm-9"> <span class="fileinput-filename"></span>
									<a href="#" class="close fileinput-exists"
										data-dismiss="fileinput" style="float: none">&times;</a>
								</span> <span class="col-sm-3"> <span
									class="btn btn-default btn-file"> <span
										class="fileinput-new">Seleccionar...</span> <span
										class="fileinput-exists">Cambiar</span> <input type="file"
											id="llave-privada" name="...">
								</span>
								</span> <span class="llave-privada-base64" style="display: none"></span>
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