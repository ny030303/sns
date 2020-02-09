<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];

$query = "SELECT a.friend FROM `sns_friend` AS a 
left outer JOIN `sns_users` AS b 
ON a.friend=b.id 
WHERE a.userid='admin' AND a.request=100";
$data1 = fetchAll($con, $query, []);

echo json_encode(array("friends" => $data1));

?>