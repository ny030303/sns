<?php

header('Content-Type: application/json');

require("db.php");


$query = "SELECT * FROM `sns_users`";

$result = fetchAll($con, $query, []);

echo json_encode(array("users"=>$result));

?>