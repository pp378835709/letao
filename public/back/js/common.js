$(function(){

  $(document).ajaxStart(function(){
    NProgress.start();

  })

  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },1000)
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















});



