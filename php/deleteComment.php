<?php

header('Content-Type: application/json');

require("db.php");

$commentid = $_GET["commentid"];


$query = "DELETE FROM `sns_comment` WHERE `id`=?";
$result = execsql($con, $query, [$commentid]);

echo json_encode(array("result" => $result));

?>