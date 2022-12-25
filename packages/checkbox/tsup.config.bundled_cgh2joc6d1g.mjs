// tsup.config.ts
import { findUpSync } from "find-up";
import { defineConfig } from "tsup";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGZpbmRVcFN5bmMgfSBmcm9tICdmaW5kLXVwJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3RzdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBjbGVhbjogdHJ1ZSxcbiAgZm9ybWF0OiBbJ2NqcycsICdlc20nXSxcbiAgb3V0RXh0ZW5zaW9uKGN0eCkge1xuICAgIHJldHVybiB7IGpzOiBgLiR7Y3R4LmZvcm1hdH0uanNgIH07XG4gIH0sXG4gIGluamVjdDogcHJvY2Vzcy5lbnYuSlNYID8gW2ZpbmRVcFN5bmMoJ3JlYWN0LXNoaW0uanMnKSFdIDogdW5kZWZpbmVkLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxvQkFBb0I7QUFFN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLEVBQ1AsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQ3JCLGFBQWEsS0FBSztBQUNoQixXQUFPLEVBQUUsSUFBSSxJQUFJLElBQUksWUFBWTtBQUFBLEVBQ25DO0FBQUEsRUFDQSxRQUFRLFFBQVEsSUFBSSxNQUFNLENBQUMsV0FBVyxlQUFlLENBQUUsSUFBSTtBQUM3RCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
