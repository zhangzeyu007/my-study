<template>
    <div class="header-view2">
        <div class="viewheader2">
            <div>
                <h3>
                    总金额
                </h3>
                <h1 style="height: 43px;">{{historyList.rental}}</h1>
                <h5>月<svg-icon name="uparrow" />112.61%</h5>
            </div>
            <div>
                <h3>
                    客户
                </h3>
                <h1 style="height: 43px;">{{historyList.client}}</h1>
                <h5>月<svg-icon name="uparrow" />79.07%</h5>
            </div>
            <div>
                <h3>
                    发放人次
                </h3>
                <h1 style="height: 43px;">{{historyList.cars}}</h1>
                <h5>月<svg-icon name="uparrow" />105.41%</h5>
            </div>
            <div>
                <h3>
                    油费
                </h3>
                <h1 style="height: 43px;">{{historyList.oilcost}}</h1>
                <h5>月<svg-icon name="uparrow" />52.27%</h5>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "headerView2",
    props: {
        historyList: {
            required: true
        }
    },
    data() {
        return {};
    },
    created() {

    },
    computed: {},
    methods: {}
};
</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}
.viewheader2 {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 150px;
    // margin-bottom: 150px;
    div {
        flex: 1;
        padding: 25px;
        border: 1px solid #f1f1f1;
        h3 {
            font-weight: lighter;
        }
    }
}
// /头部可视化
</style>
