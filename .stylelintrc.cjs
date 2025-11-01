module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-tailwindcss",
    "@stylelint/prettier-config",
  ],
  customSyntax: "postcss-scss",
  rules: { "at-rule-no-unknown": null },
};
