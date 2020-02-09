<?php

header('Content-Type: application/json');

require("db.php");

$commentid = $_GET["commentid"];
//{"userid":"admin","feeling":"bn_like"}

$query1 = "SELECT `heart` FROM `sns_comment` WHERE `id`='" . $commentid . "'";
$result1 = fetch($con, $query1, []);
echo json_encode(array("data"=>explode("|",  $result1->heart)));
?>