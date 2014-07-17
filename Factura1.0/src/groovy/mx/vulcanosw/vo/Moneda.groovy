package mx.vulcanosw.vo

class Moneda {

	BigDecimal cantidad
	String letra
	String centavos
	String codigoISO


	String getNombreMoneda(){
		switch(this.codigoISO){
			case "MXN": return "pesos"
				break;
			default: throw new IllegalArgumentException("Por el momento sólo acepta pesos, bitch")
		}
	}

	String getSimboloMoneda(){
		switch(this.codigoISO){
			case "MXN": return "M.N."
				break;
			default: throw new IllegalArgumentException("Por el momento sólo acepta pesos, bitch")
		}
	}



	String toString(){
		return letra[0].toUpperCase() + letra.substring(1) + " " + nombreMoneda + " "+ centavos+ " " + simboloMoneda;
	}
}
