<template>
  <div>
    <page-header title="待审核" />
    <page-main>
      <search-bar>
        <el-form
          :model="search"
          size="small"
          label-width="100px"
          label-suffix="："
          inline
        >
          <el-form-item>
            <el-input
              v-model="search.name"
              placeholder="请输入公司名称/法人"
              clearable
              @keydown.enter.native="getDataList"
              @clear="getDataList"
            >
              <el-button
                slot="append"
                style="background-color: #1abc9c; color: #fff;"
                icon="el-icon-search"
                @click="getDataList"
                >搜素</el-button
              >
            </el-input>
          </el-form-item>
          <el-button type="small" @click="goAddPage">新增</el-button>
        </el-form>
        <div class="search-form">
          <el-form
            ref="form"
            :model="form"
            size="small"
            label-suffix="："
            inline
          >
            <el-form-item label="合同时间">
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
          </el-form>
        </div>
        <el-row>
          <el-col :span="12">
            <div class="search-form">
              <el-form label-suffix="：">
                <el-form-item label="状态">
                  <div
                    v-for="(item, index) in auditList"
                    :key="index"
                    :class="[
                      'audit-status',
                      auditActive == index ? 'audit-active' : '',
                    ]"
                    @click="selectStatus(index, item)"
                  >
                    {{ item.name }}
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="search-form">
              <el-form label-suffix="：">
                <el-form-item label="发放日">
                  <div
                    v-for="(item, index) in dayList"
                    :key="index"
                    :class="[
                      'audit-status',
                      dayAcitve == index ? 'audit-active' : '',
                    ]"
                    @click="selectDays(index, item)"
                  >
                    {{ item.name }}
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </search-bar>
      <!-- 表格 -->
      <el-table
        ref="table"
        v-loading="loading"
        class="list-table"
        :data="dataList"
        border
        stripe
        highlight-current-row
        :show-overflow-tooltip="true"
        @sort-change="onSortChange"
        @selection-change="batch.selectionDataList = $event"
      >
        <el-table-column label="名称" width="340">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
            <p>
              {{ scope.row.corporation }}&nbsp;|&nbsp;{{
                formatTime(scope.row.setupDate)
              }}&nbsp;|&nbsp;{{ scope.row.registerCapital }}
            </p>
            <p>
              合同:&nbsp;{{ formatTime(scope.row.starTime) }}&nbsp;~&nbsp;{{
                formatTime(scope.row.endTime)
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="140" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 1" class="icon-success">
              {{ scope.row.statusName }}
            </div>
            <div
              v-if="
                scope.row.status == 0 ||
                scope.row.status == 3 ||
                scope.row.status == 2
              "
              class="icon-danger"
            >
              {{ scope.row.statusName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="车辆" width="90" align="center">
        </el-table-column>
        <el-table-column label="租金" width="90" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.setMeal" class="font-green">
              {{ scope.row.setMeal }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="服务费"
          prop="setMeal"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.setMeal" class="font-green">
              {{ scope.row.num }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发放日" width="140" align="center">
          <template slot-scope="scope">
            <div class="fafang">
              <div class="fafangbox">
                <h4>{{ scope.row.grantDay }}</h4>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                size="mini"
                plain
                @click="audit(scope.row)"
                >审核</el-button
              >
              <el-button
                v-if="scope.row.isContract"
                type="primary"
                size="mini"
                plain
                @click="contractUpload(scope.row)"
                >合同上传</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
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
    </page-main>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      loading: false,
      search: {
        name: "",
      },
      form: {
        starTime: "",
        endTime: "",
        contract: "",
        status: 0,
        grantDay: '',
      },
      time: [],
      dataList: [
        {
          name: "",
        },
      ],
      auditList: [
        {
          name: "全部",
          val: 0,
        },
        {
          name: "待审核",
          val: 1,
        },
        {
          name: "合同确认中",
          val: 2,
        },
      ],
      dayList: [
        {
          name: "全部",
          val: '',
        },
        {
          name: "10日",
          val: 10,
        },
        {
          name: "15日",
          val: 15,
        },
        {
          name: "25日",
          val: 25,
        },
      ],
      auditActive: 0,
      dayAcitve: 0,
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 审核
    audit(row) {
        console.log(row);
      this.$api.get(`/audit/getAudit/${row.id}`).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success("审核成功");
          this.getDataList();
        }
      });
    },
    contractUpload(item) {
      this.$router.push({
        name: "contractUpload",
        params: { id: item.id, eid: item.eid },
      });
    },
    formatTime(time) {
      if (time) {
        return time.split(" ")[0];
      } else {
        return "";
      }
    },
    getDataList() {
      this.loading = true;
      let params = this.getParams();
      (params.pageNum = this.pagination.page),
        (params.pageSize = this.pagination.size);
      if (this.search.name) {
        params.search = this.search.name;
      }
      if (this.form.contract) {
        params.contract = this.form.contract;
      }
      if (this.form.starTime) {
        params.starTime = this.form.starTime;
      }
      if (this.form.endTime) {
        params.endTime = this.form.endTime;
      }
      if (this.form.endTime) {
        params.endTime = this.form.endTime;
      }
      if (this.form.grantDay) {
        params.grantDay = this.form.grantDay;
      }
      params.status = this.form.status;

      console.log(params);
      this.$api.post("/audit/list", params).then((res) => {
        this.loading = false;
        if (res.code == 0 && res.data && res.data.records) {
          this.dataList = res.data.records;
          this.pagination.total = res.data.total;
        }
      });
    },
    changeTime(e) {
      this.form.starTime = e ? e[0] : "";
      this.form.endTime = e ? e[1] : "";
      this.time = e ? [e[0], e[1]] : [];
      this.getDataList();
    },
    selectStatus(idx, item) {
      this.auditActive = idx;
      this.form.status = item.val;
      this.getDataList();
    },
    selectDays(idx, item) {
      this.dayAcitve = idx;
      this.form.grantDay = item.val;
      this.getDataList();
    },
    goAddPage() {
      this.$router.push({ name: "CreateKu" });
    },
  },
};
</script>

<style lang='scss' scoped>
.search-form {
    margin-top: 30px;
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
.pagination {
    margin-top: 20px;
}
::v-deep .icon-success {
    font-size: 14px !important;
    color: #52cc6f !important;
}
::v-deep .icon-danger {
    font-size: 14px !important;
    color: #f9adad !important;
}
::v-deep .font-green {
    font-size: 12px !important;
    color: #1abf9e !important;
}
::v-deep .el-table .el-table__row .cell > :nth-of-type(1) {
    font-size: 16px;
    color: #000;
    font-weight: bold;
}
::v-deep .el-table .el-table__row .cell > :nth-of-type(2) {
    font-size: 12px;
    color: #6b6b6b;
}
::v-deep .el-table .el-table__row .cell > :nth-of-type(3) {
    font-size: 12px;
    color: #0d0c0c;
}
::v-deep .pagination .el-pagination__rightwrapper .el-pager > .active {
    background-color: #1abc9c !important;
}
::v-deep .fafang {
    display: flex;
    justify-content: center;
    align-items: center;
}
::v-deep .fafangbox {
    width: 50px;
    height: 45px;
    position: relative;
    text-align: center;
    border-radius: 4px;
    border-top: 12px solid #f38181;
    background-color: #e6e4e2;
}
::v-deep .fafangbox h4 {
    position: absolute;
    left: 14px;
    top: -15px;
}
</style>
