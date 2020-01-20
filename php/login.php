<?php

header("content-type: application/json");

require("db.php");
if(isset($_SESSION["loginUser"])) {
    echo json_encode(array("result" => 1, "user" => $_SESSION["loginUser"]));
} else {
    $id = isset($_GET["id"]) ? $_GET["id"] : " ";
    $pwd = isset($_GET["pwd"]) ? $_GET["pwd"] : " ";

    $sql = "SELECT * FROM `sns_users` WHERE `id`= ? and `pwd` = password(?)";

    $user = fetch($con, $sql, [$id, $pwd]);
    if ($user) {
        $_SESSION["loginUser"] = $user;
        echo json_encode(array("result" => 1, "user" => $user));
    } else {
        echo json_encode(array("result" => 0));
    }
}