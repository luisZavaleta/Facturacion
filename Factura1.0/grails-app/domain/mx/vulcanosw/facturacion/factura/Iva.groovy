package mx.vulcanosw.facturacion.factura

class Iva  extends Traslado{


	def String getImpuesto(){
		return "IVA"
	}


	def BigDecimal getTasa(){
		return 0.16
	}
}
