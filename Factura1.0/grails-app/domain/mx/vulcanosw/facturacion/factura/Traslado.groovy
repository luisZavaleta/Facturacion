package mx.vulcanosw.facturacion.factura



class Traslado {


	String impuesto
	BigDecimal tasa
	Conceptos conceptos
	def facturaUtilService

	//Double total


	def BigDecimal getImporte(){
		return  conceptos.total * this.tasa
	}



	def getAttributes(Conceptos conceptos){
		return [impuesto:impuesto, tasa:tasa, importe:facturaUtilService.getTImporte( importe)]
	}

	static constraints = {
		impuesto(nullable:false,blank:false)
		tasa(nullable:false,blank:false)
		conceptos(nullable:false,blank:false)

	}
}
