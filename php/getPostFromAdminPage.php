<?php

header('Content-Type: application/json');

require("db.php");

$query = "
SELECT a.id, a.userid, a.sharing, a.up, a.feeling, a.created, a.contents, a.isprivate_num, a.comment_private_num, a.link, b.id as file , b.postid, b.urls, b.filecnt
    FROM `sns_post` as a
    left outer JOIN `sns_file` as b
    on a.userid=b.userid and a.id=b.postid";
$result = fetchAll($con, $query, []);

$query_user = "SELECT `id` as `userid`, `name`, `profileimg`  FROM `sns_users` ";
$result_user = fetchAll($con, $query_user, []);

echo json_encode(array("posts"=>$result, "users"=> $result_user));