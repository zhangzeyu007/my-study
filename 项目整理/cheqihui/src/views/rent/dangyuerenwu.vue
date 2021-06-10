<template>
    <div class="dangyue">
        <page-header title="当月任务" />
        <page-main>
            <!-- 头部可视化 -->
            <header-view></header-view>
            <!-- /头部可视化 -->

            <!-- 中间进度条 -->
            <div
                class="jdtbox"
                style="width: 100%; height: 150px; position: relative;"
            >
                <!-- 进度条 -->
                <el-progress
                    :format="format"
                    :text-inside="true"
                    :stroke-width="35"
                    :percentage="percentage10"
                    :color="customColor"
                ></el-progress>
                <!-- 今天-->
                <div class="todaynow">
                    <h2 style="color: white; font-weight: lighter;">
                        {{ nowDate }} 今天
                    </h2>
                    <div class="minitoday"></div>
                </div>
            </div>

            <!-- 中间tabs标签模块 -->
            <el-tabs v-model="activeName" stretch @tab-click="handleClick">
                <el-tab-pane label="5月01———5月10日" name="first">
                    <div class="userManager">
                        <div class="user1">
                            <div class="box">
                                1
                            </div>
                            <h4>代发任务:202105-1</h4>
                            <div class="text">
                                <span class="span1"
                                    ><span>总金额(¥)</span><br /><span
                                        class="span4"
                                        >10000</span
                                    ></span
                                >
                                <span class="span2"
                                    ><span>客户数</span><br /><span
                                        class="span5"
                                        >106</span
                                    ></span
                                >
                                <span class="span3"
                                    ><span>人员</span><br /><span class="span6"
                                        >576</span
                                    ></span
                                >
                            </div>
                            <el-progress
                                type="circle"
                                :percentage="percentage4"
                                :color="colors"
                            ></el-progress>
                            <div class="watch">查看详情</div>
                        </div>
                        <div class="user2">
                            <div class="box">
                                2
                            </div>
                            <h4>代发任务:202105-1</h4>
                            <div class="text">
                                <span class="span1"
                                    ><span>总金额(¥)</span><br /><span
                                        class="span4"
                                        >10000</span
                                    ></span
                                >
                                <span class="span2"
                                    ><span>客户数</span><br /><span
                                        class="span5"
                                        >106</span
                                    ></span
                                >
                                <span class="span3"
                                    ><span>人员</span><br /><span class="span6"
                                        >576</span
                                    ></span
                                >
                            </div>
                            <el-progress
                                type="circle"
                                :percentage="percentage5"
                                :color="colors"
                            ></el-progress>
                            <div class="rightnow">立即发放</div>
                        </div>
                        <div class="user3">
                            <div class="box">
                                3
                            </div>
                            <h4>代发任务:202105-1</h4>
                            <div class="text">
                                <span class="span1"
                                    ><span>总金额(¥)</span><br /><span
                                        class="span4"
                                        >10000</span
                                    ></span
                                >
                                <span class="span2"
                                    ><span>客户数</span><br /><span
                                        class="span5"
                                        >106</span
                                    ></span
                                >
                                <span class="span3"
                                    ><span>人员</span><br /><span class="span6"
                                        >576</span
                                    ></span
                                >
                            </div>
                            <el-progress
                                type="circle"
                                :percentage="percentage6"
                                :color="colors"
                            ></el-progress>
                            <div class="watch">预约发放</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="5月11———5月20日" name="second">
                    <div class="userManager">
                        <div class="user1">
                            <div class="box">
                                1
                            </div>
                            <h4>代发任务:202105-1</h4>
                            <div class="text">
                                <span class="span1"
                                    ><span>总金额(¥)</span><br /><span
                                        class="span4"
                                        >10000</span
                                    ></span
                                >
                                <span class="span2"
                                    ><span>客户数</span><br /><span
                                        class="span5"
                                        >106</span
                                    ></span
                                >
                                <span class="span3"
                                    ><span>人员</span><br /><span class="span6"
                                        >576</span
                                    ></span
                                >
                            </div>
                            <el-progress
                                type="circle"
                                :percentage="percentage1"
                                :color="colors"
                            ></el-progress>
                            <div class="watch">查看详情</div>
                        </div>
                        <div class="user2">
                            <div class="box">
                                2
                            </div>
                            <h4>代发任务:202105-1</h4>
                            <div class="text">
                                <span class="span1"
                                    ><span>总金额(¥)</span><br /><span
                                        class="span4"
                                        >10000</span
                                    ></span
                                >
                                <span class="span2"
                                    ><span>客户数</span><br /><span
                                        class="span5"
                                        >106</span
                                    ></span
                                >
                                <span class="span3"
                                    ><span>人员</span><br /><span class="span6"
                                        >576</span
                                    ></span
                                >
                            </div>
                            <el-progress
                                type="circle"
                                :percentage="percentage2"
                                :color="colors"
                            ></el-progress>
                            <div class="rightnow">立即发放</div>
                        </div>
                        <div class="user3">
                            <div class="box">
                                3
                            </div>
                            <h4>代发任务:202105-1</h4>
                            <div class="text">
                                <span class="span1"
                                    ><span>总金额(¥)</span><br /><span
                                        class="span4"
                                        >10000</span
                                    ></span
                                >
                                <span class="span2"
                                    ><span>客户数</span><br /><span
                                        class="span5"
                                        >106</span
                                    ></span
                                >
                                <span class="span3"
                                    ><span>人员</span><br /><span class="span6"
                                        >576</span
                                    ></span
                                >
                            </div>
                            <el-progress
                                type="circle"
                                :percentage="percentage3"
                                :color="colors"
                            ></el-progress>
                            <div class="watch" @click="btn">预约发放</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="5月21———5月30日" name="third">
                    <div class="userManager">
                        <div class="user1">
                            <div class="box">
                                1
                            </div>
                            <h4>代发任务:202105-1</h4>
                            <div class="text">
                                <span class="span1"
                                    ><span>总金额(¥)</span><br /><span
                                        class="span4"
                                        >10000</span
                                    ></span
                                >
                                <span class="span2"
                                    ><span>客户数</span><br /><span
                                        class="span5"
                                        >106</span
                                    ></span
                                >
                                <span class="span3"
                                    ><span>人员</span><br /><span class="span6"
                                        >576</span
                                    ></span
                                >
                            </div>
                            <el-progress
                                type="circle"
                                :percentage="percentage7"
                                :color="colors"
                            ></el-progress>
                            <div class="watch">查看详情</div>
                        </div>
                        <div class="user2">
                            <div class="box">
                                2
                            </div>
                            <h4>代发任务:202105-1</h4>
                            <div class="text">
                                <span class="span1"
                                    ><span>总金额(¥)</span><br /><span
                                        class="span4"
                                        >10000</span
                                    ></span
                                >
                                <span class="span2"
                                    ><span>客户数</span><br /><span
                                        class="span5"
                                        >106</span
                                    ></span
                                >
                                <span class="span3"
                                    ><span>人员</span><br /><span class="span6"
                                        >576</span
                                    ></span
                                >
                            </div>
                            <el-progress
                                type="circle"
                                :percentage="percentage8"
                                :color="colors"
                            ></el-progress>
                            <div class="rightnow">立即发放</div>
                        </div>
                        <div class="user3">
                            <div class="box">
                                3
                            </div>
                            <h4>代发任务:202105-1</h4>
                            <div class="text">
                                <span class="span1"
                                    ><span>总金额(¥)</span><br /><span
                                        class="span4"
                                        >10000</span
                                    ></span
                                >
                                <span class="span2"
                                    ><span>客户数</span><br /><span
                                        class="span5"
                                        >106</span
                                    ></span
                                >
                                <span class="span3"
                                    ><span>人员</span><br /><span class="span6"
                                        >576</span
                                    ></span
                                >
                            </div>
                            <el-progress
                                type="circle"
                                :percentage="percentage9"
                                :color="colors"
                            ></el-progress>
                            <div class="watch">预约发放</div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!-- /中间tabs标签模块 -->

            <!-- 底部提示框 -->
            <div class="notice">
                <h4 style="margin-bottom: 10px;">操作提示</h4>
                <p>1.每个月分三个时段发放,分别是10号丶20号丶30号。</p>
                <p>2.已发放的可以查看相应的发放记录。</p>
                <p>3.当前发放任务可以进行该时段的发放操作。</p>
                <p>4.未到时段的发放任务不可提前操作。</p>
            </div>
            <!--/底部提示框 -->
        </page-main>
    </div>
</template>

<script>
import headerView from "./components/header-view";
import { formatDate } from "../../util/date";
export default {
    components: { headerView },
    data() {
        return {
            nowDate: "", // 当前日期
            activeName: "second",
            // 进度条1
            percentage1: 90,
            percentage2: 10,
            percentage3: 0,
            percentage4: 10,
            percentage5: 10,
            percentage6: 10,
            percentage7: 10,
            percentage8: 10,
            percentage9: 10,
            percentage10: 80,
            colors: [
                { color: "#f56c6c", percentage: 20 },
                { color: "#e6a23c", percentage: 40 },
                { color: "#5cb87a", percentage: 60 },
                { color: "#1989fa", percentage: 80 },
                { color: "#3291f8", percentage: 100 }
            ],
            customColor: "#28bf94"
        };
    },
    computed: {},
    created() {},
    mounted() {
        this.currentTime();
    },
    beforeDestroy() {
        if (this.formatDate) {
            clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        format() {
            return "执行中";
        },
        btn() {
            alert("11111");
        },
        //获取当前时间
        currentTime() {
            setInterval(this.formatDate, 500);
        },
        formatDate() {
            let date = new Date();
            let year = date.getFullYear(); // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日

            this.nowDate = `${month}.${day}`;
        }
    },
    filters: {
        //时间戳
        formatDate(time) {
            return formatDate(time);
        }
    }
};
</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}
::v-deep .el-tabs__content {
    overflow: visible;
}
// 中间tabs标签页
::v-deep .el-tabs__nav-scroll {
    width: 50% !important;
    margin: 0 auto !important;
}
.userManager {
    overflow: visible;
    display: flex;
    justify-content: space-around;
    .el-progress {
        position: absolute;
        bottom: 30px;
        left: 94px;
    }
    .user1,
    .user2,
    .user3 {
        overflow: visible;
        position: relative;
        padding: 25px;
        width: 28%;
        height: 300px;
        background-color: #ebf4ff;
        border: 1px solid #7ab8fb;
        border-radius: 5px;
        h4 {
            text-align: right;
        }
        .box {
            position: absolute;
            top: -1px;
            left: -1px;
            width: 50px;
            height: 50px;
            color: white;
            font-size: 16px;
            background-color: #313ac3;
            line-height: 50px;
            text-align: center;
        }
    }
    .text {
        position: absolute;
        right: 25px;
        display: flex;
        margin-top: 30px;
        .span1,
        .span2 {
            margin-right: 30px;
        }
        .span4,
        .span5,
        .span6 {
            font-size: 14px;
            font-weight: 700;
        }
    }
    .watch,
    .rightnow {
        cursor: pointer;
        position: absolute;
        bottom: -12px;
        left: 107px;
        width: 100px;
        height: 30px;
        font-size: 14px;
        color: #409eff;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
        background-color: #ebf4ff;
        border: 1px solid #7ab8fb;
    }
    .rightnow {
        color: white;
        background-color: #313ac3;
        border: 1px solid #7ab8fb;
    }
}
.middlejdt {
    position: absolute;
}
// /中间tabs标签页
.jdtbox .el-progress {
    position: absolute !important;
    width: 179px;
    left: 884px;
    bottom: 22px;
}

//今天
.todaynow {
    position: absolute;
    text-align: center;
    box-shadow: 0 0 20px #c0c4cc;
    width: 108px;
    height: 35px;
    background-color: #de5346;
    bottom: 0;
    left: 50%;
    border-radius: 5px;
    transform: translate(-50%);
}
.minitoday {
    position: absolute;
    width: 8px;
    height: 10px;
    background-color: #de5346;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%);
}

//底部
.notice {
    margin: 40px auto;
    padding: 25px;
    width: 1018px;
    height: 200px;
    background-color: #f0f3f8;
    border: 1px solid #e1e3e6;
    p {
        color: #757775;
        line-height: 28px;
    }
}
</style>
