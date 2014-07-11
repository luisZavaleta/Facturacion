

package mx.vulcanosw.facturacion

import grails.converters.JSON

import java.lang.reflect.UndeclaredThrowableException

import mx.vulcanosw.facturacion.cabsa.CabsaConfig
import mx.vulcanosw.facturacion.cabsa.Factura
import mx.vulcanosw.facturacion.cabsa.TempJson
import mx.vulcanosw.facturacion.factura.Domicilio
import mx.vulcanosw.vo.FacturaPdfData
import mx.vulcanosw.vo.ProductoPdf






class FacturaController {

	def pdfRenderingService

	def cfdiXmlService
	def soapService
	def facturaUtilService
	def facturaService
	def mailService

	//def rfcPruebas = "AAA010101AAA"
	//	def numCertPruebas ="20001000000100005867"CABSA DE TABASCO S.A. de C.V.
	//def claveIntegradorPruebas = "2b3a8764-d586-4543-9b7e-82834443f219"
	//long idTransaccion =78919



	def factura3(){
	}

	def factura4(){
	}

	def facturahtml(){}

	def tabla(){
	}

	def index() {

		Domicilio expedicion  = Domicilio.findByNombre("expedicion")
		Domicilio ubicacion   = Domicilio.findByNombre("ubicacion")



		def cabsaConfig = CabsaConfig.findByNombre("main")
		//imagenFondo = imagenFondo.fondo
		[data:null, expedicion:expedicion, ubicacion:ubicacion]
	}


	def indexml(){

		def xmla =	cfdiXmlService.generateFacturaXMLTest()

		render(text: xmla, contentType: "text/xml", encoding: "UTF-8")
		return
	}


	def factura5(){
	}
	def factura(){


		//def rfcPruebas = "AAA010101AAA"
		//	def numCertPruebas ="20001000000100005867"
		//def claveIntegradorPruebas = "2b3a8764-d586-4543-9b7e-82834443f219"
		//long idTransaccion =78919productosPdf.size() == jsonProductoList.size()) MXN


		Factura factura = new Factura()


		def config =  CabsaConfig.findByNombre("main")

		def rfcEnvio = config.rfc
		def claveIntegradorVulcanoSoftware = config.claveIntegrador
		long idTransaccion = facturaService.getFolio()
		def json = params.json
		def email = params.email
		def elementospaguno = params.elementospaguno
		def paginas = params.paginas





		String xmlStringFactura;
		BufferedOutputStream pdfFactura;


		/*GENERAR XML*/




		def jsonServer = JSON.parse(json)
		jsonServer.emisorRfc = config.rfc
		jsonServer.emisorNombre = config.nombreEmpresa

		facturaUtilService.jsonEscapeCharactersChangeToNullAndShit(jsonServer)
		facturaUtilService.jsonEscapeCharactersChangeToNullAndShit(jsonServer.pdf)
		facturaUtilService.jsonEscapeCharactersChangeToNullAndShit(jsonServer.pdf)
		(jsonServer.pdf.conceptos).each{ facturaUtilService.jsonEscapeCharactersChangeToNullAndShit(it) }
		(jsonServer.conceptos).each{ facturaUtilService.jsonEscapeCharactersChangeToNullAndShit(it) }





		//	["facturaConSello": facturaConSello, "cadenaOriginal":selloDigital.cadenaOriginal]
		def facturaYCadena;
		try{
			facturaYCadena = cfdiXmlService.generateFacturaXML(jsonServer)
		}catch(e){
			e.printStackTrace()

			Throwable t = e instanceof UndeclaredThrowableException ? e.undeclaredThrowable : e
			if(t.class == FileNotFoundException.class){
				render "El archivo key o cer no se encuentra en la ubicación indicada"
				//render ([error: "El archivo key o cer no se encuentra en la ubicación indicada"]) as JSON
				return
			}else if(t.class == SecurityException.class){
				render "El archivo key o cer no tienen permisos de lectura"
				return
			}else{
				render "No se pudo generar el XML, datos invalidos"
				return
			}
		}
		String xmla =	facturaYCadena.facturaConSello
		try{
			xmlStringFactura = soapService.timbrar(xmla, rfcEnvio, idTransaccion, claveIntegradorVulcanoSoftware) //FACTURA STRING<== GUARDAR



		}catch(e){
			e.printStackTrace()

			Throwable t = e instanceof UndeclaredThrowableException ? e.undeclaredThrowable : e

			def msjplus = t.message
			def errorMessage = t.message

			if(errorMessage.contains("t_RFC")){
				msjplus = "RFC Invalido"
			}else if(errorMessage.contains("descripcion had invalid value")){
				msjplus = "Descripción de producto invalida"
			}

			render "No se pudo timbrar la factura datos invalidos - " + msjplus
			return
		}

		def uuid = facturaUtilService.getUUID(xmlStringFactura)

		factura.xml = xmlStringFactura
		factura.folio = idTransaccion
		factura.uuid = uuid
		factura.rfc = jsonServer.receptorRfc
		factura.rfcEmisor = config.rfc
		factura.status = "activo"



		factura.save(flush:true, failOnError:true)
		/*OBTENER DATOS PARA LLENAR PDF*/


		def facturaXML = new XmlParser().parseText(xmlStringFactura)

		def qrCode = soapService.getQRCode(rfcEnvio, idTransaccion, claveIntegradorVulcanoSoftware,  uuid)





		def filePdf;
		try{

			FacturaPdfData facturaPdfData = new FacturaPdfData(facturaXML,jsonServer.pdf,facturaYCadena.cadenaOriginal, qrCode)



			String fileName = "facturaT.pdf"

			if(config.rfc == "CTA0803272M7"){
				fileName = "/home/cabsa/factura/facturaT.pdf"
			}

			def cabConf = CabsaConfig.findByNombre("main")


			def imagenFondo = cabConf.fondo
			def imagenFondo2 = cabConf.fondo2

			filePdf = new File(fileName)


			if(elementospaguno?.toInteger() > 1){



				def modelNota = [fondo:imagenFondo, fondo2:imagenFondo2, data : facturaPdfData,  maxrows: elementospaguno?.toInteger()]

				pdfFactura =  filePdf.withOutputStream { outputStream ->
					pdfRenderingService.render([template:"factura2",controller:this,model:modelNota], outputStream)
				}

			}else{
				def modelNota = [fondo:imagenFondo, data : facturaPdfData]

				pdfFactura =  filePdf.withOutputStream { outputStream ->
					pdfRenderingService.render([template:"factura",controller:this,model:modelNota], outputStream)
				}
			}

			factura.pdf = filePdf.getBytes().encodeBase64().toString()
			factura.save(flush:true, failOnError:true)

		}catch(e){
			e.printStackTrace()
			render  "La factura se generó correctamente, pero no se pudo generar el PDF"
			return
		}



		try{

			if(email != null){
				mailService.sendMail {
					multipart true
					to email.split(",")
					bcc "factura@vulcanosw.mx"
					subject "Facturación " + config?.nombreEmpresa
					body "Reciba adjunto a este documento su factura electrónica"
					attachBytes "factura.xml", "text/xml", xmlStringFactura.getBytes("UTF-8")
					attachBytes "factura.pdf", "application/pdf", filePdf.getBytes()

				}


			}
		}catch(e){
			e.printStackTrace()
			render "La factura se generó correctamente, pero no se pudo envia al correo"
			return
		}

		render "Correo enviado"
		return
	}




	def facturaClone(){

		Factura factura = new Factura()
		String xmlStringFactura;
		BufferedOutputStream pdfFactura;


		def config =  CabsaConfig.findByNombre("main")

		//getting  factura configuration data
		def rfcEnvio = config.rfc
		def claveIntegradorVulcanoSoftware = config.claveIntegrador


		//getting data from request
		def json = params.json
		def email = params.email
		def elementospaguno = params.elementospaguno
		def paginas = params.paginas



		//Maximun folio + 1
		long idTransaccion = facturaService.getFolio()



		/*GENERAR XML*/


		log.info("JSON FACTURA  BEGIN")
		log.info(json)
		log.info("JSON FACTURA  END")


		//Transform string to json object
		def jsonServer = JSON.parse(json)

		//Add name and rfc from config
		jsonServer.emisorRfc = config.rfc
		jsonServer.emisorNombre = config.nombreEmpresa


		jsonServer = facturaUtilService.escapeCharactersWithAnexo20Rules(jsonServer)



		//	["facturaConSello": facturaConSello, "cadenaOriginal":selloDigital.cadenaOriginal]
		def facturaYCadena;
		try{
			facturaYCadena = cfdiXmlService.generateFacturaXML(jsonServer)
		}catch(e){
			e.printStackTrace()

			Throwable t = e instanceof UndeclaredThrowableException ? e.undeclaredThrowable : e
			if(t.class == FileNotFoundException.class){
				render "El archivo key o cer no se encuentra en la ubicación indicada"
				//render ([error: "El archivo key o cer no se encuentra en la ubicación indicada"]) as JSON
				return
			}else if(t.class == SecurityException.class){
				render "El archivo key o cer no tienen permisos de lectura"
				return
			}else{
				render "No se pudo generar el XML, datos invalidos"
				return
			}
		}
		String xmla =	facturaYCadena.facturaConSello
		try{
			xmlStringFactura = soapService.timbrar(xmla, rfcEnvio, idTransaccion, claveIntegradorVulcanoSoftware) //FACTURA STRING<== GUARDAR



		}catch(e){
			e.printStackTrace()

			Throwable t = e instanceof UndeclaredThrowableException ? e.undeclaredThrowable : e

			def msjplus = t.message
			def errorMessage = t.message

			if(errorMessage.contains("t_RFC")){
				msjplus = "RFC Invalido"
			}else if(errorMessage.contains("descripcion had invalid value")){
				msjplus = "Descripción de producto invalida"
			}

			render "No se pudo timbrar la factura datos invalidos - " + msjplus
			return
		}

		def uuid = facturaUtilService.getUUID(xmlStringFactura)

		factura.xml = xmlStringFactura
		factura.folio = idTransaccion
		factura.uuid = uuid
		factura.rfc = jsonServer.receptorRfc
		factura.rfcEmisor = config.rfc
		factura.status = "activo"



		factura.save(flush:true, failOnError:true)
		/*OBTENER DATOS PARA LLENAR PDF*/


		def facturaXML = new XmlParser().parseText(xmlStringFactura)

		def qrCode = soapService.getQRCode(rfcEnvio, idTransaccion, claveIntegradorVulcanoSoftware,  uuid)





		def filePdf;
		try{

			FacturaPdfData facturaPdfData = new FacturaPdfData(facturaXML,jsonServer.pdf,facturaYCadena.cadenaOriginal, qrCode)



			String fileName = "facturaT.pdf"

			if(config.rfc == "CTA0803272M7"){
				fileName = "/home/cabsa/factura/facturaT.pdf"
			}

			def cabConf = CabsaConfig.findByNombre("main")


			def imagenFondo = cabConf.fondo
			def imagenFondo2 = cabConf.fondo2

			filePdf = new File(fileName)


			if(elementospaguno?.toInteger() > 1){



				def modelNota = [fondo:imagenFondo, fondo2:imagenFondo2, data : facturaPdfData,  maxrows: elementospaguno?.toInteger()]

				pdfFactura =  filePdf.withOutputStream { outputStream ->
					pdfRenderingService.render([template:"factura2",controller:this,model:modelNota], outputStream)
				}

			}else{
				def modelNota = [fondo:imagenFondo, data : facturaPdfData]

				pdfFactura =  filePdf.withOutputStream { outputStream ->
					pdfRenderingService.render([template:"factura",controller:this,model:modelNota], outputStream)
				}
			}

			factura.pdf = filePdf.getBytes().encodeBase64().toString()
			factura.save(flush:true, failOnError:true)

		}catch(e){
			e.printStackTrace()
			render  "La factura se generó correctamente, pero no se pudo generar el PDF"
			return
		}



		try{

			if(email != null){
				mailService.sendMail {
					multipart true
					to email.split(",")
					bcc "factura@vulcanosw.mx"
					subject "Facturación CABSA"
					body "Reciba adjunto a este documento su factura electrónica"
					attachBytes "facturaCABSA.xml", "text/xml", xmlStringFactura.getBytes("UTF-8")
					attachBytes "facturaCABSA.pdf", "application/pdf", filePdf.getBytes()

				}


			}
		}catch(e){
			e.printStackTrace()
			render "La factura se generó correctamente, pero no se pudo envia al correo"
			return
		}

		render "Correo enviado"
		return
	}



	def enviarCorreo(){

		def correos = "luis@vulcanosw.mx,contacto@vulcanosw.mx"

		correos = correos.split(",")
		mailService.sendMail{
			to correos
			//bcc "factura@vulcanosw.mx"
			subject "Informacion de cliente"
			html "EJEMPLO"

		}

		render "check mail"
	}









	def mockFactura(){


		int maxRows = 14
		int pages = 2

		def mock_JSON_MOCKooooooooooMOCK ='{"formaPago":"Efectivo","condicionesDePago":"condicion","moneda":"MXN","metodoDePago":"Efectivo","lugarExpedicion":"","numCtaPago":"No aplica","emisorNombre":"Vulcano Software S.A. de C.V.","emisorRfc":"VSO120910LV5","emisorRegimenRegimen":"Personas morales del régimen general","receptorRfc":"VSO120910LV5","receptorNombre":"Luis Miguel Zavaleta","receptorDomicilioCalle":"18 de marzo","receptorDomicilioNoExterior":"2200","receptorDomicilioNoInterior":"Edificio F 102","receptorDomicilioColonia":"Vostalmar","receptorDomicilioLocalidad":"Veracruz","receptorDomicilioReferencia":"","receptorDomicilioMunicipio":"Veracruz","receptorDomicilioEstado":"Veracruz","receptorDomicilioPais":"México","receptorDomicilioCodigoPostal":"96519","pdf":{"clave":"17","pedido":"pedido","entrega":"entrega","leyendaPagaremos":"Debemos y pagaré(mos) incondicionalmente por este pagaré a la orden de CABSA DE TABASCO, S.A. de C.V. el día ---","leyendaGeneracionInterese":"Si esta factura no se paga a su vencimiento generará intereses moratorios del 8% Mensual. Toda devolución causará un 20% de cargo por manejo de material.","telefono":"921 21 00 128","correo":"ventas@cabsaTabasco.com","web":"www.cabsatabasco.com","conceptos":[{"parte":"77","cantidad":"7","codigo":"XYZCOF","descripcion":"articulo rato","unidad":"7","valorUnitario":"37"},{"parte":"88","cantidad":"8","codigo":"8","descripcion":"otro articulo","unidad":"8","valorUnitario":"28"}]},"conceptos":[{"cantidad":"7","unidad":"7","descripcion":"articulo rato","valorUnitario":"37"},{"cantidad":"8","unidad":"8","descripcion":"otro articulo","valorUnitario":"28"}]}'
		def mock_xmlStringFactura_MOCKooooooooooMOCK = '<?xml version="1.0" encoding="utf-8"?><cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv32.xsd" version="3.2" folio="1" fecha="2014-02-24T20:10:26" sello="GZdWiJafRj0zgIs6qmqDBMW0qAmzA55VoZ/75OOvyg79bGykZOXM3CZjeS1U6v2yvSUg0NL7PxZAAB91fkXoMS0e3KHLas9UaAgKJEwGdlCZRSV6PdGfTe3Bf2xNxEIlBc1R09FZrqya9XKIsER+Y2qvsp4DVJYSn/VbRFmAprk=" formaDePago="Efectivo" noCertificado="20001000000100005867" certificado="MIIEdDCCA1ygAwIBAgIUMjAwMDEwMDAwMDAxMDAwMDU4NjcwDQYJKoZIhvcNAQEFBQAwggFvMRgwFgYDVQQDDA9BLkMuIGRlIHBydWViYXMxLzAtBgNVBAoMJlNlcnZpY2lvIGRlIEFkbWluaXN0cmFjacOzbiBUcmlidXRhcmlhMTgwNgYDVQQLDC9BZG1pbmlzdHJhY2nDs24gZGUgU2VndXJpZGFkIGRlIGxhIEluZm9ybWFjacOzbjEpMCcGCSqGSIb3DQEJARYaYXNpc25ldEBwcnVlYmFzLnNhdC5nb2IubXgxJjAkBgNVBAkMHUF2LiBIaWRhbGdvIDc3LCBDb2wuIEd1ZXJyZXJvMQ4wDAYDVQQRDAUwNjMwMDELMAkGA1UEBhMCTVgxGTAXBgNVBAgMEERpc3RyaXRvIEZlZGVyYWwxEjAQBgNVBAcMCUNveW9hY8OhbjEVMBMGA1UELRMMU0FUOTcwNzAxTk4zMTIwMAYJKoZIhvcNAQkCDCNSZXNwb25zYWJsZTogSMOpY3RvciBPcm5lbGFzIEFyY2lnYTAeFw0xMjA3MjcxNzAyMDBaFw0xNjA3MjcxNzAyMDBaMIHbMSkwJwYDVQQDEyBBQ0NFTSBTRVJWSUNJT1MgRU1QUkVTQVJJQUxFUyBTQzEpMCcGA1UEKRMgQUNDRU0gU0VSVklDSU9TIEVNUFJFU0FSSUFMRVMgU0MxKTAnBgNVBAoTIEFDQ0VNIFNFUlZJQ0lPUyBFTVBSRVNBUklBTEVTIFNDMSUwIwYDVQQtExxBQUEwMTAxMDFBQUEgLyBIRUdUNzYxMDAzNFMyMR4wHAYDVQQFExUgLyBIRUdUNzYxMDAzTURGUk5OMDkxETAPBgNVBAsTCFVuaWRhZCAxMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2TTQSPONBOVxpXv9wLYo8jezBrb34i/tLx8jGdtyy27BcesOav2c1NS/Gdv10u9SkWtwdy34uRAVe7H0a3VMRLHAkvp2qMCHaZc4T8k47Jtb9wrOEh/XFS8LgT4y5OQYo6civfXXdlvxWU/gdM/e6I2lg6FGorP8H4GPAJ/qCNwIDAQABox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwIGwDANBgkqhkiG9w0BAQUFAAOCAQEATxMecTpMbdhSHo6KVUg4QVF4Op2IBhiMaOrtrXBdJgzGotUFcJgdBCMjtTZXSlq1S4DG1jr8p4NzQlzxsdTxaB8nSKJ4KEMgIT7E62xRUj15jI49qFz7f2uMttZLNThipunsN/NF1XtvESMTDwQFvas/Ugig6qwEfSZc0MDxMpKLEkEePmQwtZD+zXFSMVa6hmOu4M+FzGiRXbj4YJXn9Myjd8xbL/c+9UIcrYoZskxDvMxc6/6M3rNNDY3OFhBK+V/sPMzWWGt8S1yjmtPfXgFs1t65AZ2hcTwTAuHrKwDatJ1ZPfa482ZBROAAX1waz7WwXp0gso7sDCm2/yUVww==" condicionesDePago="condicion" subTotal="483.0" Moneda="MXN" total="560.28" tipoDeComprobante="ingreso" metodoDePago="Efectivo" LugarExpedicion="Coatzacoalcos,Veracruz" NumCtaPago="No Aplica"><cfdi:Emisor rfc="AAA010101AAA" nombre="Empresa patito S.A de C.V."><cfdi:DomicilioFiscal calle="Huimanguillo" noExterior="104" colonia="Plaza Villahermosa" municipio="Tabasco" estado="Tabasco" pais="M&#233;xico" codigoPostal="86179"/><cfdi:ExpedidoEn calle="Prolongaci&#243;n de hidalgo" noExterior="1919" colonia="Benito Juarez Norte" municipio="Coatzacoalcos" estado="Veracruz" pais="M&#233;xico" codigoPostal="96576"/><cfdi:RegimenFiscal Regimen="Personas morales del r&#233;gimen general"/></cfdi:Emisor><cfdi:Receptor rfc="VSO120910LV5" nombre="Luis Miguel Zavaleta"><cfdi:Domicilio calle="18 de marzo" noExterior="2200" noInterior="Edificio F 102" colonia="Vostalmar" localidad="Veracruz" municipio="Veracruz" estado="Veracruz" pais="M&#233;xico" codigoPostal="96519"/></cfdi:Receptor><cfdi:Conceptos><cfdi:Concepto cantidad="7.0" unidad="7" descripcion="articulo rato" valorUnitario="37.0" importe="259.0"/><cfdi:Concepto cantidad="8.0" unidad="8" descripcion="otro articulo" valorUnitario="28.0" importe="224.0"/></cfdi:Conceptos><cfdi:Impuestos><cfdi:Traslados><cfdi:Traslado impuesto="IVA" tasa="0.16" importe="77.28"/></cfdi:Traslados></cfdi:Impuestos><cfdi:Complemento><tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" version="1.0" UUID="0B109F38-13C9-4951-B60D-DB95148DDD54" FechaTimbrado="2014-02-24T20:12:42" selloCFD="GZdWiJafRj0zgIs6qmqDBMW0qAmzA55VoZ/75OOvyg79bGykZOXM3CZjeS1U6v2yvSUg0NL7PxZAAB91fkXoMS0e3KHLas9UaAgKJEwGdlCZRSV6PdGfTe3Bf2xNxEIlBc1R09FZrqya9XKIsER+Y2qvsp4DVJYSn/VbRFmAprk=" noCertificadoSAT="20001000000100005868" selloSAT="IoBScdqasvue9y3295FTMJ/OC4+r6KnLViR44cghPqcZ5G2HqItC3WV9tMTVpUcPxlfL/TVbbZwrCp1r6bt+faWuOlC3wA7YJH4m5xbrfBctHTMxZPMqAJzNc2wBnv+dtCCnrl7ukbTwjJiD8eWR4pry9132EVv1M0kzxPdwoL0=" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/TimbreFiscalDigital/TimbreFiscalDigital.xsd"/></cfdi:Complemento></cfdi:Comprobante>'
		def mock_QRCODE_MOCKooooooooooMOCK ="data:image/jpeg;base64,Qk1eBAAAAAAAAD4AAAAoAAAAWAAAAFgAAAABAAEAAAAAAAAAAADEDgAAxA4AAAIAAAACAAAAAAAA/////////////////////wD//////////////wD//////////////wDgAGGfmf4YZ4Z5nwDgAGGfmf4YZ4Z5nwDn/n/+GBnmH4eHnwDn/n/+GBnmH4eHnwDmBmBn+Zn55554BwDmBmBn+Zn55554BwDmBmeYB4Z+GAHmHwDmBmeYB4Z+GAHmHwDmBnh4f+GeYGAAHwDmBnh4f+GeYGAAHwDn/mAGYZ//54fh5wDn/mAGYZ//54fh5wDgAGB4fn+B+AZmfwDgAGB4fn+B+AZmfwD//+Zn4BgAf4fh5wD//+Zn4BgAf4fh5wDnmGBgZnh/4YAB5wDnmGBgZnh/4YAB5wDhh5hh+Z4f4HngfwDhh5hh+Z4f4HngfwD5hgHmHhh5gHnnnwD5hgHmHhh5gHnnnwDnh4Gf/gf4BnmZ/wDnh4Gf/gf4BnmZ/wDgYAZmB+GAZ///nwDgYAZmB+GAZ///nwDnh5meBhmfnn+ZnwDnh5meBhmfnn+ZnwD55nnh/4H554YYZwD55nnh/4H554YYZwD4AZ+eAHhmGAAeZwD4AZ+eAHhmGAAeZwDmYGfgGBh+AGGf5wDmYGfgGBh+AGGf5wDmB5h/n5/gZ4fnhwDmB5h/n5/gZ4fnhwDn/hmAB+YGeef+fwDn/hmAB+YGeef+fwD+GZ+H55+GfgBh5wD+GZ+H55+GfgBh5wDmeBh55+eBngYAfwDmeBh55+eBngYAfwD4Yf4fgHmH4eHgHwD4Yf4fgHmH4eHgHwD+HgGfnmZ/h/+BnwD+HgGfnmZ/h/+BnwDn55hn5gGZhn4YHwDn55hn5gGZhn4YHwD/nmHmH+Hn55mZnwD/nmHmH+Hn55mZnwDmH4GYBngeBn+HhwDmH4GYBngeBn+HhwDnnhgBmAYf4B5nhwDnnhgBmAYf4B5nhwDmZ54YYGGH+HgeZwDmZ54YYGGH+HgeZwDmHhnn+AfhmHmYZwDmHhnn+AfhmHmYZwDn5/ngB+YZ5hh/hwDn5/ngB+YZ5hh/hwDn5gAH+f+eYGGZnwDn5gAH+f+eYGGZnwDngZmHh5gfgZmAHwDngZmHh5gfgZmAHwDmGBmYYYBgYYZ5hwDmGBmYYYBgYYZ5hwD//+AeGGfn+H///wD//+AeGGfn+H///wDgAGZmZmZmZmYABwDgAGZmZmZmZmYABwDn/n/mZ5h5555/5wDn/n/mZ5h5555/5wDmBn/n4YZ+GYZgZwDmBn/n4YZ+GYZgZwDmBmeeB+H+B4ZgZwDmBmeeB+H+B4ZgZwDmBnmAGf/n555gZwDmBnmAGf/n555gZwDn/mHn5meZ4H5/5wDn/mHn5meZ4H5/5wDgAGBngZgAfmYABwDgAGBngZgAfmYABwD//////////////wD//////////////wD//////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="




		Factura factura = new Factura()


		def config =  CabsaConfig.findByNombre("main")
		def rfcEnvio = config.rfc
		def claveIntegradorVulcanoSoftware = config.claveIntegrador
		long idTransaccion = facturaService.getFolio()
		def json = mock_JSON_MOCKooooooooooMOCK




		String xmlStringFactura;
		BufferedOutputStream pdfFactura;


		/*GENERAR XML*/



		def jsonServer = JSON.parse(json)
		jsonServer.emisorRfc = config.rfc
		jsonServer.emisorNombre = config.nombreEmpresa

		facturaUtilService.jsonEscapeCharactersChangeToNullAndShit(jsonServer)
		facturaUtilService.jsonEscapeCharactersChangeToNullAndShit(jsonServer.pdf)
		facturaUtilService.jsonEscapeCharactersChangeToNullAndShit(jsonServer.pdf)
		(jsonServer.pdf.conceptos).each{ facturaUtilService.jsonEscapeCharactersChangeToNullAndShit(it) }
		(jsonServer.conceptos).each{ facturaUtilService.jsonEscapeCharactersChangeToNullAndShit(it) }



		xmlStringFactura =  mock_xmlStringFactura_MOCKooooooooooMOCK  //mock


		def uuid = facturaUtilService.getUUID(xmlStringFactura)

		factura.xml = xmlStringFactura
		factura.folio = idTransaccion
		factura.uuid = uuid
		factura.rfc = jsonServer.receptorRfc
		factura.rfcEmisor = config.rfc
		factura.status = "activo"



		factura.save(flush:true, failOnError:true)
		/*OBTENER DATOS PARA LLENAR PDF*/


		def facturaXML = new XmlParser().parseText(xmlStringFactura)

		def qrCode = mock_QRCODE_MOCKooooooooooMOCK//soapService.getQRCode(rfcEnvio, idTransaccion, claveIntegradorVulcanoSoftware,  uuid)





		def filePdf;
		try{

			FacturaPdfData facturaPdfData = new FacturaPdfData(facturaXML,jsonServer.pdf,"cadenaOriginal", qrCode)


			ProductoPdf productoMock = facturaPdfData.productos[0]


			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)

			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)
			facturaPdfData.productos.add(productoMock)





			String fileName = "facturaT.pdf"

			if(config.rfc == "CTA0803272M7"){
				fileName = "/home/cabsa/factura/facturaT.pdf"
			}

			def cabConf = CabsaConfig.findByNombre("main")
			def imagenFondo = cabConf.fondo
			def imagenFondo2 = cabConf.fondo2

			filePdf = new File(fileName)


			if(pages > 1){

				def modelNota = [fondo:imagenFondo, fondo2:imagenFondo2, data : facturaPdfData,  maxrows: maxRows]

				pdfFactura =  filePdf.withOutputStream { outputStream ->
					pdfRenderingService.render([template:"factura2",controller:this,model:modelNota], outputStream)
				}
			}else{

				def modelNota = [fondo:imagenFondo, data : facturaPdfData]

				pdfFactura =  filePdf.withOutputStream { outputStream ->
					pdfRenderingService.render([template:"factura",controller:this,model:modelNota], outputStream)
				}

			}


			factura.pdf = filePdf.getBytes().encodeBase64().toString()
			factura.save(flush:true, failOnError:true)

		}catch(e){
			e.printStackTrace()
			render  "La factura se generó correctamente, pero no se pudo generar el PDF"
			return
		}





		render "Correo enviado"
		return




	}

	def timbrado(){

		render "HOLA XD"
		/*
		 println("qrc")
		 println(qrc)
		 render facturaPdfData as JSON
		 */
		//render(text: xmlTimbrado, contentType: "text/xml", encoding: "UTF-8")
	}








	def getall(){

		Factura.withNewSession {

			def facturas = Factura.findAll()

			if(facturas != null){
				facturas*.xml = null
				facturas*.pdf = null


				render facturas  as JSON
				facturas*.discard()
				return
			}
		}
	}



	def pdf(){

		def uuid = params.id
		def facturas = Factura.findByUuid(uuid)


		response.setContentType('application/pdf');
		response.setHeader('Content-disposition', 'Attachment; filename=file.pdf');
		response.getOutputStream().write((facturas.pdf).decodeBase64());
		response.getOutputStream().flush();

	}



	def xml(){

		def uuid = params.id
		def facturas = Factura.findByUuid(uuid)
		response.setContentType('text/xml');
		response.setHeader('Content-disposition', 'Attachment; filename=file.xml');
		response.getOutputStream().write((facturas.xml).bytes);
		response.getOutputStream().flush();

	}



	def cancelar(){

		def cancelada;

		try{
			cancelada = soapService.cancelarFactura(params.id)
		}catch(e){
			render "Hubo un error en la cancelación"
			return
		}

		if(cancelada){
			render "La factura se canceló correctamente"
			return
		}else{
			render "La factura no fué cancelada"
			return
		}



	}

	def nota(){}

	/**
	 * SORRY, SORRY, SORRY I REAALY NEED TO FINISH THIS (is nota hack (hack de nota) no not a hack XD)
	 * ***/
	def notahack(){

		TempJson tj = new TempJson()
		Date d = new Date()
		tj.timems = d.getTime()
		tj.json = params.json

		tj.save(flush:true)


		render tj.timems


	}



	def testpdf(){


		pdfRenderingService.render([template:"factura7",controller:this,model:null],response)

	}

	def notapdf(){



		def tj = TempJson.findByTimems(params.id)

		def json
		if(tj != null){
			json = tj.json
		}


		tj.delete()


		def config =  CabsaConfig.findByNombre("main")




		def jsonServer = JSON.parse(json)
		jsonServer.emisorRfc = config.rfc
		jsonServer.emisorNombre = config.nombreEmpresa




		String fileName = "nota.pdf"


		if(config.rfc == "CTA0803272M7"){
			fileName = "/home/cabsa/factura/nota.pdf"
		}

		def direccion = facturaUtilService.getDireccion(jsonServer)

		def modelNota = [json:jsonServer, logo : config.logo, direccion:direccion]

		new File(fileName).withOutputStream { outputStream ->
			pdfRenderingService.render([template:"nota",controller:this,model:modelNota],response)
		}

	}


	def verifyGeneralData(){

		CabsaConfig cabsaConfig = CabsaConfig.findByNombre("main")

		def regimen = params.regimen
		def correo = params.correo
		def telefono = params.telefono
		def web = params.web




		if(regimen == cabsaConfig.regimenFiscal && correo == cabsaConfig.correo
		&& telefono == cabsaConfig.telefono && web == cabsaConfig.web){
			render "ok"
			return
		}else{
			render "modificado"
			return
		}

	}



	def modifyGeneralData(){

		CabsaConfig cabsaConfig = CabsaConfig.findByNombre("main")

		def regimen = params.regimenFiscal
		def correo = params.correo
		def telefono = params.telefono
		def web = params.web




		cabsaConfig.regimenFiscal =regimen
		cabsaConfig.correo =correo
		cabsaConfig.telefono =telefono
		cabsaConfig.web = web

		cabsaConfig.save(flush:true)

		render cabsaConfig.errors

	}



	def rfclike(){


		if(params.id == null || params.id == ""){
			def facturas = Factura.findAll()

			facturas*.xml = null
			facturas*.pdf = null

			render facturas as JSON
			return

		}


		def id = params.id
		def hql = "FROM Factura AS factura WHERE lower(factura.rfc) LIKE ?"
		def facturas = Factura.executeQuery(hql,["%"+id?.toLowerCase()+"%"])

		facturas*.xml = null
		facturas*.pdf = null


		render facturas as JSON
		return
	}



	def _factura7(){

	}

}
// a la orden de
