$(function(){

  $(document).ajaxStart(function(){
    NProgress.start();

  })

  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    })
  })

  NProgress.configure({ showSpinner: false });


  //在非登陆页面，发送ajax请求，询问用户是否登录，如果没登录，跳转到登录页面。

  if(location.href.indexOf("login.html")== -1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function(info){
        console.log(info);

        if(info.error==400){
          //说明没登录
          location.href="login.html"
        }
      }
    })
  }




//侧边栏二级分类功能

 //给.second 的上一个li注册点击事件
  $(".second").prev().on("click",function(){
    //console.log("啊实打实")
    $(this).next().slideToggle();
  })


//  侧边栏隐藏功能

  $(".icon_menu").on("click",function(){
    console.log("sd")

    //让侧边栏隐藏
    //主体部分padding-left:0
    $(".lt_aside").toggleClass("now");
    $(".lt_mian").toggleClass("now");
  })



  //退出功能

  $(".icon_logout").on("click",function(){
     $("#myModal").modal("show");

    //里面会重复的注册这个点击事件，不会覆盖，导致注册很多次，
    //1. 在外面注册
    //2. 把之前的事件清除掉。
  })

  $(".btn_logout").on("click",function(){
     console.log("aaaa");
    //需要发送ajax,请求退出
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function(info){
        console.log(info);
        if(info.success){
          //跳转到登录页面
          location.href = "login.html";
        }
      }
    })
  })






});



