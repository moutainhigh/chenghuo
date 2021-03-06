$(function () {

    // 列表
    $("#table").BT({
        url: baseURL + 'order/orderrefund/list',
        columns: [{
            checkbox: true
        }, {
            title: '退款编号',
            field: 'refundNumber',
            formatter: function (value, row, index) {
                return '<a onclick="vm.detail(' + row.id + ')">' + value + '</a>';
            }
        }, {
            title: '订单编号',
            field: 'orderNumber'
        }, {
            title: '类型',
            field: 'type',
            formatter: function (value, row, index) {
                if (value == 1) {
                    return '<span class="label label-primary">退款</span>';
                } else if (value == 2) {
                    return '<span class="label label-info">退货退款</span>';
                }
            }
        }, {
            title: '会员昵称',
            field: 'nickName'
        }, {
            title: '商品名称',
            field: 'orderGoodsEntity.goodsName'
        },{
            title: '退款金额',
            field: 'refundAmount'
        }, {
            title: '退款数量',
            field: 'orderGoodsEntity.buyNum'
        },
            {
            title: '退款说明',
            field: 'explain',
            /*formatter:function (value,row,index) {
                if (value == 1) {
                    return '拍错/不喜欢/效果不好';
                } else if (value == 2) {
                    return '材质与商品描叙不符';
                } else if (value == 3) {
                    return '大小尺寸与商品描叙不符';
                }
                return '';
            }*/
        }, {
            title: '申请时间',
            field: 'createTime'
        }, {
            title: '状态',
            field: 'status',
            formatter: function (value, row, index) {
                if (value == 1) {
                    return '<span class="label label-primary">待处理</span>';
                } else if (value == 2) {
                    return '<span class="label label-info">待取件</span>';
                } else if (value == 3) {
                    return '<span class="label label-success">已取件</span>';
                } else if (value == 4) {
                    return '<span class="label label-warning">已收件</span>';
                } else if (value == 5) {
                    return '<span class="label label-danger">退款成功</span>';
                } else if (value == 6) {
                    return '<span class="label label-default">退款失败</span>';
                }
                return '';
            }
        }, {
            title: '处理时间',
            field: 'processTime'
        }],
        // 条件查询
        queryParams: {}
    });
    // 表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
    })
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        sendShow:true,
        showList: true,
        disabled: true,
        disabledAll: true,
        wuLiu: false,//默认物流信息隐藏
        title: null,
        orderRefund: {
            memberInfo: {},
            picUrls: [],
            orderLogistics: {},
            orderGoodsEntity:{},
            refundLogisticsEntity:{
                logisticsId:""
            }
        },
        logisticsCompanyList: [],//物流公司list
        content:{
            data:{
                time:"",
                ftime:"",
                context:"",
            }
        },//物流信息
        //类型
        typeList: [
            {'value': 1, 'label': '仅退款'},
            {'value': 2, 'label': '退货退款'}
        ],
        //状态
        statusList: [
            {'value': 1, 'label': '待处理'},
            {'value': 2, 'label': '待取件'},
            {'value': 3, 'label': '已取件'},
            {'value': 4, 'label': '商家已收件'},
            {'value': 5, 'label': '退款成功'},
            {'value': 6, 'label': '退款失败'}//(1待处理  2待取件  3已取件  4已收件  5退款成功  6退款失败)
        ],
        queryParams: {
            type: '',
            status: ''
        },
        // 验证字段
        fields: {
            orderNumber: {
                message: '订单编号验证失败',
                validators: {
                    notEmpty: {
                        message: '订单编号不能为空'
                    },
                },
            },
            refundNumber: {
                message: '退款编号验证失败',
                validators: {
                    notEmpty: {
                        message: '退款编号不能为空'
                    },
                },
            },
            memberId: {
                message: '会员id验证失败',
                validators: {
                    notEmpty: {
                        message: '会员id不能为空'
                    },
                },
            },
            refundAmount: {
                message: '退款金额验证失败',
                validators: {
                    notEmpty: {
                        message: '退款金额不能为空'
                    },
                },
            },
            createTime: {
                message: '申请时间验证失败',
                validators: {
                    notEmpty: {
                        message: '申请时间不能为空'
                    },
                },
            },
            processTime: {
                message: '处理时间验证失败',
                validators: {
                    notEmpty: {
                        message: '处理时间不能为空'
                    },
                },
            },

        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        queryWuLiu: function () {
            var companyId = vm.orderRefund.refundLogisticsEntity.logisticsId;
            var nu = vm.orderRefund.refundLogisticsEntity.logisticsNumber;
            $.get(baseURL + "order/orderrefund/queryLogistics", {companyId: companyId, nu: nu}, function (r) {
                vm.content = JSON.parse(r.content);
                vm.wuLiu = true;
            });
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.orderRefund = {
                orderLogistics: {
                    companyId: ''
                }
            };
        },
        detail: function (id) {
            vm.showList = false;
            vm.title = "详情";

            vm.getInfo(id)



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
        saveOrUpdate: function (event) {
            var url = vm.orderRefund.id == null ? "order/orderrefund/save" : "order/orderrefund/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.orderRefund),
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
                    url: baseURL + "order/orderrefund/delete",
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
                var _that=this;
            // bindSelect("sltParent", "order/logistics/list2?status=" + 1);
            $.get(baseURL + "order/orderrefund/info/" + id, function (r) {
                if (r.orderRefund.refundLogisticsEntity == null){
                    r.orderRefund.refundLogisticsEntity={};
                }
                if (r.orderRefund.refundLogisticsEntity.logisticsNumber!=null){
                    vm.sendShow=false;
                }

                vm.orderRefund = r.orderRefund;
                vm.orderRefund.picUrls = r.orderRefund.picUrls;//图片凭证
                var dataId="";
                if (vm.orderRefund.type==2){
                    if (r.orderRefund.refundLogisticsEntity!=null){
                        if(r.orderRefund.refundLogisticsEntity.logisticsId==null){
                            dataId=""
                        }else{

                            dataId=r.orderRefund.refundLogisticsEntity.logisticsId;
                        }
                    }else{

                    }

                    _that.getLogisticsCompany(dataId);
                }

                // $(".selectLogistics").val(vm.orderRefund.orderLogistics.companyId).trigger("change");
            });
        },
        //发货
        sendGoods: function () {
            var logisticsId= vm.orderRefund.refundLogisticsEntity.id;

            var companyName = $("#dataIdSelect").find("option:selected").text();
            var companyId = $("#dataIdSelect").find("option:selected").val();
            if (companyId == "" || companyId == null) {
                alert("请选择物流公司");
                return false;
            }
            var logisticsNumber = vm.orderRefund.refundLogisticsEntity.logisticsNumber;
            if (logisticsNumber == "") {
                alert("请填写物流单号");
                return false;
            }
            var logisticsPrice=vm.orderRefund.refundLogisticsEntity.logisticsPrice;
            var reg= /^-?\d\d$|^-?100$/;

            if (logisticsPrice==null || logisticsPrice==''){
                alert("请填写运费")
                return false
            }
            if (reg.test(logisticsPrice)){

            }else{
                alert("不能超过100运费")
                return false
            }

            $.get(baseURL + "order/orderrefund/sendGoods", {
                logisticsId:logisticsId,
                companyId: companyId,
                companyName: companyName,
                logisticsNumber: logisticsNumber,
                logisticsPrice:logisticsPrice,
                refundNumber: vm.orderRefund.refundNumber
            }, function (r) {
                vm.reload();
            });
        },
        //退运费
        tuiMoney:function(){
            if (vm.orderRefund.refundLogisticsEntity.logisticsPrice!=null && vm.orderRefund.refundLogisticsEntity.logisticsPrice!=""){
                var id=vm.orderRefund.memberId;//退积分用户
                var money =vm.orderRefund.refundLogisticsEntity.logisticsPrice;//退的积分价格
                $.get(baseURL + "order/orderrefund/tuiK", {id: id, money: money}, function (r) {
                    vm.reload();
                });
            }


        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            vm.content="";
            // 刷新 如需条件查询common.js
            $("#table").BTF5(vm.queryParams);
            $("form").RF();
        },
        //同意退款
        refundOk: function () {
            var id = vm.orderRefund.id;
            var remarks = vm.orderRefund.remarks;
            var refundNumber=vm.orderRefund.refundNumber;
            var orderNumber=vm.orderRefund.orderNumber;
            $.get(baseURL + "order/orderrefund/handle", {id: id, remarks: remarks, status: 5,refundNumber:refundNumber,orderNumber:orderNumber}, function (r) {
                vm.reload();
            });
        },
        //拒绝退款
        refundError: function () {
            var id = vm.orderRefund.id;
            var remarks = vm.orderRefund.remarks;
            $.get(baseURL + "order/orderrefund/handle", {id: id, remarks: remarks, status: 6}, function (r) {
                vm.reload();
            });
        },
        //确认收到退货4---退款5
        refundReceipt: function () {
            var id = vm.orderRefund.id;
            var expressFee = vm.orderRefund.expressFee;
            $.get(baseURL + "order/orderrefund/refundReceipt", {id: id, status: 4,expressFee:expressFee}, function (r) {
                vm.reload();
            });
        },
        //查询物流公司（status=1）
        getLogisticsCompany: function (dataId) {
            // $.get(baseURL + "order/logistics/list2?status=" + 1, function (r) {
            //     vm.logisticsCompanyList = r.logisticsList;
            // });
            // $("#logistic").selectpicker()
            $.ajax({
                type: 'get',
                url: baseURL +"order/logistics/list2?status=" + 1,
                contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                dataType:   "json",
                async : true,
                success : function(result) {
                    var str = '<option value="" >请选择</option>';
                for(var i = 0;i<result.logisticsList.length;i++) {
                    str+='<option value="'+result.logisticsList[i].id+'">'+result.logisticsList[i].companyName+'</option>';
                }

                $('#dataIdSelect').html(str);
                if(dataId != '' && dataId != 'undefined') {
                    $('#dataIdSelect').selectpicker('val', dataId);
                }
                $('#dataIdSelect').selectpicker('refresh');


                }
            });


        },
    },
    created: function () {
        //初始化物流公司
        //  this.getLogisticsCompany("");


    }
});
