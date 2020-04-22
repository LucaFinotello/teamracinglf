app.controller("report_pista", ["$rootScope", function($rootScope) {
	$rootScope.report_pista = $rootScope.report_pista ? $rootScope.report_pista : {
		righe: []
	};
}]);