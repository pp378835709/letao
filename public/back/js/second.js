/**
 * Created by Administrator on 2018/1/13.
 */
$(function(){

  var page=1;
  var pageSize=5;
  var $form = $("form");
   render();
  function  render(){

    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $("tbody").html(template("tmp",info));

        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,p){
            page = p;
            render();
          }
        })

      }
    })
  }



//2. 添加，显示模态框
  $(".btn_add").on("click",function(){

    $("#addModal").modal("show");

    //发送aja
    $.ajax({
       type:"get",
       url:"/category/querySecondCategoryPaging",
       data:{
         page:page,
         pageSize:pageSize
       },
      success:function(info){
        console.log(info);

        $(".dropdown-menu").html(template("menuTmp",info))
      }
    })


  });

  //3. 下拉列表选中功能
  //3.1 给下拉列表中的a注册点击事件
  //3.2 获取点击的a标签的内容，设置给dropdown-text的内容

  $(".dropdown-menu").on("click","a",function(){
      $(".dropdown-text").text($(this).text());

    //获取id，把id赋值给categoryId的隐藏
    var id = $(this).data("id");
    $("#categoryId").val(id);

    //手动把categoryId设置为VALID状态
    $form.data("bootstrapValidator").updateStatus("categoryId","VALID")
  })

  //4. 初始化文件上传功能

  $("#fileupload").fileupload({
    dataType: 'json',
    //文件上传成功时，会执行的回调函数
    done: function (e, data){
      //通过data.result可以获取到一个对象，这个对象的picAddr属性就是图片的地址
      //console.log(data);
      var result = data.result.picAddr;
      $(".img_box img").attr("src",result);

      //修改隐藏域的value值
      $("#brandLogo").val(result);


      //让brandLogo改为VALID状态
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });


  //5.表单校验功能
  var $form = $("form");
  $form.bootstrapValidator({
    //配置不做校验的内容，给空数组，目的是让隐藏的和禁用的都做校验
    excluded:[],
    //配置校验时显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验规则
    fields:{

      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入品牌的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传品牌的图片"
          }
        }
      }
    }
  });



  //6. 给表单注册校验成功事件
  $form.on("success.form.bv", function(e){
    e.preventDefault();

    //发送aja
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          //隐藏模态框
          $("#addModal").modal("hide");
          page=1;
          render();

          //重置表单
          $form.data("bootstrapValidator").resetForm(true);
          $(".dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src","images/none.png");
        }
      }
    })

  });






})