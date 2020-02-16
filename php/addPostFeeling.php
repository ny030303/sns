<?php

header('Content-Type: application/json');

require("db.php");

$feelingInfo = $_POST["feelingInfo"];
$postid = $_POST["postid"];
//{"userid":"admin","feeling":"bn_like"}

$query1 = "SELECT `feeling` FROM `sns_post` WHERE `id`='" . $postid . "'";
$result1 = fetch($con, $query1, []);

$feelings = explode("|", $result1->feeling);
//var_dump($feelings);

$updatedFeeling = false;
$addFeel = json_decode($feelingInfo);

for($i=count($feelings)-1; $i>=0; $i--) {
    if( strlen($feelings[$i]) > 2 ) {
        $tempFeeling = json_decode($feelings[$i]);
        if( $addFeel->userid == $tempFeeling->userid ) {
            if( strlen($addFeel->feeling) > 0 ) {
                $tempFeeling->feeling = $addFeel->feeling;
                $feelings[$i] = json_encode($tempFeeling);
            }
            else {
                array_splice($feelings, $i, 1);
            }
            $updated = true;
        }
    }
}
if( $updatedFeeling == false && strlen($addFeel->feeling) > 0) {
    array_push($feelings, $feelingInfo);
}
$postFeelings = implode("|", $feelings);
$query2 = "UPDATE `sns_post` SET  `feeling`=? where  `id`='" . $postid . "'";
$result2 = execsql($con, $query2, [$postFeelings]);

echo json_encode(array("result"=>$result2, "data"=>array("postid"=>$postid, "feeling"=>$postFeelings)));
?>