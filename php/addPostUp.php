<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];
$postid = $_GET["postid"];

$query1 = "INSERT INTO `sns_up`(`userid`, `created`, `postid`) VALUES (?, now(), ?)
on duplicate key update created = values(created)";
$result1 = execsql($con, $query1, [$userid, $postid]);

echo json_encode(array("result"=>$result1));
?>