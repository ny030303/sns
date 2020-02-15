<?php

// php.ini 파일에 아래와 같이 설정해야 대용량파일이 업로드 됨. (기본 8M)
// upload_max_filesize = 2000M
// post_max_size = 2000M;

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