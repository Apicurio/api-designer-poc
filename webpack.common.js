/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const {dependencies, federatedModuleName} = require("./package.json");
delete dependencies.serve; // Needed for nodeshift bug
const webpack = require("webpack");
const ChunkMapper = require("@redhat-cloud-services/frontend-components-config/chunk-mapper");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isPatternflyStyles = (stylesheet) => stylesheet.includes("@patternfly/react-styles/css/") || stylesheet.includes("@patternfly/react-core/");

module.exports = (env, argv) => {
  const isProduction = argv && argv.mode === "production";
  return {
    entry: {
      app: path.resolve(__dirname, "src", "index.tsx")
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts|jsx)?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
          include: (stylesheet => !isPatternflyStyles(stylesheet)),
          sideEffects: true,
        },
        {
          test: /\.css$/,
          include: isPatternflyStyles,
          use: ["null-loader"],
          sideEffects: true
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: "file-loader",
            options: {
              limit: 5000,
              name: "[contenthash:8].[ext]",
            }
          }
        },
        {
          test: /\.(svg|jpg|jpeg|png|gif)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 5000,
                name: isProduction ? "[contenthash:8].[ext]" : "[name].[ext]",
              }
            }
          ]
        }
      ]
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "auto"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/public", "index.html")
      }),
      new Dotenv({
        systemvars: true,
        silent: true
      }),
      new CopyPlugin({
        patterns: [
          {from: "./src/public/favicon.ico", to: "images"},
          {from: "./src/public/logo.png", to: "images"}
        ]
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
        chunkFilename: "[contenthash:8].css",
        insert: (linkTag) => {
          const preloadLinkTag = document.createElement("link")
          preloadLinkTag.rel = "preload"
          preloadLinkTag.as = "style"
          preloadLinkTag.href = linkTag.href
          document.head.appendChild(preloadLinkTag)
          document.head.appendChild(linkTag)
        }
      }),
      new ChunkMapper({
        modules: [
          federatedModuleName
        ]
      }),
      new webpack.container.ModuleFederationPlugin({
        name: federatedModuleName,
        remotes: {
          '@ads/ads':
              `promise new Promise(resolve => {
                  const cfg = ApiDesignerConfig || window.ApiDesignerConfig;
                  var adsUrl = "http://localhost:9009";
                  console.info("ApiDesignerConfig is", cfg);
                  if (cfg && cfg.federatedModules && cfg.federatedModules.ads) {
                      adsUrl = cfg.federatedModules.ads;
                  }
                  const fedModsUrl = adsUrl + "/fed-mods.json";
                  console.info("Loading ads-ui federated modules from: " + fedModsUrl);
                  fetch(fedModsUrl)
                      .then((response) => response.json())
                      .then((data) => {
                          console.debug("Fed Mods: ", data);
                          const adsEntryPoint = data.ads.entry[0];
                          const script = document.createElement("script")
                          const adsEntryPointUrl = adsUrl + adsEntryPoint;
    
                          console.debug("ADS entry point URL: ", adsEntryPointUrl);
                          
                          script.src = adsEntryPointUrl;
                          script.onload = () => {
                              const proxy = {
                                  get: (request) => window.ads.get(request),
                                  init: (arg) => {
                                      try {
                                          return window.ads.init(arg)
                                      } catch(e) {
                                          console.log("ADS remote container already initialized");
                                      }
                                  }
                              }
                              resolve(proxy)
                          }
                          document.head.appendChild(script);
                      })
                      .catch((error) => {
                          console.debug("Failed to load fed-mods.json: ", JSON.stringify(error));
                          console.error(error);
                      });
              })`
        },
        shared: {
          ...dependencies,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react"],
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
          "react-router-dom": {
            singleton: true,
            eager: true,
            requiredVersion: dependencies["react-router-dom"],
          },
          "@rhoas/app-services-ui-shared": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["@rhoas/app-services-ui-shared"]
          }
        },
      })
    ],
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".jsx"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, "./tsconfig.json")
        })
      ],
      symlinks: false,
      cacheWithContext: false
    },
  }
};
