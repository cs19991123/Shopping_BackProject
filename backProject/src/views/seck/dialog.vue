<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加秒杀活动' : '编辑秒杀活动'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="dateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择分类"
            @change="changeSecond"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择分类"
            @change="changeGood"
          >
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth" prop="roleid">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="addInfo.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="edit" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { goodslist, seckadd, seckinfo, seckedit } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsid: "", //商品编号
        status: 1,
      },
      secondList: [], // 二级分类
      goods: [],
      dateTime: [],
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      isClear: true,
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    ...mapActions({
      getCateList: "cate/getCateListAction",
      getSeckList: "seck/getSeckListAction",
    }),
    // 一级分类联动二级分类
    changeSecond(e) {
      if (this.isClear) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
      this.cateList.map((item) => {
        if (item.id == e) {
          this.secondList = item.children;
        }
      });
      this.goods = [];
    },
    // 二级分类联动商品
    changeGood(e) {
      if (this.isClear) {
        this.form.goodsid = "";
      }
      goodslist({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goods = res.data.list;
      });
    },
    //   重置
    reset() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsid: "", //商品编号
        status: 1,
      };
      this.dateTime = [];
      this.$refs.form.resetFields();
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    look(id) {
      seckinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.isClear = false;
          this.changeSecond(this.form.first_cateid);
          this.changeGood(this.form.second_cateid);
          this.dateTime = [new Date(parseFloat(this.form.begintime)), new Date(parseFloat(this.form.endtime))];
        }
      });
    },
    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.begintime = new Date(this.dateTime[0]).getTime();
          this.form.endtime = new Date(this.dateTime[1]).getTime();
          seckadd(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSeckList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    edit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.begintime = new Date(this.dateTime[0]).getTime();
          this.form.endtime = new Date(this.dateTime[1]).getTime();
          seckedit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSeckList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.getCateList();
  },
};
</script>

<style  lang="" scoped>
</style>
