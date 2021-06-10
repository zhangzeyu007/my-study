<template>
    <div>
        <page-header title="待发放列表" />
        <page-main>
            <!-- 头部搜索 -->
            <el-row :gutter="20">
                <el-col :span="16">
                    <search-bar>
                        <el-form
                            :model="queryInfo"
                            size="small"
                            label-width="120px"
                        >
                            <el-row>
                                <el-col>
                                    <el-input
                                        v-model="queryInfo.search"
                                        placeholder="请输入公司名称/法人..."
                                        clearable
                                        class="searchbar"
                                        @keydown.enter.native="getRentList"
                                        @clear="getRentList"
                                    >
                                        <el-button
                                            slot="append"
                                            style="background-color: #1abc9c; color: #fff;"
                                            icon="el-icon-search"
                                            @click="getRentList"
                                            >搜素</el-button
                                        >
                                    </el-input>
                                </el-col>
                                <el-col>
                                    <div style="margin-top: 20px;">
                                        <span
                                            style="margin-right: 29px; font-size: 14px;"
                                            >状态:</span
                                        >
                                        <el-radio-group
                                            v-model="queryInfo.status"
                                            size="mini"
                                            @change="getRentList"
                                            fill="#1abc9c"
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
                                    </div>
                                </el-col>
                                <el-col>
                                    <div style="margin-top: 15px;">
                                        <span
                                            style="margin-right: 15px; font-size: 14px;"
                                            >发放日:</span
                                        >
                                        <el-radio-group
                                            v-model="queryInfo.time"
                                            size="mini"
                                            @change="getRentList"
                                            fill="#1abc9c"
                                        >
                                            <el-radio-button label="10"
                                                >10</el-radio-button
                                            >
                                            <el-radio-button label="15"
                                                >15</el-radio-button
                                            >
                                            <el-radio-button label="25"
                                                >25</el-radio-button
                                            >
                                        </el-radio-group>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </search-bar>
                </el-col>
                <!-- 任务栏 -->
                <el-col :span="8">
                    <div class="renwu">
                        <div class="todaynow">
                            <h2
                                style="color: white; font-weight: lighter; position: absolute; top: -16px; right: 4px;"
                            >
                                {{ todayDate }} 今天
                            </h2>
                            <div class="minitoday"></div>
                        </div>
                        <div class="rwsmall">
                            <div
                                style="position: absolute; top: -66px; left: -1px; width: 43px; font-size: 14px;"
                            >
                                统计
                            </div>
                        </div>

                        <div class="text">
                            <h6
                                style="margin-bottom: 15px; margin-right: 35px; font-size: 14px; text-align: right;"
                            >
                                NO:{{ nowDate }}
                            </h6>
                            <div class="text2">
                                <span class="span1"
                                    ><span class="headtext">租金 (¥)</span
                                    ><br /><span class="boottext">{{
                                        missionList.rental
                                    }}</span></span
                                >
                                <span class="span2"
                                    ><span class="headtext">客户</span
                                    ><br /><span class="boottext">{{
                                        missionList.client
                                    }}</span></span
                                >
                                <span class="span3"
                                    ><span class="headtext">车辆</span
                                    ><br /><span class="boottext">{{
                                        missionList.cars
                                    }}</span></span
                                >
                                <span class="span3"
                                    ><span class="headtext">油费 (¥)</span
                                    ><br /><span class="boottext">{{
                                        missionList.oilcost
                                    }}</span></span
                                >
                            </div>
                        </div>
                    </div>
                </el-col>
                <!-- /任务栏 -->
            </el-row>
            <!-- 头部搜索 -->

            <div style="width: 100%; height: 69px;"></div>

            <!-- 表格区域 -->
            <el-table
                :data="companyList"
                stripe
                style="width: 100%;"
                :header-cell-style="{ background: '#fafafa' }"
                v-loading="loading"
            >
                <el-table-column label="名称" width="280">
                    <template slot-scope="scope">
                        <h3>{{ scope.row.name }}</h3>
                        <span>{{ scope.row.corporation }}</span> |
                        <span>{{ scope.row.setupDate | dateFormat }}</span>
                        |
                        <span>{{ scope.row.registerCapital }}</span>
                        <p>
                            合同: {{ scope.row.startTime | dateFormat }} ~
                            {{ scope.row.endTime | dateFormat }}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="完成度" align="center">
                    <template slot-scope="scope">
                        <el-progress
                            type="circle"
                            :percentage="
                                Math.round(scope.row.completeness * 100)
                            "
                        ></el-progress>
                    </template>
                </el-table-column>
                <el-table-column prop="cars" label="车辆" align="center" />
                <el-table-column prop="setMealName" label="租金" align="center">
                    <template slot-scope="scope">
                        <div style="text-align: center; font-size: 12px;">
                            <p style="padding: 0; margin: 0; color: #1abf9e;">
                                {{ scope.row.rental }}
                            </p>
                            <p style="padding: 0; margin: 0; color: #1abf9e;">
                                {{ scope.row.rentalName }}
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="油费" align="center">
                    <template slot-scope="scope">
                        <div style="text-align: center; font-size: 12px;">
                            <p style="padding: 0; margin: 0; color: #1abf9e;">
                                {{ scope.row.oilcost }}
                            </p>
                            <p style="padding: 0; margin: 0; color: #1abf9e;">
                                {{ scope.row.oilcostName }}
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="发放日">
                    <template slot-scope="scope">
                        <div class="fafangbox">
                            <h4>{{ scope.row.time }}</h4>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            class="el-button-wid"
                            type="primary"
                            size="mini"
                            plain
                        >
                            发放
                        </el-button>
                        {{ scope.row.id }}
                        <div style="padding-top: 5px;">
                            <el-dropdown trigger="hover">
                                <el-button size="mini">
                                    更多<i
                                        class="el-icon-arrow-down el-icon--right"
                                    />
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="edit"
                                        >发放油费</el-dropdown-item
                                    >
                                    <el-dropdown-item command="start"
                                        >发放租金</el-dropdown-item
                                    >
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- /表格区域 -->

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
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,

            // 当前日期
            nowDate: "",
            todayDate: "",

            //表单数据
            queryInfo: {
                search: "",
                pageNum: 1,
                pageSize: 10,
                status: "2",
                time: "10"
            },

            //右上角任务栏
            missionInfo: {
                pageNum: 1,
                pageSize: 10,
                status: "10",
                time: 10
            },

            companyList: [],
            missionList: [],

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
    computed: {},

    created() {
        this.getRentList();
        this.getRenwuList();
        //获取时间
        this.getDate();
    },
    methods: {
        //获取表格数据
        getRentList() {
            this.loading = true;
            this.$api
                .post("/rent/queryRent", this.queryInfo)
                .then(res => {
                    this.companyList = res.data.records;
                    this.pagination.total = res.data.total;
                    this.loading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //获取右上角任务栏数据
        getRenwuList() {
            this.$api
                .post("/rent/queryTotalprice", this.missionInfo)
                .then(res => {
                    this.missionList = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //获取时间
        getDate() {
            let date = new Date();
            let year = date.getFullYear(); // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日

            this.nowDate = `${year}-${month}-${day}`;
            this.todayDate = `${month}.${day}`;

            // if (day === 10) {
            //     this.missionInfo.day = 10;
            // } else if (day === 15) {
            //     this.missionInfo.day = 15;
            // } else if (day === 25) {
            //     this.missionInfo.day = 25;
            // }
            // console.log(this.missionInfo,555);
            // this.getRenwuList();
        },

        // 分页
        onSizeChange(size) {
            this.queryInfo.pageSize = size;
            this.getRentList();
        },
        onCurrentChange(page) {
            this.queryInfo.pageNum = page;
            this.getRentList();
        },
        addForm() {
            this.adddialog = true;
        },

        // 新增弹窗表单
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
};
</script>
<style lang="scss" scoped>
h6,
h4 {
    margin: 0;
    padding: 0;
}
// 按钮
::v-deep.el-button-wid {
    width: 73px;
}
.audit-status {
    display: inline-block;
    margin-left: 10px;
    padding: 0 15px;
    color: #909399;
    font-size: 12px;
}
.audit-active {
    height: 30px;
    line-height: 30px;
    color: #e29836;
    background-color: #fdf5e9;
    border: 1px solid #e29836;
}
.status {
    color: red;
}
.searchbar {
    width: 438px;
}
.search-container {
    background-color: white;
}
// 任务栏
.todaynow {
    position: absolute;
    text-align: center;
    box-shadow: 0 0 20px #c0c4cc;
    width: 108px;
    height: 39px;
    background-color: #de5346;
    top: -54px;
    right: 0;
    border-radius: 5px;
}
.minitoday {
    position: absolute;
    width: 8px;
    height: 10px;
    border-left: 6px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid #de5346;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%);
}
.renwu {
    position: relative;
    width: 352px;
    height: 138px;
    background-color: #ebf4ff;
    border: 1px solid #9ac9fc;
    border-radius: 5px;
    top: 77px;
}
.rwsmall {
    position: absolute;
    top: -1px;
    left: -1px;
    width: 35px;
    height: 35px;
    color: white;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    border-top: 59px solid #313ac3;
    border-right: 77px solid transparent;
}
.text {
    position: relative;
    padding-top: 15px;
    float: right;
    width: 60%;
    height: 100%;
}
.text2 {
    position: absolute;
    white-space: nowrap;
    left: -105px;
    display: flex;
    margin-top: 15px;
    width: 100%;
    .span1,
    .span2,
    .span3 {
        margin-right: 17px;
        .headtext {
            font-size: 13px;
        }
        .boottext {
            font-size: 16px;
            font-weight: 700;
        }
    }
}
// /任务栏

//分页
::v-deep .pagination .el-pagination__rightwrapper .el-pager > .active {
    background-color: #1abc9c !important;
}
.pagination {
    margin-top: 20px;
}

//dialog弹窗
.el-dialog__body {
    position: relative;
}
//搜索公司
.searchCampany {
    position: absolute;
    right: 53px;
    z-index: 1;
}
.fafangbox {
    width: 50px;
    height: 45px;
    text-align: center;
    line-height: 33px;
    border-radius: 4px;
    border-top: 12px solid #f38181;
    background-color: #e6e4e2;
}
</style>
