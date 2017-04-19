angular.module("shopcarModule",[])
		.controller("shopcarCtrl",function($scope,shopCarList,$state,mycookie,cookie_userid,goodsUrl,getgoods,$ionicPopup){
			$scope.total=0;
			$scope.shopCarList=shopCarList;



			$scope.$watch("shopCarList",function(){
				var price=0;
				console.log(1);
				angular.forEach($scope.shopCarList,function(item){
					if(item.sale == true){
						// console.log(item);
						price +=item.num*item.price
					}
				})

				$scope.total = price;
			},true)


			//修改购物车数量
	   		$scope.minusNumber = function(item){
	   			if (item.num <= 1) {
	   				item.num = 1;
	   			} else {
	   				item.num --;
	   			}

	   		}


	   		$scope.addNumber = function(item){
	   			item.num ++;
	   		}

	   		// 返回
	   		$scope.back=function(){
	   			$state.go("admin")
	   		}

	   		
	   		$scope.my_goods={};
	   		// 提交订单信息
	   		$scope.goods=function(){
	   			$scope.my_goods.user_id=cookie_userid
	   			var getArray=[];
	   			angular.forEach($scope.shopCarList,function(item){
					if(item.sale == true){
						var getObj={};
						getObj.id=item.id;
						getObj.num=item.num;
						getArray.push(getObj);
						delete $scope.shopCarList[item.id]
					}
				})
				if(getArray.length===0){
					alert("没有订单")
					return;
				}else{
					$scope.my_goods.cart=getArray;
					// console.log(getArray)
					getgoods.get(goodsUrl,$scope.my_goods,function(res){
					$ionicPopup.alert({
						 title:"提交成功"

					})
					$state.go("admin")
					})
				}
					
	   		}

	   		$scope.delete=function(id){
	   			// console.log(id)
	   			delete $scope.shopCarList[id];
	   			// console.log($scope.shopCarList[id]);
	   		}
		})