<?php

header('Content-Type: application/json');

require("db.php");

$name = $_POST["name"];
$memo = $_POST["memo"];
$birth = $_POST["birth"];
$gender = $_POST["gender"];
$userid = $_POST["userid"];

$query = "UPDATE `sns_users` SET `name`=?,`memo`=?,`birth`=?,`gender`=? WHERE `id`=?";
$result = execsql($con, $query, [$name, $memo, $birth, $gender, $userid]);

$reload_query = "SELECT * FROM `sns_users` WHERE `id`=?";
$reload_result = fetch($con, $query, [$userid]);
unset($_SESSION["loginUser"]);
$_SESSION["loginUser"] = $reload_result;

echo json_encode(array("data"=>$result));

?>