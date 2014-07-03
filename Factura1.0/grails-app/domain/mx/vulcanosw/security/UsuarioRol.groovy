package mx.vulcanosw.security

import org.apache.commons.lang.builder.HashCodeBuilder

class UsuarioRol implements Serializable {

	private static final long serialVersionUID = 1

	Usuario usuario
	Rol rol

	boolean equals(other) {
		if (!(other instanceof UsuarioRol)) {
			return false
		}

		other.usuario?.id == usuario?.id &&
			other.rol?.id == rol?.id
	}

	int hashCode() {
		def builder = new HashCodeBuilder()
		if (usuario) builder.append(usuario.id)
		if (rol) builder.append(rol.id)
		builder.toHashCode()
	}

	static UsuarioRol get(long usuarioId, long rolId) {
		UsuarioRol.where {
			usuario == Usuario.load(usuarioId) &&
			rol == Rol.load(rolId)
		}.get()
	}

	static UsuarioRol create(Usuario usuario, Rol rol, boolean flush = false) {
		new UsuarioRol(usuario: usuario, rol: rol).save(flush: flush, insert: true)
	}

	static boolean remove(Usuario u, Rol r, boolean flush = false) {

		int rowCount = UsuarioRol.where {
			usuario == Usuario.load(u.id) &&
			rol == Rol.load(r.id)
		}.deleteAll()

		rowCount > 0
	}

	static void removeAll(Usuario u) {
		UsuarioRol.where {
			usuario == Usuario.load(u.id)
		}.deleteAll()
	}

	static void removeAll(Rol r) {
		UsuarioRol.where {
			rol == Rol.load(r.id)
		}.deleteAll()
	}

	static mapping = {
		id composite: ['rol', 'usuario']
		version false
	}
}
