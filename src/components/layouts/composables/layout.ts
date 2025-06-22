import { type Ref, computed, reactive } from "vue";

const layoutConfig = reactive({
  preset: "Aura",
  primary: "emerald",
  surface: "",
  darkTheme: false,
  menuMode: "static"
});

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: ""
});

export function useLayout() {
  const setActiveMenuItem = (item: string | Ref<string, string>) => {
    if (typeof item === "string") {
      layoutState.activeMenuItem = item;
    } else {
      layoutState.activeMenuItem = item.value;
    }
  };

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      executeDarkModeToggle();

      return;
    }

    document.startViewTransition(() => executeDarkModeToggle());
  };

  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    document.documentElement.classList.toggle("app-dark");
  };

  const toggleMenu = () => {
    if (layoutConfig.menuMode === "overlay") {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  const isSidebarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  );

  const isDarkTheme = computed(() => layoutConfig.darkTheme);

  const getPrimary = computed(() => layoutConfig.primary);

  const getSurface = computed(() => layoutConfig.surface);

  return {
    layoutConfig,
    layoutState,
    toggleMenu,
    isSidebarActive,
    isDarkTheme,
    getPrimary,
    getSurface,
    setActiveMenuItem,
    toggleDarkMode
  };
}

export interface MenuItem {
  label?: string;
  icon?: string;
  to?: string;
  class?: string;
  url?: string;
  target?: string;
  separator?: boolean;
  visible?: boolean;
  items?: MenuItem[];
  disabled?: boolean;
}
