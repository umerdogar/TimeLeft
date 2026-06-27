module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@events": "./src/features/events",
            "@hooks": "./src/hooks",
            "@components": "./src/components",
            "@lib": "./src/lib",
            "@screens": "./src/screens",
            "@assets": "./assets",
            "@appTypes": "./src/types/index.ts",
            "@utils": "./src/utils",
          },
        },
      ],
      "react-native-reanimated/plugin", // must be last
    ],
  };
};
