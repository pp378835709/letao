/**
 * Created by Administrator on 2018/1/17.
 */

$(function(){
  //发送ajax
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    success:function(info){
      //console.log(info);
       if(info.error==400){
         //说明没有登录跳转到登录页面
         location.href="login.html";
       }
       //说明跳转了拿到数据进行渲染
      $(".user_info").html(template("tmp",info))

    }
  })

  //退出登录功能

  $(".login_box").on("click",function(){
      //发送ajax
    $.ajax({
      type:"get",
      url:"/user/logout",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })



})
