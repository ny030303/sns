<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_POST["userid"];
$friend_list = explode(',', $_POST["friend_list"]);

//print_r($friend_list);

// 내가 추천 친구 제외한 유저들
$req0list_query = "SELECT * FROM `sns_friend` WHERE userid='". $userid . "' and request=0";
$req0list = fetchAll($con, $req0list_query, []);
foreach ($req0list as $obj) {
    array_push($friend_list, $obj->friend);
}
// 내가 친구신청한 유저들
$req1list_query = "SELECT * FROM `sns_friend` WHERE userid='". $userid . "' and request=1";
$req1list = fetchAll($con, $req1list_query, []);
foreach ($req1list as $obj) {
    array_push($friend_list, $obj->friend);
}
// 친구신청 보낸후 승인 기다리는 유저들
$acceptlist_query = "SELECT * FROM `sns_friend` WHERE friend='". $userid . "' and request=1";
$acceptlist = fetchAll($con, $acceptlist_query, []);
foreach ($acceptlist as $obj) {
    array_push($friend_list, $obj->userid);
}

//var_dump($acceptlist);

$query = "SELECT * FROM `sns_users` WHERE ";
foreach (  $friend_list as $value ) {
    $friend_query = "`id`!='". $value . "' and ";
    $query .= $friend_query;
}

//select * from sns_users where id not in (
//    select 'admin'
//	union
//	SELECT friend FROM `sns_friend` where userid = 'admin'
//	union
//	select userid from `sns_friend` where friend = 'admin'
//)

$query .= "`id`!='" . $userid . "'";

$data = fetchAll($con, $query, []);




/////////////////////////////////////
/// SELECT * FROM `sns_users` WHERE id not in (
//	select 'ny'
//    union
//	SELECT friend FROM `sns_friend` WHERE userid='ny' and request=0
//	union
//	SELECT friend FROM `sns_friend` WHERE userid='ny' and request=1
//	union
//	SELECT userid FROM `sns_friend` WHERE friend='ny' and request=1
//);
/// ////////////////////////////////

echo json_encode(array("data" => $data));
?>