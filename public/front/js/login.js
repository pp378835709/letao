/**
 * Created by Administrator on 2018/1/17.
 */

$(function(){

  //1. 给登录按钮注册点击事件，阻止表单提交。
   $(".btn_login").on("click",function(e){
     e.preventDefault();
  //2. 获取到用户名和密码，做一个简单的校验
     var username = $(".mui-input-clear").val();
     var password = $(".mui-input-password").val();

     if(!username){
       mui.toast("请输入用户名")
       return;
     }

     if(!password){
       mui.toast("请输入用户名和密码")
       return;
     }
     //3. 通过之后，发送ajax请求

     $.ajax({
       type:"post",
       url:"/user/login",
       data:{
         username:username,
         password:password
       },
       success:function(info){
         console.log(info);
          if(info.error){
            mui.toast(info.message);
          }
         if(info.success){
           //怎么办？ 判断是否带了retUrl的参数，如果带了这个参数，直接跳转到对应的地址。
           //获取retUrl的参数，如果有，跳转回去
           if(location.search.indexOf("retUrl") == -1){
             //证明没有携带就跳转到用户中心页面
             location.href="user.html";
           }else {
             //说明携带了retUrl那么就跳转到原来的页面
             var search = location.search;
             search = search.replace("?retUrl=",'');
             location.href=search;
           }
         }
       }
     })

   })
})
