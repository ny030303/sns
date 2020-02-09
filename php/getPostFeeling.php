<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_GET["postid"];
//{"userid":"admin","feeling":"bn_like"}

$query1 = "SELECT `feeling` FROM `sns_post` WHERE `id`='" . $postid . "'";
$result1 = fetch($con, $query1, []);
echo json_encode(array("data"=>explode("|",  $result1->feeling)));
?>