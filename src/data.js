import { isWebpSupported, preload } from "./helpers";

const data = {
  assetsDir: "assets",
  breakpoints: {
    desktop: 1023,
    tablet: 749,
  },
  navBar: [
    { title: "home", url: "/" },
    { title: "destination", url: "/destination" },
    { title: "crew", url: "/crew" },
    { title: "technology", url: "/technology" },
  ],
};

// pageName: home | destination | crew | technology
// size: desktop | tablet | mobile
data.getBackgroundImagePath = function (
  pageName,
  size,
  defaultExtension = "jpg"
) {
  const ext = isWebpSupported() ? "webp" : defaultExtension;
  return `${data.assetsDir}/${pageName}/bg-${pageName}-${size}.${ext}`;
};

data.preloadBackgroundImages = function (viewportWidth) {
  const size =
    viewportWidth <= data.breakpoints.tablet
      ? "mobile"
      : viewportWidth <= data.breakpoints.desktop
      ? "tablet"
      : "desktop";

  data.navBar.forEach(({ title: pageName }) =>
    preload(data.getBackgroundImagePath(pageName, size, "jpg"), 1000)
  );
};

export default data;
