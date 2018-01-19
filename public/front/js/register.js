/**
 * Created by Administrator on 2018/1/18.
 */

$(function(){

  //给获取验证码按钮注册点击事件
   $(".btn_vcode").on("click",function(e){
      //阻止默认行为
     e.preventDefault();
     //console.log(11);
     //点击后禁用按钮
     //在局部里面拿不到$(this)定义一个全局变量拿一下这个对象
    var  $this = $(this );

     $(this).prop("disabled","true").addClass("disabled").text("发送中");

     //发送ajax
     $.ajax({
       type:"get",
       url:"/user/vCode",
       success:function(info){
         console.log(info);

         //开启一个定时器5秒后才能继续发送验证码
         var time = 5;
       var id = setInterval(function(){
           time--;
          $this.text(time+"秒后再次发送")

         //判断一下如果time小于等于0的时候清空定时器
         //清除定时器并且恢复but的默认属性

         if(time<=0){
           clearInterval(id);
           $this.prop("disabled",false).removeClass("disabled").text("再次发送");
         }
         },1000)

       }
     })
   });


   //2注册功能
   //给btn_register注册点击事件
   $(".btn_register").on("click",function(e){
     //阻止默认行为
     e.preventDefault();
     //获取到input的val值
     //用属性选择器方便获取到属性值
     var username = $("[name='username']").val();
     var password = $("[name='password']").val();
     var repassword = $(".repassword").val();
     var mobile = $("[name='mobile']").val();
     var vCode = $("[name='vCode']").val();

     //做一个简单的验证功能
     if(!username){
       mui.toast("请输入用户名");
       return;
     }

     if(!password){
       mui.toast("请输入密码");
       return;
     }

     if(!repassword){
       mui.toast("请再次输入密码");
       return;
     }
     //手机正则表达式  宽松 199
     //  /^1\d{10}$/
     if(!/^1[3-9]\d{9}$/.test(mobile)){
       mui.toast("请输入正确的手机号码");
       return;
     }

     if(!vCode){
       mui.toast("请输入验证码");
       return;
     }


     //验证通过后发送ajax
     $.ajax({
       type:"post",
       url:"/user/register",
       data:{
         username:username,
         password:password,
         mobile:mobile,
         vCode:vCode,
       },
       success:function(info){
         console.log(info);
         if(info.error){
           mui.toast(info.message)
         }

         if(info.success){
           //提示用户注册成功
           mui.toast("恭喜注册成功")
           //1秒后跳转
           setTimeout(function(){
             location.href="login.html"
           },1000)

         }
       }
     })

   })





})