<?php
ob_start();
require(__DIR__ . "/../../config/config.php");
require(__DIR__ . "/../session_recovery.php");
require(__DIR__ . "/../base/fnQuery.php");
require(__DIR__ . "/../base/beansMaps.php");

$response = (Object) [
	"status" => false
	,"response" => "init"
];

try {
	if (isset($_SESSION[$session_logged])) {
		$postdata	= file_get_contents("php://input");
		$request	= json_decode($postdata);

		$beanName		= isset($request->beanName)		? $request->beanName		: null;
		$model			= isset($request->model)		? $request->model			: null;

		$params = [];
		$sql = "SELECT
					df_id
					,df_iddipendente
					,df_idformazione
					,DATE_FORMAT(df_data_esecuzione, '%Y-%m-%dT%TZ') AS df_data_esecuzione
					,DATE_FORMAT(df_data_scadenza, '%Y-%m-%dT%TZ') AS df_data_scadenza
					,df_docente
					,df_note
				FROM training_school
				WHERE df_data_esecuzione = (
					SELECT MAX(df_data_esecuzione)
					FROM training_school AS training_school_temp
					WHERE
						training_school_temp.df_iddipendente = training_school.df_iddipendente
						AND training_school_temp.df_idformazione = training_school.df_idformazione
				)";
		$query = query($beansMaps->DipendenteFormazioneBean->dbh, $sql, $params);
		if ($query->status) {
			$response->response = $query->rows;
			$response->status = true;
		} else {
			$response->response = $query->error;
		}
	} else {
		$response->response = "Sessione scaduta";
	}
} catch (Exception $e) {
	$response->response = "Fatal error";
	echo $e->getMessage();
}

$obStr = ob_get_clean();
$response->response = $response->status ? $response->response : $response->response . ($obStr ? ". More info: " . $obStr : "");
ob_end_clean();
echo json_encode($response);
?>