package mx.vulcanosw.facturacion

import grails.converters.JSON
import mx.vulcanosw.facturacion.factura.Domicilio

class DomicilioController {

	def get(){
		//org.codehaus.groovy.runtime.NullObject.metaClass.toString = {return 'HOLA'}

		def id = params.id
		def domicilio = Domicilio.findById(id)

		if(domicilio == null){
			domicilio = new Domicilio() //Just 'because I't too lazy and don't want to modify the flow if we don't have a receptor
		}

		render  domicilio as JSON
		return
	}




	def byname(){

		def name = params.id

		Domicilio domicilio = Domicilio.findByNombre(name)

		if(domicilio == null){
			domicilio = new Domicilio()
		}


		render domicilio as JSON
		return

	}


	def save(){


		def name = params.name


		Domicilio domicilio = Domicilio.findByNombre(name)

		if(domicilio == null){
			domicilio  = new Domicilio()
			domicilio.nombre = name
			domicilio.save()
		}


		domicilio.calle = params.calle
		domicilio.noExterior = params.noExterior
		domicilio.noInterior = params.noInterior
		domicilio.colonia   = params.colonia
		domicilio.localidad = params.localidad
		domicilio.referencia = params.referencia
		domicilio.municipio = params.municipio
		domicilio.estado = params.estado
		domicilio.pais = params.pais
		domicilio.codigoPostal = params.codigoPostal


		domicilio.save(flush:true)




		render domicilio.errors as JSON
		return



	}




}
