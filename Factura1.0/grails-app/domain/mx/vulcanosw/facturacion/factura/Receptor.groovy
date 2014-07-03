package mx.vulcanosw.facturacion.factura


class Receptor {

	String idCliente
	String rfc
	String nombre
	String correo

	Domicilio domicilio



	def getAttributes(){
		return[rfc: this.rfc, nombre: this.nombre]
	}

	static constraints = {
		domicilio(nullable:true,blank: true )
		rfc(nullable:false,blank: false )
		nombre(nullable:false,blank: false )
		correo(nullable:true,blank: true,email: true )
	}
}
