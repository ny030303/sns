<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];
$postid = $_GET["postid"];

$query1 = "DELETE FROM `sns_up` where postid=? and userid=?";
$result1 = execsql($con, $query1, [$postid, $userid]);

$query_up = "SELECT `up` FROM `sns_post` WHERE `id`='" . $postid . "'";
$result_up = fetch($con, $query_up, []);

$dataArr = explode("|",  $result_up->up);

foreach ($dataArr as $key => $value) {
    if($userid == $value) {
        array_splice($dataArr, $key, 1);
    }
}

$query2 = "UPDATE `sns_post` SET  `up`=? where  `id`='" . $postid . "'";

if($dataArr == "") {
    $result2 = execsql($con, $query2, [0]);
} else {
    $result2 = execsql($con, $query2, [implode("|",  $dataArr)]);
}


echo json_encode(array("result"=>$result1));
?>