<?php

header('Content-Type: application/json');

require("db.php");

$heartinfo = $_POST["heartInfo"];
$commentid = $_POST["commentid"];
//{"userid":"admin","heart":"heart_on"}

$query1 = "SELECT `heart` FROM `sns_comment` WHERE `id`='" . $commentid . "'";
$result1 = fetch($con, $query1, []);


var_dump(explode("|", $result1->heart));
//$object = json_decode();
//var_dump($object->message->result->translatedText);

$query2 = "UPDATE `sns_comment` SET  `heart`=? where  `id`='" . $commentid . "'";
if($result1->heart === "") {
    $result2 = execsql($con, $query2, [$heartinfo]);
} else {

    $data = $result1->heart . "|" . $heartinfo;
    $result2 = execsql($con, $query2, [$data]);
}
echo json_encode(array("result"=>$result2));
?>