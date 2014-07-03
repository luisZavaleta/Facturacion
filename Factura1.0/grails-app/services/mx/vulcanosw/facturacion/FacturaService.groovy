package mx.vulcanosw.facturacion

import mx.vulcanosw.facturacion.cabsa.CabsaConfig
import mx.vulcanosw.facturacion.cabsa.Factura
import mx.vulcanosw.facturacion.factura.Comprobante
import mx.vulcanosw.facturacion.factura.Concepto
import mx.vulcanosw.facturacion.factura.Conceptos
import mx.vulcanosw.facturacion.factura.Domicilio
import mx.vulcanosw.facturacion.factura.Emisor
import mx.vulcanosw.facturacion.factura.Impuestos
import mx.vulcanosw.facturacion.factura.Receptor
import mx.vulcanosw.facturacion.factura.RegimenFiscal
import mx.vulcanosw.facturacion.factura.Traslado
import mx.vulcanosw.facturacion.factura.Traslados

import org.codehaus.groovy.grails.web.json.JSONObject

class FacturaService {
	def facturaUtilService
	def pruebas = true




	def getComprobanteFromJSON(JSONObject json){

		//def rfcPruebas
		//rfcPruebas = json.emisorRfc


		Comprobante comp = new Comprobante()

		//comp.serie ="C"

		comp.folio = getFolio()

		comp.formaPago =json.formaPago
		comp.condicionesDePago =  json.condicionesDePago

		if((json.moneda).equals("MXP")){
			comp.moneda = "MXP"

		}else{
			comp.moneda = json.moneda
			comp.tipoCambio = json.tipoCambio
		}


		comp.metodoDePago = json.metodoDePago
		comp.lugarExpedicion = json.lugarExpedicion

		if(json.numCtaPago?.isNumber()){
			comp.numCtaPago = json.numCtaPago?.toInteger()
		}

		comp.tipoDeComprobante = "ingreso" //fijo, por que para facturas siempre es ingresos

		Emisor emisor = new Emisor()
		emisor.nombre = json.emisorNombre


		def config =  CabsaConfig.findByNombre("main")
		def rfcEnvio = config.rfc


		emisor.rfc =  config.rfc
		/*
		if(pruebas){
			emisor.rfc  ="AAA010101AAA"
		}else{
			emisor.rfc = json.emisorRfc
		}
*/
		Domicilio domiciliofiscal = new Domicilio()


		domiciliofiscal = Domicilio.findByNombre("ubicacion")



		/*
		 domiciliofiscal.calle = json.emisorDomiciliofiscalCalle
		 domiciliofiscal.noExterior =json.emisorDomiciliofiscalNoExterior
		 domiciliofiscal.noInterior = json.emisorDomiciliofiscalNoInterior
		 domiciliofiscal.colonia =json.emisorDomiciliofiscalColonia
		 domiciliofiscal.localidad = json.emisorDomiciliofiscalLocalidad
		 domiciliofiscal.referencia =json.emisorDomiciliofiscalReferencia
		 domiciliofiscal.municipio = json.emisorDomiciliofiscalMunicipio
		 domiciliofiscal.estado = json.emisorDomiciliofiscalEstado
		 domiciliofiscal.pais = json.emisorDomiciliofiscalPais
		 domiciliofiscal.codigoPostal =json.emisorDomiciliofiscalCodigoPostal
		 */
		emisor.domicilioFiscal = domiciliofiscal

		Domicilio expedidoEn = new Domicilio()
		expedidoEn = Domicilio.findByNombre("expedicion")

		/*
		 expedidoEn.calle = json.emisorExpedidoEnCalle
		 expedidoEn.noExterior =json.emisorExpedidoEnNoExterior
		 expedidoEn.noInterior = json.emisorExpedidoEnNoInterior
		 expedidoEn.colonia =json.emisorExpedidoEnColonia
		 expedidoEn.localidad =json.emisorExpedidoEnLocalidad
		 expedidoEn.referencia =json.emisorExpedidoEnReferencia
		 expedidoEn.municipio =json.emisorExpedidoEnMunicipio
		 expedidoEn.estado = json.emisorExpedidoEnEstado
		 expedidoEn.pais = json.emisorExpedidoEnPais
		 expedidoEn.codigoPostal =json.emisorExpedidoEnCodigoPostal
		 */

		emisor.expedidoEn = expedidoEn
		RegimenFiscal regimen = new RegimenFiscal()
		regimen.regimen = json.emisorRegimenRegimen
		emisor.regimen = regimen

		comp.emisor = emisor

		Receptor receptor = new Receptor()
		receptor.rfc = json.receptorRfc
		receptor.nombre = json.receptorNombre

		Domicilio domicilio = new Domicilio()
		domicilio.calle = json.receptorDomicilioCalle
		domicilio.noExterior = json.receptorDomicilioNoExterior
		domicilio.noInterior = json.receptorDomicilioNoInterior
		domicilio.colonia =json.receptorDomicilioColonia
		domicilio.localidad =json.receptorDomicilioLocalidad
		//domicilio.referencia =json.receptorDomicilioReferencia
		domicilio.municipio =json.receptorDomicilioMunicipio
		domicilio.estado = json.receptorDomicilioEstado
		domicilio.pais = json.receptorDomicilioPais
		domicilio.codigoPostal =json.receptorDomicilioCodigoPostal
		receptor.domicilio = domicilio

		comp.receptor = receptor

		Conceptos conceptos = new Conceptos()

		List<Concepto> conceptosList = new ArrayList<Concepto>()



		for(def concepto : json.conceptos){

			Concepto c = new Concepto()
			c.cantidad = concepto.cantidad?.toBigDecimal()
			c.unidad = concepto.unidad
			c.descripcion = concepto.descripcion
			c.valorUnitario =  concepto.valorUnitario

			conceptosList.add(c)
		}

		conceptos.conceptos = conceptosList

		comp.conceptos = conceptos


		Impuestos impuestos = new Impuestos()
		Traslados traslados = new Traslados()
		impuestos.traslados = traslados
		List<Traslado> impuestosTrasladados = new ArrayList<Traslado>()


		Traslado iva = new Traslado();
		iva.impuesto = "IVA"
		iva.tasa = 0.16
		iva.conceptos = comp.conceptos

		impuestosTrasladados.add(iva)
		traslados.traslados  = impuestosTrasladados
		comp.impuestos = impuestos

		return comp
	}




	def getFolio(){

		def hql = "SELECT MAX(folio) as maxf FROM Factura"

		def maxf =	Factura.executeQuery(hql)


		if(maxf[0] == null){
			return 1
		}else{
			return maxf[0] + 1
		}

	}




}
