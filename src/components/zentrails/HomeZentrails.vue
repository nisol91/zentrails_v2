<template>
  <div class="geo">
    <h1>Geolocation</h1>
    <p>Your location is:</p>
    <p>Latitude: {{ loc.coords.latitude }}</p>
    <p>Longitude: {{ loc.coords.longitude }}</p>

    <button @click="getCurrentPosition">Get Current Location</button>
    <mapbox-map></mapbox-map>
  </div>
</template>

<script>
import { Plugins } from "@capacitor/core";
export default {
  name: "App",
  data() {
    return {
      loc: {
        coords: {
          latitude: 1,
          longitude: 1,
        },
      },
    };
  },
  created() {
    console.log("created");
  },
  methods: {
    async getCurrentPosition() {
      const { Geolocation } = Plugins;
      const loc = await Geolocation.getCurrentPosition();
      this.loc = loc;
    },
  },
};
</script>
<style lang="scss">
.geo {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 200px;
  flex-direction: column;
}
</style>