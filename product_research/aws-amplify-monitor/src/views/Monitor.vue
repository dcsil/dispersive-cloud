<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" @click="headerMenuHandler" :selectedKeys="headeActive" :style="{ lineHeight: '64px' }">
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
      ],
    };
  },
  created() {
    this.headeActive = [this.$route.name];
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
      this.dataList = data.data.body;
      this.loadding = false;
      DataProvider.setdata(data);
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
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
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
