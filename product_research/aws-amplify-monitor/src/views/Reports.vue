<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <a-menu mode="inline" @click="siderMenuHandler" :selectedKeys="siderActive" :style="{ height: '100%', borderRight: 0 }">
        <a-menu-item v-for="item in siderMenu" :key="item.key">
          {{ item.value }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content
        :style="{
          background: '#fff',
          padding: '24px',
          margin: '16px 0',
          minHeight: '280px',
        }"
      >
        <div class="content">
          <a-card class="card" v-for="item in platForms" :key="item.name" :title="item.name">
            <p>
              # of Threat : <span class="threat">{{ item.value }}</span>
            </p>
          </a-card>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import ECharts from "vue-echarts";
import { DataProvider } from "./data_provider.js";
import { visitorOptions } from "./chart.config";
export default {
  components: {
    "v-chart": ECharts,
  },
  data() {
    return {
      platForms: [],
      siderActive: ["1"],
      charts: [],
      chartText: [],
      siderMenu: [
        { key: "1", value: "Overview" },
        { key: "2", value: "Daily" },
        { key: "3", value: "weekly" },
        { key: "4", value: "mounthly" },
      ],
    };
  },
  async mounted() {
    this.getValue(21);
  },

  methods: {
    getValue(num) {
      this.platForms = [
        {
          name: "PlatForm A",
          value: Math.round(Math.random() * num),
        },
        {
          name: "PlatForm B",
          value: Math.round(Math.random() * num),
        },
        {
          name: "PlatForm C",
          value: Math.round(Math.random() * num),
        },
        {
          name: "PlatForm D",
          value: Math.round(Math.random() * num),
        },
        {
          name: "PlatForm E",
          value: Math.round(Math.random() * num),
        },
        {
          name: "PlatForm F",
          value: Math.round(Math.random() * num),
        },
      ];
    },
    siderMenuHandler(item) {
      this.siderActive = item.keyPath;

      this.setLayout();
    },
    setLayout() {
      if (this.siderActive[0] === "1") {
        this.getValue(21);
      } else if (this.siderActive[0] === "2") {
        this.getValue(41);
      } else if (this.siderActive[0] === "3") {
        this.getValue(61);
      } else {
        this.getValue(101);
      }
    },
  },
};
</script>

<style>
.content {
  width: 100%;
}
.content-title {
  font-size: 20px;
  display: flex;
  margin-left: 26px;
  border: 1px solid rgba(13, 12, 79, 1);
}
.content-chart {
  display: flex;
}
.content-title span,
.content-chart span {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  flex: 1;
}
.content-title-text {
  font-weight: bold;
  margin-left: 20px;
}
.echarts {
  flex: 1;
  height: 400px;
  margin-left: 3%;
  margin-top: 36px;
}
.card {
  display: inline-block;
  width: 30%;
  margin-top: 36px;
  margin-left: 36px;
}
.threat{
  font-size: 20px;
  color: red;
}
</style>
