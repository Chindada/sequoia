import { setupLayouts } from "virtual:meta-layouts";
import { createRouter, createWebHistory } from "vue-router";
import { handleHotUpdate, routes } from "vue-router/auto-routes";

import { Refresh } from "@/apis/auth";
import { GetAvaliableTimeInMinute } from "@/utils/jwt";

declare module "vue-router" {
  interface RouteMeta {
    layout?: string;
    auth: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
});

router.beforeEach(async (to) => {
  if (to.meta.auth && GetAvaliableTimeInMinute(localStorage.getItem("token")) < 15) {
    try {
      await Refresh();
    } catch {
      return "/login";
    }
  }
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

export default router;
