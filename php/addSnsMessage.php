<?php

header('Content-Type: application/json');

require("db.php");

$toIds = $_POST["toIds"];
$myIds = explode(",", $toIds);
$fromid = $_POST["fromid"];
$message = $_POST["message"];

$query = "INSERT INTO `sns_message`(`myid`,`fromid`,`message`,`created`) VALUES ";

$values = array();
foreach ($myIds as $myid) {
    array_push($values, " ('". $myid ."', '" . $fromid. "', '". $message ."' ,now()) ");
}

$query .= implode(",", $values);
$result = execsql($con, $query, []);

echo json_encode(array("result" => $result));

?>