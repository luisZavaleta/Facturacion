package mx.vulcanosw.facturacion.cabsa

class Factura {

	Long folio
	String uuid
	String status
	String xml
	String pdf
	String rfc
	String rfcEmisor


	static mapping = {
		xml type: "text"
		pdf type: "text"
	}


	static constraints = {
		folio(nullable:true, blank:true)
		uuid(nullable:true, blank:true)
		status(nullable:true, blank:true)
		xml(nullable:true, blank:true)
		pdf(nullable:true, blank:true)
		rfc(nullable:true, blank:true)
		rfcEmisor(nullable:true, blank:true)
	}
}
