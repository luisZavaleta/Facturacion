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
								data-main-selector=".calle" 
								placeholder="Avenida, calle, camino o carretera">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-exterior" class="col-sm-3 control-label">Número
							exterior</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-exterior"
								data-main-selector=".exterior" data-modal-prefix="#"
								placeholder="Número particular en donde se da la ubicación sobre una calle dada">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-interior" class="col-sm-3 control-label">Número
							interior</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-interior"
								data-main-selector=".interior" data-modal-prefix="Int. "
								placeholder="Información adicional para especificar la ubicación">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-colonia" class="col-sm-3 control-label">Colonia</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-colonia"
								data-main-selector=".colonia" data-modal-prefix="Col. " data-modal-sufix="."
								placeholder="Colonia en donde se da la ubicación">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-municipio" class="col-sm-3 control-label">Municipio</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-municipio"
								data-main-selector=".municipio"
								placeholder="Municipio o delegación  en donde se da la ubicación">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-estado" class="col-sm-3 control-label">Estado</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-estado"
								data-main-selector=".estado" data-modal-prefix=", "
								placeholder="Estado o entidad federativaa">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-pais" class="col-sm-3 control-label">País</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-pais"
								data-main-selector=".pais" data-modal-prefix=", " data-modal-sufix="."
								placeholder="País donde se da la ubicación.">
						</div>
					</div>
					<div class="form-group">
						<label for="modal-cp" class="col-sm-3 control-label">Código
							Postal.</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="modal-cp"
								data-main-selector=".cp" data-modal-prefix="C.P." 
								placeholder="Código postal en donde se da la ubicación.">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="btn btn-danger">Cancelar</button>
		<button type="button" class="btn btn-primary guardar-modal">Guardar Datos</button>
	</div>
</div>