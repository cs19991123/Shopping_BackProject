<template>
  <div>
    <v-bread></v-bread>
    <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      size="mini"
      @click="add"
      >添加</el-button
    >
    <v-table @edit="edit"></v-table>
    <v-dialog :addInfo="addInfo" @cancel="cancel" ref="vdialog"></v-dialog>
  </div>
</template>

<script>
import vBread from "../../components/bread";
import vTable from "./list";
import vDialog from "./dialog";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  components: {
    vBread,
    vTable,
    vDialog,
  },
  methods: {
    add() {
      this.addInfo = {
        isShow: true,
        isAdd: true,
      };
    },
    cancel(e) {
      this.addInfo.isShow = e;
    },
    edit(e) {
      this.addInfo = {
        isShow: true,
        isAdd: false,
      };
      this.$refs.vdialog.look(e);
    },
  },
};
</script>

<style  lang="stylus" scoped>
.el-button {
  margin-bottom: 10px;
}
</style>
