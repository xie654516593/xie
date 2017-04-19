angular.module("aboutMeModule",[])
		.controller("aboutMeCtrl",function($scope,mycookie,$state,cookie_userid,mycookie,destroyCookie,$ionicPopup,shopCarList,userCookie,$window,localStorageService,clear){

			$scope.username=userCookie.getCookie('username');
			$scope.ready=function(){
				$state.go("myGoodsInfo",{id:cookie_userid})
			}
			$scope.gorevice=function(){
				$state.go("revice",{id:cookie_userid,username:mycookie})
			}
			$scope.shopCarList=shopCarList;

			// 销毁账户
			$scope.destroy=function(){
				destroyCookie.destroy('username');
				destroyCookie.destroy('userid');
				if(userCookie.getCookie('username') || userCookie.getCookie('userid')){
					$ionicPopup.alert({title:"注销失败"})
					
					// $scope.reloadRoute = function () {
   		// 				 $window.location.reload();

					// 	};
					// $state.go("admin.aboutMe");

					
				}else{
					
					clear.cle();
					$scope.username='';
					$ionicPopup.alert({title:"注销成功"})
				}
			}
		})