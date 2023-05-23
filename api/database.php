<?php
require_once('./env.php');

$username = $DBCONFIG['DB_USERNAME'] ? $DBCONFIG['DB_USERNAME'] : "root";
$password = $DBCONFIG['DB_PASSWORD'] ? $DBCONFIG['DB_PASSWORD'] : "root";
try{
    $dsn = "mysql:dbname=store;host=localhost:3306";
    $connection = new PDO($dsn, $username, $password);
}catch(Exception $error){
    print_r($error);
}
