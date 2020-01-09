module.exports = {
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    "@babel/plugin-transform-shorthand-properties",
    "babel-plugin-transform-es2015-shorthand-properties"
  ],
};
