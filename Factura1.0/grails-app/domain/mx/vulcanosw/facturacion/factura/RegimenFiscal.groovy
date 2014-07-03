package mx.vulcanosw.facturacion.factura

class RegimenFiscal {

	String regimen


	def getAttributes(){
		[Regimen: regimen]
	}






	static constraints = {
		regimen(nullable:false,blank: false )
	}
}
