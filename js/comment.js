angular.module("commentModule",[])
		.controller("myCommentCtrl",function($scope,$stateParams,getuser,comUrl,$state,$ionicPopup){
			$scope.data={};
			$scope.myData={}
			// 提交评论
			$scope.comment=function(){
				// console.log(1);
				if($scope.data.myComment==null){
					$ionicPopup.alert({title:" 没有评论内容"})
				}else{
					$scope.myData.content=$scope.data.myComment;
				$scope.myData.id=$stateParams.id;
				$scope.myData.user_id=$stateParams.user_id;
				console.log($scope.myData)
				getuser.get(comUrl,$scope.myData,function(res){
					$ionicPopup.alert({title:res.data.data})
				})
				}
				
			}
			// 返回上层
			$scope.back=function(){
				$state.go("admin.aboutMe")
			}
		})