<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_POST["userid"];
$friend = $_POST["friend"];

$bRes = null;

$query1 = "UPDATE `sns_friend` SET `request`=100 WHERE `userid`=? and `friend`=?";
$result1 = execsql($con, $query1, [$friend, $userid]);

$query2 = "INSERT INTO `sns_friend`(`userid`, `friend`, `request`) VALUES (?,?,100)";
$result2 = execsql($con, $query2, [$userid, $friend]);


echo json_encode(array("result1"=>$result1, "result2"=>$result2));

?>