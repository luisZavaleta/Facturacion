package mx.vulcanosw.facturacion

import grails.converters.JSON
import mx.vulcanosw.facturacion.cabsa.Producto
import mx.vulcanosw.vo.Autocompleate

class ProductoController {


	def productoService

	def index() {
	}



	def codigos(){
		def id = params.term
		def hql = "SELECT producto.id, producto.codigo FROM Producto AS producto WHERE lower(producto.codigo) LIKE ?"
		def nombres = Producto.executeQuery(hql,["%"+id?.toLowerCase()+"%"])
		def productosJson = nombres.collect{ new Autocompleate(idElemento: it[0], label: it[1], value: it[1])}
		render productosJson as JSON
		return
	}


	def descripciones(){
		def id = params.term
		def hql = "SELECT producto.id, producto.descripcion FROM Producto AS producto WHERE lower(producto.descripcion) LIKE ?"
		def nombres = Producto.executeQuery(hql,["%"+id?.toLowerCase()+"%"])
		def productosJson = nombres.collect{ new Autocompleate(idElemento: it[0], label: it[1], value: it[1])}
		render productosJson as JSON
		return
	}




	def byDescripciones(){
		def id = params.id
		def hql = "FROM Producto AS producto WHERE lower(producto.descripcion) LIKE ?"
		def productos = Producto.executeQuery(hql,["%"+id?.toLowerCase()+"%"])

		render productos as JSON
		return
	}




	def get(){
		Producto prod = Producto.findById(params.id)
		if(prod == null){
			prod = new Producto()
		}
		render prod as JSON
		return
	}






	def verify(){
		def json = params.json

		def jsonServer = JSON.parse(json)


		jsonServer.each{
			it.status = productoService.validateExistance(it)
		}
		render jsonServer as JSON
		return
	}



	def edit(){//loading.gif

		Producto producto = Producto.findByCodigo(params.codigo)
		producto.codigo = params.codigo
		producto.descripcion = params.descripcion
		producto.unidad = params.unidad
		producto.save(flush:true)

		render producto.errors
	}


	def save(){
		Producto producto = new Producto()
		producto.codigo = params.codigo
		producto.descripcion = params.descripcion
		producto.unidad = params.unidad
		producto.save(flush:true)

		render producto.errors
	}


	def delete(){


		Producto producto = Producto.findById(params.id)

		if(producto == null){
			render "Producto no existe"
			return
		}else{


			producto.delete()
			render "Producto eliminado correctamente"
			return
		}
	}
}
