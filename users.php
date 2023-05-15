<?php
require_once('./env.php');

$username = $DBCONFIG['DB_USERNAME'] ? $DBCONFIG['DB_USERNAME'] : "root";
$password = $DBCONFIG['DB_PASSWORD'] ? $DBCONFIG['DB_PASSWORD'] : "root";

$dsn = "mysql:dbname=store;host=localhost:3306";
$connection = new PDO($dsn, $username, $password);

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