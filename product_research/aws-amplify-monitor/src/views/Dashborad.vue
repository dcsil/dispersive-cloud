<template>
  <div style="width: 80%;
    margin-left: 10%;
    margin-top: 60px;">
  <a-table :columns="columns" :data-source="data">
    <span slot="action" slot-scope="text, record">
      <a @click="clickHandler(record)">{{ record.threat }} -- Details</a>
    </span>
  </a-table>
  </div>
</template>
<script>
import { DataProvider } from "./data_provider.js";

export default {
  data() {
    return {
      columns: [
        {
          title: "Threat",
          dataIndex: "threat",
          key: "threat",
        },
        {
          title: "User name",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "Time",
          dataIndex: "createTime",
          key: "createTime",
        },

        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      data: [],
    };
  },
  async mounted() {
    const list = DataProvider.getdata();
    list.map((el, index) => {
      this.data.push({
        threat: `NO.${index+1}`,
        username: el.username,
        createTime: el.createTime,
      });
    });
  },
  methods: {
    clickHandler(item){
      this.$root.$emit("msg",'activity')
      this.$router.push({
        path: `/monitor/activity`,
        params: { id:item.username },
      });
    }
  },
};
</script>

<style>
</style>