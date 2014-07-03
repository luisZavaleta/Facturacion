package mx.vulcanosw.facturacion.factura



class Comprobante {


	def facturaUtilService


	String serie
	Integer folio
	String sello
	String formaPago
	String condicionesDePago
	BigDecimal subTotal
	String tipoCambio
	String moneda
	BigDecimal total
	String metodoDePago
	String lugarExpedicion
	String numCtaPago
	//String certPath
	String tipoDeComprobante


	Emisor emisor
	Receptor receptor
	Conceptos conceptos
	Impuestos impuestos









	//USD




	def getAttributes(String certPath, String  selloDigital, Date fecha){

		println("certPath==================>"+certPath)

		def attributes = [:]



		attributes.put("xmlns:cfdi", "http://www.sat.gob.mx/cfd/3")
		attributes.put("xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance")
		attributes.put("xsi:schemaLocation","http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv32.xsd")
		attributes.put("version",3.2)//notnull




		if(this.serie != null && this.serie != ""){
			attributes.put("serie",this.serie)
		}

		if(this.folio != null && this.folio != 0){
			attributes.put("folio",this.folio)
		}


		attributes.put("fecha",facturaUtilService.getFecha(fecha))//notnull

		if(selloDigital != null){
			attributes.put("sello",selloDigital)//notnull
		}

		attributes.put("formaDePago",this.formaPago)//notnull
		attributes.put("noCertificado",facturaUtilService.getCertificateSerialNumber(certPath))//notnull
		attributes.put("certificado",facturaUtilService.getCertificadoBase64(certPath))//notnull

		if(this.condicionesDePago != null && this.condicionesDePago != ""){
			attributes.put("condicionesDePago",this.condicionesDePago)
		}


		def subTotal = facturaUtilService.getTImporte(this.conceptos.total)



		attributes.put("subTotal",subTotal)//notnull


		if(this.tipoCambio != null && this.tipoCambio != 0){
			attributes.put("TipoCambio", this.tipoCambio)
		}


		if(this.moneda != null && this.moneda != ""){
			attributes.put("Moneda",this.moneda)
		}


		BigDecimal total = this.conceptos.total + this.impuestos.traslados.totalTraslados

		def tot =  facturaUtilService.getTImporte(total)


		attributes.put("total",tot)//notnull
		attributes.put("tipoDeComprobante",this.tipoDeComprobante)//notnull
		attributes.put("metodoDePago",this.metodoDePago)//notnull
		attributes.put("LugarExpedicion",getLugarDeExpedicion())//notnull

		if(this.numCtaPago != null && this.numCtaPago != 0) {
			attributes.put("NumCtaPago",this.numCtaPago)
		}else{
			attributes.put("NumCtaPago","No Aplica")
		}

		return attributes
	}



	def getLugarDeExpedicion(){

		def lugarExpedicion = ""

		Domicilio domicilio = Domicilio.findByNombre("expedicion")

		lugarExpedicion = domicilio?.municipio + "," + domicilio?.estado



		return lugarExpedicion
	}

	//	static mapping = { sello type: 'text' }

	static transients = ['certPath']


	static constraints = {



		sello(nullable:false,blank: false )
		formaPago(nullable:false,blank: false )



		subTotal(nullable:false,blank: false )
		total(nullable:false,blank: false )
		tipoDeComprobante(nullable:false,blank: false )
		metodoDePago(nullable:false,blank: false )
		lugarExpedicion(nullable:false,blank: false )

	}
}
