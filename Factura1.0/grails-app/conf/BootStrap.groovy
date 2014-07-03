import mx.vulcanosw.facturacion.cabsa.CabsaConfig
import mx.vulcanosw.facturacion.factura.Domicilio
import mx.vulcanosw.security.Rol
import mx.vulcanosw.security.Usuario
import mx.vulcanosw.security.UsuarioRol

class BootStrap {

	def init = { servletContext ->

		def adminRol = Rol.findByAuthority('ROLE_ADMIN')

		if(adminRol == null){

			 adminRol = Rol.findByAuthority('ROLE_ADMIN') ?: new Rol(authority: 'ROLE_ADMIN').save(failOnError: true)

			def adminUser = Usuario.findByUsername('admin') ?: new Usuario(
				username: 'admin',
				password: '7luluWF1',// springSecurityService.encodePassword('admin'),
				enabled: true).save(failOnError: true)

			if (!adminUser.authorities.contains(adminRol)) {
				UsuarioRol.create adminUser, adminRol
			}

		}

//UUID
		CabsaConfig cc = CabsaConfig.findByNombre("main")

		if(cc == null){

			InputStream fondo = BootStrap.class.classLoader.getResourceAsStream('res/fondocabsa.png');
			String fondoBase64 =  fondo.getBytes().encodeBase64().toString()


			InputStream fondo2 = BootStrap.class.classLoader.getResourceAsStream('res/facturacabsa2page.png');
			String fondoBase64u2 =  fondo2.getBytes().encodeBase64().toString()

			InputStream logo = BootStrap.class.classLoader.getResourceAsStream('res/logo2-5in.png');
			String logoBase64 =  logo.getBytes().encodeBase64().toString()


			cc = new CabsaConfig()

			cc.nombre = "main"
			cc.fondo = "data:image/png;base64,"+fondoBase64
			cc.fondo2 = "data:image/png;base64,"+fondoBase64u2
			cc.logo = "data:image/png;base64,"+logoBase64
			cc.rfc = "CTA0803272M7"
			cc.nombreEmpresa = "CABSA DE TABASCO S.A de C.V."
			cc.claveIntegrador = "e2c015ab-7cbd-46a3-9a02-3c53a2fc5839"
			cc.keyPath = ""
			cc.certPath = ""
			cc.privatePassword = ""
			cc.pruebas = true


			cc.regimenFiscal = "Personas morales del régimen general"
			cc.telefono = "921 21 00 128"
			cc.correo = "ventas@cabsadetabasco.com"
			cc.web = "www.cabsadetabasco.com"




			cc.save(flush:true)
		}

		Domicilio ubicacion = Domicilio.findByNombre("ubicacion")

		if(ubicacion  == null){

			ubicacion = new Domicilio()

			ubicacion.nombre = "ubicacion"
			ubicacion.calle = "Huimanguillo"
			ubicacion.noExterior = "104"
			ubicacion.colonia = "Plaza Villahermosa."
			ubicacion.municipio = "Villahermosa"
			ubicacion.estado = "Tabasco"
			ubicacion.pais = "México"
			ubicacion.codigoPostal = "86179"

			ubicacion.save(flush:true)

		}

		Domicilio expedicion = Domicilio.findByNombre("expedicion")

		if(expedicion == null){
			expedicion = new Domicilio()


			expedicion.nombre = "expedicion"
			expedicion.calle = "Prolongación de hidalgo"
			expedicion.noExterior = "1919"
			expedicion.colonia = "Benito Juarez Norte"

			expedicion.municipio = "Coatzacoalcos"
			expedicion.estado = "Veracruz"
			expedicion.pais = "México"
			expedicion.codigoPostal = "96576"

			expedicion.save(flush:true)
		}
	}
	def destroy = {
	}
}
