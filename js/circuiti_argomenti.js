app.controller("circuiti_argomenti", ["$rootScope", "$scope", function($rootScope, $scope) {
	$rootScope.circuiti_argomenti = $rootScope.circuiti_argomenti ? $rootScope.circuiti_argomenti : {};

	$rootScope.select_circuiti_argomenti = function() {
		return $scope.ajax(
			"api/base/find.php"
			,{
				beanName: "AziendaArgomentoBean"
				,model: undefined
			}
			,true
		).then(
			(response) => {
				$rootScope.circuiti_argomenti.righe = response;
				$rootScope.circuiti_argomenti.map = {};
				for (let aa = 0; aa < $rootScope.circuiti_argomenti.righe.length; aa++) {
					let azienda_argomento = $rootScope.circuiti_argomenti.righe[aa];
					$rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento] = $rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento] ? $rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento] : {};
					$rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento][azienda_argomento.aa_idazienda] = azienda_argomento;
				}
				return Promise.resolve($rootScope.circuiti_argomenti.righe);
			}
			,(response) => {return Promise.reject(response)}
		);
	}

	$rootScope.insert_azienda_argomento = function(azienda_argomento) {
		if (azienda_argomento) {
			return $scope.ajax(
				"api/base/save.php"
				,{
					beanName: "AziendaArgomentoBean"
					,model: azienda_argomento
				}
				,true
			).then(
				(response) => {
					$scope.push($rootScope.circuiti_argomenti.righe, azienda_argomento);
					$rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento] = $rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento] ? $rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento] : {};
					$rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento][azienda_argomento.aa_idazienda] = azienda_argomento;
					$scope.toast("Argomento assegnato all'circuito");
					return Promise.resolve(azienda_argomento);
				}
				,(response) => {return Promise.reject(response)}
			)
		}
		return Promise.reject(
			"azienda_argomento is "
			+ (azienda_argomento === undefined ? "undefined" : "")
			+ (azienda_argomento === null ? "null" : "")
			+ (azienda_argomento === false ? "false" : "")
			+ (azienda_argomento === 0 ? "0" : "")
		)
	}

	$rootScope.delete_azienda_argomento = function(azienda_argomento, fl_ask_confirm) {
		if (azienda_argomento) {
			return fl_ask_confirm ? $scope.alert_confirm("Sicuro di voler rimuovere l'argomento da questa circuito?", "SI", "NO").then(
				(yes) => {return $rootScope.delete_azienda_argomento(azienda_argomento, false)}
				,(no) => {return Promise.reject(no)}
			) : $scope.ajax(
				"api/azienda_argomento/delete.php"
				,{azienda_argomento: azienda_argomento}
				,true
			).then(
				(response) => {
					$scope.splice($rootScope.circuiti_argomenti.righe, azienda_argomento);
					$rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento] = $rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento] ? $rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento] : {};
					$rootScope.circuiti_argomenti.map[azienda_argomento.aa_idargomento][azienda_argomento.aa_idazienda] = undefined;
					$scope.toast("Argomento rimosso dall'circuito");
					return Promise.resolve(azienda_argomento);
				}
				,(response) => {return Promise.reject(response)}
			);
		}
		return Promise.reject(
			"azienda_argomento is "
			+ (azienda_argomento === undefined ? "undefined" : "")
			+ (azienda_argomento === null ? "null" : "")
			+ (azienda_argomento === false ? "false" : "")
			+ (azienda_argomento === 0 ? "0" : "")
		)
	}

	$rootScope.argomento_in_azienda = function(azienda, argomento) {
		return azienda && argomento && $rootScope.circuiti_argomenti.map && $rootScope.circuiti_argomenti.map[argomento.ar_id] && $rootScope.circuiti_argomenti.map[argomento.ar_id][azienda.az_id]
	}
}]);