angular.module("newpageModule",[])
		.controller("newpageCtrl",function($scope,$stateParams,newpageUrl,getData,$state,shopCarList){
			$scope.id=$stateParams.id;
			// console.log($scope.id);

			$scope.book_new=[];
			// 用id查找book信息
			getData.get(newpageUrl+"?id="+$scope.id,function(res){
				$scope.book_new = res.data.data;
				$scope.desc=$scope.book_new.desc;
				console.log($scope.book_new)
			})

			$scope.back=function(){
				$state.go("admin");
			}

			$scope.shopCarList=shopCarList;
			// 加入购物车
			$scope.addShopcar=function(){
				// console.log($scope.book_new.id)
				if($scope.shopCarList[$scope.book_new.id]){
					$scope.shopCarList[$scope.book_new.id].num++;
				}else{
					$scope.shopCarList[$scope.book_new.id]={
						title:$scope.book_new.title,
						author: $scope.book_new.author,
		   				desc : $scope.book_new.desc,
		   				id :$scope.book_new.id,
		   				num:1,
		   				images:$scope.book_new.images[0].image_name ,
						price:$scope.book_new.price,
						sale:true
		   				}
					
				}
				// console.log($scope.shopCarList)
				
			}


			// 直接购买
			$scope.addShopcar=function(){
				angular.forEach($scope.shopCarList,function(item){
						item.sale=false;
				})
				// console.log($scope.book_new.id)

				if($scope.shopCarList[$scope.book_new.id]){
					$scope.shopCarList[$scope.book_new.id].num++;
					$scope.shopCarList[$scope.book_new.id].sale=true
				}else{
					$scope.shopCarList[$scope.book_new.id]={
						title:$scope.book_new.title,
						author: $scope.book_new.author,
		   				desc : $scope.book_new.desc,
		   				id :$scope.book_new.id,
		   				num:1,
		   				images:$scope.book_new.images[0].image_name ,
						price:$scope.book_new.price,
						sale:true
		   				}
					
				}
				$state.go("admin.shopcar")
				// $location.url("/admin/shopcar");
				// console.log($scope.shopCarList)
				
			}




			// 去看评论
			$scope.goCom=function(){
				$state.go("newCom",{book_id:$scope.id});
			}


		})