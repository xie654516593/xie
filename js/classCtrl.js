angular.module("myClassModule",[])
		.controller("myClassCtrl",function($scope,getData ,classUrl,getAthorUrl,shopCarList,$state,$location){
			// console.log(1)
			$scope.class_book=[];
			$scope.data={};
			$scope.getData={};
			$scope.Class=function(n){
				// alert(n)
				getData.get(classUrl+"?cateid="+n,function(res){
					$scope.class_book=res.data.data;
					console.log(res);
				})
			}
			$scope.myclass=false;
			$scope.search=function(){
				$scope.getData=angular.copy($scope.data.search);
				getData.get(getAthorUrl+"?search="+$scope.getData,function(res){
					console.log(res)
					if(res.data.code>0){
						$scope.myclass=true;
					}else{
						$scope.class_book=res.data.data;
					}
				})
			}
			$scope.shopCarList=shopCarList;
			
			// 加入购物车
			$scope.addShopcar=function(book){
				angular.forEach($scope.shopCarList,function(item){
						item.sale=false;
				})
				// console.log($scope.book_new.id)

				if($scope.shopCarList[book.id]){
					$scope.shopCarList[book.id].num++;
					$scope.shopCarList[book.id].sale=true
				}else{
					$scope.shopCarList[book.id]={
						title:book.title,
						author: book.author,
		   				desc : book.desc,
		   				id :book.id,
		   				num:1,
		   				images:book.images[0].image_name ,
						price:book.price,
						sale:true
		   				}
					
				}
				$state.go("admin.shopcar")
				// $location.url("/admin/shopcar");
				// console.log($scope.shopCarList)
				
			}

			// 去详情页
			$scope.go_newpage=function(id){
				$state.go("page",{id:id})
			}

		})