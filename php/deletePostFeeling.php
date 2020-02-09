<?php

header('Content-Type: application/json');

require("db.php");

$feelingInfo = $_POST["feelingInfo"];
$postid = $_POST["postid"];
//{"userid":"admin","feeling":"bn_like"}

$query1 = "SELECT `feeling` FROM `sns_post` WHERE `id`='" . $postid . "'";
$result1 = fetch($con, $query1, []);

$dataArr = explode("|",  $result1->feeling);

foreach ($dataArr as $key => $value) {
    if($feelingInfo == $value) {
        array_splice($dataArr, $key, 1);
    }
}

$query2 = "UPDATE `sns_post` SET  `feeling`=? where  `id`='" . $postid . "'";

if($dataArr == "") {
    $result2 = execsql($con, $query2, [0]);
} else {
    $result2 = execsql($con, $query2, [implode("|",  $dataArr)]);
}

echo json_encode(array("result"=>$result2));
?>