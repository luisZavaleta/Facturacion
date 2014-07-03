<div class="factura-container">
	<div id="fondo-imag">
		<img src="${data.fondo}" alt="una imagen" />
	</div>
	<div class="folio">
		<span></span>
	</div>
	<div class="certificado-sat">
		<span></span>
	</div>
	<div class="serie-certificado-sat">
		<span></span>
	</div>
	<div class="factura">
		<span contenteditable="true"></span>
	</div>
	<div class="fecha-certificacion">
		<span></span>
	</div>
	<div class="regimen-fiscal">
		<span contenteditable="true" class="regimen-fiscal-text no-empty-plz">${data?.regimenFiscal ?: "---" }</span>
	</div>
	<div class="cliente-clave">
		<span contenteditable="true" class="no-empty-plz clave-text">---</span>
	</div>
	<div class="cliente-nombre">
		<span contenteditable="true" class="no-empty-plz nombre-text">---</span>
	</div>
	<div class="cliente-direccion">
		<span>
			<span contenteditable="true" class="calle no-empty-plz">---</span>
			<span style="font-weight: bold; margin-left: 10px">#</span>
			<span contenteditable="true" class="exterior no-empty-plz">---</span>
			<span style="font-weight: bold; margin-left: 10px">Int.</span>
			<span contenteditable="true" class="interior no-empty-plz"
				style="margin-left: 10px">---</span>
		</span>
	</div>
	<div class="cliente-colonia">
		<span contenteditable="true" class="no-empty-plz">---</span>
	</div>
	<div class="cliente-ciudad">
		<span contenteditable="true" class="no-empty-plz">---</span>
	</div>
	<div class="cliente-cp">
		<span contenteditable="true" class="no-empty-plz">---</span>
	</div>
	<div class="cliente-rfc">
		<span contenteditable="true" class="no-empty-plz rfc-text">---</span>
	</div>
	<div class="cliente-estado">
		<span contenteditable="true" class="no-empty-plz">---</span>
	</div>
	<div class="pedido">
		<span contenteditable="true" class="no-empty-plz">---</span>
	</div>
	<div class="entrega">
		<span contenteditable="true" class="no-empty-plz">---</span>
	</div>
	<div class="fecha-expedicion">
		<span contenteditable="true"></span>
	</div>
	<div class="condicion-pago">
		<span contenteditable="true" class="no-empty-plz texto">---</span>
	</div>
	<div class="importe-letra">
		<span class="cantidad"> Dos mil trescientos veinte </span>
		<span class="moneda">pesos</span>
		<span class="centavos"> 00/100</span>
		<span class="sufijo">M. N.</span>
	</div>
	<div class="subtotal">
		$
		<span></span>
	</div>
	<div class="iva">
		$
		<span></span>
	</div>
	<div class="total">
		$
		<span></span>
	</div>
	<div class="pagare">
		<span>
			<span class="prefix"> Debemos y pagaré(mos) incondicionalmente
				por este pagaré a la orden de ${data.nombreEmpresa },  el día</span>
			<span class="no-empty-plz posfix" contenteditable="true">---</span>
		</span>
	</div>
	<div class="intereses">
		<span>
			<span class="uno"> Si esta factura no se paga a su vencimiento
				generará intereses moratorios del</span>
			<span class="no-empty-plz dos" contenteditable="true">8%</span>
			<span class="tres"> Mensual. Toda devolución causará un</span>
			<span class="no-empty-plz cuatro" contenteditable="true">20%</span>
			<span class="cinco">de cargo por manejo de material.</span>
		</span>
	</div>
	<div class="sello-digital">
		<span></span>
	</div>
	<div>
		<span contenteditable="true"></span>
	</div>
	<div class="cadena-original">
		<span></span>
	</div>
	<div class="codigo-bidimensional">
		<span></span>
	</div>
	<div class="forma-pago">
		<span class="no-empty-plz texto" contenteditable="true">Efectivo</span>
	</div>
	<div class="numero-cta">
		<span class="no-empty-plz" contenteditable="true">No aplica</span>
	</div>
	<div class="domicilio">
		<span>${ubicacion}</span>
	</div>
	<div class="expedicion">
		<span>${expedicion}</span>
	</div>
	<div class="lugar-expedicion-hidden" style="display: none"></div>
	<%-- HACK TEMPORAL--%>
	<div class="rfc">
		<span class="no-empty-plz" contenteditable="true">${data.rfc}</span>
	</div>
	<div class="telefono">
		<span class="no-empty-plz" contenteditable="true">${data.telefono}</span>
	</div>
	<div class="correo">
		<span class="no-empty-plz" contenteditable="true">${data.correo}</span>
	</div>
	<div class="web">
		<span class="no-empty-plz" contenteditable="true">${data.web}</span>
	</div>
	<div class="tipo-pago">
		<span class="no-empty-plz">Pago en una sola exibición .</span>
	</div>
	<div class="representacion-impresa">
		<span>ESTE DOCUMENTO ES UNA REPRESENTACIÓN IMPRESA DE UN CFDI</span>
	</div>
	<div class="tipo-cambio " style="display: none">
		<span class="tag" style="font-weight: bold">Tipo de cambio:</span>
		<span class="texto no-empty-plz" contenteditable="true">---</span>
	</div>
	<div class="productos-table">
		<div class="row productos">
			<div class="col-md-12">
				<table class="table">
					<tbody>
						<tr class="not-empty-tr">
							<td class="parte">
								<span class="text no-empty-plz" contenteditable="true">---</span>
							</td>
							<td class="cantidad">
								<span class="text no-empty-plz" contenteditable="true">---</span>
							</td>
							<td class="codigo">
								<span class="text no-empty-plz" contenteditable="true">---</span>
							</td>
							<td class="descripcion">
								<span class="text no-empty-plz" contenteditable="true">---</span>
							</td>
							<td class="unidad">
								<span class="text no-empty-plz" contenteditable="true">---</span>
							</td>
							<td class="unitario">
								<span class="text no-empty-plz lxzv-number" contenteditable="true">---</span>
							</td>
							<td class="importe  no-border-right">
								<span class="text" ></span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<!-- DATOS ADICIONALES INVISIBLES  -->
<div style="display: none">
	<span class="cliente-id"></span>
	<span class="cliente-pais">México</span>
</div>
