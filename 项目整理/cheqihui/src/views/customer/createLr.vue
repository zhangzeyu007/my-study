<template>
  <div class="createLr">
    <page-header title="创建联系人">
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
            label-width="150px"
            label-suffix="："
          >
            <el-col :span="7">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="公司名称" prop="eid">
                <el-select
                  v-model="form.eid"
                  placeholder="请选择"
                  @visible-change="getCompanyList"
                >
                  <el-option
                    v-for="(item, index) in companyOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位" prop="position">
                <el-input v-model="form.position" placeholder="请输入职位" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入手机号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码"  type="password"/>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
    </page-main>
    <fixed-action-bar>
      <el-button type="primary" @click="onSubmit">确认添加</el-button>
    </fixed-action-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        eid: "",
        position: "",
        phone: "",
        email: "",
        password:''
      },
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入手机号"));
              } else if (!/^1[3456789]\d{9}$/.test(value)) {
                callback(new Error("手机号格式不正确"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
              if (!value) {
                return callback(new Error("邮箱不能为空"));
              }
              setTimeout(() => {
                if (mailReg.test(value)) {
                  callback();
                } else {
                  callback(new Error("请输入正确的邮箱格式"));
                }
              }, 100);
            },
            trigger: "blur",
          },
        ],
         password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      companyOptions: {},
    };
  },
  mounted() {},
  methods: {
    getCompanyList() {
      this.$api.get("/enterprise/getAllEnterprise").then((res) => {
        if (res.code == 0 && res.data) {
          this.companyOptions = res.data;
        }
      });
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$api.post("/user/register", this.form).then((res) => {
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

<style lang="scss" scoped>
.createLr {
    //
}
</style>
