<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];


$query = "SELECT count(*) FROM `sns_comment` WHERE userid=?";
$result = fetch($con, $query, [$userid]);

echo json_encode(array("result" => $result));

?>