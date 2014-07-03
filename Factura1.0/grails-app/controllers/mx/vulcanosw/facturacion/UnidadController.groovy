package mx.vulcanosw.facturacion

import grails.converters.JSON
import mx.vulcanosw.facturacion.cabsa.Unidad
import mx.vulcanosw.vo.Autocompleate

class UnidadController {

	def get() {





		def hql = "SELECT unidad.id, unidad.unidad FROM Unidad AS unidad"

		def unidades = Unidad.executeQuery(hql)





		def unidadesJson = unidades.collect{ new Autocompleate(idElemento: it[0], label: it[1], value: it[1])}

		render unidadesJson as JSON
		return
	}
}
