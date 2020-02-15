<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];
//$friend = $_GET["friend"];

//// 나의 글
////SELECT * FROM `sns_post` where userid="admin"
//$my_query = "SELECT * FROM `sns_post` where userid='" . $userid . "'";
//$my_data = fetchAll($con, $my_query, []);
//
//
//
//// 내 파일 담긴 글
////SELECT * FROM `sns_post` as a
////INNER JOIN `sns_file` as b
////on a.userid=b.userid and a.id=b.postid
////where a.userid="admin"
//$my_file_query = "SELECT * FROM `sns_post` as a
//                    INNER JOIN `sns_file` as b
//                    on a.userid=b.userid and a.id=b.postid
//                    where a.userid='". $userid ."'";
//
//$my_file_data = fetchAll($con, $my_file_query, []);
//
//
//foreach ($my_data as $i=>$val) {
//    foreach($my_file_data as $val2) {
//        if($val->id == $val2->postid) {
//            $val->file = $val2->file;
//        }
//    }
//}
//
////// 친구의 글
////SELECT * FROM `sns_post` as a
////inner JOIN (SELECT * FROM `sns_friend` WHERE userid="admin" and request=100) as b
////on a.userid=b.friend
////where b.userid="admin"
//
//$f_query = "SELECT * FROM `sns_post` as a
//            inner JOIN (SELECT * FROM `sns_friend` WHERE userid='" . $userid . "' and request=100) as b
//            on a.userid=b.friend
//            where b.userid='" . $userid . "'";
//$f_data = fetchAll($con, $f_query, []);
//
//
//// 친구 파일
////SELECT * FROM `sns_post` as a
////INNER JOIN `sns_file` as b
////inner JOIN (SELECT * FROM `sns_friend` WHERE userid="admin" and request=100) as c
////on a.userid=b.userid and a.id=b.postid
////where a.userid=c.friend
//$f_file_query = "SELECT * FROM `sns_post` as a
//INNER JOIN `sns_file` as b
//inner JOIN (SELECT * FROM `sns_friend` WHERE userid='". $userid ."' and request=100) as c
//on a.userid=b.userid and a.id=b.postid
//where a.userid=c.friend";
//$f_file_data = fetchAll($con, $f_file_query, []);



////////////////////////////////////////////////////////////////////
//SELECT * FROM `sns_post` as a
//   left outer JOIN `sns_file` as b
//   on a.userid=b.userid and a.id=b.postid
//   where a.userid="admin"
//UNION
//SELECT * FROM `sns_post` as a
//    left outer join `sns_file` as b
//    on a.userid=b.userid and a.id=b.postid
//    where a.userid in (SELECT friend FROM `sns_friend` WHERE userid="admin" and request=100)
////////////////////////////////////////////////////////////////////

//
//foreach ($f_data as $i=>$val) {
//    foreach($f_file_data as $val2) {
//        if($val->id == $val2->postid) {
//            $val->file = $val2->file;
//        }
//    }
//}
//
//SELECT a.id, a.userid, a.feeling, a.sharing, a.up, a.created, a.contents, b.file , b.postid, c.name, c.profileimg
//    FROM `sns_post` as a
//    left outer JOIN `sns_file` as b
//    inner JOIN `sns_users` as c
//    on a.userid=b.userid and a.id=b.postid and a.userid=c.id
//    where a.userid='admin'
//UNION
//SELECT a.id, a.userid, a.feeling, a.sharing, a.up, a.created, a.contents, b.file , b.postid, c.name, c.profileimg
//    FROM `sns_post` as a
//    left outer join `sns_file` as b
//    inner JOIN `sns_users` as c
//    on a.userid=b.userid and a.id=b.postid anda.userid=c.id
//    where a.userid in (SELECT friend FROM `sns_friend` WHERE userid='admin' and request=100)

//a.feeling,
// 글 데이터
$query = "
SELECT a.id, a.userid, a.sharing, a.up, a.feeling, a.created, a.contents, a.isprivate_num, b.id as file , b.postid, b.urls, b.filecnt
    FROM `sns_post` as a
    left outer JOIN `sns_file` as b
    on a.userid=b.userid and a.id=b.postid
    where a.userid='". $userid ."' and (a.isprivate_num=2)
UNION
SELECT a.id, a.userid, a.sharing, a.up, a.feeling,  a.created, a.contents, a.isprivate_num, b.id as file, b.postid, b.urls, b.filecnt
    FROM `sns_post` as a
    left outer join `sns_file` as b
    on a.userid=b.userid and a.id=b.postid
    where a.userid in (SELECT friend FROM `sns_friend` WHERE userid='". $userid ."' and request=100)  and (a.isprivate_num=2)
UNION
SELECT a.id, a.userid, a.sharing, a.up, a.feeling, a.created, a.contents, a.isprivate_num, b.id as file, b.postid, b.urls, b.filecnt
    FROM `sns_post` as a
    left outer JOIN `sns_file` as b
    on a.userid=b.userid and a.id=b.postid
    where(a.isprivate_num=3)";
$my_data = fetchAll($con, $query, []);

// 글 작성자 데이터
$query2 = "
SELECT distinct a.userid, b.name, b.profileimg 
	FROM `sns_post` as a
	left outer JOIN `sns_users`as b
    on a.userid=b.id
    where a.userid='". $userid ."' and (a.isprivate_num=2)
UNION
SELECT distinct a.userid, b.name, b.profileimg
	FROM `sns_post` as a
	left outer JOIN `sns_users`as b
    on a.userid=b.id
    where a.userid in (SELECT friend FROM `sns_friend` WHERE userid='". $userid ."' and request=100) and (a.isprivate_num=2)
UNION
SELECT distinct a.userid, b.name, b.profileimg 
	FROM `sns_post` as a
	left outer JOIN `sns_users`as b
    on a.userid=b.id
    where a.isprivate_num=3";
$user_data= fetchAll($con, $query2, []);

// up 데이터
$query3 = "
SELECT a.userid as upid, a.created as upcreated, b.userid, b.id, b.sharing, b.up, b.feeling, b.created, b.contents, b.isprivate_num,
c.id as file , c.postid, c.filecnt

    FROM `sns_up` as a
    inner JOIN `sns_post` as b on a.userid=b.userid and a.postid=b.id
    left outer JOIN `sns_file` as c on b.userid=c.userid and b.id=c.postid
    where a.userid='". $userid ."'
UNION 
SELECT a.userid as upid, a.created as upcreated, b.userid, b.id, b.sharing, b.up, b.feeling, b.created, b.contents, b.isprivate_num,
c.id as file , c.postid, c.filecnt

    FROM `sns_up` as a
    inner JOIN `sns_post` as b on a.userid=b.userid and a.postid=b.id
    left outer JOIN `sns_file` as c on b.userid=c.userid and b.id=c.postid
    where b.userid in (SELECT friend FROM `sns_friend` WHERE userid='". $userid ."' and request=100)";
$up_data = fetchAll($con, $query3, []);


echo json_encode(array("posts" => $my_data, "users" => $user_data, "ups"=>$up_data));
?>