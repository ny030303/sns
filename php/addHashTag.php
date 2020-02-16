<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_POST["postid"];
$hashname = $_POST["hashname"];

$bRes = null;

$query = "INSERT INTO `sns_hashtag`(`name`, `postid`) VALUES (?, ?)";
$result = execsql($con, $query, [$hashname, $postid]);


echo json_encode(array("result"=>$result));

?>