dataSource {
	pooled = true
	driverClassName = "org.postgresql.Driver"
	username = "postgres"
	password = "4I2BVeN"
	url = "jdbc:postgresql://localhost:5432/cabsa"
}
hibernate {
	cache.use_second_level_cache = true
	cache.use_query_cache = false
	cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory'
}
// environment specific settings
environments {
	development {
		dataSource { dbCreate = "create-drop" }
	}
	test {
		dataSource { dbCreate = "update" }
	}
	production {
		dataSource {
			username = "postgres"
			password = "lulu27BC"
			url = "jdbc:postgresql://localhost:5432/lulufactura"


			dbCreate = "update"
			pooled = true
			properties {
				maxActive = -1
				minEvictableIdleTimeMillis=1800000
				timeBetweenEvictionRunsMillis=1800000
				numTestsPerEvictionRun=3
				testOnBorrow=true
				testWhileIdle=true
				testOnReturn=true
				validationQuery="SELECT 1"
			}
		}
	}
}
