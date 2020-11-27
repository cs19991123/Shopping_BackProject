<template>
  <div>
    <el-table
      :data="memberList"
      border
      style="width: 100%"
    >
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="300">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="300">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if='item.row.status==1'>启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="mini" @click="edit(item.row.uid)"
              >编辑</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {};
  },
  computed:{
    ...mapGetters({
      memberList:'member/getMemberList'
    })
  },
  methods:{
    ...mapActions({
      getMemberList:'member/getMemberListAction'
    }),
    // 编辑
    edit(uid){
      this.$emit('edit',uid)
    },

  },
  mounted(){
    this.getMemberList()
  }
};
</script>

<style  lang="" scoped>
</style>
