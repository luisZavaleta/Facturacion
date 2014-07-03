package mx.vulcanosw.facturacion

import grails.converters.JSON
import mx.vulcanosw.security.Usuario

class TestController {

	def springSecurityService

	def index() {

		def user = Usuario.get(springSecurityService.principal.id)

		if (user ==  null){
			render "null"
			return;
		}

		render user as JSON
	}
}
