import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "@/App.vue";
import "@/assets/index.postcss";
import router from "@/router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

const head = createHead();
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(head);
app.use(autoAnimatePlugin);
app.use(ElementPlus);

app.mount("#app");
