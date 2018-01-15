/**
 * Created by Administrator on 2018/1/14.
 */

$(function(){

  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function(info){
      console.log(info);

      // 渲染数据
      $(".category_left .mui-scroll").html(template("tmp-left",info));

      renderSecond(info.rows[0].id);
    }
  })

  function renderSecond(id){
  //分局一级分类的id渲染二级分类


    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(info){
        console.log(info);
      //  渲染二级分类
        $(".category_right .mui-scroll").html(template("tmp-right",info));
      }

    })
  }


  //给所有的一级分类的li标签注册点击事件渲染对应的二级分类 用事件委托

  $(".category_left  .mui-scroll").on("click","li",function(){
      //console.log(111)

    $(this).addClass("now").siblings().removeClass("now");

    var id = $(this).data("id");

    renderSecond(id);
    //mui(".mui-scroll-wrapper").scroll() 获取页面中所有的scroll对象，如果有多个，返回数组

    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);//100毫秒滚动到顶
  })





})