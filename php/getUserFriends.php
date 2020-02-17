<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];

$query = "SELECT a.friend FROM `sns_friend` AS a 
left outer JOIN `sns_users` AS b 
ON a.friend=b.id 
WHERE a.userid='" . $userid . "' AND a.request=100";
$data1 = fetchAll($con, $query, []);

$query2 = "SELECT a.friend, a.request FROM `sns_friend` AS a WHERE a.userid='" . $userid . "'";
$data2 = fetchAll($con, $query2, []);

$query3 = "SELECT a.userid, a.request FROM `sns_friend` AS a WHERE a.friend='" . $userid . "'";
$data3 = fetchAll($con, $query3, []);
// 내친구, 내가 친구신청 보낸 사람, 내게 친구신청 보낸 사람
echo json_encode(array("friends" => $data1, "sendFriends"=>$data2,  "acceptFriends"=>$data3));

?>