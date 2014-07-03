package mx.vulcanosw.facturacion.factura

class Empresa {


	//resolver después si se van a guardar el password y

	String nombre
	String selloPath
	String privateKeyPath
	String privatePassword

	Emisor emisor


	static mapping = { sello type: 'text' }


	static constraints = {
	}
}
