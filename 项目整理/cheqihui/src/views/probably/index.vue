<template>
    <div class="probably">
        <page-main>
            <div class="order-main">
                <div class="order-left">
                    <p>您有 1 项待办任务急需处理</p>
                    <p><span class="title">订单编号：</span> <span class="order-num"> 8997 4094 1012 4135</span><span class="title predict">预计佣金（¥）</span><span>8,200.50</span></p>
                    <p><span>创建时间：2019-12-05  21:03</span><span class="time">已经开始 36 分钟了</span></p>
                </div>
                <div class="order-right">
                    <el-button class="btn" type="primary" size="small" style="width: 122px;">马上开干</el-button>
                </div>
            </div>
            <div class="order-show">
                <div class="order-item">
                    <p>总佣金（¥）</p>
                    <p>158,200.50</p>
                </div>
                <div class="order-item">
                    <p>任务总数</p>
                    <p>216</p>
                </div>
                <div class="order-item">
                    <p>平均佣金（¥）</p>
                    <p>8,200.50</p>
                </div>
            </div>
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    mounted() {

    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.probably {
    .order-main {
        display: flex;
        align-items: center;
        padding: 68px 62px 42px 62px;
        box-sizing: border-box;
        border-bottom: 1px solid  rgba(232, 232, 232, 100);
        .order-left {
            font-size: 14px;
            line-height: 35px;
            .title {
                color: #000;
                font-weight: bold;
            }
            .predict {
                margin-left: 10px;
            }
            .time {
                margin-left: 15px;
            }
            & > :nth-child(1) {
                color: #ec0909;
            }
            & > :nth-child(3) {
                font-size: 14px;
            }
        }
        .order-right {
            .btn {
                margin-left: 50px;
            }
        }
    }
    .order-show {
        display: flex;
        justify-content: space-around;
        text-align: center;
        align-items: center;
        .order-item {
            & > :nth-of-type(1) {
                font-size: 20px;
                font-weight: bold;
                color: #101010;
                line-height: 20px;
            }
            & > :nth-of-type(2) {
                font-size: 36px;
                color: #101010;
                line-height: 30px;
            }
        }
    }
}
</style>
