<?php
header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];

$query = "SELECT a.id, a.userid, a.feeling, a.sharing, a.up, a.created, a.contents, a.isprivate_num, b.id as file, b.postid, b.filecnt
    FROM `sns_post` as a
    left outer JOIN `sns_file` as b
    on a.userid=b.userid and a.id=b.postid
    where a.userid='". $userid ."'";

$my_data = fetchAll($con, $query, []);

echo json_encode(array("posts" => $my_data));