package mx.vulcanosw.vo


import mx.vulcanosw.facturacion.FacturaUtilService

import org.codehaus.groovy.grails.web.json.JSONObject


class ProductoPdf {


FacturaUtilService facturaUtilService = new  FacturaUtilService()

	ProductoPdf(Node node){


		this.cantidad = (node.attribute("cantidad"))?.toBigDecimal()
		this.unidad = node.attribute("unidad")
		this.descripcion = node.attribute("descripcion")
		this.unitario = (node.attribute("valorUnitario"))?.toBigDecimal()
		this.importe = node.attribute("importe")
	}




	ProductoPdf(JSONObject json){
		this.cantidad = (json.cantidad)?.toBigDecimal()  			//<---
		this.descripcion = json.descripcion   	//<---
		this.unidad = json.unidad   			//<---
		this.unitario = (json.valorUnitario)?.toBigDecimal()		//<---
		this.codigo = json.codigo
		this.parte = json.parte
	}


	String parte 				//JSON
	BigDecimal cantidad 		//xml
	String codigo				//JSON
	String descripcion 		//xml
	String unidad	 		//xml
	BigDecimal unitario 		//xml
	String importe 			//xml



	def equivalent(ProductoPdf other){



		if(this.cantidad == other.cantidad && this.unidad == other.unidad  && this.descripcion == other.descripcion && facturaUtilService.getTImporte(this.unitario) == facturaUtilService.getTImporte(other.unitario)){
			return true;
		}

		return false;

	}





}
