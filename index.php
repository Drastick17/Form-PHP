<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once('./env.php');

$username = $DBCONFIG['DB_USERNAME'] ? $DBCONFIG['DB_USERNAME'] : "root";
$password = $DBCONFIG['DB_PASSWORD'] ? $DBCONFIG['DB_PASSWORD'] : "root";
$dsn = "mysql:dbname=store;host=localhost:3306";
$connection = new PDO($dsn, $username, $password);
$data = file_get_contents("php://input");
$user = json_decode($data);

if (
  !empty($user->name) && !empty($user->email) &&
  !empty($user->birthdate) && !empty($user->sex) &&
  !empty($user->interests)
) {

  $name = $user->name;
  $email = $user->email;
  $birthdate = $user->birthdate;
  $sex = $user->sex;
  $interests = implode(", ", $user->interests);

  $query = "INSERT INTO USERS (NAME, EMAIL, SEX, BIRTHDATE, INTERESTS) VALUES ('$name','$email', '$sex','$birthdate','$interests')";
  $connection->query($query);
  http_response_code(200);
  echo json_encode(array("status" => "Exito"));
} else {
  http_response_code(400);
  echo json_encode(array("status" => "Error"));
}
?>
