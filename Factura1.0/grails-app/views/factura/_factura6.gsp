<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<title>-</title>
<g:render template="/factura/css3" />
<g:render template="/factura/css2" />
</head>
<body>
	<div class="factura-container">
		<div class="content container-fluid ">
			<div class="row">
				<div class="col-md-4 col-xs-4">
					<table class="table">
						<tbody>
							<tr class="active">
								<td>Folio fiscal</td>
							</tr>
							<tr>
								<td>
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr class="active">
								<td>No Certificado del SAT</td>
							</tr>
							<tr>
								<td>
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr class="active">
								<td>No de Serie Certificado SAT</td>
							</tr>
							<tr>
								<td>
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-md-4 col-xs-4"
					style="padding-left: 0px; padding-right: 0px;">
					<%-- <img class="logo" src="" />--%>
				</div>
				<div class="col-md-4 col-xs-4">
					<table class="table">
						<tbody>
							<tr class="active">
								<td>Factura</td>
							</tr>
							<tr>
								<td>
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr class="active">
								<td>Fecha de Certificación</td>
							</tr>
							<tr>
								<td>
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr class="active">
								<td>Régimen fiscal</td>
							</tr>
							<tr>
								<td>
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="row cliente">
				<div class="col-md-12">
					<table class="table">
						<tbody>
							<tr>
								<td colspan="3" class=" active">a:</td>
								<td colspan="3" class=" active">a:</td>
								<td colspan="3" class=" active">a:</td>
								<td colspan="3" class=" active">a:</td>
								<td colspan="3" class=" active">a:</td>
								<td colspan="3" class=" active">a:</td>
								<td colspan="3" class=" active">a:</td>
									<td colspan="3" class=" active">a:</td>
								<td colspan="1" class=" active fecha">a:</td>
								
							</tr>
							<tr>
								<td colspan="3" class=" active">Cliente:</td>
								<td colspan="13" class=" "></td>
								<td colspan="2" class=" active">RFC:</td>
								<td colspan="6" class=" c1-text b-right"></td>
								<td colspan="1" class="fecha active">Fecha expedición</td>
							</tr>
							<tr>
								<td colspan="3" class=" active">Calle:</td>
								<td colspan="13" class=" "></td>
								<td colspan="2" class=" active">Int.:</td>
								<td colspan="2" class=" c1-text"></td>
								<td colspan="2" class=" active">Ext:</td>
								<td colspan="2" class=" c1-text b-right"></td>
								<td colspan="1" class="fecha "></td>
							</tr>
							<tr>
								<td colspan="3" class=" active">Colonia:</td>
								<td colspan="13" class=" "></td>
								<td colspan="2" class=" active">C.P.:</td>
								<td colspan="6" class=" c1-text b-right"></td>
								<td colspan="1" class="fecha active">Condición de pago</td>
							</tr>
							<tr>
								<td colspan="3" class=" active">Ciudad:</td>
								<td colspan="11" class=" "></td>
								<td colspan="2" class=" active">Estado:</td>
								<td colspan="8" class=" c1-text b-right"></td>
								<td colspan="1" class="fecha "></td>
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
								<td class="cantidad">Cant.</td>
								<td class="codigo">Código</td>
								<td class="descipcion">Descripción</td>
								<td class="unidad">Unidad</td>
								<td class="unitario">P.unitario</td>
								<td class="importe">Importe</td>
							</tr>
							<tr>
								<td colspan="7">
									<div style="visibility: hidden; height: 300px">A</div>
								</td>
							</tr>
							<tr>
								<td colspan="3" class="active b-top">Importe con letras</td>
								<td class="active b-top">Subtotal</td>
								<td colspan="2" class="b-top">
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr>
								<td colspan="3" rowspan="2" class="b-top">
									<span style="visibility: hidden">A</span>
								</td>
								<td class="active b-top">I.V.A.</td>
								<td colspan="2" class="b-top">
									<span style="visibility: hidden">
										<span style="visibility: hidden">A</span>
									</span>
								</td>
							</tr>
							<tr>
								<td class="active b-top">Total.</td>
								<td colspan="2" class="b-top">
									<span style="visibility: hidden">A</span>
								</td>
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
								<td>
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr>
								<td style="width: 100%">
									<span style="visibility: hidden">Si esta factura no se
										paga a su vencimiento generará intereses moratorios del 8%
										Mensual. Toda devolución causará un 20% de cargo por manejo de
										material.</span>
								</td>
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
								<td rowspan="7" class="bcode"></td>
							</tr>
							<tr>
								<td class="sellos active b-left">SELLO DÍGITAL DEL EMISOR</td>
							</tr>
							<tr>
								<td class="b-left break-word">
									<p>
										<span style="visibility: hidden">||1.0|5CF3BE94-351C-D25B-38A9-3BDCFD3E3FE3|2013-12-
											24T21:12:01|W6KQr8DsxDsn07WcFrEw8ymDTOpdQ8nt0Y1egq80D8588QbZEO2ZpfwTomOtgqbvGbeULI2SMsCXhsx9kLHGw+pnmEWwbEoi546uTM7SW0tYkWCfR5ruggNya/b3I0u+5/ivdBJueZphE1uXbEXl9
											1I2n40qMdiwwAChP3wRDUw=|00001000000202771790||</span>
									</p>
								</td>
							</tr>
							<tr>
								<td class="active b-left">SELLO DIGITAL DEL SAT</td>
							</tr>
							<tr>
								<td class="b-left break-word">
									<span style="visibility: hidden">||1.0|5CF3BE94-351C-D25B-38A9-3BDCFD3E3FE3|2013-12-
										24T21:12:01|W6KQr8DsxDsn07WcFrEw8ymDTOpdQ8nt0Y1egq80D8588QbZEO2ZpfwTomOtgqbvGbe7SW0tYkWCfR5ruggNya/b3I0u+5/ivdBJueZphE1uXbEXl9</span>
								</td>
							</tr>
							<tr>
								<td class="active b-left">CADENA ORIGINAL DE COMPLEMENTO DE
									CERTIFICADO DIGITAL DEL SAT</td>
							</tr>
							<tr>
								<td class="b-left break-word">
									<span style="visibility: hidden">||1.0|5CF3BE94-351C-D25B-38A9-3BDCFD3E3FE3|2013-12-
										24T21:12:01|W6KQr8DsxDsn07WcFrEw8ymDTOpdQ8nt0Y1egq8i546uTM7SW0tYkWCfR5ruggNya/b3I0u+5/ivdBJueZphE1uXbEXl9</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3">
					<table class="table" style="margin-top: 0px">
						<tbody style="padding-bottom: 0px">
							<tr>
								<td class="active">Forma de Pago</td>
							</tr>
							<tr>
								<td>
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr>
								<td class="active">No de Cuenta</td>
							</tr>
							<tr>
								<td>
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr>
								<td class="active">Nota:</td>
							</tr>
							<tr>
								<td style="height: 48px"></td>
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
								<td colspan="4">
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr>
								<td class="active" colspan="4">Lugar de expedición</td>
							</tr>
							<tr>
								<td colspan="4">
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr class="active">
								<td class="b-top b-right" style="width: 25%">RFC</td>
								<td class="b-top b-right" style="width: 25%">Teléfono</td>
								<td class="b-top b-right" style="width: 25%">Correo</td>
								<td class="b-top" style="width: 25%">Web</td>
							</tr>
							<tr>
								<td class="b-right">
									<span style="visibility: hidden">A</span>
								</td>
								<td class="b-right">
									<span style="visibility: hidden">A</span>
								</td>
								<td class="b-right">
									<span style="visibility: hidden">A</span>
								</td>
								<td>
									<span style="visibility: hidden">A</span>
								</td>
							</tr>
							<tr>
								<td colspan="4" class="b-top">
									<strong>
										<span style="visibility: hidden">A</span>
									</strong>
									.
								</td>
							</tr>
							<tr>
								<td colspan="4" class="b-top">
									<strong>
										<span style="visibility: hidden">A</span>
									</strong>
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