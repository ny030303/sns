<?php
header('Content-Type: application/json');

require("db.php");

$userid = $_GET["userid"];

$msg = fetchAll($con, "SELECT * FROM `sns_message` where myid=? or fromid=? order by created desc", [$userid,$userid]);

echo json_encode(array("msg" => $msg));