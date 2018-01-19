/**
 * Created by Administrator on 2018/1/17.
 */

$(function(){

  //先获取到传过来的id根据id去发送ajax请求后台数据
  var id = getSearch("productId");

  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{id:id},
    success:function(info){
      console.log(info);
      //渲染数据

      $('.mui-scroll').html(template("tmp",info));
      //重新初始化轮播图
      mui(".mui-slider").slider({
        interval:1000
      });

      //重新初始化数字框
      mui(".mui-numbox").numbox();

      //尺码的选择不需要事件委托
      $(".lt_size span").on("click",function(){
          $(this).addClass("now").siblings().removeClass("now");
      })

    }
  })

  //加入购物车

   $(".btn_add_cart").on("click",function(){

     //获取尺码
     var size =$(".lt_size span.now").text();
     //console.log(size);
     //如果没有选择尺码提示用户选择一个尺码
     if(!size){
       mui.toast("请选择尺码");
       return;
     }

     //获取到数量
     var num = $(".mui-numbox-input").val();
     //console.log(num);

     //发送ajax请求
     $.ajax({
       type:"post",
       url:"/cart/addCart",
       data:{
         productId:id,
         size:size,
         num:num
       },
       success:function(info){
         console.log(info);
         if(info.error == 400){
           //跳转到登录页面，需要加一个参数，retUrl,目的是为了可以跳回当前页面
           location.href ="login.html?retUrl="+location.href;
         }

         //成功的处理
         //参数1：提示内容
         //参数2：提示标题
         //参数3：数组，两个值，按钮
         //参数4：回调函数，可以知道点击了哪个按钮
         if(info.success){
           mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
             console.log(e);
             if(e.index==0){
               location.href = "cart.html";
             }
           })
         }

       }
     })

   })





})
