package mx.vulcanosw.facturacion

import grails.transaction.Transactional
import mx.vulcanosw.facturacion.cabsa.Producto




@Transactional
class ProductoService {

	def utilService


	def validateExistance(productoJson){




		def codigo = productoJson.codigo
		def descripcion = productoJson.descripcion
		def unidad = productoJson.unidad




		if(codigo == null || descripcion == null ||codigo == "" ||  descripcion == "" ||codigo.equals(null)  ||  descripcion.equals(null)  ){
			return "error"
		}

		Producto producto = Producto.findByCodigo(codigo)

		if(producto == null){
			return "nuevo"
		}




		if(
		utilService.weirdEquals(codigo, producto.codigo) &&
		utilService.weirdEquals(descripcion, producto.descripcion) &&
		utilService.weirdEquals(unidad, producto.unidad)
		){
			return "ok"
		}else{


			return "modificado"
		}
	}
}