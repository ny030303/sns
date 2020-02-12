<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];
$friend = $_GET["friend"];

$query = "DELETE FROM `sns_friend` WHERE `userid`=? and `friend`=? and `request`=100";
$result1 = execsql($con, $query, [$friend, $userid]);
$result2 = execsql($con, $query, [$userid, $friend]);


echo json_encode(array("result1"=>$result1, "result2"=>$result2));

?>