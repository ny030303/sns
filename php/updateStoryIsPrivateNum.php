<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_POST["postid"];
$isprivate_num = $_POST["isprivate_num"];

$query = "UPDATE `sns_post` SET`isprivate_num`=? WHERE `id`=?";
$result = execsql($con, $query, [$isprivate_num, $postid]);

//$query_data = "SELECT * FROM `sns_post` WHERE id=?";
//$result_data = fetch($con, $query_data, [$postid]);
echo json_encode(array("result"=>$result));
//echo json_encode(array("result"=>$result, "data"=>$result_data));

?>