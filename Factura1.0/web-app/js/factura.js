
$(document).ready(function() {
	var notEmpty = {}

	notEmpty.selector = ".no-empty-plz"
	notEmpty.event = "focusout"
	notEmpty.nonEmpty = "---"

	alert("ne memes")
	neverEmpty(notEmpty)

});

$(document).ready(
		function() {

			(function($) {
				var original = $.fn.val;
				$.fn.val = function() {
					if ($(this).is('[contenteditable]')) {
						return $.fn.text.apply(this, arguments);
					}
					;
					return original.apply(this, arguments);
				};
			})(jQuery);

			$(function() {
				var availableTags = [ "Personas morales del R\u00e9gimen General", "Personas morales con fines no lucrativos",
						"Personas morales del régimen simplificado", "Asalariados", "Honorarios", "Arrendamiento de Inmuebles", "Actividad empresarial", "Incorporación fiscal" ];
				$(".regimen-fiscal-text").autocomplete({
					source : availableTags
				});

			});
		});