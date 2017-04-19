angular.module("forgetModule",[])
		.controller("forgetCtrl",function($scope,getuser,reviceUrl,userCookie,$state,$ionicPopup){
			$scope.userdata={};
			$scope.mydata={};
			$scope.getdata={};
			var curDate = new Date();
			// 获取当前日期对应的时间戳
			var curTime = curDate.getTime()+36000000;
			$scope.getuser=function(){
				$scope.mydata=angular.copy($scope.userdata);
				// console.log($scope.mydata)
				getuser.get(reviceUrl+"?get=forget",$scope.mydata,function(res){
					// console.log(res)
					if(res.data[0].code==1){
						 userCookie.cookie("userid",res.data[0].user_id,curTime)
                    	userCookie.cookie("username",res.data[0].user_name,curTime)
                    	$scope.getdata.user_id=res.data[0].user_id;
                    	$scope.getdata.user_name=res.data[0].user_name;
                    	$state.go("newpass",{user_name:$scope.getdata.user_name,user_id:$scope.getdata.user_id})
					}else{
						$ionicPopup.alert({title:res.data[0].data})
					}
				})
			}
			$scope.back=function(){
				$state.go("adminNew");
			}
		})