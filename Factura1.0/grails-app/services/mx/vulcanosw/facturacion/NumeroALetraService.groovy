package mx.vulcanosw.facturacion

import grails.transaction.Transactional

@Transactional
class NumeroALetraService {

	def letra = { int num ->
		List units = [
			'cero',
			'un',
			'dos',
			'tres',
			'cuatro',
			'cinco',
			'seis',
			'siete',
			'ocho',
			'nueve'
		]
		List decs = [
			'X',
			'y',
			'veinte',
			'treinta',
			'cuarenta',
			'cincuenta',
			'sesenta',
			'setenta',
			'ochenta',
			'noventa'
		]
		List dieces=[
			'diez',
			'once',
			'doce',
			'trece',
			'catorce',
			'quince',
			'dieciseis',
			'diecisiete',
			'dieciocho',
			'diecinueve'
		]
		List cientos=[
			'x',
			'cien',
			'doscientos',
			'trescientos',
			'cuatrocientos',
			'quinientos',
			'seiscientos',
			'setecientos',
			'ochocientos',
			'novecientos'
		]
		//Millones
		int millones = num.intdiv(1000000)
		//Millares
		int millares = num.intdiv(1000) % 1000
		//Centenas
		int centenas = num.intdiv(100) % 10
		//Decenas
		int decenas = num.intdiv(10) % 10
		//Unidades
		int unidades = num % 10
		def letras = new StringBuilder()
		if (millones == 1) {
			letras << 'un millón'
		} else if (millones > 1) {
			letras.append(call(millones)).append ' millones'
		}
		if (millares == 1) {
			letras << ' un mil' // o 'mil' nada mas, si no se quiere tipo "moneda"
		} else if (millares > 0) {
			letras.append(' ').append(call(millares)).append ' mil'
		}
		if (centenas == 1) {
			letras << (num % 100 == 0 ? ' cien' : ' ciento')
		} else if (centenas > 0) {
			letras.append(' ').append cientos[centenas]
		}
		if (decenas == 1) {
			letras.append(' ').append dieces[num % 10]
			unidades = 0
		} else if (decenas == 2 && unidades > 0) {
			letras.append(' veinti').append units[unidades]
			unidades = 0
		} else if (decenas > 1) {
			letras.append(' ').append decs[decenas]
			if (unidades > 0) {
				letras << ' y'
			}
		}
		if (unidades > 0) {
			letras.append(' ').append units[unidades]
		} else if (num == 0) {
			letras << units[0]
		}
		letras = letras.toString().trim()



		return letras// letras[0].toUpperCase() + letras.substring(1)
	}
}
