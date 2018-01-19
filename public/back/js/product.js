/**
 * Created by Administrator on 2018/1/14.
 */
$(function(){

  var page=1;
  var pageSize=5;
  var imgArr=[];//用于存储图片的数量
  var $form = $("form")

  var render = function(){

    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        //渲染
       $("tbody").html(template("tmp",info)) ;
      }
    })

  }

  render();


  //给添加商品注册点击事件

  $(".btn_add").on("click",function(){
     //显示模态框
    $("#addModal").modal("show");

  // 发送ajax
    $.ajax({
      tyoe:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:page,
        pageSize:100
      },
      success:function(info){
        //console.log(info);
        //渲染给ul
        $(".dropdown-menu").html(template("menuTmp",info))

      }
    })
  })

  //给dropdown-menu下所有的a标签注册点击事件事件委托

  $(".dropdown-menu").on("click","a",function(){

    //console.log(111)
    //获取到a 的内容设置给dropdown-text
    $(".dropdown-text").text($(this).text());

   //获取到id，给brandId
    var id =$(this).data("id");
    $("#brandId").val(id);
  })


  //初始化上传文件
  $("#fileupload").fileupload({
    datatype:"json",
    //上传成功的时候，触发的回调函数
    done:function(e,data){

      if(imgArr.length>=3){
        return;
      }
      console.log(data.result);
      //1. 图片显示，添加成功，往img_box中添加一张图片即可。
      $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">');

      // 把上传到结果存储到一个数组中。
      // 判断数组的长度就可以知道目前上传了几张图片。
      // 添加商品的时候，可以通过数组拼接出来我们想要的结果

      imgArr.push(data.result);
      //console.log(imgArr);

      if(imgArr.length ===3){
        //3. 根据数组的长度，对productLogo进行校验
        $form.data("bootstrapValidator").updateStatus("productLogo","VALID")
      }else {
        $form.data("bootstrapValidator").updateStatus("productLogo","INVALID")
      }
    }
  })

  //5. 表单校验功能

  $form.bootstrapValidator({
    //配置隐藏域校验
    excluded:[],
    //配置校验时显示的图标
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验规则
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"二级分类不能为空",
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"商品名称不能为空",
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"商品描述不能为空",
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"商品库存不能为空",
          },
          //正则：只能有数字组成，并且第一位不能是0
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"请输入合法的数字",
          }
        }
      },

      size:{
        validators:{
          notEmpty:{
            message:"商品尺码不能为空",
          },
          //正则：只能有数字组成，并且第一位不能是0
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入合法的尺码",
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"商品原价不能为空",
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"商品现价不能为空",
          }
        }
      },

      productLogo:{
        validators:{
          notEmpty:{
            message:"请上传3张图片",
          }
        }
      },


    }


  })



//6.给表单注册表单验证成功事件
  $form.on("success.form.bv",function(e){
    e.preventDefault();
    //拼接图片信息
     var param = $form.serialize();
    param += "&picName1="+imgArr[0].picName + "&picAddr1="+imgArr[0].picAddr;
    param += "&picName2="+imgArr[1].picName + "&picAddr2="+imgArr[1].picAddr;
    param += "&picName3="+imgArr[2].picName + "&picAddr3="+imgArr[2].picAddr;

    console.log(param);


    //发送ajax
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:param,
      success:function(info){
        console.log(info);
        if(info.success){
          //关闭模态框
          $("#addModal").modal("hide");
          page = 1;
          render();

          //重置表单
          $form.data("bootstrapValidator").resetForm(true);

          $(".dropdown-text").text("请选择二级分类");
          $(".img_box img").remove();//图片自杀

          imgArr=[];//清空装图片的数组
        }
      }
    })

  })






})
