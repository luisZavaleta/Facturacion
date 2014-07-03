package mx.vulcanosw.facturacion.cabsa

class Producto {

	String codigo
	String descripcion
	String unidad





    static constraints = {

		 codigo(nullable:true, blank:true)
		 descripcion(nullable:false, blank:false)
		 unidad(nullable:true, blank:true)
    }
}
