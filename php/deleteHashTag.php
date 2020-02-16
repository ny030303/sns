<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_GET["postid"];

$query = "delete from `sns_hashtag` where postid=?";
$result = execsql($con, $query, [$postid]);


echo json_encode(array("result"=>$result));

?>
