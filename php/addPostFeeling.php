<?php

header('Content-Type: application/json');

require("db.php");

$feelingInfo = $_POST["feelingInfo"];
$postid = $_POST["postid"];
//{"userid":"admin","feeling":"bn_like"}

$query1 = "SELECT `feeling` FROM `sns_post` WHERE `id`='" . $postid . "'";
$result1 = fetch($con, $query1, []);


var_dump(explode("|", $result1->feeling));
//$object = json_decode();
//var_dump($object->message->result->translatedText);

$query2 = "UPDATE `sns_post` SET  `feeling`=? where  `id`='" . $postid . "'";
if($result1->feeling === "") {
    $result2 = execsql($con, $query2, [$feelingInfo]);
} else {

    $data = $result1->feeling . "|" . $feelingInfo;
    $result2 = execsql($con, $query2, [$data]);
}
echo json_encode(array("result"=>$result2));
?>