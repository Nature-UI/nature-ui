// tsup.config.ts
import { defineConfig } from "tsup";
import { findUpSync } from "find-up";
var tsup_config_default = defineConfig({
  clean: true,
  format: ["cjs", "esm"],
  outExtension(ctx) {
    return { js: `.${ctx.format}.js` };
  },
  inject: process.env.JSX ? [findUpSync("react-shim.js")] : void 0
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ0c3VwXCJcbmltcG9ydCB7IGZpbmRVcFN5bmMgfSBmcm9tIFwiZmluZC11cFwiXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGNsZWFuOiB0cnVlLFxuICBmb3JtYXQ6IFtcImNqc1wiLCBcImVzbVwiXSxcbiAgb3V0RXh0ZW5zaW9uKGN0eCkge1xuICAgIHJldHVybiB7IGpzOiBgLiR7Y3R4LmZvcm1hdH0uanNgIH1cbiAgfSxcbiAgaW5qZWN0OiBwcm9jZXNzLmVudi5KU1ggPyBbZmluZFVwU3luYyhcInJlYWN0LXNoaW0uanNcIikhXSA6IHVuZGVmaW5lZCxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxrQkFBa0I7QUFFM0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLEVBQ1AsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQ3JCLGFBQWEsS0FBSztBQUNoQixXQUFPLEVBQUUsSUFBSSxJQUFJLElBQUksWUFBWTtBQUFBLEVBQ25DO0FBQUEsRUFDQSxRQUFRLFFBQVEsSUFBSSxNQUFNLENBQUMsV0FBVyxlQUFlLENBQUUsSUFBSTtBQUM3RCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
