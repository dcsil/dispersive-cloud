<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo"></div>
      <h6>Dispersive cloud</h6>
      <a-menu
        theme="dark"
        mode="horizontal"
        @click="headerMenuHandler"
        :selectedKeys="headeActive"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="item in headerMenu" :key="item.key">
          {{ item.value }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <router-view></router-view>
    <div class="example" v-if="loadding">
      <a-spin size="large" />
    </div>
  </a-layout>
</template>
<script>
var config = require("../config.js");
import axios from "axios";
axios.defaults.withCredentials = false;
import { DataProvider } from "./data_provider.js";
export default {
  data() {
    return {
      dataList: [],
      collapsed: false,
      loadding: true,
      headeActive: ["dashboard"],
      authToken: "",
      headerMenu: [
        { key: "dashboard", value: "Dashboard" },
        { key: "activity", value: "Activity" },
        { key: "reports", value: "Reports" },
        { key: "user", value: "User Manage" },
      ],
    };
  },
  created() {
    // this.headeActive = [this.$route.name];
  },
  async mounted() {
    const session = await this.$Amplify.Auth.currentSession();
    const Jwt = session.idToken.jwtToken;
    if (config.api.invokeUrl === "") {
      this.authMessage = true;
      this.show();
    }

    if (!Jwt) {
      alert("No Authorization token!");
    } else {
      this.authToken = Jwt;
    }
    this.getDataList();

    this.$root.$on("msg", (data) => {
      this.headeActive = [data];
    });
  },
  methods: {
    async getDataList() {
      const data = await axios({
        method: "GET",
        url: config.api.invokeUrl + "/getdata",
        headers: {
          Accept: "*/*",
          "content-type": "application/json; charset=UTF-8",
          Authorization: this.authToken,
        },
        contentType: "application/json",
      });
      data.data.body.map((el, index) => {
        el["status"] = "Y";
      });
      this.dataList = data.data.body;
      this.loadding = false;
      DataProvider.setdata(data);
      this.$router.push({
        path: `/monitor/dashboard`,
        params: { id: this.dataList[0].id },
      });
    },
    headerMenuHandler(item) {
      this.headeActive = item.keyPath;
      this.$router.push({
        path: `/monitor/${this.headeActive}`,
        params: { id: this.dataList[0].id },
      });
    },
  },
};
</script>

<style>
#components-layout-demo-top-side-2 {
  height: 100%;
}
#components-layout-demo-top-side-2 .logo {
  background: url("../assets/logo.png") no-repeat 50%;
  width: 60px;
  height: 60px;
  float: left;
  background-size: 60px;
  position: relative;
  top: 3px;
  margin-right: 20px;
}
#components-layout-demo-top-side-2 h6 {
  float: left;
  margin: 0;
  color: #fff;
  margin-right: 60px;
  font-size: 20px;
  font-weight: bold;
}
.example {
  width: 100vw;
  height: 100vh;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  position: absolute;
}
</style>
