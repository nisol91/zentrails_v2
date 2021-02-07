import Vue from 'vue'
import router from "./routes";
import VueRouter from "vue-router";
import moment from "moment";
import Vuex from 'vuex'
import storeDefinition from './store'
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";
import vuetify from './vuetify'
import inViewportDirective from "vue-in-viewport-directive";
import { messages } from "./i18n/translations"
import VueI18n from 'vue-i18n'
import VueMeta from 'vue-meta'
import firebase from "firebase";
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
import VueSocialSharing from "vue-social-sharing";


// import axios from 'axios'
// import VueAxios from 'vue-axios';

//----

// style scss
import "./sass/style.scss";


//----
import Index from "./Index";
// volendo posso wrappare Index dentro ad App
// import App from './App.vue';

import StarRating from './components/shared/components/StarRating'
import FatalError from './components/shared/components/FatalError'
import ValidationErrors from './components/shared/components/ValidationErrors'
import Success from './components/shared/components/Success'
import SuccessBanner from './components/shared/components/SuccessBanner'
import NotFound from './components/shared/components/NotFound'
import ButtonCheck from './components/shared/components/ButtonCheck'
import MapboxMap from './components/shared/components/MapboxMap'
import MapboxSearch from './components/shared/components/MapboxSearch'
import ModalForm from "./components/shared/components/ModalForm.vue"
import DeleteForm from "./components/shared/components/DeleteForm.vue"
import CustomSelect from "./components/shared/components/CustomSelect.vue"
import ModalConfirmDelete from "./components/shared/components/ModalConfirmDelete.vue"
import FileLoader from "./components/shared/components/FileLoader.vue"
import GlobalMessage from "./components/shared/components/GlobalMessage.vue"
import LeafletMap from "./components/shared/components/LeafletMap.vue"


import SelectLocale from './i18n/SelectLocale.vue'
import './registerServiceWorker'


Vue.config.productionTip = false



// lodash e axios li importo per singolo componente all'occorrenza
/* import axios from "axios";
import _ from "lodash"; */
import './quasar'

Vue.use(window.VueBabylonjs);
Vue.use(require('vue-faker'));
Vue.use(require('vue-moment'));
Vue.use(firestorePlugin)
Vue.use(VueRouter);
Vue.use(Vuex)
Vue.use(VueMapbox, { mapboxgl: Mapbox });
Vue.use(VueI18n)
Vue.use(VueSocialSharing);

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})


Vue.directive("in-viewport", inViewportDirective);

// define filters globally
Vue.filter('fromNow', value => moment(value).fromNow())

// register components that i want to be registered globally, such as shared components
Vue.component('star-rating', StarRating);
Vue.component('fatal-error', FatalError);
Vue.component('v-errors', ValidationErrors);
Vue.component('success', Success);
Vue.component('success-banner', SuccessBanner);
Vue.component('not-found', NotFound);
Vue.component('button-check', ButtonCheck);
Vue.component('mapbox-map', MapboxMap);
Vue.component('mapbox-search', MapboxSearch);
Vue.component('modal-form', ModalForm);
Vue.component('delete-form', DeleteForm);
Vue.component('custom-select', CustomSelect);
Vue.component('modal-confirm-delete', ModalConfirmDelete);
Vue.component('file-loader', FileLoader);
Vue.component('select-locale', SelectLocale);
Vue.component('global-message', GlobalMessage);
Vue.component('leaflet-map', LeafletMap);




// vuex
const store = new Vuex.Store(storeDefinition)

const i18n = new VueI18n({
  locale: 'en',
  messages
});

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfRB6Q1hQ8-CmsjxiG0Na6lwNsFJGgtzU",
  authDomain: "zentrails-499e2.firebaseapp.com",
  databaseURL: "https://zentrails-499e2.firebaseio.com",
  projectId: "zentrails-499e2",
  storageBucket: "zentrails-499e2.appspot.com",
  messagingSenderId: "981089706929",
  appId: "1:981089706929:web:013915f566702017dfd390",
  measurementId: "G-2GGS1JXV9X"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Get a Firestore instance
export const db = firebaseApp.firestore();
// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

// persistenza sessione di login. serve?
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)


new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  i18n,
  render: h => h(Index),
  async beforeCreate() {
    // console.log('before');
    // load data stored in session if there are some
    // this.$store.dispatch('loadStoredState')

  },

}).$mount('#app')

