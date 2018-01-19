/**
 * Created by Administrator on 2018/1/14.
 */

//初始化区域滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false,
});

//轮播图初始化
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});



//获取地址栏的所有参数返回一个对象


function getSearchObj(){
  var search = location.search;
  console.log(search);
//对地址进行解码
  search = decodeURI(search);
//console.log(search);
/// 干掉?

  search = search.slice(1);
  //console.log(search);

//字符串切割
  var arr = search.split("&");
  console.log(arr);
//5. 把数据变成对象
  var obj={};
  for(var i = 0; i < arr.length; i++) {
    var key = arr[i].split("=")[0];
    var value =arr[i].split("=")[1];
    obj[key]=value;
  }

  return obj;
}



/*获取地址栏指定的参数，返回值*/
function getSearch(key){
    return getSearchObj()[key];
}

