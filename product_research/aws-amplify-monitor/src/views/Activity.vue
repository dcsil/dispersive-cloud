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
          <div class="content-title">
            <span
              >Threat:<span class="content-title-text">{{ target.threat }}</span></span
            >
            <span
              >User name:<span class="content-title-text">{{ target.username }}</span></span
            >
            <span
              >Time:<span class="content-title-text">{{ target.createTime }}</span></span
            >
          </div>
          <div class="content-chart" >
            <v-chart :style="{width:(charts.length===1?'100%':'30%')}" v-for="(item, index) in charts" :key="index" class="chart" :options="item.options" autoresize></v-chart>
          </div>
          <div class="content-chart" >
            <span v-for="(item, index) in chartText" :key="index">{{ item }}</span>
          </div>
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
      target: { threat: "", username: "", createTime: "" },
      siderActive: ["1"],
      charts: [],
      chartText: [],
      siderMenu: [
        { key: "1", value: "Overview" },
        { key: "2", value: "Direction" },
        { key: "3", value: "Angle of Curvature" },
        { key: "4", value: "Curvature Distance" },
      ],
      chartOption1: JSON.parse(JSON.stringify(visitorOptions)),
      chartOption2: JSON.parse(JSON.stringify(visitorOptions)),
      chartOption3: JSON.parse(JSON.stringify(visitorOptions)),
    };
  },
  async mounted() {
    let id = this.$route.params.id;
    let list = [];
    if (id == null) {
      list = DataProvider.getdata();
      id = list[0].id;
    }
    const filter = list.find((el) => el.id === id);
    const index = list.findIndex((el) => el.id === id) + 1;
    this.target = { threat: `NO.${index}`, username: filter.username, createTime: filter.createTime };
    this.setLayout();
    const chartData = filter.error;
    chartData.map((el) => {
      this.chartOption1.xAxis.data.push(el.createTime);
      this.chartOption1.series[0].data.push(el.Direction.toFixed(2));
      this.chartOption2.xAxis.data.push(el.createTime);
      this.chartOption2.series[0].data.push(el.Angle_of_Curvature.toFixed(2));
      this.chartOption3.xAxis.data.push(el.createTime);
      this.chartOption3.series[0].data.push(el.Curvature_Distance.toFixed(2));
    });
  },

  methods: {
    siderMenuHandler(item) {
      this.siderActive = item.keyPath;
      this.setLayout();
    },
    setLayout() {
      if (this.siderActive[0] === "1") {
        this.charts = [
          {
            options: this.chartOption1,
          },
          {
            options: this.chartOption2,
          },
          {
            options: this.chartOption3,
          },
        ];
        this.chartText = ["Direction", "Angle of Curvature", "Curvature Distance"];
      } else if (this.siderActive[0] === "2") {
        this.chartText = [this.siderMenu.find((el) => el.key === this.siderActive[0]).value];
        this.charts = [{ options: this.chartOption1 }];
      } else if (this.siderActive[0] === "3") {
        this.chartText = [this.siderMenu.find((el) => el.key === this.siderActive[0]).value];
        this.charts = [{ options: this.chartOption2 }];
      } else {
        this.chartText = [this.siderMenu.find((el) => el.key === this.siderActive[0]).value];
        this.charts = [{ options: this.chartOption3 }];
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
  width:30%;
  height: 400px;
  margin-left: 3%;
  margin-top: 36px;
}
</style>
