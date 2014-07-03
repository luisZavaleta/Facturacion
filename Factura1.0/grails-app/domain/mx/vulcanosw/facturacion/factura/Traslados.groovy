package mx.vulcanosw.facturacion.factura

class Traslados {

	def facturaUtilService
	List<Traslado> traslados



	BigDecimal getTotalTraslados(){

		BigDecimal totalTraslados = 0.0

		for(Traslado traslado : traslados){
			totalTraslados += traslado.importe
		}



		return  totalTraslados
	}





	static constraints = {
	}
}
