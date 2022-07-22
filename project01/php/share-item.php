INSERT INTO `food_items` (`item`, `amount`, `calories`, `fat`, `carb`, `prot`, `date`, `user`) VALUES (?, ?, ?, ?, ?, ?, '', '?');

share-user-id

<?php

    $db_connect = mysqli_connect('localhost', '1634120_db_user', '!Super12345potato', '1634120_db');

    if($db_connect) {
        $sql = "INSERT INTO `food_items` (`item`, `amount`, `calories`, `fat`, `carb`, `prot`, `date`, `user`) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)";
        
        if($statement = $db_connect->prepare($sql)){
            $statement->bind_param('siiiiii', $_REQUEST['item'], $_REQUEST['amount'], $_REQUEST['calories'], $_REQUEST['fat'], $_REQUEST['carb'], $_REQUEST['prot'], $_REQUEST['share-user-id']);
            //$_REQUEST['share-user-id']
            $statement->execute();
            // $statement->store_result();
            // $statement->bind_result($resID, $resItem, $resAmount, $resCalories, $resFat, $resCarb, $resProt, $resDate, $resUser);

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