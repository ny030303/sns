<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_POST["userid"];
$friend = $_POST["friend"];

$bRes = null;

$query = "INSERT INTO `sns_friend`(`userid`, `friend`, `request`) VALUES (?, ?, 100)
on duplicate key update request = values(request)";
$result1 = execsql($con, $query, [$friend, $userid]);
$result2 = execsql($con, $query, [$userid, $friend]);


echo json_encode(array("result1"=>$result1, "result2"=>$result2));

?>