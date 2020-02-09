<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];


$query = "SELECT * FROM `sns_users` WHERE `id`=?";

$result = fetch($con, $query, [$userid]);

echo json_encode(array("data"=>$result));

?>