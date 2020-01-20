<?php

header('Content-Type: application/json');

require("db.php");
$id = $_POST["id"];
$userid = $_POST["userid"];
$fileid = $_POST["fileid"] || null;
$feeling = $_POST["feeling"] || 0;
$sharing = $_POST["sharing"] || 0;
$up = $_POST["up"] || 0;
$contents = $_POST["contents"];

//echo $birth;

$bRes = null;
if (isset($_SESSION["loginUser"])) {
    $query = "UPDATE `sns_post` SET `fileid`=?,`feeling`=?,`sharing`=?,`up`=?,`contents`=? where `userid`=? and `id`=?";
    $bRes = execsql($con, $query, [$fileid, $feeling, $sharing, $up, $contents, $userid, $id]);
}
echo json_encode(array("result" => $bRes));

?>