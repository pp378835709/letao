/**
 * Created by Administrator on 2018/1/16.
 */

$(function(){

  //render必传的三个：proName  page pageSize
  //可选的参数：price或者num  ， 如果排序的a被点击了，需要传，看谁被点击，如果price被点击了，传price， 值如何确定？根据箭头进行确定，如果是下箭头，值是2， 否则值1


  function render(){

  var param={};
    param.page=1;
    param.pageSize=100;
    param.proName=$(".search_text").val();

    //判断是否需要传递排序字段，获取是否有now这个类的a标签即可。

    var $sort = $(".lt_sort a.now");
    if($sort.length>0){
      //说明必然有一个a标签被点击
      //需要给param添加一个参数，price或者num
      var type=$sort.data("type");
      var value=$sort.find('span').hasClass("fa-angle-down")?2:1;

      param[type] = value;
    }

  //获取到地址栏的参数

   //根据传来的key发送ajax查询数据并渲染
    $(".lt_product").html('<div class="loading"></div>');

  $.ajax({
    type:"get",
    url:"/product/queryProduct",
    data:param,
    success:function(info){
      console.log(info.data);

      setTimeout(function(){
        $(".lt_product").html(template("tmp-product",info))
      },1000)

    }
  })

  }


  //1. 页面加载时，获取数据
  //1.1. 获取地址栏的参数：key

  var key =getSearch("key");
  //把key这个值设置给搜索框
  $(".search_text").val(key);

  render();


  //2. 点击搜索按钮时，获取搜索框的内容

  $(".search_btn").on("click",function(){

    render();


  })


//3. 排序功能
  //3.1 给价格和库存注册点击事件,给有data-type的a标签注册事件

  $(".lt_sort>a[data-type]").on("click",function(){

      //console.log(11)
    //3.2 做什么?
    //如果当前a标签没有now这个类，需要给当前a标签添加now这个类，让所有的箭头都向下
    //如果当前a标签有now这个类，需要让箭头方向改变

    var $this=$(this);

    if($this.hasClass("now")){
      //有now这个类，修改a标签下面的span标签的 fa-angle-down
      $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else {
      //没有这个now类就添加
      $this.addClass("now").siblings().removeClass("now");
      //让所有箭头都向下
      $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    }

    render();
  })











})



