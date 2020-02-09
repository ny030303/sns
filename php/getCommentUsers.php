<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_GET["postid"];

$query = "select * from sns_users where id in (
  SELECT distinct(userid) FROM sns_comment where postid = ?
)";
$data = fetchAll($con, $query, [$postid]);



echo json_encode(array("users" => $data));

?>