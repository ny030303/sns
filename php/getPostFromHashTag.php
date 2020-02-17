<?php

header('Content-Type: application/json');

require("db.php");

// $userid = $_GET["userid"];
$hashtag = $_GET["hashtag"];
// var_dump($hashtag);

$query = "
SELECT a.id, a.userid, a.sharing, a.up, a.feeling, a.created, a.contents, a.isprivate_num, a.link, b.id as file , b.postid, b.urls, b.filecnt
    FROM `sns_post` as a
    left outer JOIN `sns_file` as b
    on a.userid=b.userid and a.id=b.postid
    where a.id in (select postid from sns_hashtag where `name`='#". $hashtag ."')";
//var_dump($query);
$my_data = fetchAll($con, $query, []);

echo json_encode(array("posts" => $my_data));
?>