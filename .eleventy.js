module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");

  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/assets/css/**/*.css",
  });

  return {
    dir: {
      // ⚠️ These values are both relative to your input directory.
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
