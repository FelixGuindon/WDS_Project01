<?php

    $db_connect = mysqli_connect('localhost', '1634120_db_user', '!Super12345potato', '1634120_db');

    if($db_connect) {
        $sql = "SELECT * FROM `project01_users`";
        $resultArray = [];
        
        if($statement = $db_connect->prepare($sql)){
            //$statement->bind_param('i', $_REQUEST['updateItemID']);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($resID, $resUser);

            while($statement->fetch()) {
                $resultArray[] = [
                    "id"=>$resID,
                    "user"=>$resUser
                ];
            }

            echo json_encode($resultArray);
            $statement->close();
        }
    }
    mysqli_close($db_connect);
?>