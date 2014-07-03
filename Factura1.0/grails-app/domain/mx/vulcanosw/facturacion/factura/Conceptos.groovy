package mx.vulcanosw.facturacion.factura

class Conceptos {

	def facturaUtilService

	List<Concepto> conceptos;




	BigDecimal getTotal(){
		BigDecimal total = 0.0

		for(Concepto concepto: conceptos){
			total += concepto.importe
		}
		return total
	}




	static constraints = {
	}
}
