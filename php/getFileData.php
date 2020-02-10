<?php

header('Content-Type: application/json');

require("db.php");

$fileid = $_GET["fileid"];

$query1 = "SELECT file FROM `sns_file` WHERE `id`=" . $fileid;
$result1 = fetch($con, $query1, []);
echo json_encode(array("files"=>explode("|",  $result1->file)));
?>