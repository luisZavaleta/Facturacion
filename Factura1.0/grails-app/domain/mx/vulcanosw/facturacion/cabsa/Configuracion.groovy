package mx.vulcanosw.facturacion.cabsa

class Configuracion {

	String nombre
	String llave
	String certificado
	String contrasena //temporal, hay que encriptarlo para la siguente versi—n


	static mapping = {
		llave type:'text'
		certificado type:'text'
	}

	static constraints = {

		 llave(nullable:true)
		 certificado(nullable:true)
		 contrasena(nullable:true)
	}
}
