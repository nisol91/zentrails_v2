<template>
  <div class="leafletBox">
    <i class="getPosBtn" @click="getCurrentPosition">Get Current Location</i>

    <div style="height: 100%">
      <!-- <div class="info" style="height: 15%">
        <span>Center: {{ center }}</span>
        <span>Zoom: {{ zoom }}</span>
        <span>Bounds: {{ bounds }}</span>
      </div> -->
      <l-map
        style="height: 100%; width: 100%"
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer :url="url"></l-tile-layer>
      </l-map>
    </div>
  </div>
</template>
<script>
import L from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { Plugins } from "@capacitor/core";

export default {
  name: "MainMap",
  components: {
    LMap,
    LTileLayer,
    // LMarker,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 3,
      center: [47.41322, -1.219482],
      bounds: null,
      loc: {
        coords: {
          latitude: 1,
          longitude: 1,
        },
      },
    };
  },
  methods: {
    async getCurrentPosition() {
      const { Geolocation } = Plugins;
      const loc = await Geolocation.getCurrentPosition();
      this.loc = loc;
      console.log(loc);
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
  },
};
</script>
<style lang="scss">
.leafletBox {
  width: 100%;
  height: 100%;
}
</style>

