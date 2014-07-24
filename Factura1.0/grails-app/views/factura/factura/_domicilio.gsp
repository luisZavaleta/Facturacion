<!-- DO NOT AUTO FORMAT -->
<span class="calle"> 
	${data?.domicilio?.calle ?: 'Click para configurar el domicilio principal' }
</span>
<g:if test="${model?.exterior}"># &nbsp; </g:if>
<span class="exterior"> 
	${model?.exterior}
</span>

<g:if test="${model?.interior}">Int. &nbsp; </g:if>
<span class="interior"> 
	${model?.interior}
</span>

<g:if test="${model?.colonia}">Col. &nbsp; </g:if>
<span class="colonia"> 
	${model?.colonia}
</span>

<span class="municipio">
	${model?.municipio}	
</span>
<g:if test="${model?.estado}">,</g:if>

<span class="estado"> 
	${model?.estado}	
</span>
<g:if test="${model?.pais}">,</g:if>

<span class="pais"> 
	${model?.pais}
</span>
<g:if test="${model?.pais}">.</g:if>

<g:if test="${model?.colonia}">C.P. &nbsp; </g:if>	
<span class="cp"> 
	${data?.domicilio?.cp}
</span>

