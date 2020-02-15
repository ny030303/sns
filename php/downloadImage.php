<?php


require("db.php");

$id = $_GET['id'];
$subid =  isset($_GET['subid']) ? (int) $_GET['subid'] : 0;

$query = "select file from `sns_file` where `id`=?";
$res = fetch($con, $query, [$id]);
$imgs = explode('|', $res->file);

$fileImg = $imgs[$subid];
if( startsWith($fileImg, "/movies") ) {
    header("Location: " . $fileImg);
    die();
}
else {
    $data = explode(',', $fileImg);
    $imgType = explode(":", $data[0]);
    $imgType = explode(";", $imgType[1]);

    header('Content-Type: ' . $imgType[0]);
    echo base64_decode($data[1]);
}
