package mx.vulcanosw.vo

import mx.vulcanosw.facturacion.factura.Domicilio
import mx.vulcanosw.facturacion.factura.Receptor

class AuxReceptor {

	public AuxReceptor(){
	}


	public AuxReceptor(Receptor receptor, Domicilio domicilio){
		throw new IllegalArgumentException("not implemented, bitch")
	}


	public AuxReceptor(Receptor receptor){

		this.idx = receptor.id
		this.idCliente = receptor.idCliente
		this.rfc = receptor.rfc
		this.nombre = receptor.nombre

		Domicilio domicilio = receptor.domicilio

		this.domicilioNombre = domicilio.nombre
		this.domicilioCalle = domicilio.calle
		this.domicilioNoExterior = domicilio.noExterior
		this.domicilioNoInterior = domicilio.noInterior
		this.domicilioColonia = domicilio.colonia
		this.domicilioLocalidad = domicilio.localidad
		this.domicilioReferencia = domicilio.referencia
		this.domicilioMunicipio = domicilio.municipio
		this.domicilioEstado = domicilio.estado
		this.domicilioPais = domicilio.pais
		this.domicilioCodigoPostal = domicilio.codigoPostal
	}

	Integer idx
	Integer idCliente
	String rfc
	String nombre
	String domicilioNombre
	String domicilioCalle
	String domicilioNoExterior
	String domicilioNoInterior
	String domicilioColonia
	String domicilioLocalidad
	String domicilioReferencia
	String domicilioMunicipio
	String domicilioEstado
	String domicilioPais
	String domicilioCodigoPostal
	Boolean changed
}
