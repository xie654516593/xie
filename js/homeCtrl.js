angular.module("homeModule",[])
			.controller("homeCtrl",function($scope,$state,$location,$timeout,$window,userCookie,$stateParams){
				// 上拉刷新
				$scope.refreshData=function(){
					$state.go("admin")
					//停止刷新
					$scope.num=0;
					$scope.new_num=0;
			   		$scope.$broadcast('scroll.refreshComplete');	
				}
				$window.onscroll=function(){
					// $scope.num=0;
				}
				$window.onload=function(){
					$state.go("admin")
					$scope.num=0;
					$scope.new_num=0;
					// $scope.ctrl = 0;
				}
				$scope.new_num=0;
				$scope.num=0
				// 下拉加载
				$scope.loadMore=function(){
					 if($scope.num==0){
						// $state.go("home.skill.animal")
						// 
						$location.url("admin/myhome/skill/animal")
						
					}
					if($scope.num == 1){
						$location.url("admin/myhome/skill/animal/article")
					}
					//  if($scope.num== 2){
					// 	$location.url("/home/skill/animal/article/life")
					// }
					if($scope.num >1){
						$location.url("admin/myhome/skill/animal/article/life")
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');

					// 判断
					if($scope.new_num>$scope.num){
							$scope.new_num=$scope.num;
							return;

							
						}else{
							$timeout(function() {

								if($scope.num>1){
									$scope.num=1
								}
								$scope.num++;
							}, 1000);
						}
					
					
					
					console.log($scope.num)
					// console.log(num.number)
				//停止加载
					$scope.new_num++;

				}

				// 控制选项卡
				$scope.ctrl = 0;

				// 判断

				$scope.getdemo=function(h){
					// console.log($scope.ctrl)
					return $scope.ctrl ==h;

				}
				$scope.demo=function(n){
					$scope.ctrl=n;
					
				}


				// 跳到登录页面
				// $scope.admingo=function(){
					// $state.go("adminNew");
					// $location.url("/adminNew")
					// $state.go("admin");
					// $timeout(function(){$state.go("admin");},500)
					
				// }
				// $rootScope.register=function(){
				// 	$state.go("register")
				// }
				// $scope.url=adminNew;
				// 读取cookie
				// $scope.admin=$stateParams.username?"$stateParams.username":"登录";
				$scope.url=userCookie.getCookie('username')?"admin.aboutMe":"adminNew";
			$scope.admin=userCookie.getCookie('username')?userCookie.getCookie('username'):"登录";
			// console.log($stateParams.username);
			// 	$scope.url=$stateParams.username?"admin.aboutMe":"adminNew";
				

							})