/**
 * Created by Administrator on 2018/1/18.
 */


$(function(){


  //下拉刷新的功能
  mui.init({
     pullRefresh:{
       //下拉刷新的容器
       container:".mui-scroll-wrapper",
       //下拉刷新的参数配置
       down:{
         auto:true,
         //下拉刷新的时候，会触发这个函数
         callback:function(){
           console.log(111);
           //发送ajax

           $.ajax({
             type:"get",
             url:"/cart/queryCart",
             success:function(info){


               setTimeout(function(){
                 console.log(info);
                 //如果没有登录的话就跳转到登录页
                 if(info.error == 400){
                    location.href="login.html?retUrl=" + location.href;
                 }

                 $("#OA_task_2").html(template("tmp",{list:info}))


                 mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

               },1000)

             }
           })





         }
       }

     }
  })




  //2.删除功能
  //给所有的删除按钮注册点击事件用委托事件

  $("#OA_task_2").on("tap",".btn_delete",function(){
    //console.log(11);
    //mui的下拉刷新不能使用click事件用changge事件或者是tap事件
    //获取到自定义的id根据id删除对应的数据
    var id = $(this).data("id");
    //console.log(id);
    //发送ajax
    //给用户一个删除提示的功能
    mui.confirm("你是否要删除这件商品","温馨提示",["确定","取消"],function(e){

     if(e.index == 0) {
       $.ajax({
         type: "get",
         url: "/cart/deleteCart",
         data: {
           id: id
         },
         success: function (info) {
           //console.log(info);
           if (info.success) {
             //重新手动更新一下下拉刷新
             mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
           }
         }
       })
     }
  })

  })



  //3.修改功能
  //给所有的修改按钮注册点击事件用委托事件

  $("#OA_task_2").on("tap",".btn_edit",function(){

    //获取到自定义的id根据id修改对应的数据
    //console.log(111);

     //获取到购物车的数据
     //dataset是dom方法直接用this拿
    var data = this.dataset;
     console.log(data);

    //3.2 配合模版引擎，渲染数据
    var html = template("tmp2",data);
    //把html中所有的换行(\n)给替换掉，因为mui会把\n给替换成br
     html = html.replace(/\n/g ,'');
    mui.confirm(html,"编辑商品",["确定","取消"],function(e){
      if(e.index==0){
        //获取到商品的id,size,num发送ajax
        var id = data.id
        var size =$(".lt_edit_size span.now").text();
        var num  =$(".mui-numbox-input").val();

        $.ajax({
          type:"post",
          url:"/cart/updateCart",
          data:{
            id:id,
            size:size,
            num:num
          },
          success:function(info){
            console.log(info);
            if(info.success){
              //成功的话触发一次下拉刷新
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }

    })


    //初始化数字盒子
    mui(".mui-numbox").numbox();

    //尺码选择功能
    $(".lt_edit_size span").on("click",function(){
      $(this).addClass("now").siblings().removeClass("now");
    })

  });


  //4. 计算价格
  //给所有的ck注册点击事件
   $("#OA_task_2").on("change",".ck",function(){
     //所有被选中的checkbox
     //总价
     var total = 0;


     //只有是checked状态下的计算价格
     $(".ck:checked").each(function(){


     var price = $(this).data("price");
     var num = $(this).data("num");


     total += price * num;
       console.log(total);
     })
   //保留2位小数
    total = total.toFixed(2);

  $(".mui-pull-left span").text(total);





   })





})
