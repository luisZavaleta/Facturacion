package mx.vulcanosw.facturacion

import mx.vulcanosw.vo.Moneda



class UtilService {

	NumeroALetraService numeroALetraService = new NumeroALetraService()

	def weirdEquals(String param, def dbElement){

		if(param == ""){
			param = null
		}


		if(dbElement == ""){
			dbElement = null
		}


		println(param + "<===|===>"+ dbElement)

		if(param == null && dbElement == null){
			return true
		}else if(param == null || dbElement == null){
			return false
		}

		assert(param != null)
		assert(dbElement != null)


		if(param ==  dbElement.toString()){
			println("true")
			return true
		}
		println("false")
		return false;
	}



	def strToNull(String str){

		if(str == "---"){
			return null;
		} else{
			return str
		}
	}




	def toMoney(String cantidad){


		println(cantidad)
		Moneda moneda = new Moneda()

		if(cantidad != null){

			moneda.cantidad = cantidad.toBigDecimal()

			def cantidadSplit = cantidad.split("\\.")
			println(cantidadSplit)


			def letras = numeroALetraService.letra(cantidadSplit[0]?.toInteger())
			moneda.letra = letras[0].toUpperCase() + letras.substring(1)

			if(cantidadSplit.size() > 1){
				moneda.centavos = cantidadSplit[1]+"/100"
			}
		}

		return moneda
	}





}
