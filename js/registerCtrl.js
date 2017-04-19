angular.module("registerModule",[])
		.controller("registerCtrl",function($scope,userUrl,getuser,userCookie,myadmin,myadminUrl,$state,$ionicPopup){
			  //验证密码和确认面貌
			  		$scope.userdata={};
			  		$scope.user={};
			  		$scope.choice=null;
                    $scope.checkPwd=function(){
                        return $scope.userdata.pwd==$scope.userdata.repwd;
                    }
                    $scope.checkCho=function(){
                    	if($scope.userdata.choice == null){
                    		return true;
                    	}else{
                    		return false
                    	}
                    }
                    var curDate = new Date();
					// 获取当前日期对应的时间戳
					var curTime = curDate.getTime()+36000000;
					console.log(curTime);
                    $scope.getuser=function(){
                    	$scope.user.name=angular.copy($scope.userdata.username);
                    	$scope.user.password=angular.copy($scope.userdata.pwd);
                    	$scope.user.tel=angular.copy($scope.userdata.phone);
                    	$scope.user.sex=angular.copy($scope.userdata.choice);
                    	// console.log($scope.user)
                    	// console.log(userUrl)
                    	getuser.get(userUrl,$scope.user,function(res){
                    			switch(res.data.code){
                    				case 0:
                    					
    			 myadmin.get(myadminUrl,$scope.user.name,$scope.user.password,function(res){
		                    		// console.log(res);
			                    userCookie.cookie("userid",res.data.data.user_id,curTime)
			                    userCookie.cookie("username",$scope.user.name,curTime)
			                    	})
    							 $ionicPopup.alert({title:res.data.data})
                    				$state.go("admin.myhome")
                    				break;
                    				case 1:

                    					$ionicPopup.alert({title:res.data.data})
                    				break;
                    				case 2:
                    					$ionicPopup.alert({title:res.data.data})
                    				break;
                    				case 3:
                    					$ionicPopup.alert({title:res.data.data})
                    				break;
                    			}
                    	})

                    }
                    // name=jack&password=md5(123456)&tel=123445&sex=m
		})