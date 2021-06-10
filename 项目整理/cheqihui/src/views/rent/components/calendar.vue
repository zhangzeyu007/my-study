<template>
    <div>
        <el-calendar v-model="timer">
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template slot="dateCell" slot-scope="{ date, data }">
                <div
                    @click.stop="calendarOnClick(date, data)"
                    style="height: 72px; padding: 5px;"
                >
                    <p
                        :class="data.isSelected ? 'is-selected' : ''"
                        style="margin: 0 !important;"
                    >
                        {{
                            data.day
                                .split("-")
                                .slice(1)
                                .join("-")
                        }}
                    </p>
                    <div v-for="(item, index) in calendarData" :key="index">
                        <div
                            v-if="
                                item.months.indexOf(
                                    data.day.split('-').slice(1)[0]
                                ) != -1
                            "
                        >
                            <div
                                v-if="
                                    item.days.indexOf(
                                        data.day
                                            .split('-')
                                            .slice(2)
                                            .join('-')
                                    ) != -1
                                "
                            >
                                <div class="is-selected2">
                                    {{ item.content }}
                                </div>
                            </div>
                            <div v-else></div>
                        </div>
                        <div v-else></div>
                    </div>
                </div>
            </template>
        </el-calendar>
        <!-- 输入框 -->
        <el-dialog
            title="输入日程信息"
            :visible.sync="chosediag"
            width="30%"
            :modal="false"
            :close-on-click-modal="false"
        >
            <el-input
                type="text"
                placeholder="输入信息"
                v-model="info"
            ></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="chosediag = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { Toast } from "wot-design";
export default {
    data() {
        return {
            choseday: "",
            calendarData: [],
            timer: "",
            chosediag: false,
            info: ""
        };
    },
    mounted() {
        this.$nextTick(() => {
            // 点击前一个月
            let prevBtn = document.querySelector(
                ".el-calendar__button-group .el-button-group>button:nth-child(1)"
            );
            prevBtn.addEventListener("click", e => {
                let d = new Date(this.timeValue);
                let resDate =
                    d.getFullYear() + "-" + this.handleTime(d.getMonth() + 1); //2020-08
            });
            //点击下一个月
            let nextBtn = document.querySelector(
                ".el-calendar__button-group .el-button-group>button:nth-child(3)"
            );
            nextBtn.addEventListener("click", e => {
                let d = new Date(this.timeValue);
                let resDate =
                    d.getFullYear() + "-" + this.handleTime(d.getMonth() + 1); //2020-10
            });
            //点击今天
            let todayBtn = document.querySelector(
                ".el-calendar__button-group .el-button-group>button:nth-child(2)"
            );
            todayBtn.addEventListener("click", e => {
                let d = new Date(this.timeValue);
                let resDate =
                    d.getFullYear() + "-" + this.handleTime(d.getMonth() + 1); //2020-09
            });
        });
    },
    methods: {
        //处理时间
        handleTime(s) {
            return s < 10 ? "0" + s : s;
        },
        //点击天数
        changeTime(date, data) {
            console.log(date, data);
        },
        calendarOnClick(idx, idx1) {
            this.choseday = idx1.day;
            if (
                this.util.compareTime(this.util.getDay(-1, "-"), idx1.day) ==
                "大于"
            ) {
                Toast.warning("请选择正确日期");
                return false;
            }
            this.chosediag = true;
        },
        add() {
            this.calendarData.forEach((item, index) => {
                if (
                    item.years + "-" + item.months + "-" + item.days ==
                    this.choseday
                ) {
                    this.calendarData.splice(index, 1);
                }
            });
            this.calendarData.push({
                years: this.choseday.split("-")[0],
                months: this.choseday.split("-")[1],
                days: this.choseday.split("-")[2],
                content: this.info
            });
            this.chosediag = false;
        }
    }
};
</script>
<style lang="scss" scoped>
.is-selected {
    color: #1989fa;
}
.div-Calendar {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
.calendar-day {
    text-align: center;
    color: #202535;
    line-height: 30px;
    font-size: 12px;
}
.is-selected2 {
    color: #f8a535;
    font-size: 14px;
    margin-top: 5px;
}
#calendar .el-button-group > .el-button:not(:first-child):not(:last-child)::after {
    content: "当月";
}
.el-calendar-day {
    padding: 0 !important;
}
</style>
