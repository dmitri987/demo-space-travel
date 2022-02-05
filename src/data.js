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
  return `${data.assetsDir}/${pageName}/bg-${pageName}-${size}.${defaultExtension}`;
};

data.preloadBackgroundImages = function (viewportWidth) {
  const size =
    viewportWidth <= data.breakpoints.tablet
      ? "mobile"
      : viewportWidth <= data.breakpoints.desktop
      ? "tablet"
      : "desktop";

  const ext = isWebpSupported() ? "webp" : "jpg";

  data.navBar.forEach(({ title: pageName }) =>
    preload(data.getBackgroundImagePath(pageName, size, ext), 1000)
  );
};

export default data;
