<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_GET["postid"];

$query = "SELECT * FROM `sns_comment` WHERE `postid`=? order by created";
$data = fetchAll($con, $query, [$postid]);



echo json_encode(array("data" => $data));

?>