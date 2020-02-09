<?php

header('Content-Type: application/json');

require("db.php");


$heartinfo = $_POST["heartInfo"];
$commentid = $_POST["commentid"];
//{"userid":"admin","heart":""heart_on"}

$query1 = "SELECT `heart` FROM `sns_comment` WHERE `id`='" . $commentid . "'";
$result1 = fetch($con, $query1, []);

$dataArr = explode("|",  $result1->heart);

foreach ($dataArr as $key => $value) {
    if($heartinfo == $value) {
        array_splice($dataArr, $key, 1);
    }
}

$query2 = "UPDATE `sns_comment` SET  `heart`=? where  `id`='" . $commentid . "'";

if($dataArr == "") {
    $result2 = execsql($con, $query2, [0]);
} else {
    $result2 = execsql($con, $query2, [implode("|",  $dataArr)]);
}

echo json_encode(array("result"=>$result2));
?>