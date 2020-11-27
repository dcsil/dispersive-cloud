<template>
  <div id="app" style="width: 100vw; height: 100vh">
    <router-view />
  </div>
</template>

<script>
import { components } from "aws-amplify-vue"; // eslint-disable-line

export default {
  name: "app",
  components: {
    components,
  },
};
</script>

