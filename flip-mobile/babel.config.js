module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "inline-dotenv",
      [
        "module-resolver",
        {
          root: ["./"],
          extension: [".js", ".ts", ".tsx"],
          alias: {
            assets: "./assets",
            components: "./src/components",
            models: "./src/models",
            navigation: "./src/navigation",
            reducers: "./src/store/reducers",
            screens: "./src/screens",
            src: "./src",
            store: "./src/store",
            types: "./src/types",
            utils: "./src/utils",
          },
        },
      ],
    ],
  };
};
