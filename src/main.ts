import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import { createApp } from "vue";

import "@/assets/css/styles.scss";
import "@/assets/css/tailwind.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
// add primevue
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: definePreset(Aura, {
      semantic: {
        primary: {
          50: "{light.blue.50}",
          100: "{light.blue.100}",
          200: "{light.blue.200}",
          300: "{light.blue.300}",
          400: "{light.blue.400}",
          500: "{light.blue.500}",
          600: "{light.blue.600}",
          700: "{light.blue.700}",
          800: "{light.blue.800}",
          900: "{light.blue.900}",
          950: "{light.blue.950}"
        }
      }
    }),
    options: {
      darkModeSelector: ".app-dark"
    }
  }
});
// add directive
app.directive("ripple", Ripple);
app.directive("tooltip", Tooltip);
app.directive("styleclass", StyleClass);
app.use(router);

app.mount("#app");
