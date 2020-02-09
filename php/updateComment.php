<?php

header('Content-Type: application/json');

require("db.php");
//contents: "%3Cdiv%3E%uC6B0%uC655%3C/div%3E"
//emoticon: ""
$commentid = $_POST["commentid"];
$contents = $_POST["contents"];
$emoticon = ($_POST["emoticon"] == "null") ? "" : $_POST["emoticon"];

$query = "UPDATE `sns_comment` SET `contents`=?,`emoticon`=? WHERE `id`=?";
$result = execsql($con, $query, [$contents, $emoticon, $commentid]);

$query_data = "select * from `sns_comment` where `id`=?";
$result_data = fetch($con, $query_data, [$commentid]);

echo json_encode(array("data"=>$result, "data"=>$result_data));

?>