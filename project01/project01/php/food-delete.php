<?php

    $db_connect = mysqli_connect('localhost', '1634120_db_user', '!Super12345potato', '1634120_db');

    if($db_connect) {
        $sql = "DELETE FROM food_items WHERE `food_items`.`id` = ?";

        $insertedRows = 0;
        
        if($statement = $db_connect->prepare($sql)){
            $statement->bind_param('i', $_REQUEST['id']);            
            $statement->execute();
            $insertedRows += $statement->affected_rows;

            echo "operation ended with: " . $insertedRows . " affected rows";

        //     if($insertedRows > 0) {
        //         echo "success";
        //         header("Location: ../groceryDisplay.html");
        //     } else {
        //         echo "failure";
        //         header("Location: ../fail.html");                
        //     }
        }

        $statement->close();
    }

    mysqli_close($db_connect);
?>