<?php

header('Content-Type: application/json');

require("db.php");

$postid = $_POST["postid"];
$userid = $_POST["userid"];
$contents = $_POST["contents"];
$fileData = $_POST["fileData"];
$isprivatenum = $_POST["isprivatenum"];

$query = "UPDATE `sns_post` SET `contents`=?, `isprivate_num`=? where `userid`=? and `id`=?";
$bRes = execsql($con, $query, [$contents, $isprivatenum, $userid, $postid]);

$is_have_file = fetch($con, "SELECT * FROM `sns_file` WHERE postid='" . $postid . "'", []);

if ($bRes && $fileData !== "null") {// 넘겨온 파일이 있을때
    if ($is_have_file === false) { // 파일이 원래 없었음
        $query2 = "INSERT INTO `sns_file`(`userid`, `file`, `postid`, `filecnt`) VALUES (?,?,?,?)";
        $files = explode("|", $fileData);
        $bRes = execsql($con, $query2, [$userid, $fileData, $postid, count($files)]);
    } else { // 있었음
        $query2 = "UPDATE `sns_file` SET `file`=?, `filecnt`=? WHERE id = ?";
        $files = explode("|", $fileData);
        $bRes = execsql($con, $query2, [$fileData, count($files), $is_have_file->id]);
    }
} else { //없을때
    if ($is_have_file) {
        $is_have_file = execsql($con, "DELETE FROM `sns_file` WHERE id=?", [$is_have_file->id]);
    }
}

$post_data = fetch($con, "SELECT a.*, b.id as file, b.postid, b.filecnt 
                                FROM `sns_post` as a 
                                left outer JOIN `sns_file` as b 
                                on a.userid=b.userid and a.id=b.postid
                                WHERE a.userid=? and a.id=?", [$userid, $postid]);

echo json_encode(array("result" => $bRes,"postData"=>$post_data));

?>