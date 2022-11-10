// src/callout.tsx
import React from "react";
var themes = {
  default: "bg-orange-50 border border-orange-100 text-orange-800 dark:text-orange-300 dark:bg-orange-400 dark:border-orange-400 dark:bg-opacity-20 dark:border-opacity-30",
  error: "bg-red-100 border border-red-200 text-red-900 dark:text-red-200 dark:bg-red-900 dark:bg-opacity-30 dark:border-opacity-30",
  info: "bg-blue-100 border border-blue-200 text-blue-900 dark:text-blue-200 dark:bg-blue-900 dark:bg-opacity-30 dark:border-opacity-30",
  warning: "bg-yellow-50 border border-yellow-100 text-yellow-900 dark:text-yellow-200 dark:bg-yellow-700 dark:bg-opacity-30"
};
var Callout = ({
  children,
  type = "default",
  emoji = "\u{1F4A1}"
}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: `${themes[type]} flex rounded-lg nextra-callout mt-6`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pl-3 pr-2 py-2 select-none text-xl",
    style: {
      fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
  }, emoji), /* @__PURE__ */ React.createElement("div", {
    className: "pr-4 py-2"
  }, children));
};
var callout_default = Callout;
export {
  callout_default as default
};
