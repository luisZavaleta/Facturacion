package mx.vulcanosw.facturacion

import grails.converters.JSON
import mx.vulcanosw.facturacion.cabsa.Configuracion

class EmisorController {

	final static nombre = "cabsa"  //harcodeado, se obtendr‡ en un futurp por medio del usuario y password



	def config(){

		Boolean change = false

		String cer = params.cer
		String key = params.key
		String pass = params.pass






		Configuracion config = Configuracion.findByNombre(nombre)

		if(config == null){
			config = new Configuracion()
			config.nombre = nombre;
			config.save(flush:true, failOnError:true)
		}
		if(cer != null && cer != ""){
			config.certificado = cer
			change = true
		}
		if(key != null && key != ""){
			config.llave = key
			change = true
		}

		if(pass != null && pass != ""){
			config.contrasena = pass
			change = true
		}

		if(change){
			config.save(flush:true, failOnError:true)
		}


		render config.errors as JSON
		return

	}

}
