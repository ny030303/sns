<?php
header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];

$query = "SELECT a.id, a.userid, a.feeling, a.sharing, a.up, a.feeling, a.created, a.contents, a.isprivate_num, b.id as file, b.postid, b.filecnt
    FROM `sns_post` as a
    left outer JOIN `sns_file` as b
    on a.userid=b.userid and a.id=b.postid
    where a.userid='". $userid ."'";

$query2 = " SELECT * from `sns_users`where id='". $userid ."'";
$user_data= fetch($con, $query2, []);

$my_data = fetchAll($con, $query, []);

echo json_encode(array("posts" => $my_data,"user" => $user_data));