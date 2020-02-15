<?php

header('Content-Type: application/json');

function gen_uuid() {
    return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
        mt_rand( 0, 0xffff ),
        mt_rand( 0, 0x0fff ) | 0x4000,
        mt_rand( 0, 0x3fff ) | 0x8000,
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
    );
}

$extension = $_POST['extension'];
$file = $_FILES["upload"];

$fileUrl = "/movies/" . gen_uuid() . "." . $extension;

$tmp_name = $file["tmp_name"];
if( move_uploaded_file($tmp_name, ".." . $fileUrl) ) {
    echo json_encode(array("url"=>$fileUrl));
}
else {
    echo json_encode(array("url" => null));
}

?>