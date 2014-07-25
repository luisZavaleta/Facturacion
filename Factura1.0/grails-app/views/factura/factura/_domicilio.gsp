<!-- DO NOT AUTO FORMAT -->
<span class="calle"><span class="main-data">${data?.domicilio?.calle ?: 'Click para configurar el domicilio' }</span></span><!-- 

--><span class="exterior"> <g:if test="${model?.exterior}"># &nbsp;</g:if><span class="main-data">${model?.exterior}</span></span><!-- 

--><g:if test="${model?.interior}">Int. &nbsp; </g:if><span class="interior"> <span class="main-data">${model?.interior}</span></span><!-- 

--><span class="colonia"> <g:if test="${model?.colonia}">Col. &nbsp; </g:if><span class="main-data">${model?.colonia}</span></span><!-- 

--><span class="municipio"><span class="main-data">${model?.municipio}</span><g:if test="${model?.estado}">,</g:if></span><!-- 

--><span class="estado"><span class="main-data">${model?.estado}</span><g:if test="${model?.pais}">,</g:if></span><!-- 

--><span class="pais"><span class="main-data">${model?.pais}</span><g:if test="${model?.pais}">.</g:if></span><!-- 

--><span class="cp"><g:if test="${model?.colonia}">C.P. &nbsp;</g:if>	<span class="main-data">${data?.domicilio?.cp}</span></span>

