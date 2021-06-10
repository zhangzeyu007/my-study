<template>
  <div>
    <page-header title="客户列表" />
    <page-main>
      <search-bar>
        <el-form
          :model="form"
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
                >搜素
              </el-button>
            </el-input>
          </el-form-item>
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
            <el-form-item label="合同状态">
              <el-select
                v-model="form.contract"
                @change="getDataList"
                @clear="getDataList"
                clearable
              >
                <el-option label="未到期" :value="'未到期'" />
                <el-option label="已到期" :value="'已到期'" />
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <div
                v-for="(item, index) in dayList"
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
              {{ scope.row.corporation }} &nbsp;|&nbsp;
              {{ formatTime(scope.row.setupDate) + " " }}&nbsp;|&nbsp;{{
                scope.row.registerCapital
              }}
            </p>
            <p>
              合同:&nbsp;{{ formatTime(scope.row.startTime) }}&nbsp;~&nbsp;{{
                formatTime(scope.row.endTime)
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 0" class="icon-danger">
              <svg-icon :name="circleIcon" class="icon-danger" />禁用
            </div>
            <div v-if="scope.row.status == 1" class="icon-success">
              <svg-icon :name="circleIcon" class="icon-success" />正常
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="cars"
          label="车辆"
          width="90"
          align="center"
        />
        <el-table-column
          prop="setMealName"
          label="租金"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.rental" class="font-green">
              {{ scope.row.rental }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="服务费" width="120" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.service" class="font-green">
              {{ scope.row.service }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发放日" width="140" align="center">
          <template slot-scope="scope">
            <div class="fafang">
              <div class="fafangbox">
                <h4>{{ scope.row.time }}</h4>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                size="mini"
                plain
                @click="onStart(scope.row)"
                >启动</el-button
              >
              <el-button
                type="danger"
                size="mini"
                plain
                @click="onStop(scope.row)"
              >
                禁用</el-button
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
      form: {
        starTime: "",
        endTime: "",
        contract: "未到期",
        time: 10,
      },
      search: {
        name: "",
      },
      dayList: [
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
      dataList: [],
      time: [],
      circleIcon: "circle",
      auditActive: 0,
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    onStart(row) {
      let params = {
        id: row.id,
        status: 1,
      };
      this.$api.post("/enterprise/setStatus", params).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success(res.data);
          this.getDataList();
        }
      });
    },
    onStop(row) {
      let params = {
        id: row.id,
        status: 0,
      };
      this.$api.post("/enterprise/setStatus", params).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success(res.data);
          this.getDataList();
        }
      });
    },
    selectStatus(idx, item) {
      this.auditActive = idx;
      this.form.time = item.val;
      this.getDataList();
    },
    changeTime(e) {
      this.form.starTime = e ? e[0] : "";
      this.form.endTime = e ? e[1] : "";
      this.time = e ? [e[0], e[1]] : [];
      this.getDataList();
    },
    handleMoreOperating(e, row) {
      if (e === "edit") {
        console.log(row);
      }
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
      params.pageNum = this.pagination.page;
      params.pageSize = this.pagination.size;
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
      if (this.form.time) {
        params.time = this.form.time;
      }
      this.$api.post("/enterprise/queryEnterprise", params).then((res) => {
        this.loading = false;
        if (res.code == 0 && res.data && res.data.records) {
          this.dataList = res.data.records;
          this.pagination.total = res.data.total;
        }
      });
    },
    onSizeChange(size) {
      this.pagination.size = size;
      this.getDataList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.getDataList();
    },
  },
};
</script>

<style lang='scss' scoped>
.search_box {
    width: 450px;
    padding: 30px 46px 23px 46px;
    box-sizing: border-box;
}
.search-form {
    margin-top: 30px;
}
.pagination {
    margin-top: 20px;
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
