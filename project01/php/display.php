<?php

    $db_connect = mysqli_connect('localhost', '1634120_db_user', '!Super12345potato', '1634120_db');

    if($db_connect) {
        $sql = "SELECT * FROM `food_items` WHERE `food_items`.`user` = ?";

        $resultArray = [];
        
        if($statement = $db_connect->prepare($sql)){
            $statement->bind_param('i', $_REQUEST['content']);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($resID, $resItem, $resAmount, $resCalories, $resFat, $resCarb, $resProt, $resDate, $resUser);

            while($statement->fetch()) {
                $resultArray[] = [
                    "id"=>$resID,
                    "item"=>$resItem,
                    "amount"=>$resAmount,
                    "calories"=>$resCalories,
                    "fat"=>$resFat,
                    "carb"=>$resFat,
                    "prot"=>$resProt,
                    "date"=>$resDate,
                    "user"=>$resUser
                ];
            }

            echo json_encode($resultArray);
            $statement->close();
        }
    }
    mysqli_close($db_connect);
?>