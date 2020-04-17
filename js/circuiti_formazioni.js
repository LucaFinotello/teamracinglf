app.controller("circuiti_formazioni", ["$rootScope", "$scope", "$localStorage", "$filter", function($rootScope, $scope, $localStorage, $filter) {
	$rootScope.circuiti_formazioni = $rootScope.circuiti_formazioni ? $rootScope.circuiti_formazioni : {
		filtri_key: "filtri_circuiti_formazioni"
		,fn_filtri_set_default_filtri_app: function() {
			if ($rootScope.circuiti_formazioni && $rootScope.circuiti_formazioni.filtri) {
				let data_inizio = new Date();
				data_inizio.setHours(0,0,0,0);
				let data_fine = new Date();
				data_fine.setHours(23,59,59,999);

				$rootScope.circuiti_formazioni.filtri.sorting						= [{
					property: "af_data_richiesta"
					,reverse: true
				}];

				$rootScope.circuiti_formazioni.filtri.search							= undefined;
				$rootScope.circuiti_formazioni.filtri.fl_show_done					= false;

				$rootScope.circuiti_formazioni.filtri.fl_data_richiesta				= true;
				$rootScope.circuiti_formazioni.filtri.data_inizio_richiesta			= new Date(data_inizio.valueOf());
				$rootScope.circuiti_formazioni.filtri.data_fine_richiesta			= new Date(data_fine.valueOf());
				$rootScope.circuiti_formazioni.filtri.fl_data_evasione				= false;
				$rootScope.circuiti_formazioni.filtri.data_inizio_evasione			= new Date(data_inizio.valueOf());
				$rootScope.circuiti_formazioni.filtri.data_fine_evasione			= new Date(data_fine.valueOf());

				$rootScope.circuiti_formazioni.filtri.show							= $rootScope.circuiti_formazioni.filtri.show ? $rootScope.circuiti_formazioni.filtri.show : {};
				$rootScope.circuiti_formazioni.filtri.show.af_id					= true;
				$rootScope.circuiti_formazioni.filtri.show.af_idazienda				= true;
				$rootScope.circuiti_formazioni.filtri.show.af_idformazione			= true;
				$rootScope.circuiti_formazioni.filtri.show.af_data_richiesta		= true;
				$rootScope.circuiti_formazioni.filtri.show.af_data_evasione			= true;
				$rootScope.circuiti_formazioni.filtri.show.af_note					= true;
			}
		}
		,fn_filtri_set_custom_filtri_app: function() {
			if ($rootScope.circuiti_formazioni && $rootScope.circuiti_formazioni.filtri) {
				let filtri_app = $localStorage[$rootScope.circuiti_formazioni.filtri_key];

				if (filtri_app) {
					$rootScope.circuiti_formazioni.filtri.sorting						= filtri_app.sorting							? filtri_app.sorting							: $rootScope.circuiti_formazioni.filtri.sorting;
					$rootScope.circuiti_formazioni.filtri.search						= filtri_app.search								? filtri_app.search								: $rootScope.circuiti_formazioni.filtri.search;
					$rootScope.circuiti_formazioni.filtri.fl_show_done					= filtri_app.fl_show_done						? filtri_app.fl_show_done						: $rootScope.circuiti_formazioni.filtri.fl_show_done;

					$rootScope.circuiti_formazioni.filtri.fl_data_richiesta				= !!filtri_app.fl_data_richiesta;
					$rootScope.circuiti_formazioni.filtri.data_inizio_richiesta			= filtri_app.data_inizio_richiesta				? new Date(filtri_app.data_inizio_richiesta.valueOf())		: $rootScope.circuiti_formazioni.filtri.data_inizio_richiesta;
					$rootScope.circuiti_formazioni.filtri.data_fine_richiesta			= filtri_app.data_fine_richiesta				? new Date(filtri_app.data_fine_richiesta.valueOf())		: $rootScope.circuiti_formazioni.filtri.data_fine_richiesta;
					$rootScope.circuiti_formazioni.filtri.fl_data_evasione				= !!filtri_app.fl_data_evasione;
					$rootScope.circuiti_formazioni.filtri.data_inizio_evasione			= filtri_app.data_inizio_evasione				? new Date(filtri_app.data_inizio_evasione.valueOf())		: $rootScope.circuiti_formazioni.filtri.data_inizio_evasione;
					$rootScope.circuiti_formazioni.filtri.data_fine_evasione			= filtri_app.data_fine_evasione			 		? new Date(filtri_app.data_fine_evasione.valueOf())			: $rootScope.circuiti_formazioni.filtri.data_fine_evasione;

					$rootScope.circuiti_formazioni.filtri.show							= $rootScope.circuiti_formazioni.filtri.show	? $rootScope.circuiti_formazioni.filtri.show		: {};
					filtri_app.show														= filtri_app.show								? filtri_app.show								: {};
					$rootScope.circuiti_formazioni.filtri.show.af_id					= !!filtri_app.show.af_id;
					$rootScope.circuiti_formazioni.filtri.show.af_idazienda				= !!filtri_app.show.af_idazienda;
					$rootScope.circuiti_formazioni.filtri.show.af_idformazione			= !!filtri_app.show.af_idformazione;
					$rootScope.circuiti_formazioni.filtri.show.af_data_richiesta		= !!filtri_app.show.af_data_richiesta;
					$rootScope.circuiti_formazioni.filtri.show.af_data_evasione			= !!filtri_app.show.af_data_evasione;
					$rootScope.circuiti_formazioni.filtri.show.af_note					= !!filtri_app.show.af_note;
				}
			}
		}
		,fn_filtri_filter: function(items, filtri, limit) {
			let filtered = [];

			let data_inizio_richiesta	= filtri && filtri.fl_data_richiesta	&& filtri.data_inizio_richiesta	? new Date(filtri.data_inizio_richiesta.valueOf()).toISOString() : undefined;
			let data_fine_richiesta		= filtri && filtri.fl_data_richiesta	&& filtri.data_fine_richiesta		? new Date(filtri.data_fine_richiesta.valueOf()).toISOString() : undefined;
			let data_inizio_evasione	= filtri && filtri.fl_data_evasione		&& filtri.data_inizio_evasione		? new Date(filtri.data_inizio_evasione.valueOf()).toISOString() : undefined;
			let data_fine_evasione		= filtri && filtri.fl_data_evasione		&& filtri.data_fine_evasione		? new Date(filtri.data_fine_evasione.valueOf()).toISOString() : undefined;

			if (items) for (let i = 0; i < items.length && (!limit || (limit && limit > filtered.length)); i++){
				let item = items[i];
				if (filtri && !filtri.fl_show_done && item.af_data_evasione) continue;
				if ($scope.page() == "scadenziario" && $rootScope.scadenziario.page == "school_calendar" && $rootScope.scadenziario.azienda && $rootScope.scadenziario.azienda.az_id != item.af_idazienda) continue;
				if (data_inizio_richiesta	&& item.af_data_richiesta	< data_inizio_richiesta) continue;
				if (data_fine_richiesta		&& item.af_data_richiesta	> data_fine_richiesta) continue;
				if (data_inizio_evasione	&& item.af_data_evasione	< data_inizio_evasione) continue;
				if (data_fine_evasione		&& item.af_data_evasione	> data_fine_evasione) continue;
				if (
					filtri
					&& filtri.search
					&& !$filter("filter")(
						[{
							item: item
							,formazione: $rootScope.formazioni.map[item.af_idformazione]
						}]
						, filtri.search
					).length
				) {
					continue;
				}
				filtered.push(item);
			}
			return filtered;
		}
		,toggle_rubrica: function(rubrica) {
			if (this.rubrica_filtri_circuiti_formazioni	&& this.rubrica_filtri_circuiti_formazioni != rubrica)	this.rubrica_filtri_circuiti_formazioni.fl_open = false;
			if (rubrica) rubrica.fl_open = !rubrica.fl_open;
		}
		,rubrica_filtri_circuiti_formazioni: {
			template: "tmpl/rubrica_filtri_circuiti_formazioni.tmpl.html"
			,model: undefined // settato dopo... dovrebbe puntare a $rootScope.circuiti_formazioni
			,fl_open: false
		}
	};
	$rootScope.circuiti_formazioni.rubrica_filtri_circuiti_formazioni.model = $rootScope.circuiti_formazioni;

	$rootScope.select_circuiti_formazioni = function() {
		return $scope.ajax(
			"api/base/find.php"
			,{
				beanName: "AziendaFormazioneBean"
				,model: undefined
			}
			,true
		).then(
			(response) => {
				$rootScope.circuiti_formazioni.righe = response;
				$rootScope.circuiti_formazioni.map = {};
				for (let af = 0; af < $rootScope.circuiti_formazioni.righe.length; af++) {
					let azienda_formazione = $rootScope.circuiti_formazioni.righe[af];
					$rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione] = $rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione] ? $rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione] : {};
					$rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione][azienda_formazione.af_idazienda] = azienda_formazione;
				}
				return Promise.resolve($rootScope.circuiti_formazioni.righe);
			}
			,(response) => {return Promise.reject(response)}
		);
	}

	$rootScope.insert_azienda_formazione = function(azienda_formazione) {
		if (azienda_formazione) {
			return $scope.ajax(
				"api/base/save.php"
				,{
					beanName: "AziendaFormazioneBean"
					,model: azienda_formazione
				}
				,true
			).then(
				(response) => {
					azienda_formazione.af_id = response[0].af_id;
					$scope.push($rootScope.circuiti_formazioni.righe, azienda_formazione);
					$rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione] = $rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione] ? $rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione] : {};
					$rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione][azienda_formazione.af_idazienda] = azienda_formazione;
					$scope.toast("Prenotazione di evento avvenuta");
					return Promise.resolve(azienda_formazione);
				}
				,(response) => {return Promise.reject(response)}
			)
		}
		return Promise.reject(
			"azienda_formazione is "
			+ (azienda_formazione === undefined ? "undefined" : "")
			+ (azienda_formazione === null ? "null" : "")
			+ (azienda_formazione === false ? "false" : "")
			+ (azienda_formazione === 0 ? "0" : "")
		)
	}

	$rootScope.anagrafica_azienda_formazione = function(azienda_formazione, disabledform, editableform) {
		let dialog = {};
		dialog.clickOutsideToClose = true;
		dialog.title = "Anagrafica prenotazione evento";
		dialog.class = "";
		dialog.content_tmpl = "tmpl/anagrafica_azienda_formazione.tmpl.html";
		dialog.toolbar_action_buttons_tmpl = "tmpl/default_toolbar_action_buttons.tmpl.html";
		dialog.disabledform = disabledform === undefined ? false : !!disabledform;
		dialog.editableform = editableform === undefined ? true : !!editableform;

		dialog.azienda_formazione	= azienda_formazione ? azienda_formazione : {};
		dialog.data_richiesta		= azienda_formazione && azienda_formazione.af_data_richiesta	? new Date(azienda_formazione.af_data_richiesta.valueOf())	: new Date();
		dialog.data_evasione		= azienda_formazione && azienda_formazione.af_data_evasione		? new Date(azienda_formazione.af_data_evasione.valueOf())	: undefined;

		dialog.circuiti = $rootScope.circuiti;
		dialog.formazioni = $rootScope.formazioni;

		dialog.deleteFn = dialog.azienda_formazione.af_id ? function(answer, cancelFn) {
			return $rootScope.delete_azienda_formazione(answer.azienda_formazione, true).then(
				(azienda_formazione) => {
					if (cancelFn) {
						cancelFn();
					}
					return Promise.resolve(azienda_formazione);
				}
				,(response) => {return Promise.reject(response)}
			);
		} : undefined;

		return $scope.alert(dialog).then(
			(answer) => {
				if (answer.azienda_formazione) {
					answer.azienda_formazione.af_data_richiesta	= answer.data_richiesta	? new Date(answer.data_richiesta.valueOf()).toISOString()	: new Date().toISOString();
					answer.azienda_formazione.af_data_evasione	= answer.data_evasione	? new Date(answer.data_evasione.valueOf()).toISOString()	: undefined;
				}
				return $rootScope.insert_azienda_formazione(answer.azienda_formazione);
			}
			,(answer) => {return Promise.reject(answer)}
		);
	}

	$rootScope.delete_azienda_formazione = function(azienda_formazione, fl_ask_confirm) {
		if (azienda_formazione) {
			return fl_ask_confirm ? $scope.alert_confirm("Sicuro di voler rimuovere la prenotazione?", "SI", "NO").then(
				(yes) => {return $rootScope.delete_azienda_formazione(azienda_formazione, false)}
				,(no) => {return Promise.reject(no)}
			) : $scope.ajax(
				"api/azienda_formazione/delete.php"
				,{azienda_formazione: azienda_formazione}
				,true
			).then(
				(response) => {
					$scope.splice($rootScope.circuiti_formazioni.righe, azienda_formazione);
					$rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione] = $rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione] ? $rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione] : {};
					$rootScope.circuiti_formazioni.map[azienda_formazione.af_idformazione][azienda_formazione.af_idazienda] = undefined;
					$scope.toast("Prenotazione di evento avvenuto");
					return Promise.resolve(azienda_formazione);
				}
				,(response) => {return Promise.reject(response)}
			);
		}
		return Promise.reject(
			"azienda_formazione is "
			+ (azienda_formazione === undefined ? "undefined" : "")
			+ (azienda_formazione === null ? "null" : "")
			+ (azienda_formazione === false ? "false" : "")
			+ (azienda_formazione === 0 ? "0" : "")
		)
	}
}]);