<table class="table-forma-pago bordered">
	<tbody>
		<tr>
			<td class="colored">Forma de Pago</td>
		</tr>
		<tr>
			<td>
				<span class="metodoDePago"> ${ data?.formaPago ?: 'Efectivo'}
				</span>
			</td>
		</tr>
		<tr>
			<td class="colored">No de Cuenta</td>
		</tr>
		<tr>
			<td class="NumCtaPago">
				${ data?.noCuenta ?: 'No aplica'}
			</td>
		</tr>
		<tr style="height: 69px" class="formaDePago">
			<td class="colored">Pago en una sola exibición.</td>
		</tr>
	</tbody>
</table>
<table class="table-datos-empresa bordered">
	<tbody>
		<tr>
			<td  colspan="4"><b>Vulcano Software S.A de C.V.</b></td>
		</tr>
		<tr class="border-top">
			<td class="colored" colspan="4">Domicilio</td>
		</tr>
		<tr>
			<td class="domicilio-emisor" colspan="4">
				<g:render template="factura/domicilio" />
			</td>
		</tr>
		<tr>
			<td class="colored" colspan="4">Lugar de expedición</td>
		</tr>
		<tr>
			<td class="lugar-expedicion" colspan="4">
				<g:render template="factura/domicilio" />
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
				${ data?.rfcEmisor}
			</td>
			<td class="border-right telefono-emisor">
				${ data?.telefono ?: '---'}
			</td>
			<td class="border-right correo-emisor">
				${ data?.correo ?: '---'}
			</td>
			<td class="web-emisor">
				${ data?.web ?: '---'}
			</td>
		</tr>
		<tr class="border-top" style="text-align: center">
			<td colspan="4" class="b-top">
				<strong> ESTE DOCUMENTO ES UNA REPRESENTACIÓN IMPRESA DE UN
					CFDI </strong>
				.
			</td>
		</tr>
	</tbody>
</table>