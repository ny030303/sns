<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_POST["userid"];
//$fileid = $_POST["fileid"] || null;
$feeling = $_POST["feeling"] || 0;
$contents = $_POST["contents"];

//echo $birth;

$bRes = null;

$query = "INSERT INTO `sns_post`(`userid`, `feeling`, `created`,`contents`) VALUES (?, ?,now(),?)";
$bRes = execsql($con, $query, [$userid, $fileid, $feeling, $contents]);

$query1 = "";

$query2 = "INSERT INTO `sns_file`(`userid`, `file`, `postid`) VALUES ([value-2],[value-3],[value-4])";

echo json_encode(array("result" => $bRes));

?>