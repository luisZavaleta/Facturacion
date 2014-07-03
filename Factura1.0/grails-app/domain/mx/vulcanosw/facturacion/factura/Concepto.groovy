package mx.vulcanosw.facturacion.factura


class Concepto {

	def facturaUtilService

	def cantidad
	String unidad
	String descripcion
	BigDecimal valorUnitario
	//	Double importe



	def setValorUnitario(String str){

		valorUnitario = str.toBigDecimal()
	}


	def getImporte(){
		return this.cantidad * this.valorUnitario
	}



	def getAttributes(){
		[cantidad: cantidad, unidad: unidad, descripcion:descripcion, valorUnitario: facturaUtilService.getTImporte(valorUnitario), importe: facturaUtilService.getTImporte(importe)]
	}

	static belongsTo = [conceptos: Conceptos]

	/*
	 <cfdi:Concepto unidad="CAPSULAS" importe="244.00"
	 cantidad="1.0" descripcion="VIBRAMICINA 100MG 10" valorUnitario="244.00" />
	 * */

	static constraints = {

		cantidad(nullable:false,blank: false )
		unidad(nullable:false,blank: false )
		descripcion(nullable:false,blank: false )
		valorUnitario(nullable:false,blank: false )
	}
}
