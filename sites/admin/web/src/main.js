import { createApp } from 'vue';
import appVue from './App.vue';
import router from './router';
import config from '../library-web/lib/config';
import api from './utils/api';

import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;

import 'boxicons/css/boxicons.css';
import 'mosha-vue-toastify/dist/style.css';
import '@vueform/multiselect/themes/default.css';
import 'bulma/css/bulma.css';
import 'bulma-extensions/dist/css/bulma-extensions.min.css';
import 'nprogress/nprogress.css';
import './assets/css/app.css'; // make this last

import { Form, Field, ErrorMessage } from 'vee-validate';
import Multiselect from '@vueform/multiselect';
import Help from '../library-web/components/Help.vue';

api.configure(router, config.get());

let app = createApp(appVue);
app.use(router);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('Multiselect', Multiselect);
app.component('Help', Help);
app.mount('#app');
