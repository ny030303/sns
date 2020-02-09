<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_POST["userid"];
$img = $_POST["img"];

$query = "UPDATE `sns_users` SET `backimg`=? WHERE `id`=?";
$result = execsql($con, $query, [$img, $userid]);

$reload_query = "SELECT * FROM `sns_users` WHERE `id`=?";
$reload_result = fetch($con, $query, [$userid]);
unset($_SESSION["loginUser"]);
$_SESSION["loginUser"] = $reload_result;

echo json_encode(array("data"=>$result));

?>