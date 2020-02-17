<?php

header('Content-Type: application/json');

require("db.php");

$id = $_POST["id"];
$pwd = $_POST["pwd"];
$name = $_POST["name"];
$memo = $_POST["memo"] || null;
$birth = $_POST["birth"];
$gender = $_POST["gender"];
$basekeyword = $_POST["basekeyword"] || null;
$profileimg = $_POST["profileimg"];
$allow_search = $_POST["allow_search"] || 1;
$allow_getnews = $_POST["allow_getnews"] || 0;
$allow_reqfriends = $_POST["allow_reqfriends"] || 1;
$allow_message = $_POST["allow_message"] || 1;
$allow_friendslist = $_POST["allow_friendslist"] || 1;
$allow_position = $_POST["allow_position"] || 0;
$blocklist = $_POST["blocklist"] || null;

//echo $birth;

$bRes = null;
if (isset($_SESSION["loginUser"])) {
    $query = "UPDATE `sns_users` SET `id`= ?,`pwd`=password(?),`name`=?,`memo`=?,`birth`=?,`gender`=?,`basekeyword`=?, `profileimg`=?,
`allow_search`=?,`allow_getnews`=?,`allow_reqfriends`=?,`allow_message`=?,`allow_friendslist`=?,`allow_position`=?,`blocklist`=?";
    $bRes = execsql($con, $query,
        [$id, $pwd, $name, $memo, $birth, $gender, $basekeyword, $profileimg, $allow_search,
            $allow_getnews, $allow_reqfriends, $allow_message, $allow_friendslist, $allow_position, $blocklist]);
} else {
    $query = "INSERT INTO `sns_users`(`id`, `pwd`, `name`, `birth`, `gender`, `profileimg`) VALUES (?,password(?),?, ?,?,?)";
    $bRes = execsql($con, $query, [$id, $pwd, $name, $birth, $gender, $profileimg]);
}
echo json_encode(array("result" => $bRes));

?>