package mx.vulcanosw.facturacion

import mx.vulcanosw.vo.Moneda

class UtilController {
	def numeroALetraService
	def utilService



	def letra() {


		def cantidad = params.id
		def iso4217 = params.iso4217

		if(!iso4217){
			iso4217 = "MXN"
		}

		Moneda moneda = utilService.toMoney(cantidad, iso4217)
		render moneda.toString()
		return
	}
}