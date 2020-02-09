<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_POST["postid"];
$userid = $_POST["userid"];
$contents = $_POST["contents"];
$emoticon = ($_POST["emoticon"] == "null") ? "" : $_POST["emoticon"];


$query = "INSERT INTO `sns_comment`(`created`, `postid`, `userid`,   `heart`, `contents`, `emoticon`) VALUES (now(),?,?, '',?,?)";

$result = execsql($con, $query, [$postid, $userid, $contents, $emoticon]);

$query_data = "select * from `sns_comment` where `postid`=? and `userid`=? order by id desc";
$result_data = fetch($con, $query_data, [$postid, $userid]);

echo json_encode(array("result"=>$result, "data"=>$result_data));

?>