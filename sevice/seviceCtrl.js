angular.module("sevice",["ui.router"])
	// 配置导航下去
		.config(function($ionicConfigProvider) {
			   		$ionicConfigProvider.platform.android.tabs.style('standard');
					$ionicConfigProvider.platform.android.tabs.position('bottom');

			   })
			// 分类
			.value("classUrl","./shopApi/book/book.php")
		// 设置技术查询url
			.value("skillUrl","./shopApi/book/book.php?cateid=1")
			// 设置动漫查询url
			.value("animalUrl","./shopApi/book/book.php?cateid=2")
			// 设置文学查询url
			.value("articleUrl","./shopApi/book/book.php?cateid=3")
			// 设置生活查询url
			.value("lifeUrl","./shopApi/book/book.php?cateid=4")
			// 详情页url
			.value("newpageUrl","./shopApi/book/bookId.php")
			// 登录url
			.value("myadminUrl","./shopApi/book/userInfoLogin.php")
			// 注册url
			.value("userUrl","./shopApi/book/userRegist.php")
			// 用户提交订单url
			.value("goodsUrl","./shopApi/book/order.php")
			// 获取订单Url
			.value("myGoodsInfoUrl","./shopApi/book/orderQuery.php")
			// 根据作者搜索
			.value("getAthorUrl","./shopApi/book/bookSearch.php")
			// 修改密码url
			.value("reviceUrl","./shopApi/book/revice.php")

			// 定义评论url
			.value("comUrl","./shopApi/book/comment.php")
			.service("getData",function($http){
				this.get=function(url,success){
					$http({
						url:url
					}).then(success)
				}
			})
		// 设置存用户方法
			.service("getuser",function($http,$httpParamSerializer){
				this.get=function(url,data,success){
					$http({  
					   method:'post',  
					   url:url,  
					   data:$httpParamSerializer(data),  
					    headers:{'Content-Type':'application/x-www-form-urlencoded'}  
					    
					}).then(success)
				}
			})
			.service("getgoods",function($http){
				this.get=function(url,data,success){
					$http({  
					   method:'post',  
					   url:url,  
					   data:data,  
					   headers:{'Content-Type':'application/x-www-form-urlencoded'} 
					    
					}).then(success)
				}
			})
			// 设置登录接口
			.service("myadmin",function($http){
				this.get=function(url,username,password,success){
					$http({  
					   method:'post',  
					   url:url,  
					   data:"username="+username+"&password="+password,  
					   headers:{'Content-Type':'application/x-www-form-urlencoded'} 
					    
					}).then(success)
				}
			})
			// 设置cookie方法
			.service("userCookie",function(){
				this.cookie=function(name, value, expires, path, domain){
					var cookie_string = name+"="+value;
					if (expires) {
						cookie_string += ";expires="+expires;	
					}
					if (path) {
						cookie_string += ";path="+path;
					}
					if (domain) {
						cookie_string += ";domain="+domain;
					}
					document.cookie = cookie_string;
				},
				// 读取cookie
				this.getCookie = function(name){
					var cookieList = document.cookie.split("; ");

					for (var i = 0; i < cookieList.length; i ++) {
						//把cookieList[i] 分割为数组
						var cookieItem = cookieList[i].split("=");

						if (cookieItem[0] === name) {
							return cookieItem[1];
						}
					}
				}
			})
			// 设置location
			.service("localStorageService", function($window){
	   		
	   		//设置 对象
	   		this.setObj = function(key, obj) {
	   			$window.localStorage[key] = angular.toJson(obj)
	   		}
	   		//读取 对象
	   		this.getObj = function(key) {
	   			return angular.fromJson($window.localStorage[key])
	   		}
	   })
			.service("clear",function(){
				this.cle=function(){
					window.localStorage.clear();
				}
			})
			// 定义shopcarlist

			 .factory("shopCarList", function(localStorageService){
            		return  localStorageService.getObj("shopCarList") ? localStorageService.getObj("shopCarList") : {};
       })
			 .factory("cookie_userid", function(userCookie){
            		return  userCookie.getCookie("userid") ? userCookie.getCookie("userid") : null;
       })
			// 定义总的价格
			// .value("totalvalue",{
			// 	total:0
			// })
		// 直接读取cookie
		.factory("mycookie", function(userCookie){
            		return  userCookie.getCookie("username") ? userCookie.getCookie("username") : null;
       })
		// 定义userid
		.factory("cookie_userid", function(userCookie){
            		return  userCookie.getCookie("userid") ? userCookie.getCookie("userid") : null;
       })
		.service("destroyCookie",function(){
			this.destroy=function deleteCookie(name, path, domain){
					var d = new Date();
					d.setTime(d.getTime() - 1);
					var cookie_string = name+"="+" ;expires="+d.toUTCString();

					if (path) {
						cookie_string += ";path="+path;
					}

					if (domain) {
						cookie_string += ";domain="+domain;
					}

					document.cookie = cookie_string;
				
			}
		})

		// 首页导航路由
		.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	   		//去掉！
	   		$locationProvider.hashPrefix("");

	   		//其他跳转首页
	   		$urlRouterProvider.otherwise("/admin");
	   		$stateProvider
	   		.state("admin",{
	   			url:"/admin",
	   			templateUrl:"views/home.html",
	   			views:{
	   				
	   				"":{
	   					templateUrl:"views/myadmin.html"
	   					// controller:"myindexCtrl"
	   				},
	   				"home@admin":{
	   					templateUrl:"views/home.html",
	   					controller:"homeCtrl"	
	   				},
	   				"index@admin":{
	   					templateUrl:"views/index1.html",
	   					controller:"myindexCtrl"
	   				},
	   				"class@admin":{
	   					templateUrl:"views/home/skill.html",
	   					controller:"skillCtrl"
	   				}
	   				}
	   			})
	   	
	   			// 	,
	   			// 	"class@admin":{
	   			// 		templateUrl:"views/home/skill.html",
	   			// 		controller:"skillCtrl"
	   			// 	}
	   			// }
	   				// 购物车的路由
	   		.state("admin.shopcar",{
	   			url:"/shopcar",
	   			views:{
	   				"home@admin":{
	   					templateUrl:"views/shopcar.html",
	   					controller:"shopcarCtrl"
	   				}
	   			}
	   		})
	   		// 关于我
	   		.state("admin.aboutMe",{
	   			url:"/aboutMe",
	   			views:{
	   				"home@admin":{
	   					templateUrl:"views/aboutMe.html",
	   					controller:"aboutMeCtrl"
	   				}
	   			}
	   		})
	   		// home
	   		.state("admin.myhome", {
	   			url:"/myhome?",
	   			views:{
	   				"home@admin":{
	   					templateUrl:"views/home.html",
	   					controller:"homeCtrl"	
	   				},
	   				"class@admin.myhome":{
	   					templateUrl:"views/home/skill.html",
	   					controller:"skillCtrl"
	   				}
	   			}
	   		})
	   			// 搜索
	   		.state("admin.myClass",{
	   			url:"/myClass",
	   			views:{
	   				"home@admin":{
	   					templateUrl:"views/class.html",
	   					controller:"myClassCtrl"
	   				}
	   			}
	   		})
	   		// 技术
	   		.state("admin.myhome.skill",{
	   			url:"/skill",
	   			views:{
	   				"class@admin.myhome":{
	   					templateUrl:"views/home/skill.html",
	   					controller:"skillCtrl"
	   				}
	   			}
	   		})
	   		// 动漫
	   		.state("admin.myhome.animal",{
	   			url:"/animal",
	   			views:{
	   				"class@admin.myhome":{
	   					templateUrl:"views/home/animal.html",
	   					controller:"animalCtrl"
	   				}
	   			}
	   		})
	   		// 文学
	   		.state("admin.myhome.article",{
	   			url:"/article",
	   			views:{
	   				"class@admin.myhome":{
	   					templateUrl:"views/home/article.html",
	   					controller:"articleCtrl"
	   				}
	   			}
	   		})
	   		// 生活
	   		.state("admin.myhome.life",{
	   			url:"/life",
	   			views:{
	   				"class@admin.myhome":{
	   					templateUrl:"views/home/life.html",
	   					controller:"lifeCtrl"
	   				}
	   			}
	   		})

	   		.state("admin.myhome.skill.animal",{
	   			url:"/animal",
	   			views:{
	   				"animal@admin.myhome":{
	   					templateUrl:"views/home/animal.html",
	   					controller:"animalCtrl"
	   				}
	   			}
	   		})
	   		.state("admin.myhome.skill.animal.article",{
	   			url:"/article",
	   			views:{
	   				"article@admin.myhome":{
	   					templateUrl:"views/home/article.html",
	   					controller:"articleCtrl"
	   				}
	   			}
	   		})
	   		.state("admin.myhome.skill.animal.article.life",{
	   			url:"/life",
	   			views:{
	   				"life@admin.myhome":{
	   					templateUrl:"views/home/life.html",
	   					controller:"lifeCtrl"
	   				}
	   			}
	   		})
	   		.state("page",{
	   			url:"/page?id",
	   			views:{
	   				"":{
	   					templateUrl:"views/newpage.html",
	   					controller:"newpageCtrl"
	   				}
	   			}
	   		})
	   		.state("adminNew",{
	   			url:"/adminNew",

	   			views:{
	   				"":{
	   					templateUrl:"views/admin.html",
	   					controller:"adminCtrl"
	   				}
	   			}
	   		})
	   		.state("register",{
	   			url:"/register",
	   			views:{
	   				"":{
	   					templateUrl:"views/register.html",
	   					controller:"registerCtrl"
	   				}
	   			}
	   		})
	   		// 订单
	   		.state("myGoodsInfo",{
	   			url:"/myGoodsInfo?id",
	   			views:{
	   				"":{
	   					templateUrl:"views/myGoodsInfo.html",
	   					controller:"myGoodsInfoCtrl"
	   				}
	   			}
	   		})
	   		// 修改密码
	   		.state("revice",{
	   			url:"/revice?id&username",
	   			views:{
	   				"":{
	   					templateUrl:"views/revicePassword.html",
	   					controller:"reviceCtrl"
	   				}
	   			}
	   		})
	   		.state("comment",{
	   			url:"/comment?id&user_id",
	   			views:{
	   				"":{
	   					templateUrl:"views/comment.html",
	   					controller:"myCommentCtrl"
	   				}
	   			}
	   		})
	   		.state("newCom",{
	   			url:"/newCom?book_id",
	   			views:{
	   				"":{
	   					templateUrl:"views/newCom.html",
	   					controller:"newComCtrl"
	   				}
	   			}
	   		})
	   		// 忘记密码
	   		.state("forget",{
	   			url:"/forget",
	   			views:{
	   				"":{
	   					templateUrl:"views/forget.html",
	   					controller:"forgetCtrl"
	   				}
	   			}
	   		})
	   		// 修改密码
	   		.state("newpass",{
	   			url:"/newpass?user_id&user_name",
	   			views:{
	   				"":{
	   					templateUrl:"views/newpass.html",
	   					controller:"newpassCtrl"
	   				}
	   			}
	   		})
})