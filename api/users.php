<?php
include_once("database.php");
header("Access-Control-Allow-Origin:*");
$query = "SELECT * FROM USERS";

$results = $connection->query($query, PDO::FETCH_OBJ);

$users = [];

foreach ($results as $item) {
    $users[] = $item;
}

header("Content-Type: application/json");
print json_encode($users)

?>