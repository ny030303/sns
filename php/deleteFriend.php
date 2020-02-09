<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];
$friend = $_GET["friend"];
$request = $_GET["request"];

//echo $birth;

$bRes = null;

$query = "DELETE FROM `sns_friend` WHERE `userid`=? and `friend`=? and `request`=?";
$result = execsql($con, $query, [$userid, $friend, $request]);

echo json_encode(array("result" => $result));

?>