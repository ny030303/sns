<?php

header('Content-Type: application/json');

require("db.php");

$userid = $_POST["userid"];
$feeling = $_POST["feeling"];
$contents = $_POST["contents"];
$fileData = $_POST["fileData"];
$isprivate_num = $_POST["isprivatenum"];

//var_dump($fileData);


$postid = -1;
$query = "INSERT INTO `sns_post`(`userid`, `created`,`contents`, `isprivate_num`) VALUES (?, now(),?,?)";
$bRes = execsql($con, $query, [$userid, $contents, $isprivate_num]);
if ($bRes) {
    $result = fetch($con, "SELECT LAST_INSERT_ID() as postid", []);
    // var_dump($result->postid);
    $postid = $result->postid;

    if ($fileData !== "null") {
        $files = explode("|", $fileData);
        $urls = array();
        $imgs = array();
        foreach ($files as $file) {
            if (startsWith($file, "/movies")) {
                array_push($urls, $file);
            } else {
                array_push($imgs, $file);
            }
        }
        $query2 = "INSERT INTO `sns_file`(`userid`, `postid`, `urls`, `filecnt`, `file`) VALUES (?,?,?,?,?)";
        $bRes = execsql($con, $query2, [$userid, $result->postid, implode('|', $urls), count($imgs), implode('|', $imgs)]);
    }

}
echo json_encode(array("result" => $bRes, "postid" => $postid));
?>