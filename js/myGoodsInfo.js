angular.module("myGoodsInfoModule",[])
		.controller("myGoodsInfoCtrl",function($scope,getData,$stateParams,myGoodsInfoUrl,$state,$ionicPopup,mycookie,cookie_userid){
			$scope.id=$stateParams.id;
			
			// console.log($scope.id)
			// 获取用户订单信息
			$scope.myInfo=[];
			getData.get(myGoodsInfoUrl+"?user_id="+$scope.id,function(res){
				if(res.data.code>0){
					$ionicPopup.alert({title:res.data.data})
					// $state.go("admin.aboutMe")
				}else{
					console.log(res.data.data);
					$scope.myInfo=res.data.data;
				}
				
			})

			$scope.back=function(){
				$state.go("admin.aboutMe")
			}
			
			// 去评论
			$scope.gocomment=function(id){
				console.log(id)

				$state.go("comment",{user_id:cookie_userid,id:id})
			}
		})