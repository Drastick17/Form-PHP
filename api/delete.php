<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);                               

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once("database.php");

$data = file_get_contents("php://input");
$user = json_decode($data);

$id = $user->id;


  try {
    $query = "DELETE FROM USERS
    WHERE ID = '$id'";// "INSERT INTO USERS (NAME, EMAIL, SEX, BIRTHDATE, INTERESTS) VALUES ('$name','$email', '$sex','$birthdate','$interests')";
    $connection->query($query);
    http_response_code(200);
    echo json_encode(array("status" => "Exito"));
  } catch (Exception $error) {
    print_r($error);
  }