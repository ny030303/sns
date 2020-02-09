<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_POST["userid"];
$feeling = $_POST["feeling"];
$contents = $_POST["contents"];
$fileData = $_POST["fileData"];
$isprivate_num = $_POST["isprivatenum"];

//var_dump($fileData);


$query = "INSERT INTO `sns_post`(`userid`, `created`,`contents`, `isprivate_num`) VALUES (?, now(),?,?)";
$bRes = execsql($con, $query, [$userid, $contents, $isprivate_num]);
if( $bRes && $fileData !== "null")  {
  $result = fetch($con, "SELECT LAST_INSERT_ID() as postid", []);
  // var_dump($result->postid);
  $query2 = "INSERT INTO `sns_file`(`userid`, `file`, `postid`, `filecnt`) VALUES (?,?,?,?)";
  $files = explode("|", $fileData);
  $bRes = execsql($con, $query2, [$userid, $fileData, $result->postid,count($files)]);
}
echo json_encode(array("result" => $bRes));
?>