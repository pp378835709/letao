/**
 * Created by Administrator on 2018/1/11.
 */

$(function(){
  var $form = $("form");

  $form.bootstrapValidator({
    //配置校验时的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //配置校验的规则
    //字段，你想要校验哪些字段
    fields:{
      username:{
        validators:{
          notEmpty:{
            message: '用户名不能为空'
          },
          callback:{
            message: '用户名不存在'
          }
        }
      },
      //password的规则
      password:{
        validators:{

          notEmpty: {
            message: '用户名或密码不能为空'
          },
          stringLength:{
             min:6,
             max:12,
             message: '用户名长度必须在6到12位之间'
          },
          callback:{
            message: '密码错误'
          }
        }
      }
    }
  })



//  表单校验成功,注册表单校验成功的事件，阻止默认，使用ajax提交

   $form.on("success.form.bv",function(e){
      //阻止浏览器的默认行为
     e.preventDefault();
     //console.log("heheh");

     $.ajax({
       type:"post",
       url:"/employee/employeeLogin",
       //dataType:"json",
       data:$form.serialize(),
       success:function(info){
         console.log(info);
         if(info.success){
           location.href="index.html";
         }


         if(info.error==1000){

           //手动调用方法，updateStatus让username校验失败即可
           //第一个参数：改变哪个字段
           //第二个参数：改成什么状态  VALID:通过  INVALID:不通过
           //第三个参数：选择提示的信息
           //alert(info.message);
           $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");


         }

        if(info.error==1001){

          //手动调用方法，updateStatus让password校验失败即可
          //第一个参数：改变哪个字段
          //第二个参数：改成什么状态  VALID:通过  INVALID:不通过
          //第三个参数：选择提示的信息
          //alert(info.message);

          $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }

       }
     })


   });



  $("[type='reset']").on("click",function(){

    $form.data("bootstrapValidator").resetForm();

  })

})