angular.module("newComModule",[])
		.controller("newComCtrl",function($scope,$stateParams,getuser,reviceUrl,$state){
			$scope.data={}
			$scope.data.book_id=$stateParams.book_id;
			$scope.mydata=[];
			getuser.get(reviceUrl+"?get=getCom",$scope.data,function(res){
				$scope.mydata=res.data;
			})

			// 返回
			$scope.back=function(){
				$state.go("page",{id:$scope.data.book_id});
			}
		})