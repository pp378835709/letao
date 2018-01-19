/**
 * Created by Administrator on 2018/1/15.
 */
$(function(){

  //发送ajax
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      console.log(info);
      //渲染数据
      $(".category_left .mui-scroll").html(template("tmp-left",info));

      //根据一级分类id渲染二级分类
      renderSecond(info.rows[0].id);
    }
  })


   function renderSecond(id){

     $.ajax({
       type:'get',
       url:'/category/querySecondCategory',
       data:{
         id:id
       },
       success:function(info){
         console.log(info);
         //渲染二级分类
         $(".category_right .mui-scroll").html(template("tmp-right",info));
       }
     })

   }


  //给category_left下的所有li注册点击事件获取id渲染对应的二级分类 利用事件委托

   $(".category_left").on("click",'li',function(){
     //console.log(111)
   //  切换li的now类
     $(this).addClass('now').siblings().removeClass('now');

     //获取到一级分类的id渲染对应的二级分类
     var id = $(this).data("id");
      renderSecond(id);

    //有多个区域滚动的话scroll是一个数组
     mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);//100毫秒滚动到顶
   })







})
