/**
 * Created by Administrator on 2018/1/16.
 */


$(function(){

  //1.搜索历史记录渲染
   //返回一个数组，将这个数组转换成json字符串
   function getHistory(){
     var history = localStorage.getItem("lt_search_history")||'[]';
     var arr = JSON.parse(history);
     //console.log(arr);
     //把这个数组return出去
      return arr;
   }

     //console.log(getHistory());
  //后面需要多次渲染所有进行封装
  function render(){
    var arr = getHistory();
    //拿到web存储的数据进行渲染
    $(".lt_history").html(template("tmp-history",{list:arr}))
  }
  render();




  //2.删除全部历史记录
  //给btn-empty注册点击事件 用事件委托
  $(".lt_history").on("click",".btn_empty",function(){

    mui.confirm("是否删除所有历史记录?","温馨提示",["是","否"],function(e){
      console.log(e);
      //点击是返回index=0,否返回1
      if(e.index==0){
         localStorage.removeItem("lt_search_history");
        //删除web中存储的数据
        //重新渲染
         render();
      }
    })
  })

  //3.删除单条历史记录
  //给所有的xspan注册点击事件

  $(".lt_history").on("click",".btn_delete",function(){

     //获取到设置的index下标
    var index = $(this).data("index");
    //console.log(index);
    //获取到web数据
    //console.log(getHistory());
    var arr = getHistory();
    //根据对应的index删除web存储对应的数据
    arr.splice(index,1);
    //将删除完的arr数组重新存储回web中并渲染

    localStorage.setItem("lt_search_history",JSON.stringify(arr));
     render();


  })

// 4.添加历史记录
  //添加的需求：
  //1. 历史记录最大不超过10
  //2. 如果搜索的历史记录，已经存在，需要把这个历史记录移动到最前面。
  //4. 添加历史记录
  //4.1 给按钮注册点击事件

  $(".search_btn").on("click",function(){
    //获取到search_text的value值
    var key = $(".search_text").val().trim();

    //如果未获取到的话直接return不然会出一个空的
     if(!key){
       mui.toast("请输入关键字");
       render();
     }

    //获取到历史记录
    var arr = getHistory();
    //判断数组中是否有key这个值了如果有的话就把key放在arr的最前面
    var index = arr.indexOf(key)//判断key在arr数组第一次出现的位置,没有的返回-1
    if(index!=-1){
      //说明存在
      arr.splice(index,1)
    }


    //历史记录不能超过10
    if(arr.length>=10){
      arr.pop();//删除最后一个
    }

    //将获取到的key添加的数组的第一项中来
    arr.unshift(key);

    //把arr添加的web中并重新渲染
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    //console.log(arr);
    render();

    //点击搜索的时候页面跳转到搜索列表页 注意：需要你你的搜索关键字带上

     location.href="searchList.html?key="+key;
  })




})



