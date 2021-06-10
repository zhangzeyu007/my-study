<template>
    <div class="header-view">
        <div class="viewheader">
            <div>
                <h3>
                    租金
                </h3>
                    <h1 style="height: 43px;">{{historyView.rental}}</h1>
                <h5>月<svg-icon name="uparrow" />112.61%</h5>
            </div>
            <div>
                <h3>
                    客户
                </h3>

                <h1 style="height: 43px;">{{historyView.client}}</h1>

                <h5>月<svg-icon name="uparrow" />79.07%</h5>
            </div>
            <div>
                <h3>
                    车辆
                </h3>

                <h1 style="height: 43px;">{{historyView.cars}}</h1>

                <h5>月<svg-icon name="uparrow" />105.41%</h5>
            </div>
            <div>
                <h3>
                    油费
                </h3>

                <h1 style="height: 43px;">{{historyView.oilcost}}</h1>
                <h5>月<svg-icon name="uparrow" />52.27%</h5>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "headerView",
    props: {
        historyView: {
            required: true
        }
    },
    data() {
        return {};
    },
    created() {},
    computed: {},
    methods: {}
};
</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}
.heightBox {
    height: 20px;
}
.viewheader {
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
