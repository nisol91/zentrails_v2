import Vue from 'vue'

import './styles/quasar.scss'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar, Scroll, QSkeleton, QLinearProgress, QCircularProgress, QCarousel,
  QCarouselControl,
  QCarouselSlide, QImg, Ripple
} from 'quasar'

Vue.use(Quasar, {
  config: {
    brand: {
      primary: '#9a9ead',
      secondary: '#26A69A',
      accent: '#9C27B0',

      dark: '#1d1d1d',

      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  },
  plugins: {
  },
  components: {
    QSkeleton, QLinearProgress, QCircularProgress, QCarousel,
    QCarouselControl,
    QCarouselSlide, QImg, Ripple
  },
  directives: {
    Scroll
  }
})