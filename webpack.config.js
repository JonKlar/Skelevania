var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./Skelevania.js",
  output: {
    path: path.join(__dirname),
    filename: "bundle.js"
  },
  
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js"]
  }
};
