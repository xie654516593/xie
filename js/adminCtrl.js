angular.module("adminModule",[])
		.controller("adminCtrl",function($scope,$state,myadmin,myadminUrl,userCookie,$ionicPopup){

			$scope.register=function(){
				$state.go("register")
			};
			$scope.userdata={};
			$scope.data={};

			var curDate = new Date();
			// 获取当前日期对应的时间戳
			var curTime = curDate.getTime()+36000000;
			$scope.getuser=function(){
				$scope.data.username=angular.copy($scope.userdata.username);
				$scope.data.password=angular.copy($scope.userdata.pwd);
				// console.log($scope.data)
				myadmin.get(myadminUrl,$scope.data.username,$scope.data.password,function(res){
					console.log(res);
					switch(res.data.code){
                    				case 0:
                    			
                   				 userCookie.cookie("userid",res.data.data.user_id,curTime)
                    			userCookie.cookie("username",res.data.data.user_name,curTime)
                    				$ionicPopup.alert({title:"登录成功"});
                    				$state.go("admin");
                    				break;
                    				case 1:
                    					$ionicPopup.alert({title:"用户不存在"})
                    					
                    				break;
                    				case 2:
                    					$ionicPopup.alert({title:"用户名或密码错误"})
                    				break;
                    				case 3:
                    					$ionicPopup.alert({title:"没有提交post的参数"})
                    				break;
                    			}
				})

			}

				// 忘记密码
				$scope.goforget=function(){
					$state.go("forget");
				}
				$scope.back=function(){
					$state.go("admin");
				}
		})