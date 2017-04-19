angular.module("articleModule",[])
		.controller("articleCtrl",function($scope,articleUrl,getData,$state){
			$scope.articleUrl=articleUrl;
			$scope.article_book=[];
			getData.get($scope.articleUrl,function(res){
				// console.log(res);
				$scope.article_book=res.data.data;
				// console.log($scope.article_book)

			})
			$scope.getItem=function(id){
					// console.log(id);
					// $location.url("/page")
					$state.go("page",{id:id})

				}

		})