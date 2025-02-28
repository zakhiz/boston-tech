import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { getCurrentUserToken } from "../services/auth.service"; 
import { notify } from "../config/toastify.notification";

export const dashboardGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  try {
    const token = await getCurrentUserToken();
    if (token) {
      if (to.path === "/") {
        return next("/dashboard");
      }
      return next();
    } else {
      if (to.meta.requiresAuth) {
        return next("/");
      }
      return next();
    }
  } catch (error) {
    notify({
      title: 'Error en el middleware de autenticación',
      icon: 'error',
      color: "#fff",
      position:'top'
    });
    return next("/");
  }
};
