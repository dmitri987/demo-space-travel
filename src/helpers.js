// import { useLayoutEffect } from "react";

const callbacks = new Set();

const viewportObserver = new ResizeObserver((entries) => {
  callbacks.forEach((callback) => callback(entries[0].contentRect.width));
});

viewportObserver.observe(document.documentElement);

export const useViewportResizedWidth = (callback) => {
  if (callback && !callbacks.has(callback)) callbacks.add(callback);
  // console.log("useViewportResizeObserver", callbacks);
};
