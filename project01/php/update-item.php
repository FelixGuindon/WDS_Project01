<?php

    $db_connect = mysqli_connect('localhost', '1634120_db_user', '!Super12345potato', '1634120_db');

    if($db_connect) {
        $sql = "UPDATE `food_items` SET `item` = ?, `amount` = ?, `calories` = ?, `fat` = ?, `carb` = ?, `prot` = ? WHERE `food_items`.`id` = ?";
        //$resultArray = [];
        
        if($statement = $db_connect->prepare($sql)){
            $statement->bind_param('siiiiii', $_REQUEST['updateItemName'], $_REQUEST['updateItemAmount'], $_REQUEST['updateItemCal'], $_REQUEST['updateItemFat'], $_REQUEST['updateItemCarb'], $_REQUEST['updateItemProt'], $_REQUEST['updateItemID']);
            $statement->execute();
            // $statement->store_result();
            // $statement->bind_result($resItem, $resAmount, $resCalories, $resFat, $resCarb, $resProt, $resID);

            // while($statement->fetch()) {
            //     $resultArray[] = [ 
            //         "id"=>$resID,
            //         "item"=>$resItem,
            //         "amount"=>$resAmount,
            //         "calories"=>$resCalories,
            //         "fat"=>$resFat,
            //         "carb"=>$resCarb,
            //         "prot"=>$resProt,
            //         "date"=>$resDate,
            //         "user"=>$resUser
            //     ];
            // }

            // echo json_encode($resultArray);
            $statement->close();
        }
    }
    mysqli_close($db_connect);
?>