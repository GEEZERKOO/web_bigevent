$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })

    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer

    //通过form.verify函数自定义校验规则
    form.verify({
        //自定义一个pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        //校验两次密码是否一致
        repwd: function (value) {
            //通过形参拿到的是确认密码的内容
            //还需要拿到密码框的内容
            //然后进行等号判断
            //如果判断失败 则return一个提示消息

            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')

            //模拟点击行为 登录
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登陆失败！')
                }
                layer.msg('登录成功！')
                //将登录成功的token字符串存到localStorage中
                localStorage.setItem('token',res.token)
                console.log(res.token);
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})