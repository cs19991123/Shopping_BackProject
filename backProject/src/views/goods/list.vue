<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="100">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img
              class="img"
              :src="item.row.img ? $imgUrl + item.row.img : ''"
              alt=""
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="120">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.isnew == 1">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="120">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.ishot == 1">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.status == 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="mini" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="del(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="goodsSize"
      :total="goodsCount"
      @current-change="change"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { goodsdelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsSize: "goods/getGoodsSize",
      goodsCount: "goods/getGoodsCount",
    }),
  },
  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsListAction",
      getGoodsPage:'goods/getGoodsPageAction'
    }),
    // 点击分页按钮
    change(val) {
        this.getGoodsPage(val)
    },
    // 删除
    del(id) {
      this.$confirm("此操作将删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsdelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getGoodsList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.getGoodsList();
  },
};
</script>

<style  lang="stylus" scoped>
.img {
  width: 100px;
}
.el-pagination {
  float: right;
  margin-top: 20px;
}
</style>
