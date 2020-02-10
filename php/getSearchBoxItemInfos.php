<?php
header('Content-Type: application/json');

require("db.php");

$text = $_POST["text"];
//echo $text;
if($text != "") {
    $query = "SELECT `id`, `name`, `profileimg`
            FROM `sns_users`
            WHERE allow_search=1 and (id  LIKE '%".$text."%' or name LIKE '%".$text."%')  limit 10";
    $data = fetchAll($con, $query, []);

    $tag_query = "SELECT * FROM `sns_hashtag` WHERE `name` like '%".$text."%'  limit 10";
    $tag_data = fetchAll($con, $tag_query, []);
} else {
    $data = [];
    $tag_data = [];
}


echo json_encode(array("users" => $data,"tags"=>$tag_data));
