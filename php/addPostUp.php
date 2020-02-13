<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];
$postid = $_GET["postid"];

$query1 = "INSERT INTO `sns_up`(`userid`, `created`, `postid`) VALUES (?, now(), ?)
on duplicate key update created = values(created)";
$result1 = execsql($con, $query1, [$userid, $postid]);

$query_up = "SELECT `up` FROM `sns_post` WHERE `id`='" . $postid . "'";
$result_up = fetch($con, $query_up, []);


//var_dump(explode("|", $result_up->up));
//$object = json_decode();
//var_dump($object->message->result->translatedText);

$query2 = "UPDATE `sns_post` SET `up`=? WHERE id='" . $postid . "'";
if($result_up->up === "") {
    $result2 = execsql($con, $query2, [$userid]);
} else {
    $data = $result_up->up . "|" . $userid;
    $result2 = execsql($con, $query2, [$data]);
}

echo json_encode(array("result"=>$result1));
?>