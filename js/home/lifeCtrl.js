angular.module("lifeModule",[])
		.controller("lifeCtrl",function($scope,lifeUrl,getData,$state){
			$scope.lifeUrl=lifeUrl;
			console.log($scope.lifeUrl);
			$scope.life_book=[];
			getData.get($scope.lifeUrl,function(res){
				// console.log(res);
				$scope.life_book=res.data.data;
				// console.log($scope.life_book);
				
			})
			$scope.getItem=function(id){
					// console.log(id);
					// $location.url("/page")
					$state.go("page",{id:id});

				}

		})