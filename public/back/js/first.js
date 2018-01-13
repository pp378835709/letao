/**
 * Created by Administrator on 2018/1/13.
 */
$(function(){

   var page=1;
   var pageSize=5;
   render();

  function render(){

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        //渲染
        var result=template("tmp",info);
        $("tbody").html(result);


      //  分页
        //渲染分页
        //如果引入的bootstrap的版本是3+，
        // 1. 分页的盒子必须是ul元素
        // 2. 还需要指定一个属性：bootstrapMajorVersion指定bootstrap的版本
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageChanged:function(a,b,c,p){
            page = p;
            render();
          }
        })
      }
    })
  }




  $(".btn_add").on("click",function(){
     $("#addModal").modal("show");
  })

  //表单校验功能
  var $form = $("form");

  $form.bootstrapValidator({
    //配置校验时显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //配置校验的规则
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类的名称不能为空"
          }
        }
      }
    }
  });

  //给表单注册校验成功的事件

  $form.on("success.form.bv",function(e){
    //阻止默认提交
    e.preventDefault();
    //发动ajax
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function(info){
        //console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
            page=1;
           render();
        // 重置表单
          $form.data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })

})