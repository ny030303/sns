<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];
$request = $_GET["request"];

$bRes = null;

$query = "SELECT * FROM `sns_friend` AS a INNER JOIN `sns_users` AS b ON a.userid=b.id WHERE a.friend='". $userid ."' AND a.request=?";
$data = fetchAll($con, $query, [$request]);

echo json_encode(array("friends" => $data));

?>