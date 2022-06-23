module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("assets/css/scss");

  eleventyConfig.addPassthroughCopy("assets");

  // Returns work items, sorted by display order
  eleventyConfig.addCollection("sortOrder", (collection) => {
    return collection
      .getFilteredByGlob("cards/*.md")
      .sort((a, b) => (Number(a.data.number) > Number(b.data.number) ? 1 : -1));
  });

  return {
    dir: {
      // ⚠️ These values are both relative to your input directory.
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
