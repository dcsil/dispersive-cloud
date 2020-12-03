<template>
  <div style="width: 80%; margin-left: 10%; margin-top: 60px">
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <a class="yes" @click="yesHandler(record)">yes</a>
        <a class="no" @click="noHandler(record)">no</a>
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
          title: "Status",
          dataIndex: "status",
          key: "status",
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
        threat: `NO.${index + 1}`,
        username: el.username,
        createTime: el.createTime,
        status: el.status,
      });
    });
  },
  methods: {
    yesHandler(item) {
      item.status = "Y";
      const list = DataProvider.getdata();
      list.map((el, index) => {
        el.status = this.data[index].status;
      });
    },
    noHandler(item) {
      item.status = "N";
       const list = DataProvider.getdata();
      list.map((el, index) => {
        el.status = this.data[index].status;
      });
    },
  },
};
</script>

<style>
.no {
  margin-left: 20px;
  color: red;
}
</style>
