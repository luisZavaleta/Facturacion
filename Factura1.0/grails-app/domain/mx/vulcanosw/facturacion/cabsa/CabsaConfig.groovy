package mx.vulcanosw.facturacion.cabsa

class CabsaConfig {

	//log.info

	String nombre
	String fondo
	String fondo2
	String rfc
	String nombreEmpresa
	String claveIntegrador


	String regimenFiscal
	String telefono
	String correo
	String web

	String keyPath
	String certPath
	String privatePassword
	String logo

	Boolean pruebas



    static constraints = {
    }


	static mapping = {
		fondo type:'text'
		fondo2 type:'text'
		logo type:'text'
	}

}

//cabsa