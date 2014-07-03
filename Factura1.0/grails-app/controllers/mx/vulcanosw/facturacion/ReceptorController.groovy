package mx.vulcanosw.facturacion

import grails.converters.JSON
import mx.vulcanosw.facturacion.factura.Domicilio
import mx.vulcanosw.facturacion.factura.Receptor
import mx.vulcanosw.vo.Autocompleate


class ReceptorController {

	def utilService


	def names(){
		def hql = "SELECT receptor.id, receptor.nombre FROM Receptor AS receptor"
		def nombres = Receptor.executeQuery(hql)
		render nombres as JSON
		return
	}


	def nameslike(){
		def id = params.term
		def hql = "SELECT receptor.id, receptor.nombre FROM Receptor AS receptor WHERE lower(receptor.nombre) LIKE ?"
		def nombres = Receptor.executeQuery(hql,["%"+id?.toLowerCase()+"%"])
		def nombresJson = nombres.collect{
			new Autocompleate(idElemento: it[0], label: it[1], value: it[1])
		}
		render nombresJson as JSON
		return
	}



	def bynamelike(){
		def id = params.id

		if(id == "" || id == null){
			def receptores = Receptor.findAll()
			render receptores as JSON
		}

		def hql = "FROM Receptor AS receptor WHERE lower(receptor.nombre) LIKE ?"
		def receptores = Receptor.executeQuery(hql,["%"+id?.toLowerCase()+"%"])

		render receptores as JSON
		return
	}




	def rfcs(){
		def id = params.term
		def hql = "SELECT receptor.id, receptor.rfc FROM Receptor AS receptor WHERE lower(receptor.rfc) LIKE ?"
		def rfcs = Receptor.executeQuery(hql,[id?.toLowerCase()+"%"])
		def rfcjson = rfcs.collect{
			new Autocompleate(idElemento: it[0], label: it[1], value: it[1])
		}
		render rfcjson as JSON
		return
	}



	def clienteid(){
		def id = params.id
		def receptor = Receptor.findByIdCliente(id)
		if(receptor == null){
			receptor = new Receptor() //Just 'because I't too lazy and don't want to modify the flow if we don't have a receptor
		}
		render  receptor as JSON
		return
	}

	def get(){
		def id = params.id
		def receptor = Receptor.findById(id)
		if(receptor == null){
			receptor = new Receptor() //Just 'because I't too lazy and don't want to modify the flow if we don't have a receptor
		}
		render  receptor as JSON
		return
	}



	def verify(){



		def clienteId = params.clienteId
		def rfc = params.rfc
		def nombre =params.nombre
		def calle =params.calle
		def exterior = params.exterior
		def interior =params.interior
		def colonia =params.colonia
		def ciudad = params.ciudad
		def estado =params.estado


		def pais = params.pais




		if(rfc == null || nombre == null || rfc == "" || nombre == ""){
			def nuevo = ["status":"error"]
			render nuevo as JSON
			return
		}

		Receptor receptorDB = Receptor.findByRfc(rfc.trim())



		if(receptorDB == null){
			def nuevo = ["status":"nuevo"]
			render nuevo as JSON
			return
		}

		Domicilio domicilioDB = receptorDB.domicilio




		//Pon todo esto en un arreglo y mandala a una fiunci�n, no mames.
		if(
		utilService.weirdEquals(params.clienteId, receptorDB.idCliente) &&
		utilService.weirdEquals(params.rfc, receptorDB.rfc) &&
		utilService.weirdEquals(params.nombre, receptorDB.nombre)
		){


			if(domicilioDB == null){
				if(empty(params.calle) && empty(params.exterior) && empty(params.interior)
				&& empty(params.colonia) && empty(params.ciudad) && empty(params.estado) && empty(params.cp)){
					def ok = ["status":"ok"]
					render ok as JSON
					return

				}else{
					def modificado = ["status":"modificado"]
					render modificado as JSON
					return

				}
			}else{

				if(
				utilService.weirdEquals(params.calle, domicilioDB.calle) &&
				utilService.weirdEquals(params.exterior, domicilioDB.noExterior) &&
				utilService.weirdEquals(params.interior, domicilioDB.noInterior) &&
				utilService.weirdEquals(params.colonia, domicilioDB.colonia) &&
				utilService.weirdEquals(params.ciudad, domicilioDB.municipio) &&
				utilService.weirdEquals(params.estado, domicilioDB.estado) &&
				utilService.weirdEquals(params.cp, domicilioDB.codigoPostal) &&
				utilService.weirdEquals(params.pais, domicilioDB.pais)
				){
					def ok = ["status":"ok"]
					render ok as JSON
					return


				}else{
					def modificado = ["status":"modificado"]
					render modificado as JSON
					return

				}

			}





		}



		def modificado = ["status":"modificado"]
		render modificado as JSON
		return
	}




	def save(){

		Receptor receptor = new Receptor()

		receptor.idCliente = params.clienteId
		receptor.rfc = params.rfc
		receptor.nombre =  params.nombre
		receptor.correo = params.correo



		Domicilio domicilio =  new Domicilio()
		domicilio.calle = params.calle
		domicilio.noExterior = params. exterior
		domicilio.noInterior = params.interior
		domicilio.colonia = params.colonia
		domicilio.municipio = params.ciudad
		domicilio.estado = params.estado
		domicilio.codigoPostal = params.cp
		domicilio.pais = params.pais
		domicilio.save(flush:true)

		receptor.domicilio =domicilio
		receptor.save(flush:true)

		render "ok"
	}

	def edit(){

		Receptor receptorDB = Receptor.findByRfc( (params.rfc).trim())

		receptorDB.idCliente = params.clienteId
		receptorDB.rfc = params.rfc
		receptorDB.nombre =  params.nombre
		receptorDB.correo = params.correo

		Domicilio domicilio = receptorDB.domicilio

		if(domicilio ==  null){
			domicilio =  new Domicilio()
		}


		domicilio.calle = params.calle
		domicilio.noExterior = params. exterior
		domicilio.noInterior = params.interior
		domicilio.colonia = params.colonia
		domicilio.municipio = params.ciudad
		domicilio.estado = params.estado
		domicilio.codigoPostal = params.cp
		domicilio.pais = params.pais
		domicilio.save(flush:true)

		receptorDB.domicilio =domicilio
		receptorDB.save(flush:true)

		render "ok"

	}



	def delete(){


		Receptor receptor = Receptor.findById(params.id)

		if(receptor == null){
			render "Cliente no existe"
			return
		}else{

			def domicilio = receptor.domicilio
			receptor.delete()

			if(domicilio != null){
				domicilio.delete()
			}


			render "Cliente eliminado correctamente"
			return
		}
	}


	def editCorreo(){
		def idx = params.id
		def correo = params.correo
		Receptor receptor = Receptor.findById(idx)

		if(receptor == null){
			render "recpetor no existe"
		}else{
			receptor.correo = correo
			if(receptor.save(flush:true)){
				render "Correo guardado correctamente"
				return
			}else{
				render "Hubo un error, el correo no pudo ser guardado"
				return
			}
		}
	}

	def empty(paramitem){
		if(paramitem == null || paramitem == ""){
			return true
		}else{
			return false
		}

	}



	def byrfc(){
		def rfc = params.id
		def receptor = Receptor.findByRfc(rfc)

		if(receptor == null){
			receptor = new Receptor()
		}

		render  receptor as JSON


	}

}
