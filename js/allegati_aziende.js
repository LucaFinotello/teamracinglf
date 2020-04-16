app.controller("allegati_circuiti", ["$rootScope", "$scope", function($rootScope, $scope) {
	$rootScope.allegati_circuiti = $rootScope.allegati_circuiti ? $rootScope.allegati_circuiti : {};

	$rootScope.select_allegati_circuiti = function() {
		return $scope.ajax(
			"api/base/find.php"
			,{
				beanName: "AllegatoAziendaBean"
				,model: undefined
			}
			,true
		).then(
			(response) => {
				$rootScope.allegati_circuiti.righe = [];
				$rootScope.allegati_circuiti.map = {};
				$rootScope.push_allegato_azienda(response);
				return Promise.resolve($rootScope.allegati_circuiti.righe);
			}
			,(response) => {return Promise.reject(response)}
		);
	}

	$rootScope.push_allegato_azienda = function(allegato_azienda) {
		if (allegato_azienda) {
			if (Array.isArray(allegato_azienda)) {
				for (let i = 0; i < allegato_azienda.length; i++) {
					$rootScope.push_allegato_azienda(allegato_azienda[i]);
				}
			} else {
				$scope.push($rootScope.allegati_circuiti.righe, allegato_azienda);
				$rootScope.allegati_circuiti.map[allegato_azienda.aa_idallegato] = $rootScope.allegati_circuiti.map[allegato_azienda.aa_idallegato] ? $rootScope.allegati_circuiti.map[allegato_azienda.aa_idallegato] : {};
				$rootScope.allegati_circuiti.map[allegato_azienda.aa_idallegato][allegato_azienda.aa_idazienda] = allegato_azienda;
			}
		}
	}

	$rootScope.insert_allegato_azienda = function(allegato_azienda) {
		return allegato_azienda ? $scope.ajax(
			"api/base/save.php"
			,{
				beanName: "AllegatoAziendaBean"
				,model: allegato_azienda
			}
			,true
		).then(
			(response) => {
				$rootScope.push_allegato_azienda(allegato_azienda);
				$scope.toast("Azienda aggiunta");
				return Promise.resolve(allegato_azienda);
			}
			,(response) => {return Promise.reject(response)}
		) : Promise.reject(
			"allegato_azienda is "
			+ (allegato_azienda === undefined ? "undefined" : "")
			+ (allegato_azienda === null ? "null" : "")
			+ (allegato_azienda === false ? "false" : "")
			+ (allegato_azienda === 0 ? "0" : "")
		)
	}

	$rootScope.delete_allegato_azienda = function(allegato_azienda, fl_ask_confirm) {
		if (allegato_azienda) {
			return fl_ask_confirm ? $scope.alert_confirm("Sicuro di voler rimuovere l'azienda?", "SI", "NO").then(
				(yes) => {return $rootScope.delete_allegato_azienda(allegato_azienda, false)}
				,(no) => {return Promise.reject(no)}
			) : $scope.ajax(
				"api/allegato_azienda/delete.php"
				,{allegato_azienda: allegato_azienda}
				,true
			).then(
				(response) => {
					$scope.splice($rootScope.allegati_circuiti.righe, allegato_azienda);
					if ($rootScope.allegati_circuiti.map[allegato_azienda.aa_idallegato]) {
						$rootScope.allegati_circuiti.map[allegato_azienda.aa_idallegato][allegato_azienda.aa_idazienda] = undefined;
					}
					$scope.toast("Azienda rimossa");
					return Promise.resolve(allegato_azienda);
				}
				,(response) => {return Promise.reject(response)}
			);
		}
		return Promise.reject(
			"allegato_azienda is "
			+ (allegato_azienda === undefined ? "undefined" : "")
			+ (allegato_azienda === null ? "null" : "")
			+ (allegato_azienda === false ? "false" : "")
			+ (allegato_azienda === 0 ? "0" : "")
		)
	}
}]);