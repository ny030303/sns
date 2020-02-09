<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_POST["postid"];
$isprivate_num = $_POST["isprivate_num"];

$query = "UPDATE `sns_post` SET`isprivate_num`=? WHERE `id`=?";
$result = execsql($con, $query, [$isprivate_num, $postid]);

echo json_encode(array("data"=>$result));

?>