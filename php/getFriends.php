<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];
$request = $_GET["request"];
//$friend = $_GET["friend"];

$bRes = null;

$query = "SELECT * FROM `sns_friend` AS a INNER JOIN `sns_users` AS b ON a.friend=b.id WHERE a.userid='". $userid ."' AND a.request=100";
$data1 = fetchAll($con, $query, []);


$query2 = "SELECT * FROM `sns_friend` AS a INNER JOIN `sns_users` AS b ON a.userid=b.id WHERE a.friend='". $userid ."' AND a.request=?";
$data2 = fetchAll($con, $query2, [$request]);


echo json_encode(array("friends" => $data1, "acceptFriends" => $data2));

?>