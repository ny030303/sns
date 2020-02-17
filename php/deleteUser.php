<?php
header('Content-Type: application/json');

require("db.php");

$id = $_GET["id"];

$query = "DELETE FROM `sns_users` where id=?";
$result = execsql($con, $query, [$id]);

$query2 = "DELETE FROM `sns_up` where userid=?";
$result2 = execsql($con, $query2, [$id]);

$query3 = "DELETE FROM `sns_post` where userid=?";
$result3 = execsql($con, $query3, [$id]);

$query4 = "DELETE FROM `sns_message` where myid=?";
$result4 = execsql($con, $query3, [$id]);

$query5 = "DELETE FROM `sns_hashtag` where fromid=?";
$result5 = execsql($con, $query5, [$id]);

$query6 = "DELETE FROM `sns_file` where userid=?";
$result6 = execsql($con, $query6, [$id]);

$query7 = "DELETE FROM `sns_comment` where userid=?";
$result7 = execsql($con, $query7, [$id]);

$query8 = "DELETE FROM `sns_friend` where friend=?";
$result8 = execsql($con, $query8, [$id]);

$query9 = "DELETE FROM `sns_friend` where userid=?";
$result9 = execsql($con, $query9, [$id]);


$query1 = "SELECT `id` as `userid`, `name`, `profileimg`  FROM `sns_users`";
$result1 = fetchAll($con, $query1, []);

echo json_encode(array("result"=>$result,"users"=>$result1));