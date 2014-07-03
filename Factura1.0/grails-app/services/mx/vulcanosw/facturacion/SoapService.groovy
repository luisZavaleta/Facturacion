package mx.vulcanosw.facturacion

import grails.transaction.Transactional
import mx.vulcanosw.facturacion.cabsa.CabsaConfig
import mx.vulcanosw.facturacion.cabsa.Factura


@Transactional
class SoapService {

	def cfdiXmlService


	def getTokenDeServicio(String rfc, long transactionId){

		CabsaConfig cabConf = CabsaConfig.findByNombre("main")

		def servicePath;

		if(cabConf.pruebas){
			servicePath = "http://pruebas.ecodex.com.mx:2044/ServicioSeguridad.svc?wsdl"
		}else{
			servicePath = "https://servicios.ecodex.com.mx:4043/ServicioSeguridad.svc"
		}


		withSoap(serviceURL: servicePath) {

			def response = send(SOAPAction: 'http://Ecodex.WS.Model/2011/CFDI/Seguridad/ObtenerToken') {
				body {
					SolicitudObtenerToken(xmlns: 'http://Ecodex.WS.Model/2011/CFDI') {
						RFC(rfc)
						TransaccionID(transactionId)
					}
				}
			}

			return response.RespuestaObtenerToken.Token.text()
		}
	}


	def getTokenDeServicioError(String rfc, long transactionId){

		CabsaConfig cabConf = CabsaConfig.findByNombre("main")

		def servicePath;

		if(cabConf.pruebas){
			servicePath = "http://pruebas.ecodex.com.mx:2044/ServicioSeguridad.svc?wsdl"
		}else{
			servicePath = "https://servicios.ecodex.com.mx:4043/ServicioSeguridad.svc"
		}


		withSoap(serviceURL: servicePath) {
			def response = send(SOAPAction: 'http://Ecodex.WS.Model/2011/CFDI/Seguridad/ObtenerToken') {
				body {
					SolicitudObtenerToken(xmlns: 'http://Ecodex.WS.Model/2011/CFDI') {
						RFC(rfc)
						TransaccionID(transactionId)
					}
				}
			}

			return response.RespuestaObtenerToken.TransaccionID.text()
		}
	}




	def getTokenDeTransaccion(String rfc, long transactionId, String integradorId){

		String tokenDeServicio = this.getTokenDeServicio(rfc, transactionId)
		String preToken = (integradorId+ "|"+ tokenDeServicio)

		return preToken.encodeAsSHA1().toString()
	}




	def timbrar(xml, rfc, transactionId, integradorId){

		println("XML====>"+xml)

		def token = getTokenDeTransaccion( rfc,  transactionId, integradorId)

		CabsaConfig cabConf = CabsaConfig.findByNombre("main")

		def servicePath;

		if(cabConf.pruebas){
			servicePath = "http://pruebas.ecodex.com.mx:2044/ServicioTimbrado.svc?wsdl"
		}else{
			servicePath = "https://servicios.ecodex.com.mx:4043/ServicioTimbrado.svc"
		}




		withSoap(serviceURL: servicePath) {
			def response = send(SOAPAction: 'http://Ecodex.WS.Model/2011/CFDI/Timbrado/TimbraXML') {
				body {
					SolicitudTimbraXML(xmlns: 'http://Ecodex.WS.Model/2011/CFDI') {
						ComprobanteXML{ DatosXML(xml) }
						RFC(rfc)
						Token(token)
						TransaccionID(transactionId)
					}
				}
			}

			def comprobante = response.RespuestaTimbraXML.ComprobanteXML


			return(comprobante.DatosXML)
		}
	}


	def getQRCode(String rfc, long transaccionId, String integradorId,  String uuid){


		CabsaConfig cabConf = CabsaConfig.findByNombre("main")

		def servicePath;

		if(cabConf.pruebas){
			servicePath = "http://pruebas.ecodex.com.mx:2044/ServicioTimbrado.svc?wsdl"
		}else{
			servicePath = "https://servicios.ecodex.com.mx:4043/ServicioTimbrado.svc"
		}


		def token = getTokenDeTransaccion( rfc,  transaccionId, integradorId)




		withSoap(serviceURL: servicePath) {
			def response = send(SOAPAction: 'http://Ecodex.WS.Model/2011/CFDI/Timbrado/ObtenerQRTimbrado') {
				body {
					SolicitudObtenerQRTimbrado(xmlns: 'http://Ecodex.WS.Model/2011/CFDI') {
						RFC(rfc)
						Token(token)
						TransaccionID(transaccionId)
						UUID(uuid)
					}
				}
			}

			return "data:image/jpeg;base64," + response.RespuestaObtenerQRTimbrado.QR//.RespuestaObtenerToken.Token.text()
		}
	}





	def cancelarFactura(def uuid){

		Factura factura = Factura.findByUuid(uuid)
		CabsaConfig cabConf = CabsaConfig.findByNombre("main")
		def token = getTokenDeTransaccion( factura.rfcEmisor,  factura.folio, cabConf.claveIntegrador)

		def servicePath;
		if(cabConf.pruebas){
			servicePath = "http://pruebas.ecodex.com.mx:2044/ServicioTimbrado.svc?wsdl"
		}else{
			servicePath = "https://servicios.ecodex.com.mx:4043/ServicioTimbrado.svc"
		}

		withSoap(serviceURL: servicePath) {
			def response = send(SOAPAction: 'http://Ecodex.WS.Model/2011/CFDI/Timbrado/CancelaTimbrado') {
				body {
					SolicitudCancelaTimbrado(xmlns: 'http://Ecodex.WS.Model/2011/CFDI') {
						RFC(factura.rfcEmisor)
						Token(token)
						TransaccionID(factura.folio)
						UUID(uuid)
					}
				}
			}



			def cancelada = response.RespuestaCancelaTimbrado.Cancelada


			if(cancelada){
				factura.status  = "cancelada"
				factura.save(flush:true)
			}

			return(cancelada)
		}
	}
}

