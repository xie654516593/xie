angular.module("animalModule",[])
		.controller("animalCtrl",function($scope,animalUrl,getData,$state){
			$scope.animalUrl=animalUrl;
			console.log($scope.animalUrl);
			$scope.animal_book=[];
			getData.get($scope.animalUrl,function(res){
				// console.log(res);
				$scope.animal_book=res.data.data;
				// console.log($scope.animal_book);


			})

			$scope.getItem=function(id){
					// console.log(id);
					// $location.url("/page")
					$state.go("page",{id:id})

				}

		})