package mx.vulcanosw.facturacion

import mx.vulcanosw.facturacion.cabsa.CabsaConfig

import org.codehaus.groovy.grails.web.json.JSONObject



class CfdiXmlService {

	def facturaUtilService
	def facturaService



	//def privatePassword = "U4Kpv81tVpAie3"





	def ciperSomeShit(){


		//def sello = facturaUtilService.getSelloDigital(keyPath, privatePassword)




		println("sello=====>"+sello)







		//
	}






	def getSellocDigital(){


	}





	def generateFacturaXML(JSONObject json){








		//def numCertPruebas ="20001000000100005867"
		//def claveIntegradorPruebas = "2b3a8764-d586-4543-9b7e-82834443f219"

		def cabsaconfig = CabsaConfig.findByNombre("main")



		String  keyPath = cabsaconfig.keyPath
		String privatePassword = cabsaconfig.privatePassword
		def certPath = cabsaconfig.certPath


		/*	String  keyPath = "/Users/luisZavaleta/Desktop/PRUEBASAT/aaa010101aaa.key"
		 String privatePassword ="12345678a"
		 def certPath ="/Users/luisZavaleta/Desktop/PRUEBASAT/aaa010101aaa.cer"
		 */

		def comp = facturaService.getComprobanteFromJSON(json)


		//example return ["facturaConSello": facturaConSello, "cadenaOriginal":selloDigital.cadenaOriginal]
		return facturaUtilService.getFacturaSellada(comp, certPath, keyPath, privatePassword)


	}


/*

	def generateFacturaXMLTest2(JSONObject json){

		//def numCertPruebas ="20001000000100005867"
		//def claveIntegradorPruebas = "2b3a8764-d586-4543-9b7e-82834443f219"

		String  keyPath = "/Users/luisZavaleta/Desktop/PRUEBASAT/aaa010101aaa.key"
		String privatePassword ="12345678a"
		def certPath ="/Users/luisZavaleta/Desktop/PRUEBASAT/aaa010101aaa.cer"


		def comp = facturaService.getComprobanteFromJSON(json)

		return comp

	}*/
/*
	def generateFacturaXMLTest(){


		//def numCertPruebas ="20001000000100005867"
		//def claveIntegradorPruebas = "2b3a8764-d586-4543-9b7e-82834443f219"

		String  keyPath = "/Users/luisZavaleta/Desktop/PRUEBASAT/aaa010101aaa.key"
		String privatePassword ="12345678a"
		def certPath ="/Users/luisZavaleta/Desktop/PRUEBASAT/aaa010101aaa.cer"


		def comp = facturaService.getComprobanteFromJSONOLD()


		return facturaUtilService.getFacturaSellada(comp, certPath, keyPath, privatePassword)


	}
*/



}
