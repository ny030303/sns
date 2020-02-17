<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_POST["postid"];
$userid = $_POST["userid"];
$contents = $_POST["contents"];
$fileData = $_POST["fileData"];
$isprivatenum = $_POST["isprivatenum"];
$link = $_POST["link"];

function divideFileData($fileData) {
    $files = explode("|", $fileData);
    $urls = array();
    $imgs = array();
    foreach ($files as $file) {
        if( startsWith($file, "/movies") ) {
            array_push($urls, $file);
        }
        else {
            array_push($imgs, $file);
        }
    }
    return array(implode( '|', $urls), implode( '|', $imgs), count($imgs));
}

$query = "UPDATE `sns_post` SET `contents`=?, `isprivate_num`=?, `link`=? where `userid`=? and `id`=?";
$bRes = execsql($con, $query, [$contents, $isprivatenum, $link, $userid, $postid]);

$is_have_file = fetch($con, "SELECT * FROM `sns_file` WHERE postid='" . $postid . "'", []);

if ($bRes && $fileData !== "null") {// 넘겨온 파일이 있을때
    $datas = divideFileData($fileData);
//    var_dump($datas);
    if ($is_have_file === false) { // 파일이 원래 없었음
        $query2 = "INSERT INTO `sns_file`(`userid`, `urls`, `file`, `postid`, `filecnt`) VALUES (?,?,?,?,?)";
        $bRes = execsql($con, $query2, [$userid, $datas[0], $datas[1], $postid, $datas[2]]);
    } else { // 있었음
        $query2 = "UPDATE `sns_file` SET `urls`=?, `file`=?, `filecnt`=? WHERE id = ?";
        $bRes = execsql($con, $query2, [$datas[0], $datas[1], $datas[2], $is_have_file->id]);
    }
} else { //없을때
    if ($is_have_file) {
        $is_have_file = execsql($con, "DELETE FROM `sns_file` WHERE id=?", [$is_have_file->id]);
    }
}

$post_data = fetch($con, "SELECT a.*, b.urls, b.id as file, b.postid, b.filecnt 
                                FROM `sns_post` as a 
                                left outer JOIN `sns_file` as b 
                                on a.userid=b.userid and a.id=b.postid
                                WHERE a.userid=? and a.id=?", [$userid, $postid]);

echo json_encode(array("result" => $bRes,"postData"=>$post_data));

?>