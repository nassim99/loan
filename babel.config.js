module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".ts",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
            ".svg",
            ".png",
            ".jpg",
          ],
          alias: {
            assets: "./src/assets",
            components: "./src/components",
            atoms: "./src/components/atoms",
            molecules: "./src/components/molecules",
            organisms: "./src/components/organisms",
            navigations: "./src/navigations",
            screens: "./src/screens",
            services: "./src/services",
            styles: "./src/styles",
            hooks: "./src/hooks",
            utils: "./src/utils",
          },
        },
      ],
    ],
  };
};
