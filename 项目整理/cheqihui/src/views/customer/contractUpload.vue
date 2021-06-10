<template>
  <div class="createKu">
    <page-header title="合同上传">
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
              <el-form-item label="合同名称" prop="contractName">
                <el-input
                  v-model="form.contractName"
                  placeholder="请输入合同名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号" prop="contractNo">
                <el-input
                  v-model="form.contractNo"
                  placeholder="请输入合同编号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="甲方" prop="partyA">
                <el-input v-model="form.partyA" placeholder="请输入合同编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="乙方" prop="partyB">
                <el-input v-model="form.partyB" placeholder="请输入合乙方" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="丙方(承租方)" prop="partyC">
                <el-input
                  v-model="form.partyC"
                  placeholder="请输入丙方(承租方)"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="丁方法(出租方)" prop="partyD">
                <el-input
                  v-model="form.partyD"
                  placeholder="请输入丁方法(出租方)"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="租金总额" prop="totalRent">
                <el-input
                  v-model="form.totalRent"
                  placeholder="请输入租金总额"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车辆数" prop="vehiclesNum">
                <el-input
                  v-model="form.vehiclesNum"
                  placeholder="请输入车辆数"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务费金额" prop="serviceRent">
                <el-select
                  v-model="form.serviceRent"
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
              <el-form-item label="支付期限" prop="paymentTerm">
                <el-date-picker
                  v-model="form.paymentTerm"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择支付期限"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="起止日期"
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
            <el-col :span="8">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
            <page-header title="开票资料"></page-header>
            <el-col :span="8">
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="税号" prop="taxNum">
                <el-input v-model="form.taxNum" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" placeholder="请输入地址" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入电话" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行" prop="bankOfDeposit">
                <el-input
                  v-model="form.bankOfDeposit"
                  placeholder="请输入开户行"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号" prop="bankOfNum">
                <el-input
                  v-model="form.bankOfNum"
                  placeholder="请输入银行卡号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="合同上传:" prop="fileList">
                <el-upload
                  class="upload-demo"
                  :action="action"
                  name="file"
                  :limit="10"
                  :data="{ token: $store.state.user.token, type: 2 }"
                  :on-success="handleChange"
                  :file-list="form.fileList"
                  :on-exceed="handleExceed"
                  :on-remove="handleRemove"
                  :ext="ext"
                >
                  <el-button icon="el-icon-upload2" size="small"
                    >上传文件</el-button
                  >
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
    </page-main>
    <fixed-action-bar>
      <el-button type="primary" @click="onSubmit">确认上传</el-button>
    </fixed-action-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: this.$route.params.id,
        eid: this.$route.params.eid,
        contractName: "",
        contractNo: "",
        partyA: "",
        partyC: "",
        partyD: "",
        totalRent: "",
        vehiclesNum: "",
        serviceRent: "",
        paymentTerm: "",
        remark: "",
        name: "",
        taxNum: "",
        starTime: "",
        address: "",
        phone: "",
        bankOfDeposit: "",
        bankOfNum: "",
        contract: "",
        data: "",
        endTime: "",
        fileList: [],
      },
      time: [],
      setMalOptions: [],
      action: process.env.VUE_APP_API_ROOT + "/common/uploadFile",
      ext: ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png"],
      rules: {
        contractName: [
          { required: true, message: "请输入合同名称", trigger: "blur" },
        ],
        contractNo: [
          { required: true, message: "请输入合同编号", trigger: "blur" },
        ],
        partyA: [{ required: true, message: "请输入甲方", trigger: "blur" }],
        partyB: [{ required: true, message: "请输入乙方", trigger: "blur" }],
        partyC: [
          { required: true, message: "请输入丙方(承租方)", trigger: "blur" },
        ],
        partyD: [
          { required: true, message: "请输入丁方(出租方)", trigger: "blur" },
        ],
        totalRent: [
          { required: true, message: "请输入租金总额", trigger: "blur" },
        ],
        vehiclesNum: [
          { required: true, message: "请输入车辆", trigger: "blur" },
        ],
        serviceRent: [
          { required: true, message: "请输入服务费金额", trigger: "blur" },
        ],
        paymentTerm: [
          { required: true, message: "请输入支付期限", trigger: "blur" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        taxNum: [{ required: true, message: "请输入税号", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
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
        bankOfDeposit: [
          { required: true, message: "请输入开户行", trigger: "blur" },
        ],
        bankOfNum: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
        ],
        fileList: [
          {
            required: true,
            validator: (rule, value, callback) => {
                console.log(value.length);
              if (value.length == 0) {
                callback(new Error("请输上传文件"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    fileList(val) {
      if (!val) {
        this.form.contract = "";
        this.form.data = "";
      } else {
        let file = [];
        let name = [];
        val.map((v) => {
          file.push(v.url);
          name.push(v.name);
        });
        this.form.data = file.join(",");
        this.form.contract = name.join(",");
      }
    },
  },
  methods: {
    handleChange(e) {
      this.form.fileList.push({ name: e.data.name, url: e.data.fileName });
      this.$refs.form.validateField('fileList');
    },
    handleRemove(list) {
      this.form.fileList.splice(this.indexOf(this.form.fileList, list.uid), 1);
    },
    handleExceed() {
      this.$message.warning("文件上传超出限制");
    },
    indexOf(data, val) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].uid == val) return i;
      }
      return -1;
    },
    getSetMealList() {
      this.$api.post("/set-meal/list").then((res) => {
        if (res.data) {
          this.setMalOptions = res.data;
        }
      });
    },
    getSetMealList() {
      this.$api.post("/set-meal/list").then((res) => {
        if (res.data) {
          this.setMalOptions = res.data;
        }
      });
    },
    changeTime(e) {
      this.form.starTime = e ? e[0] : "";
      this.form.endTime = e ? e[1] : "";
      this.time = e ? [e[0], e[1]] : [];
    },
    // 确认新增
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$api.post("/audit/uploadContract", this.form).then((res) => {
            if (res.code == 0) {
              this.$message.success("上传成功");
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
.createKu {
    //
}
</style>
