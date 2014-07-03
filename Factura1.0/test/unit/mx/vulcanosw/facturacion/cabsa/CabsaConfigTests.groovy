package mx.vulcanosw.facturacion.cabsa

import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(CabsaConfig)
class CabsaConfigTests {

	void testRfc(){
		//mockForConstraintsTests provide some methods like validate()
		mockForConstraintsTests CabsaConfig

		def cc = new CabsaConfig();
		cc.rfc = 'VSO120910LV5'
		cc.nombre = 'Vulcanos Software S.A de C.V'

		assert	!cc.validate()


	}
}
