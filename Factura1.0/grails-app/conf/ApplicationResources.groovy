

modules = {





	jquery{
		resource url:"js/jquery-2.0.3.min.js"
		resource url:"js/jquery-migrate-1.2.1.min.js"
	}


	jqueryui{
		dependsOn "jquery"

		resource url:"js/jquery-ui.min.js"
		resource url:"css/jquery-ui.min.css"
	}


	bootstrap{
		dependsOn "jquery"
		resource url:"css/bootstrap-modal.css"
		resource url:"js/bootstrap.min.js"
	}



	bootstrapcss{
		resource url:"css/bootstrap.min.css"
		resource url:"css/bootstrap-modal-bs3patch.css"
	}

	indexcss{
		dependsOn "bootstrapcss"


		resource url:"css/btn-factura.css"
		resource url:"css/factura-index.css"
	}

	util{
		dependsOn "jquery"
		resource url:"http://74.117.153.110/js/vulcano-util-1.5.1.js"
		resource url:"js/vulcano/vulcano-not-yet-util.js"
	}



	factura{
		dependsOn "jquery"
		dependsOn "jqueryui"
		dependsOn "util"
		dependsOn "precisedecimals"
		dependsOn "editMyImage"




		resource url:"js/factura/lib/listas.js"
		resource url:"js/factura/custom/facturacion-config.js"
		resource url:"js/factura/lib/facturacion.js"
		resource url:"js/factura/lib/facturacion-helper.js"
	}


	facturatest{
		dependsOn "factura"

		resource url:"js/factura/lib/facturacion-test.js"
	}

	index{
		dependsOn "util"
		resource url:"js/botones-laterales.js"
	}

	jasny{
		dependsOn "bootstrap"
		resource url:"js/jasny-bootstrap.min.js"
		resource url:"css/jasny-bootstrap.min.css"
	}

	modal{
		dependsOn "bootstrap"
		resource url:"js/bootstrap-modalmanager.js"
		resource url:"js/bootstrap-modal.js"
	}

	modalVulcano{
		dependsOn "bootstrap"
		dependsOn "modal"
		dependsOn "jquery"



		resource url:"js/vulcano/modal/vulcano-modal-1.0.js"
	}

	modalVulcanoB{
		dependsOn "bootstrap"
		dependsOn "modal"
		dependsOn "jquery"



		resource url:"js/vulcano/modal/vulcano-modal-1.1.js"
	}


	editMyImage{

		dependsOn "jquery"
		dependsOn "bootstrapcss"
		dependsOn "bootstrap"
		dependsOn "jasny"
		dependsOn "util"
		dependsOn "modalVulcanoB"

		resource url:"js/factura/editMyImageJS.js"
	}


	precisedecimals{ resource url:"js/big.min.js" }
}







