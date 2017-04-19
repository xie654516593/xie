<?php 
   /* header("Access-Control-Allow-Origin:*");*/
	// 接口文件
	// 客户端请求服务器的接口文件
	// 提交4个参数注册
		// var_dump($_POST);
		// echo 1;
  		 // var_dump($_POST);
   require "./extends/Model.class.php";
		require "./extends/config.php";

	$get=$_GET['get'];
	switch($get){
		case 'eidt':
			if(isset($_POST['user_id']) &&
				isset($_POST['user_name']) && 
				isset($_POST['pwd'])&&
				isset($_POST['new_pwd'])
				){
				// 添加数据库的验证
				
				$username =  $_POST['user_name'];
				$user_password=$_POST['pwd'];
				$userModel = new Model('b_user');
				$data=[];
				$result=[];
				// var_dump($data);
				$selectResult=$userModel->where("user_name='$username'")->select();
				// echo json_encode($selectResult);
				// var_dump($selectResult[0]['user_password']);
				if($selectResult[0]['user_password'] == $user_password){
					$data['user_name']=$_POST['user_name'];
					$data['user_id']=$_POST['user_id'];
					$data['user_password']=$_POST['new_pwd'];
					$rel=$userModel->save($data);
					if($rel>0){
						$result['code']=1;
						$result['data']="修改成功";
						echo json_encode($result);
					}
					
				}else{
					$result['code']=0;
					$result['data']="密码不正确";
					echo json_encode($result);

				}
			}




		break;
		
		case 'getCom':
		if(isset($_POST['book_id']))
				{


			$newModel = new Model('b_comment');
			$book_id=$_POST['book_id'];
			$Result=$newModel->where("book_id='$book_id'")->select();
			
			$mydata=[];
			 foreach ($Result as $key){ 
			 	$key['user_name']=demo($key['user_id']);
			 	array_push($mydata,$key);
			}
		      echo json_encode($mydata);	 
		    } 
		


		break;
		case 'forget':
			if(isset($_POST['username']) && 
				isset($_POST['phone'])
				){
				// 添加数据库的验证
				
				$newusername =  $_POST['username'];
				$phone=$_POST['phone'];
				$newuserModel = new Model('b_user');
				$code=[];
				$result=[];
				// var_dump($data);
				$newselectResult=$newuserModel->where("user_name='$newusername'")->select();
				// echo json_encode($selectResult);
				// var_dump($selectResult[0]['user_password']);
				if($newselectResult[0]['user_tel'] == $phone){
					// $newdata['username']=$_POST['user_name'];
					// $newdata['user_id']=$_POST['user_id'];
					// $newdata['user_password']=$_POST['new_pwd'];
					// $rel=$userModel->save($data);
					
						$newselectResult[0]['code']=1;
						$newselectResult[0]['data']="修改成功";
						echo json_encode($newselectResult);
					
					
				}else{
					$newselectResult[0]['code']=0;
					$newselectResult[0]['data']="电话不正确";
					echo json_encode($newselectResult);

				}
			}




		break;

		case 'newpass':
			if(isset($_POST['user_id']) &&
				isset($_POST['user_name']) && 
				isset($_POST['user_password'])
				){
				// 添加数据库的验证
				
				// $mynewusername =  $_POST['user_name'];
				// $mynewuser_password=$_POST['pwd'];
				$mynewuserModel = new Model('b_user');
				// $mynewdata=[];
				$mynewresult=[];
				// $result=[];
				
				
					// $mynewdata['user_name']=$_POST['user_name'];
					// $mynewdata['user_id']=$_POST['user_id'];
					// $mynewdata['user_password']=$_POST['pwd'];
					// var_dump($_POST);
					$mynewrel=$mynewuserModel->save($_POST);
					// var_dump($mynewrel);
					if($mynewrel>0){
						$mynewresult['code']=1;
						$mynewresult['data']="修改成功";
						echo json_encode($mynewresult);
	
						// echo json_encode($mynewresult);
					}else{
					$mynewresult['code']=0;
					$mynewresult['data']="修改失败";
					echo json_encode($mynewresult);

				}
			


			}

		break;



	}
	
	function demo($mydata){
		$myModel = new Model('b_user');
		$sefResult=$myModel->where("user_id='$mydata'")->select();
		return $sefResult[0]['user_name'];
	}