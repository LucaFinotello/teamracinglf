app.controller("report_eventi", ["$rootScope", function($rootScope) {
	$rootScope.report_eventi = $rootScope.report_eventi ? $rootScope.report_eventi : {
		righe: []
	};
}]);