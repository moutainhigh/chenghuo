$(function () {
    // 列表
    $("#table").BT(
        {
            url: baseURL + 'member/memberinfo/list',
            columns: [
                {
                    checkbox: true
                },
                {
                    title: '头像',
                    field: 'avatarUrl',
                    formatter: function (value, row, index) {
                        return '<img src=\"' + value + '\" width="50px" height="50px"/>';
                    }
                }, {
                    title: '昵称',
                    field: 'nickName'
                }, {
                    title: '手机号',
                    field: 'mobile'
                }, {
                    title: '性别',
                    field: 'gender',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return "男";
                        } else if (value == 0) {
                            return "女";
                        } else {
                            return "未知";
                        }
                    }
                }, {
                    title: '身份',
                    field: 'isVip',
                    formatter: function (value, row, index) {
                        return value == 1 ? '<span class="label label-primary">会员</span>' : '<span class="label label-default">游客</span>';
                    }
                }, {
                    title: '城市',
                    field: 'city'
                }, {
                    title: '省',
                    field: 'province'
                }, {
                    title: '国家',
                    field: 'country'
                }, {
                    title: '语言',
                    field: 'language'
                }, {
                    title: '积分',
                    field: 'integral'
                }, {
                    title: '注册时间',
                    field: 'createTime'
                },{
                    title: '会员开始时间',
                    field: 'vipAddTime'
                },{
                    title: '会员到期时间',
                    field: 'vipEndTime'
                },{
                  title:'是否冻结',
                    align:'center',
                    field:'frozen',
                    formatter:function (value,row,index) {
                        return value ==1?'<span class="label label-primary">否</span>' : '<span class="label label-default">是</span>';
                    }
                } ,
                {
                    title : '操作',
                    align: 'center',
                    events: operateEvent,
                    formatter: function (value, row, index) {
                        return '<a id="btn_data">推荐会员列表</a>'
                    }
                }],
            // 条件查询
            queryParams: {nickName: ''}
        });
    // 表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })

    $("#table2").BT({
        url: baseURL + 'member/mmemberRecommend/list',
        columns: [
            {checkbox: true},
            { title: '推荐人手机号', field: 'recommenderMobile'},
            { title: '推荐人昵称', field: 'recommenderNickName'},
        ],
        // 条件查询
        queryParams2: {nickName: ''}
    });

});
//管理属性二级方法
window.operateEvent = {
    //属性的点击事件
    'click #btn_data': function (e, value, row, index) {
        vm.showList = false;
        vm.showList2 = true;
        vm.title = '推荐人列表';
        vm.queryParams2.recommenderId = row.id;
        vm.reloadData();
    },
};
var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        showList2 : false,//二级列表
        title: null,
        memberInfo: {},
        queryParams: {},
        queryParams2: {},
        countList:{},//统计数量集合
        // 验证字段
        fields: {
            memberId: {
                message: '用户id验证失败',
                validators: {
                    notEmpty: {
                        message: '用户id不能为空'
                    },
                },
            },
            nickName: {
                message: '昵称验证失败',
                validators: {
                    notEmpty: {
                        message: '昵称不能为空'
                    },
                },
            },
            avatarUrl: {
                message: '头像验证失败',
                validators: {
                    notEmpty: {
                        message: '头像不能为空'
                    },
                },
            },
            gender: {
                message: '性别验证失败',
                validators: {
                    notEmpty: {
                        message: '性别不能为空'
                    },
                },
            },
            city: {
                message: '城市验证失败',
                validators: {
                    notEmpty: {
                        message: '城市不能为空'
                    },
                },
            },
            province: {
                message: '省验证失败',
                validators: {
                    notEmpty: {
                        message: '省不能为空'
                    },
                },
            },
            country: {
                message: '国家验证失败',
                validators: {
                    notEmpty: {
                        message: '国家不能为空'
                    },
                },
            },
            language: {
                message: '语言验证失败',
                validators: {
                    notEmpty: {
                        message: '语言不能为空'
                    },
                },
            },
            createTime: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            },
            updateTime: {
                message: '最后登录的时间验证失败',
                validators: {
                    notEmpty: {
                        message: '最后登录的时间不能为空'
                    },
                },
            }
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.memberInfo = {};
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        // 表单验证
        validate: function () {
            var bl = $('form').VF();// 启用验证
            if (!bl) {
                return;
            }
        },
        /*数量统计*/
        getCountList:function(){
            $.get(baseURL + "member/memberinfo/getCountList/", function (r) {
                vm.countList = r;
            });
        },
        /*冻结*/
        activate:function(event){
         var act_value=$(event.currentTarget).attr("act_value");
         let rows=getSelectedRows();
         if (rows== null){
             return;
         }
         let flag=true;
         let ids=[];
         rows.forEach(function(item){
             if (act_value==1){
                 if (item.frozen==1){//没有冻结
                     ids.push(item.id);
                 }else{
                     flag=false;
                 }
             }else{
                 if (item.frozen==2){//解冻
                     ids.push(item.id);
                 }else{
                     flag=false;
                 }
             }


         })
            if(act_value==1){
                if (flag==false){
                    alert("已冻结的用户不得重复冻结!")
                    return
                }

                $.ajax({
                    type: "POST",
                    url: baseURL + "member/memberinfo/activate",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code === 0) {
                            alert('操作成功', function (index) {
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });


            }else{
                if (flag==false){
                    alert("用户无需解冻!")
                    return
                }
                $.ajax({
                    type: "POST",
                    url: baseURL + "member/memberinfo/activateTwo",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code === 0) {
                            alert('操作成功', function (index) {
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            }




        },
        saveOrUpdate: function (event) {
            var url = vm.memberInfo.id == null ? "member/memberinfo/save"
                : "member/memberinfo/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.memberInfo),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        del: function (event) {
            var ids = getSelectedRowsId("id");
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "member/memberinfo/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getInfo: function (id) {
            $.get(baseURL + "member/memberinfo/info/" + id, function (r) {
                vm.memberInfo = r.memberInfo;
            });
        },

        //二级列表的刷新
        reloadData: function (event) {
            vm.title = "属性管理"
            vm.showList2 = true;
            vm.showList = false;
            $("#table2").BTF5(vm.queryParams2);
        },

        reload: function (event) {
            vm.showList = true;
            vm.showList2 = false;
            vm.title = "";
            // 刷新 如需条件查询common.js
            $("#table").BTF5(vm.queryParams);
        },

        //页面强刷
        reloadTwo: function () {
            vm.reload();
        }
    },
    created:function(){
        this.getCountList()
    }
});