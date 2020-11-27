<template>
  <div>
    <v-bread></v-bread>

    <v-table @edit="edit"></v-table>
    <v-dialog :isShow="isShow" @cancel="cancel" ref="vdialog"></v-dialog>
  </div>
</template>

<script>
import vBread from "../../components/bread";
import vTable from "./list";
import vDialog from "./dialog";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    vBread,
    vTable,
    vDialog,
  },
  methods: {
    cancel(e) {
      this.isShow = e;
    },
    edit(e) {
      this.isShow = true;

      this.$refs.vdialog.look(e);
    },
  },
};
</script>

<style  lang="stylus" scoped></style>
