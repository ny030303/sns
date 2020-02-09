<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];
$friend = $_GET["friend"];


$query1 = "INSERT INTO `sns_friend`(`userid`, `friend`, `request`) VALUES (?,?,0)";
$result1 = execsql($con, $query1, [$userid, $friend]);


echo json_encode(array("result"=>$result1));

?>