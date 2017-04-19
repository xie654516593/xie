angular.module("reviseMoudle",[])
		.controller("reviceCtrl",function($scope,$stateParams,getuser,reviceUrl,$state,$ionicPopup){
			$scope.id=$stateParams.id;
			console.log($stateParams.id,$stateParams.username)
			$scope.userdata={};
			$scope.userdata.user_id=$stateParams.id
			$scope.userdata.user_name=$stateParams.username
			$scope.getdata={};
			// 修改密码
			$scope.getuser=function(){
				if($scope.userdata.pwd == $scope.userdata.new_pwd){
					$ionicPopup.alert({title:"两次密码一样"})
				}else{
					$scope.getdata=angular.copy($scope.userdata);
					getuser.get(reviceUrl+"?get=eidt",$scope.getdata,function(res){
						if(res.data.code==0){
							$ionicPopup.alert({title:res.data.data})
						}
						if(res.data.code==1){
							$ionicPopup.alert({title:res.data.data})
							$state.go("admin.aboutMe")
						}
				})
				}
				

			}


			// 回到订单页
			$scope.back=function(){
				$state.go("admin.aboutMe")
			}
		})