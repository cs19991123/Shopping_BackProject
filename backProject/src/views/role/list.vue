<template>
  <div>
    <el-table
      :data="roleList"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
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
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {roledelete} from '../../util/axios'
export default {
  data() {
    return {};
  },
  computed:{
    ...mapGetters({
      roleList:'role/getRoleList'
    })
  },
  methods:{
    ...mapActions({
      getRoleList:'role/getRoleListAction'
    }),
    // 编辑
    edit(id){
      this.$emit('edit',id)
    },
    // 删除
    del(id){
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          roledelete({id}).then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              this.getRoleList()
            }else{
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  mounted(){
    this.getRoleList()
  }
};
</script>

<style  lang="" scoped>
</style>
