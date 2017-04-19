angular.module("myindexModule",[])
		.controller("myindexCtrl",function($scope,shopCarList,localStorageService,userCookie,$state){
			// 监听价格变化和数量变化
			$scope.shopCarList=shopCarList;
			$scope.num=0;
			$scope.$watch("shopCarList",function(){
				var num=0;
				angular.forEach($scope.shopCarList,function(item){
					
						num +=item.num; 
					
					
				})
				$scope.num = num;
				// console.log(1);
				localStorageService.setObj("shopCarList",$scope.shopCarList)

			},true)

			$scope.go=function(){
				console.log(shopCarList);
			}


			// 点击购物车判断
			$scope.goshopcar=function(){
				if(userCookie.getCookie("username")){
					$state.go("admin.shopcar");
				}else{
					$state.go("adminNew");
				}
			}
			$scope.gome=function(){
				if(userCookie.getCookie("username")){
					$state.go("admin.aboutMe");
				}else{
					$state.go("adminNew");
				}
			}
			// 去主页
			$scope.gohome=function(){
				$state.go("admin.myhome");
			}
			// 去分类
			$scope.gocar=function(){
				$state.go("admin.myClass");
			}
		})