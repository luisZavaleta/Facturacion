package mx.vulcanosw.facturacion.factura






class Domicilio {

	def utilService;

	//VUtil vutil = new VUtil()

	String nombre
	String calle
	String noExterior
	String noInterior
	String colonia
	String localidad
	String referencia
	String municipio
	String estado //Lista se va a poner del lado el cliente.
	String pais //Lista del lado del cliente.
	String codigoPostal






	def getAttributes(){

		def attributes = [:]

		if(this.calle != null && this.calle != ""){
			attributes.put("calle", this.calle)
		}

		if(this.noExterior != null && this.noExterior != ""){
			attributes.put("noExterior", this.noExterior)
		}

		if(this.noInterior != null && this.noInterior != ""){
			attributes.put("noInterior", this.noInterior)
		}

		if(this.colonia != null && this.colonia != ""){
			attributes.put("colonia", this.colonia)
		}
		if(this.localidad != null && this.localidad != ""){
			attributes.put("localidad", this.localidad)
		}

		if(this.referencia != null && this.referencia != ""){
			attributes.put("referencia", this.referencia)
		}

		if(this.municipio != null && this.municipio != ""){
			attributes.put("municipio", this.municipio)
		}
		if(this.estado != null && this.estado != ""){
			attributes.put("estado", this.estado)
		}
		if(this.pais != null && this.pais != ""){
			attributes.put("pais", this.pais)
		}
		if(this.codigoPostal != null && this.codigoPostal != ""){
			attributes.put("codigoPostal", this.codigoPostal)
		}

		return attributes
	}



	@Override
	String toString() {



		def str = ""

		if(this.calle != null && this.calle != ""){ //#
			str +=  this.calle
		}

		if(this.noExterior != null && this.noExterior != ""){
			str +=  " No "+this.noExterior
		}

		if(this.noInterior != null && this.noInterior != ""){
			str +=  " Int "+this.noInterior
		}

		if(this.colonia != null && this.colonia != ""){
			str +=  " Col: "+this.colonia
		}




		if(this.municipio != null && this.municipio != ""){
			str +=  ". "+this.municipio
		}
		if(this.estado != null && this.estado != ""){
			str +=  ", "+this.estado
		}
		if(this.pais != null && this.pais != ""){
			str +=  ", "+this.pais + "."
		}
		if(this.codigoPostal != null && this.codigoPostal != ""){
			str +=  " C.P. "+this.codigoPostal
		}

		return str
	}









	static constraints = {

		nombre(nullable:true,  blank:true)
		calle(nullable:true,  blank:true)
		noExterior(nullable:true,  blank:true)
		noInterior(nullable:true,  blank:true)
		colonia(nullable:true,  blank:true)
		localidad(nullable:true,  blank:true)
		referencia(nullable:true,  blank:true)
		municipio(nullable:true,  blank:true)
		estado(nullable:true,  blank:true)
		pais(nullable:true,  blank:true)
		codigoPostal(nullable:true,  blank:true)
	}



}
