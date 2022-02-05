// trigger React components on viewport resize
const callbacks = new Set();
const viewportObserver = new ResizeObserver((entries) => {
  callbacks.forEach((callback) => callback(window.innerWidth));
});
viewportObserver.observe(document.documentElement);

export const subscribeViewportWidthObserver = (callback) => {
  if (callback && !callbacks.has(callback)) callbacks.add(callback);

  return function unsubscribe() {
    callbacks.delete(callback);
  };
};

// check for WebP support
// from here: https://stackoverflow.com/questions/5573096/detecting-webp-support
let _isWebpSupported = false;
export function testWebpSupport() {
  return new Promise((res) => {
    const webP = new Image();
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    webP.onload = webP.onerror = () => {
      _isWebpSupported = webP.height === 2;
      res(_isWebpSupported);
    };
  });
}
export const isWebpSupported = () => _isWebpSupported;

// preload images with <link> element
const REMOVE_LINK_DELAY = 5000;

const preloadedImages = new Set();

const _preload = (path, delay_ms) => {
  if (preloadedImages.has(path)) return;

  preloadedImages.add(path);

  setTimeout(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    if (isWebpSupported() && !path.endsWith("webp")) {
      const lastDot = path.search(/\.[^.]*$/);
      link.href = path.slice(0, lastDot) + "webp";
    } else {
      link.href = path;
    }
    document.head.insertAdjacentElement("beforeend", link);

    console.log(
      `preload '${link.href}'`,
      document.timeline.currentTime,
      delay_ms
    );
    setTimeout(() => link.remove(), REMOVE_LINK_DELAY);
  }, delay_ms);
};

export const preload = (paths, delay_ms = 0) => {
  const _paths = paths instanceof Array ? paths : [paths];
  _paths.forEach((path) => _preload(path, delay_ms));
};
