<template>
  <div>
    <page-header title="联系人" />
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
              v-model="form.name"
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
          <el-button type="small" @click="goAddPage">创建联系人</el-button>
        </el-form>

        <div class="search-form">
          <el-form label-suffix="：">
            <el-form-item label="状态">
              <div
                v-for="(item, index) in statusList"
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
        <el-table-column prop="name" label="名称" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
            <p>{{ scope.row.enterpriseName }}</p>
            <p>{{ scope.row.position }}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 1" class="icon-success">
              <svg-icon name="circle" class="icon-success" />
              正常
            </div>
            <div v-if="scope.row.status == 0" class="icon-danger">
              <svg-icon name="circle" class="icon-danger" />
               停用
            </div>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="350" align="center">
          <template slot-scope="scope">
            <p>
              {{ scope.row.phone }}
            </p>
            <p>
              {{ scope.row.email }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="入驻时间" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                size="mini"
                plain
                @click="info(scope.row)"
                >查看</el-button
              >
            </div>
            <div style="padding-top: 5px;">
              <el-dropdown @command="handleMoreOperating($event, scope.row)">
                <el-button size="mini">
                  更多<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit">编辑</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                  <el-dropdown-item command="start">启用</el-dropdown-item>
                  <el-dropdown-item command="stop">停用</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
    <el-dialog
      title="修改联系人"
      :visible.sync="editDialog"
      width="600px"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
    >
      <div class="dialog_content">
        <el-form :inline="true" label-width="120px" label-suffix="：">
          <!-- <el-form-item label="账号" style="display: block;">
            <el-input
              v-model="editForm.account"
              placeholder="请输入"
              size="small"
            />
          </el-form-item> -->
          <el-form-item label="姓名" style="display: block;">
            <el-input
              v-model="editForm.name"
              placeholder="请输入"
              size="small"
            />
          </el-form-item>
          <el-form-item label="密码" style="display: block;">
            <el-input
              v-model="editForm.password"
              placeholder="请输入"
              size="small"
              type="password"
            />
          </el-form-item>
          <el-form-item label="职位" style="display: block;">
            <el-input
              v-model="editForm.position"
              placeholder="请输入"
              size="small"
            />
          </el-form-item>
          <el-form-item label="邮箱" style="display: block;">
            <el-input
              v-model="editForm.email"
              placeholder="请输入"
              size="small"
            />
          </el-form-item>
        </el-form>
      </div>
      <el-row type="flex" class="footer-bar" justify="end">
        <el-button size="small" @click="editDialog = false">取消</el-button>
        <el-button type="primary" size="small" @click="editSubmit"
          >确认</el-button
        >
      </el-row>
    </el-dialog>
    <el-dialog
      title="联系人详情"
      :visible.sync="infoDialog"
      width="600px"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
    >
      <div class="dialog_content">
        <el-form :inline="true" label-width="120px" label-suffix="：">
          <!-- <el-form-item label="账号" style="display: block;">
            {{ infoData.account }}
          </el-form-item> -->
          <el-form-item label="姓名" style="display: block;">
            {{ infoData.name }}
          </el-form-item>
          <el-form-item label="电话" style="display: block;">
            {{ infoData.phone }}
          </el-form-item>
          <el-form-item label="职位" style="display: block;">
            {{ infoData.position }}
          </el-form-item>
          <el-form-item label="邮箱" style="display: block;">
            {{ infoData.email }}
          </el-form-item>
        </el-form>
      </div>
      <el-row type="flex" class="footer-bar" justify="end">
        <el-button size="small" @click="infoDialog = false">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      loading: false,
      editDialog: false,
      infoDialog: false,
      form: {
        name: "",
        status: "",
      },
      editForm: {
        id: "",
        account: "",
        name: "",
        password: "",
        position: "",
        email: "",
      },
      infoData: {},
      search: {
        name: "",
      },
      industryOptions: [
        {
          id: "",
          name: "",
        },
      ],
      dataList: [
        {
          name: "",
        },
      ],
      statusList: [
        {
          name: "全部",
          val: 0,
        },
        {
          name: "正常",
          val: 1,
        },
        {
          name: "暂停",
          val: 2,
        },
        {
          name: "异常",
          val: 3,
        },
      ],
      auditActive: 0,
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    goAddPage() {
      this.$router.push({ name: "createLr" });
    },
    getDataList() {
      this.loading = true;
      let params = this.getParams();
      params.pageNum = this.pagination.page;
      params.pageSize = this.pagination.size;
      if (this.form.name) {
        params.search = this.form.name;
      }
      if (this.form.status) {
        params.status = this.form.status;
      }
      this.$api.post("/contacts/getList", params).then((res) => {
        this.loading = false;
        if (res.code == 0 && res.data && res.data.records) {
          this.dataList = res.data.records;
          this.pagination.total = res.data.total;
        }
      });
    },
    // 修改提交
    editSubmit() {
      this.$api.post("/user/update", this.editForm).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success("修改成功");
          this.editDialog = false;
        }
      });
    },
    info(row) {
      this.$api.get(`/contacts/get/${row.id}`).then((res) => {
        if (res.code == 0 && res.data) {
          this.infoData = res.data;
          this.infoDialog = true;
        }
      });
    },
    selectStatus(idx, item) {
      this.auditActive = idx;
      this.form.status = item.val;
      this.getDataList();
    },
    handleMoreOperating(e, row) {
      if (e === "edit") {
        this.editDialog = true;
        this.editForm.id = row.id;
        this.editForm.account = row.account;
        this.editForm.name = row.name;
        this.editForm.password = row.password;
        this.editForm.position = row.position;
        this.editForm.email = row.email;
      }
      if (e === "del") {
        this.$api.get(`/user/remove/${row.id}`).then((res) => {
          if (res.code == 0 && res.data) {
            this.$message.success("删除成功");
            this.editDialog = false;
            this.getDataList();
          }
        });
      }
      if (e === "start") {
        console.log(row);
        this.$api
          .post("/contacts/setStatus", { id: row.id, status: 1 })
          .then((res) => {
            if (res.code == 0 && res.data) {
              this.$message.success("启用成功");
              this.getDataList();
            }
          });
      }
      if (e === "stop") {
        this.$api
          .post("/contacts/setStatus", { id: row.id, status: 0 })
          .then((res) => {
            if (res.code == 0 && res.data) {
              this.$message.success("禁用成功");
              this.getDataList();
            }
          });
      }
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
</style>
