<template>
    <div class="lishi">
        <page-header title="历史任务" />
        <page-main>
            <!-- 头部可视化 -->
            <header-view :historyView="historyView"></header-view>
            <!-- /头部可视化 -->

            <!-- 时间选择器 -->
            <div class="block1">
                <el-date-picker
                    v-model="value"
                    type="date"
                    placeholder="选择日期"
                >
                </el-date-picker>
            </div>
            <!-- /时间选择器 -->

            <!-- 日历组件 -->
            <el-calendar v-model="value">
                <template v-slot:dateCell="{ date, data }">
                    <div style=" position: relative; height: 100%;">
                        <span
                            style="position: absolute; top: 10px; left: 10px;"
                        >
                            {{ data.day | getDay }}
                        </span>
                        <div
                            v-if="isWeek(date)"
                            style="background-color: #28bf94; position: absolute; top: 0; height: 100%; width: 100%; color: white; padding: 10px;"
                        >
                            {{ data.day | getDay }}
                        </div>
                    </div>
                </template>
            </el-calendar>

            <!--历史任务-日期点击-查看弹窗-->
            <el-dialog
                :visible.sync="chosediag"
                width="70%"
                :modal="true"
                :close-on-click-modal="false"
            >
                <div class="succ">
                    <!-- 头部可视化 -->
                    <header-view2 :historyList="historyList"></header-view2>
                    {{ value | dayFormat }}
                    <!-- 时间选择器 -->
                    <div class="block">
                        <el-date-picker
                            v-model="value"
                            type="date"
                            placeholder="选择日期"
                            clearable
                            @change="getDateCheck"
                        >
                        </el-date-picker>

                        <!-- 筛选 -->
                        <a
                            href="javascript:;"
                            class="chose"
                            @click="checkChoiseDialog = !checkChoiseDialog"
                            ><svg-icon class="choise" name="choise2" /> 筛选</a
                        >

                        <!-- 日期点击-查看-筛选弹窗 -->
                        <div class="shaixuanBox" v-if="checkChoiseDialog">
                            <span
                                @click="checkChoiseDialog = false"
                                style="font-size: 37px; position: absolute; right: 10px; top: -6px;"
                                >×</span
                            >
                            <el-input
                                style="position: absolute; top: 52px; width: 300px; left: 25px;"
                                placeholder="公司名称/法人..."
                                v-model="historyCheckData.search"
                                clearable
                                @keydown.enter.native="getDateCheck"
                                @clear="getDateCheck"
                            >
                            </el-input>

                            <!-- 单选框 -->
                            <span
                                style="position: absolute; left: 25px; top: 112px;"
                                >完成度</span
                            >

                            <el-radio-group
                                size="small"
                                @change="getDateCheck"
                                style="position: absolute; top: 107px; width: 300px; left: 77px;"
                                v-model="historyCheckData.status"
                            >
                                <el-radio-button label="2"
                                    >全部</el-radio-button
                                >
                                <el-radio-button label="1"
                                    >已完成</el-radio-button
                                >
                                <el-radio-button label="0"
                                    >未完成</el-radio-button
                                >
                            </el-radio-group>

                            <el-button
                                style="position: absolute; bottom: 20px; right: 20px; font-size: 17px; width: 97px;"
                                type="primary"
                                size="small"
                                @click="getDateCheck"
                                >搜索</el-button
                            >
                        </div>
                        <!-- /日期点击-查看-筛选弹窗 -->
                    </div>
                </div>

                <!-- 表单 -->
                <el-table
                    :data="historyTableData"
                    stripe
                    style="width: 100%;"
                    :header-cell-style="{ background: '#fafafa' }"
                >
                    <el-table-column prop="name" label="名称" width="180">
                    </el-table-column>
                    <el-table-column prop="rental" label="租金">
                    </el-table-column>
                    <el-table-column prop="cars" label="车辆">
                    </el-table-column>
                    <el-table-column prop="address" label="完成度">
                        <template scope="scope">
                            <el-progress :percentage="Math.round(scope.row.completeness * 100)"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="">
                        <el-button
                            class="el-button-wid"
                            type="primary"
                            size="mini"
                            plain
                            @click="mingxiDialog = true"
                        >
                            明细
                        </el-button>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination
                    :current-page="pagination.page"
                    :total="pagination.total"
                    :page-size="pagination.size"
                    :page-sizes="pagination.sizes"
                    :layout="pagination.layout"
                    :hide-on-single-page="false"
                    class="pagination"
                    background
                    @size-change="onSizeChange"
                    @current-change="onCurrentChange"
                />
                <!-- /分页 -->
            </el-dialog>
            <!-- /历史任务-日期点击-查看弹窗-->

            <!-- 历史任务-日期点击-查看-明细弹窗 -->
            <el-dialog
                :visible.sync="mingxiDialog"
                width="70%"
                :modal="true"
                :close-on-click-modal="false"
            >
                <h1
                    style="position: relative; top: 0; font-weight: 400; margin: 0;"
                >
                    详情
                </h1>

                <!-- tabs栏 -->
                <el-tabs
                    class="activetabs"
                    v-model="activeName"
                    @tab-click="handleClick"
                >
                    <el-tab-pane label="明细" name="first">
                        <!-- 明细页面 -->
                        <div
                            style="width: 100%; height: 100px; text-align: center; margin-top: 20px;"
                        >
                            <h3>杭州妙果科技有限公司</h3>
                            <h3>2020.5.10</h3>
                            <!-- 筛选 -->
                            <a href="javascript:;" class="chose"
                                ><svg-icon class="choise" name="choise2" />
                                筛选</a
                            >
                        </div>

                        <!-- table表格 -->
                        <el-table :data="mingxiData" style="width: 100%;">
                            <el-table-column type="index" width="50">
                            </el-table-column>
                            <el-table-column prop="date" label="车主">
                            </el-table-column>
                            <el-table-column prop="name" label="车牌">
                            </el-table-column>
                            <el-table-column prop="address" label="现金">
                            </el-table-column>
                            <el-table-column prop="address" label="油卡充值">
                            </el-table-column>
                            <el-table-column prop="address" label="刮刮卡">
                            </el-table-column>
                            <el-table-column prop="address" label="油卡转让">
                            </el-table-column>
                            <el-table-column prop="address" label="服务费">
                            </el-table-column>
                            <el-table-column prop="address" label="合计">
                            </el-table-column>
                            <el-table-column prop="address" label="状态">
                            </el-table-column>
                            <el-table-column prop="address" label="">
                                <el-button type="primary" size="mini" plain
                                    >明细</el-button
                                >
                            </el-table-column>
                        </el-table>

                        <!-- 分页 -->
                        <el-pagination
                            :current-page="pagination.page"
                            :total="pagination.total"
                            :page-size="pagination.size"
                            :page-sizes="pagination.sizes"
                            :layout="pagination.layout"
                            :hide-on-single-page="false"
                            class="pagination"
                            background
                            @size-change="onSizeChange"
                            @current-change="onCurrentChange"
                        />

                        <!-- 明细页面 -->
                    </el-tab-pane>

                    <el-tab-pane label="合同" name="second"
                        >配置管理</el-tab-pane
                    >
                    <el-tab-pane label="统计" name="third">
                        <!-- 客户-详情-统计 -->
                        <!-- 明细页面 -->
                        <div
                            style="width: 100%; height: 100px; text-align: center; margin-top: 20px;"
                        >
                            <h3>杭州妙果科技有限公司</h3>
                            <h3>2020.5.10</h3>
                            <!-- 筛选 -->
                            <a href="javascript:;" class="chose"
                                ><svg-icon class="choise" name="choise2" />
                                筛选</a
                            >
                        </div>

                        <!-- 头部可视化 -->
                        <header-view></header-view>
                        <!-- /头部可视化 -->

                        <!-- 头部可视化 -->
                        <header-view
                            style="margin-top: 20px; margin-bottom: 30px;"
                        ></header-view>
                        <!-- /头部可视化 -->

                        <!-- 客户-详情-统计 -->
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
            <!-- /历史任务-日期点击-查看-明细弹窗 -->

            <!-- xxxxxx弹窗 -->
            <el-dialog
                :visible.sync="mingxiDialog1"
                width="70%"
                :modal="true"
                :close-on-click-modal="false"
            >
                xxxxx
            </el-dialog>
            <!-- /xxxxxx弹窗 -->
        </page-main>
    </div>
</template>

<script>
import headerView from "./components/header-view";
import headerView2 from "./components/header-view2";

// import calendar from "./components/calendar";

export default {
    components: { headerView, headerView2 },
    filters: {
        getDay(value) {
            const day = value.split("-")[2];
            return day.startsWith("0") ? day.substr(1) : day;
        }
    },
    data() {
        return {
            //历史任务主页可视化传参
            historyInfo: {
                pageNum: 1,
                pageSize: 10,
                status: 2,
                time: "10"
            },
            //选中日期查看传参
            historyCheckData: {
                pageNum: 1,
                pageSize: 10,
                search: "",
                status: "2",
                time: "10"
            },

            //历史任务上方可视化数据列表
            historyView: [],

            //点击时间-查看正上方数据列表
            historyList: [],

            //点击时间-查看-表单数据
            historyTableData: [],

            mingxiData: [{ name: "前任两" }],

            activeName: "first",

            value:'',

            // 点击时间-查看弹窗
            chosediag: true,

            //点击时间-查看-筛选弹窗
            checkChoiseDialog: false,

            // 点击明细弹窗
            mingxiDialog: false,
            //弹窗3
            mingxiDialog1: false,

            //分页
            pagination: {
                page: 1,
                size: 10,
                total: 0,
                sizes: [10, 20, 50, 100],
                layout: "total, sizes, ->, prev, pager, next, jumper"
            }
        };
    },
    created() {
        //历史任务首页可视化
        this.getHistoryView();
        //点击日期查看窗口数据
        this.getDateCheck();
    },
    methods: {
        isWeek(value) {
            return value.getDay() === 6 || value.getDay() === 0;
        },
        // 历史任务获取正上方可视化数据
        getHistoryView() {
            this.$api
                .post("/rent/queryTotalprice", this.historyInfo)
                .then(res => {
                    this.historyView = res.data;
                    this.historyList = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        //点击日期-查看-表单数据
        getDateCheck() {

            this.$api
                .post("/rent/queryRent", this.historyCheckData)
                .then(res => {
                    console.log(res, 8888);
                    console.log(this.value);
                    this.historyTableData = res.data.records;
                    this.pagination.total = res.data.total;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        //tabs栏
        handleClick(tab, event) {
            console.log(tab, event);
        },

        // 分页
        onSizeChange(size) {
            this.pagination.size = size;
            this.getDateCheck();
        },
        onCurrentChange(page) {
            this.pagination.page = page;
            this.getDateCheck();
        }
    }
};
</script>

<style lang="scss" scoped>
h4,
h3,
p {
    padding: 5px;
    margin: 0;
}
.pagination {
    margin-top: 20px;
}
::v-deep .pagination .el-pagination__rightwrapper .el-pager > .active {
    background-color: #1abc9c !important;
}
.block1 {
    margin-top: 20px;
}

// ::v-deep .el-dialog__header {
//     padding: 0 !important;
// }
::v-deep .el-dialog__body {
    padding: 10px !important;
}
::v-deep .el-tabs__content {
    overflow: visible;
}
::v-deep .el-progress--circle .el-progress__text,
.el-progress--dashboard .el-progress__text {
    left: -26px;
}
::v-deep .el-calendar-table .el-calendar-day {
    padding: 0 !important;
}

//点击日期弹窗
.succ {
    position: relative;
    margin-bottom: 25px;
}

//时间选择器
.block {
    margin-top: 20px;
}
// 筛选
.chose {
    text-decoration: none;
    color: #313ac7;
    font-size: 16px;
    position: absolute;
    right: 0;
}
.shaixuanBox {
    position: absolute;
    width: 348px;
    height: 228px;
    background-color: #fff;
    z-index: 99999;
    top: 197px;
    right: 0;
    box-shadow: 0 0 20px #e3e4e7;
    span {
        cursor: pointer;
    }
}
//点击日期弹窗完

//点击日期-明细弹窗
.activetabs {
    margin-top: 30px;
}
.el-tabs__item {
    font-size: 18px !important;
    color: #3841db;
    padding: 0 34px;
}
//点击日期-明细弹窗完
</style>
