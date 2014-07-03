package mx.vulcanosw.facturacion.factura

class Emisor {

	String rfc
	String nombre

	Domicilio domicilioFiscal
	Domicilio expedidoEn
	RegimenFiscal regimen




	def getAttributes(){
		[rfc: this.rfc, nombre: this.nombre]
	}


	static constraints = {
		rfc(nullable:false,blank: false )
		nombre(nullable:false,blank: false )
	}
}
