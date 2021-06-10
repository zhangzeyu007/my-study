<template>
  <div class="createKu">
    <page-header title="新增客户">
      <el-button
        icon="el-icon-arrow-left"
        size="mini"
        round
        @click="$router.go(-1)"
        >返 回</el-button
      >
    </page-header>
    <page-main>
      <el-row>
        <el-col :md="24" :lg="24">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            size="small"
            label-width="130px"
            label-suffix="："
          >
            <el-col :span="8">
              <el-form-item label="公司名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入公司名称" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="法人姓名" prop="corporation">
                <el-input
                  v-model="form.corporation"
                  placeholder="请输入法人姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业成立时间" prop="setupDate">
                <el-date-picker
                  v-model="form.setupDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择企业成立时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册资金" prop="registerCapital">
                <el-input
                  v-model="form.registerCapital"
                  placeholder="请输入注册资金"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="选择套餐" prop="setMealId">
                <el-select
                  v-model="form.setMealId"
                  placeholder="请选择"
                  @visible-change="getSetMealList"
                >
                  <el-option
                    v-for="(item, index) in setMalOptions"
                    :key="index"
                    :label="item.money"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行业分类" prop="industry">
                <el-cascader
                  v-model="form.industry"
                  :props="industryOptions"
                  clearable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="合同时间"
                prop="starTime"
                :rules="{
                  required: !form.starTime,
                  message: '请选择合同时间',
                  trigger: 'blur',
                }"
              >
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-mm-dd hh:mm:ss"
                  clearable
                  @change="changeTime"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
    </page-main>
    <fixed-action-bar>
      <el-button type="primary" @click="onSubmit">确认新增</el-button>
    </fixed-action-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        corporation: "",
        setMealId: "",
        registerCapital: "",
        setupDate: "",
        starTime: "",
        endTime: "",
        industry: [],
      },
      time: [],
      setMalOptions: [],
      industryOptions: {},
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        corporation: [
          { required: true, message: "请输入法人姓名", trigger: "blur" },
        ],
        setupDate: [
          { required: true, message: "请选择企业成立时间", trigger: "blur" },
        ],
        registerCapital: [
          { required: true, message: "请输入注册资金", trigger: "blur" },
        ],
        setMealId: [{ required: true, message: "请选择套餐", trigger: "blur" }],
        time: [{ required: true, message: "请选择合同时间", trigger: "blur" }],
        industry: [{ required: true, message: "请选择行业", trigger: "blur" }],
      },
    };
  },
  created() {
    let that = this;
    that.industryOptions = {
      lazy: true,
      value: "id", // 要关联的值
      label: "value", // 显示的内容
      lazyLoad(node, resolve) {
        const { level, root, data } = node;
        let id = root ? 0 : data.id;
        if (root) {
          that.$api.get(`/industry/getNextIndustry/${id}`).then((res) => {
            const result = res.data.map((item) => {
              item.id = `${item.id}`;
              return Object.assign(item, {
                leaf: level >= 1, // 显示层级数量, 这里是2级
              });
            });
            resolve(result);
          });
        } else {
          that.$api.get(`/industry/getNextIndustry/${id}`).then((res) => {
            //第二级 加载接口
            const result = res.data.map((item) => {
              item.id = `${item.id}`;
              return Object.assign(item, {
                leaf: level >= 1, // 显示层级数量, 这里是2级
              });
            });
            resolve(result);
          });
        }
      },
    };
  },
  methods: {
    getSetMealList() {
      this.$api
        .post("/set-meal/list")
        .then((res) => {
          if (res.data) {
            this.setMalOptions = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeTime(e) {
      this.form.starTime = e ? e[0] : "";
      this.form.endTime = e ? e[1] : "";
      this.time = e ? [e[0], e[1]] : [];
    },
    // 确认新增
    onSubmit() {
      if (this.form.industry.length < 2) {
        // this.$message({
        //   type: "warning",
        //   message: "请选择行业",
        // });
        return;
      }
      this.form.industry = this.form.industry[1];
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$api
            .post("/enterprise/insertEnterprise", this.form)
            .then((res) => {
              if (res.code == 0) {
                this.$message.success("添加成功");
                this.$router.go(-1);
              }
            });
        }
      });
    },
  },
};
</script>
