angular.module("skillModule",[])
		.controller("skillCtrl",function($scope,skillUrl,getData,$state,$location){
			$scope.skillUrl=skillUrl;
			$scope.skill_book=[];

			getData.get($scope.skillUrl,function(res){
				// console.log(res);
				$scope.skill_book=res.data.data;
				// console.log($scope.skill_book);
				

				

			})
			$scope.getItem=function(id){
					// console.log(id);
					// $location.url("/page")
					$state.go("page",{id:id})

				}

				
		})