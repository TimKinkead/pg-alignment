'use strict';

angular.module('app').directive('fixedSizeFullHeight', ['$window', function($window) {
	
	return {
		restrict: 'C',
		link: function($scope, $element, $attrs) {
			function setFullHeight() {

				var element = $element[0] ? $element[0] : $element,
					siblings = element.parentNode.children,
					siblingIndex = Array.prototype.indexOf.call(element.parentNode.children, element),
					base = (siblings.length > 1 && siblingIndex !== 0) ?
						element.parentNode.children[ siblingIndex - 1 ] :
						document.getElementById('main-nav'),
					baseBottom = base.getBoundingClientRect().bottom;

				element.style.minHeight = Math.floor($window.innerHeight - baseBottom) + 'px';
			}
			setFullHeight();
			
			angular.element($window).bind('resize', setFullHeight);

			$scope.$on('$destroy', function() {
				angular.element($window).unbind('resize', setFullHeight);
			});
				
		}
	};
}]);