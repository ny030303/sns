<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_GET['postid'];

$query1 = "DELETE FROM `sns_post` WHERE `id`=?";
$result1 = execsql($con, $query1, [$postid]);

$query2 = "DELETE FROM `sns_comment` WHERE `postid`=?";
$result2 = execsql($con, $query2, [$postid]);

if($result1==1 && $result2==1) {
    echo json_encode(array("result"=>1));
} else {
    echo json_encode(array("result"=>0));
}


?>