<template>
  <div class="zentrailsTabsBox">
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="map">
        <div class="mapBox">
          <leaflet-map :position="loc"></leaflet-map>
        </div>
      </q-tab-panel>

      <q-tab-panel name="mapSelect">
        <div class="selectMapsBox">Select your maps</div>
      </q-tab-panel>

      <q-tab-panel name="tracks">
        <div class="tracksBox">Tracks</div>
      </q-tab-panel>
    </q-tab-panels>

    <q-separator />

    <q-tabs
      v-model="tab"
      dense
      class="bg-grey-3"
      align="justify"
      narrow-indicator
    >
      <q-tab name="map" label="Map" />
      <q-tab name="mapSelect" label="MapSelect" />
      <q-tab name="tracks" label="Tracks" />
    </q-tabs>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tab: "map",
    };
  },
  created() {
    console.log("created");
  },
};
</script>
<style lang="scss">
.zentrailsTabsBox {
  width: 100%;
  height: calc(100% - 40px);
  padding-top: 70px;
}
.mapBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.selectMapsBox {
  height: 100%;
}
.tracksBox {
  height: 100%;
}
.q-tab-panels {
  height: 100% !important;
}
.q-tab-panel {
  padding: 0px 0px !important;
  // height: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>