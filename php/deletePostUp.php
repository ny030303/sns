<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];
$postid = $_GET["postid"];

$query1 = "DELETE FROM `sns_up` where postid=? and userid=?";
$result1 = execsql($con, $query1, [$postid, $userid]);

echo json_encode(array("result"=>$result1));
?>