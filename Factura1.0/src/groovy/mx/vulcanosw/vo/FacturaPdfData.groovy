package mx.vulcanosw.vo

import mx.vulcanosw.facturacion.SoapService
import mx.vulcanosw.facturacion.UtilService
import mx.vulcanosw.facturacion.cabsa.CabsaConfig

import org.codehaus.groovy.grails.web.json.JSONArray
import org.codehaus.groovy.grails.web.json.JSONObject


class FacturaPdfData {


	UtilService utilService = new UtilService()
	SoapService soapService = new SoapService()

	FacturaPdfData() {
	}

	FacturaPdfData(Node comprobante, JSONObject jsonPdf, String cadenaOriginal, String qrCode) {

		//Quitar cadena Original, ya no nos sirve para nada, era otra cadena original XD

		def complemento = comprobante["cfdi:Complemento"][0]
		def timbrefiscal = complemento["tfd:TimbreFiscalDigital"][0]
		def receptor = comprobante["cfdi:Receptor"][0]
		def domicilioReceptor = receptor["cfdi:Domicilio"][0]
		def impuestos = comprobante["cfdi:Impuestos"][0]
		def traslados = impuestos["cfdi:Traslados"][0]
		def iva = traslados["cfdi:Traslado"][0]
		def emisor = comprobante["cfdi:Emisor"][0]
		def domicilioFiscal = emisor["cfdi:DomicilioFiscal"][0]
		def expedidoEn = emisor["cfdi:ExpedidoEn"][0]
		def regimen = emisor["cfdi:RegimenFiscal"][0]


		def conceptos = comprobante["cfdi:Conceptos"][0]

		def conzeptoz = conceptos["cfdi:Concepto"]



		/** FILL WITH XML **/
		this.folioFiscal = timbrefiscal.attribute("UUID")
		this.noCertificadoSAT = timbrefiscal.attribute("noCertificadoSAT")
		this.idFactura = comprobante.attribute("folio")
		this.fechaCertificacion = timbrefiscal.attribute("FechaTimbrado")
		this.noSerieCertifiado = comprobante.attribute("noCertificado")
		this.regimenFiscal = regimen.attribute("Regimen")


		CabsaConfig cabsaconfig = CabsaConfig.findByNombre("main")


		if(cabsaconfig.pruebas){
			this.rfcReceptor = "AAA010101AAA"

		}else{
			this.rfcReceptor = receptor.attribute("rfc")
		}


		this.nombre = receptor.attribute("nombre")
		this.direccion = getDireccion(domicilioReceptor)
		this.colonia = domicilioReceptor.attribute("colonia")
		this.cp = domicilioReceptor.attribute("codigoPostal")
		this.ciudad = domicilioReceptor.attribute("municipio")
		this.estado = domicilioReceptor.attribute("estado")
		this.fechaExpedicion =  comprobante.attribute("fecha")
		this.condicionPago =  comprobante.attribute("condicionesDePago")
		this.importeLetra  = getImporteLetra(comprobante)
		this.subtotal = comprobante.attribute("subTotal")
		this.iva = iva.attribute("importe")
		this.total = comprobante.attribute("total")
		this.selloDigitalEmisor = comprobante.attribute("sello")
		this.selloDigitalSat = timbrefiscal.attribute("selloSAT")
		this.formaPago =  comprobante.attribute("metodoDePago")

		def noctax = comprobante.attribute("NumCtaPago")

		if(noctax.isInteger()){
			this.noCuenta = comprobante.attribute("NumCtaPago")
		}


		this.domicilio = getDomicilio(domicilioFiscal)
		this.lugarExpedicion = getDomicilio(expedidoEn)
		this.rfcEmisor = emisor.attribute("rfc")
		this.exibicionOParcialidades =  comprobante.attribute("formaDePago")
		this.cadenaOriginal =generateCadenaOriginal(timbrefiscal)



		//this.noCuenta = 12345 //harcodeado para pruebas



		/**FILLED WITH JSON**/

		this.cliente = jsonPdf.clave
		this.pedido = jsonPdf.pedido
		this.entrega = jsonPdf.entrega
		this.leyendaPagaremos = jsonPdf.leyendaPagaremos
		this.leyendaGeneracionInterese = jsonPdf.leyendaGeneracionInterese
		this.telefono = jsonPdf.telefono
		this.correo = jsonPdf.correo
		this.web = jsonPdf.web

		/**XML ARRAY AND JSON ARRAY**/

		this.productos = getProductoListCompleate(conzeptoz, jsonPdf.conceptos)


		/** FILLED WITH PARAMETER**/
		//this.codigoBidimencional = "nana"

		/**HARDCODED TEXT (Ain't change unless the SAT change his requirements)**/

		this.leyendaReprecentacionImpresa = "ESTE DOCUMENTO ES UNA REPRESENTACI�N IMPRESA DE UN CFDI"


		/*PARAMS**/
		this.qrCode =  qrCode

		//	this.folioFiscal =

	}


	String folioFiscal 			//xml
	String noCertificadoSAT 	//xml
	String idFactura 			//xml
	String fechaCertificacion 	//xml
	String noSerieCertifiado	//
	String regimenFiscal		//



	String cliente 						//JSON
	String rfcReceptor 			//xml
	String nombre 				//xml
	String direccion 			//xml
	String colonia 				//xml
	String cp 					//xml
	String ciudad 				//xml
	String estado 				//xml
	String pedido 						//JSON
	String fechaExpedicion 		//xml
	String entrega						//JSON
	String condicionPago		//xml
	String importeLetra			//json
	String subtotal				//xml
	String iva					//xml
	String total				//xml
	String leyendaPagaremos				//JSON
	String leyendaGeneracionInterese	//JSON

	String selloDigitalEmisor	//xml
	String selloDigitalSat		//xml
	String cadenaOriginal				//Parameter
	String formaPago			//xml
	String noCuenta				//xml
	String domicilio			//xml
	String lugarExpedicion		//xml
	String rfcEmisor			//xml
	String telefono						//JSON
	String correo						//JSON
	String web							//JSON
	String exibicionOParcialidades	//xml
	String leyendaReprecentacionImpresa	//texto
	String qrCode 						//Parameter
	List productos;





	def getSelloDigitalEmisor(){
		return addSomeShitEveryNChar(selloDigitalEmisor,95)
	}

	def getSelloDigitalSat(){
		return addSomeShitEveryNChar(selloDigitalSat,95)
	}

	def getCadenaOriginal(){
		println(cadenaOriginal)
		return addSomeShitEveryNChar(cadenaOriginal,95)
	}









	def getFirstNChar(String str, int siize){


		if(str != null){
			if(str.size() <  siize){
				return ["base":str, "tails": null ]
			}else{
				return ["base":str.substring(0, siize)+ "<br/>", "tail":str.substring(siize) ]
			}


		}

	}



	def addSomeShitEveryNChar(String base,int n){

		String stwa= ""

		while(true){
			if(base == null){
				break;
			}

			def wawa = getFirstNChar(base, n) //yes, wawa, 'cause 6 AM dude, and aint's woke up early
			stwa +=  wawa.base

			if(wawa.tail == null){
				break;
			}
			base = wawa.tail
		}


		return stwa

	}

	def getDireccion(def domicilioNode){

		def calle = domicilioNode.attribute("calle")
		def noExterior = domicilioNode.attribute("noExterior")
		def noInterior = domicilioNode.attribute("noInterior")

		def  direccion =""
		if(calle != null){
			direccion += calle
		}

		if(noExterior != null){
			direccion += " # " + noExterior
		}

		if(noInterior != null){
			direccion += " Int. " + noInterior
		}


		return direccion
	}


	def getImporteLetra(Node comprobante){

		def total = comprobante.attribute("total")
		def tipoMoneda = comprobante.attribute("Moneda")
		def tipoCambio = comprobante.attribute("TipoCambio")

		Moneda moneda = utilService.toMoney(total)

		def texto = ""
		if(tipoMoneda == "USD"){
			texto =  moneda.letra + " dolares " + moneda.centavos + " USD"
		}else{
			def monedasCentavos = moneda.centavos
			if(moneda.centavos == null){
				monedasCentavos = "00/100"
			}

			texto =  moneda.letra + " pesos " + monedasCentavos + " MXN"
		}

		return texto


	}


	def getDomicilio(Node domicilio){


		def domicilioTexto = ""

		def calle =  domicilio.attribute("calle")
		def noExterior = domicilio.attribute("noExterior")
		def noInterior = domicilio.attribute("noInterior")
		def colonia = domicilio.attribute("colonia")
		def municipio = domicilio.attribute("municipio")
		def estado = domicilio.attribute("estado")
		def pais = domicilio.attribute("pais")
		def codigoPostal = domicilio.attribute("codigoPostal")


		if(calle != null){
			domicilioTexto += "Calle "+calle + " "
		}

		if(noExterior != null){
			domicilioTexto += "No "+noExterior + " "
		}


		if(noInterior != null){
			domicilioTexto += "Interior "+noInterior + " "
		}

		if(colonia != null){
			domicilioTexto += "Colonia "+colonia + " "
		}

		if(municipio != null){
			domicilioTexto += municipio + ","
		}

		if(estado != null){
			domicilioTexto += estado + ", "
		}

		if(pais != null){
			domicilioTexto += pais + " "
		}

		if(codigoPostal != null){
			domicilioTexto += "C.P. "+codigoPostal
		}


		return domicilioTexto


	}


	def getQRCode(rfc, idTransaccion, claveIntegradorPruebas,  uuid){


		println(rfc.class)
		println(idTransaccion.class)
		println(claveIntegradorPruebas.class)
		println(uuid.class)
		println(rfc)
		println(idTransaccion)
		println(claveIntegradorPruebas)
		println(uuid)

		//println("SOAP==>"+soapService.getQRCode(rfc, idTransaccion, claveIntegradorPruebas,  uuid))
		//return "hola XD"
		return  soapService.getQRCode(rfc, idTransaccion, claveIntegradorPruebas,  uuid)
	}






	/*	def getProductosList(NodeList conceptosXML, JSONArray conceptosJSON){
	 }*/





	def getProductoList(NodeList nodeList){
		return nodeList.collect{ new ProductoPdf(it) }
	}


	def getProductoList(JSONArray jsonArray){
		return jsonArray.collect{ new ProductoPdf(it) }
	}




	def getProductoListCompleate(NodeList nodeList, JSONArray jsonArray){

		def nodeProductoList =  getProductoList(nodeList)

		def jsonProductoList = getProductoList(jsonArray)

		assert (nodeProductoList.size() == jsonProductoList.size())

		List productosPdf = new ArrayList<ProductoPdf>()

		for(ProductoPdf node: nodeProductoList ){
			for (ProductoPdf json : jsonProductoList){
				if(node.equivalent(json)){
					json.importe =  node.importe
					productosPdf.add(json)
					break;
				}
			}
		}

		assert (productosPdf.size() == jsonProductoList.size())

		return productosPdf

		//no need to chek all just size == size and ta da

	}




	def generateCadenaOriginal(timbrefiscal){

		return "||" + timbrefiscal.attribute("version") + "|" + timbrefiscal.attribute("UUID")  + "|" +
		timbrefiscal.attribute("FechaTimbrado") + "|" + timbrefiscal.attribute("selloCFD")  + "|" + timbrefiscal.attribute("noCertificadoSAT") + "||"


	}

}








