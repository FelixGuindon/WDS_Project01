<?php

    $db_connect = mysqli_connect('localhost', '1634120_db_user', '!Super12345potato', '1634120_db');

    $insertedRows = 0;

    if($db_connect) {
        $sql = "INSERT INTO `food_items` (`item`, `amount`, `calories`, `fat`, `carb`, `prot`, `date`, `user`) VALUES (?, ?, ?, ?, ?, ?, '2022-07-07', ?)";
        
        if($statement = $db_connect->prepare($sql)){
            $statement->bind_param('siiiiii', $_REQUEST['insert-item'], $_REQUEST['insert-amount'], $_REQUEST['insert-calories'], $_REQUEST['insert-fat'], $_REQUEST['insert-carb'], $_REQUEST['insert-prot'], $_REQUEST['user']);
            $statement->execute();
            $insertedRows += $statement->affected_rows;

            echo "operation ended with: " . $insertedRows . " affected rows";            
            $statement->close();
        }
    }
    mysqli_close($db_connect);
?>