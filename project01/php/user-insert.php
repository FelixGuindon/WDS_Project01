<?php

    $db_connect = mysqli_connect('localhost', '1634120_db_user', '!Super12345potato', '1634120_db');

    if($db_connect) {
        $sql = "INSERT INTO `project01_users` (`user`) VALUES (?)";

        $insertedRows = 0;
        $resultArray = [];
        
        if($statement = $db_connect->prepare($sql)){
            $statement->bind_param('s', $_REQUEST['sign-up']);
            $statement->execute();
            $insertedRows += $statement->affected_rows;
            $insertedId = $statement->insert_id;

            if($insertedRows > 0) {
                $resultArray[] = [
                    "id"=>$insertedId,
                    "user"=>$_REQUEST['sign-up'],
                ];
            } else {
                $resultArray[] = [
                    "error"=>"insert failed",
                ];
            }

            echo json_encode($resultArray);            
            $statement->close();
        }
    }
    mysqli_close($db_connect);
?>