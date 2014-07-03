package mx.vulcanosw.facturacion

import groovy.xml.DOMBuilder
import groovy.xml.StreamingMarkupBuilder

import java.security.GeneralSecurityException
import java.security.InvalidKeyException
import java.security.KeyFactory
import java.security.NoSuchAlgorithmException
import java.security.NoSuchProviderException
import java.security.PrivateKey
import java.security.SecureRandom
import java.security.Signature
import java.security.SignatureException
import java.security.cert.CertificateFactory
import java.security.cert.X509Certificate
import java.security.spec.PKCS8EncodedKeySpec
import java.text.DecimalFormat

import javax.xml.parsers.ParserConfigurationException
import javax.xml.transform.Result
import javax.xml.transform.Source
import javax.xml.transform.Transformer
import javax.xml.transform.TransformerException
import javax.xml.transform.TransformerFactory
import javax.xml.transform.stream.StreamResult
import javax.xml.transform.stream.StreamSource

import mx.vulcanosw.facturacion.factura.Comprobante
import mx.vulcanosw.facturacion.factura.Concepto
import mx.vulcanosw.facturacion.factura.Iva

import org.apache.commons.codec.binary.Base64
import org.w3c.dom.Document
import org.w3c.dom.Node
import org.w3c.dom.NodeList
import org.xml.sax.SAXException



class FacturaUtilService {


	def X509Certificate getCertificado(url){

		InputStream ins = new FileInputStream(url);
		CertificateFactory certificateFactory = CertificateFactory.getInstance("X509");


		return certificateFactory.generateCertificate(ins);
	}



	def getFecha(Date fecha){
		fecha = new Date(fecha.getTime() - (1000 *60 *5))
		def formattedDate = fecha.format("yyyy-MM-dd'T'HH:mm:ss")
		return formattedDate
	}




	private String encodeFileToBase64Binary(String fileName)
	throws IOException {

		File file = new File(fileName);
		byte[] bytes = loadFile(file);
		byte[] encoded = Base64.encodeBase64(bytes);
		String encodedString = new String(encoded);

		return encodedString;
	}





	def String getCertificateSerialNumber(url){
		StringBuilder noCertificado = new StringBuilder()

		X509Certificate cert = getCertificado(url)
		def serialNum = cert.getSerialNumber();
		serialNum = serialNum.toString(16)
		//Fuck that shit, to convert from hex to ascii I just took out the 3 in each couple of characters because HEX 31 = 1, HEX 32 = 2 ... etc.
		//for example: 343731 = 471

		serialNum = splitEvery2Char(serialNum)
		serialNum = serialNum.collect{ it.charAt(1) }
		serialNum = serialNum.flatten()

		for(def s : serialNum ){
			noCertificado.append(s)
		}
		return noCertificado.toString()
	}


	def getCertificadoBase64(url){
		return encodeFileToBase64Binary(url)
	}


	private static byte[] loadFile(File file) throws IOException {
		InputStream is = new FileInputStream(file);

		long length = file.length();
		if (length > Integer.MAX_VALUE) {
			// File is too large
		}
		byte[] bytes = new byte[(int)length];
		int offset = 0;
		int numRead = 0;
		while (offset < bytes.length
		&& (numRead=is.read(bytes, offset, bytes.length-offset)) >= 0) {
			offset += numRead;
		}
		if (offset < bytes.length) {
			throw new IOException("Could not completely read file "+file.getName());
		}
		is.close();
		return bytes;
	}

	def splitEvery2Char(str){
		return 	str.split("(?<=\\G..)")
	}



	public static PrivateKey getPrivateKey(final File keyFile, final String password)
	throws GeneralSecurityException, IOException{
		FileInputStream ins = new FileInputStream(keyFile)

		org.apache.commons.ssl.PKCS8Key pksc8Key = new org.apache.commons.ssl.PKCS8Key(ins, password.toCharArray())

		byte[] decrypted = pksc8Key.getDecryptedBytes()
		PKCS8EncodedKeySpec spec = new	PKCS8EncodedKeySpec(decrypted)
		PrivateKey pk = null
		if(pksc8Key.isDSA()){
			pk = KeyFactory.getInstance("DSA").generatePrivate(spec)
		}else if(pksc8Key.isRSA()){
			pk = KeyFactory.getInstance("RSA").generatePrivate(spec)
		}

		pk = pksc8Key.getPrivateKey()

		return pk
	}



	public static String generarSelloDigital(final PrivateKey key, final String cadenaOriginal)
	throws NoSuchAlgorithmException,NoSuchProviderException, InvalidKeyException, SignatureException{

		Signature sing = Signature.getInstance("SHA1withRSA")
		sing.initSign(key, new SecureRandom())
		sing.update(cadenaOriginal.getBytes())
		byte[]  signature = sing.sign()

		String selloBase64 = new String( Base64.encodeBase64(signature) )

		return selloBase64
	}





	public static String generarCadenaOriginal(final String xml) throws TransformerException{


		InputStream xsltis = CfdiXmlService.class.classLoader.getResourceAsStream('res/cadenaoriginal_3_2.xslt');

		StreamSource ss = new StreamSource(xsltis)
		TransformerFactory tf = TransformerFactory.newInstance()
		Transformer xsltT = tf.newTransformer(ss)
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		StringReader sr = new StringReader(xml)
		Source sourc = new StreamSource(sr)
		Result reslt = new StreamResult(output)

		xsltT.transform(sourc, reslt)

		return output.toString()
	}


	def getSelloDigital(Writable xmlw, String keyPath, String privatePassword){

		String selloDigital
		String cadenaOriginal;
		PrivateKey llavePrivada;

		//Generando cadenaOriginal




		String xml =  xmlw.toString()
		cadenaOriginal = this.generarCadenaOriginal(xml)

		//Generando Llave Privada
		//	def keyPath = "/Users/luisZavaleta/Desktop/CSD_VSO120910LV5_20140101190612/CSD_Factura_Gorila_VSO120910LV5_20140101_190535.key"

		File privateKeyFile = new File(keyPath)


		llavePrivada = this.getPrivateKey(privateKeyFile, privatePassword)


		//Obtener sello digital

		selloDigital = this.generarSelloDigital(llavePrivada, cadenaOriginal)




		return ["selloDigital": selloDigital, "cadenaOriginal":cadenaOriginal]

	}



	def getFacturaSellada(Comprobante comprobante, String certPath, String keyPath, String privatePassword){
		Date fecha = new Date()
		Writable facturaSinSello =	this.generateXML(comprobante,  certPath,  null, fecha)
		def selloYCadena = getSelloDigital( facturaSinSello,  keyPath,  privatePassword)
		def selloDigital = selloYCadena.selloDigital
		//return ["selloDigital": selloDigital, "cadenaOriginal":cadenaOriginal]
		Writable facturaConSello =	this.generateXML(comprobante,  certPath,  selloDigital, fecha)
		return  ["facturaConSello": facturaConSello, "cadenaOriginal":selloYCadena.cadenaOriginal]
	}


	def generateXML(Comprobante comprobante, String certPath, String sello, Date fecha){

		StreamingMarkupBuilder builder = new StreamingMarkupBuilder(useDoubleQuotes: true)
		builder.encoding = 'UTF-8'

		Iva iva = new Iva();


		def total = 0;

		Writable comprobanteBuilder = builder.bind{
			mkp.xmlDeclaration()
			"cfdi:Comprobante"(comprobante.getAttributes(certPath,sello, fecha)) {
				"cfdi:Emisor"(comprobante.emisor.getAttributes()) {
					"cfdi:DomicilioFiscal"(comprobante.emisor.domicilioFiscal.getAttributes()){
					}
					"cfdi:ExpedidoEn"(comprobante.emisor.expedidoEn.getAttributes()){
					}
					"cfdi:RegimenFiscal"(comprobante.emisor.regimen.getAttributes()){}
				}
				"cfdi:Receptor"(comprobante.receptor.getAttributes()){
					"cfdi:Domicilio"(comprobante.receptor.domicilio.getAttributes()){
					}
				}
				"cfdi:Conceptos"(){
					for(Concepto concepto in comprobante.conceptos.conceptos){

						"cfdi:Concepto"(concepto.getAttributes()){
							//total += concepto.importe
						}
					}
				}
				"cfdi:Impuestos"(){
					"cfdi:Traslados"(){
						for(def impuesto in comprobante.impuestos.traslados.traslados){
							//	impuesto.total = total
							impuesto.tasa = 0.16
							impuesto.impuesto = "IVA"
							"cfdi:Traslado"(impuesto.getAttributes(comprobante.conceptos)){}
						}
					}
				}
			}
		}

		builder = null

		return  comprobanteBuilder
	}



	String getTImporte(BigDecimal number){


		DecimalFormat df = new DecimalFormat();

		df.setMaximumFractionDigits(2);

		df.setMinimumFractionDigits(0);

		df.setGroupingUsed(false);

		String result = df.format(number);


		return result.replace(",", ".")


	}



	def textToDom(String text)  throws ParserConfigurationException, SAXException, IOException{

		DOMBuilder domBuilder = DOMBuilder.newInstance()
		Document doc = domBuilder.parseText(text)

		return doc

	}



	def getUUID(String xmlTimbrado){

		Document document = this.textToDom(xmlTimbrado)

		NodeList timbreFiscal = document.getElementsByTagName("tfd:TimbreFiscalDigital")

		if(timbreFiscal != null && timbreFiscal.getLength() == 1){
			Node timbre = timbreFiscal.item(0)
			def uuid = timbre?.getAttributes()?.getNamedItem("UUID")?.getNodeValue()

			return uuid
		}
	}


	def  jsonEscapeCharactersChangeToNullAndShit(json){

		for(def something: json){

			if(something.value instanceof String){



				def value = (something.value).replaceAll("&", "&amp;")
				value = (something.value).replaceAll("\"", "&quot;")
				value = (something.value).replaceAll("<", "&lt;")
				value = (something.value).replaceAll(">", "&gt;")
				value = (something.value).replaceAll("'", "&apos;")

				if(value == "---"){
					value = null
				}

				json[something.key] = value

			}


		}


	}



	def escapeCharactersWithAnexo20Rules(jsonServer){
		this.jsonEscapeCharactersChangeToNullAndShit(jsonServer)
		this.jsonEscapeCharactersChangeToNullAndShit(jsonServer.pdf)
		this.jsonEscapeCharactersChangeToNullAndShit(jsonServer.pdf)
		(jsonServer.pdf.conceptos).each{ this.jsonEscapeCharactersChangeToNullAndShit(it) }
		(jsonServer.conceptos).each{ this.jsonEscapeCharactersChangeToNullAndShit(it) }

		return jsonServer
	}



	def getDireccion(def json){

		def calle = json.receptorDomicilioCalle
		def noExterior = json.receptorDomicilioNoExterior
		def noInterior = json.receptorDomicilioNoInterior
		def colonia = json.receptorDomicilioColonia
		def municipio = json.receptorDomicilioMunicipio
		def estado = json.receptorDomicilioEstado
		def pais = json.receptorDomicilioPais

		def  direccion =""
		if(calle != null && calle != "" && calle != "---"){
			direccion += calle
		}

		if(noExterior != null && noExterior != "" && noExterior != "---"){
			direccion += " # " + noExterior
		}

		if(noInterior != null && noInterior != "" && noInterior != "---"){
			direccion += " Int. " + noInterior
		}


		if(colonia != null && colonia != "" && colonia != "---"){
			direccion += " Colonia: " + colonia + "."
		}



		if(municipio != null && municipio != "" && municipio != "---"){
			direccion +=  " "+municipio+","
		}


		if(estado != null && estado != "" && estado != "---"){
			direccion += " " + estado + ", "
		}


		if(pais != null && pais != "" && pais != "---"){
			direccion += " " + pais
		}
		return direccion
	}



}
