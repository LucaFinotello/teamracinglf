app.controller("pista", ["$rootScope", "$scope", function($rootScope, $scope) {
	$rootScope.pista = $rootScope.pista ? $rootScope.pista : {
		page: "agenda"
	};

	$rootScope.init_pista = function() {
		$rootScope.pista.azienda = $rootScope.logged_user.azienda;
		$rootScope.pista.dipendente = $rootScope.logged_user.dipendente;
		$rootScope.pista.page = $rootScope.utente_is_dipendente($rootScope.logged_user) ? "training_school" : "agenda";
	}
}]);