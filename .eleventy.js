module.exports = function (eleventyConfig) {
  const { EleventyI18nPlugin } = require("@11ty/eleventy");

  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("assets/css/scss");

  eleventyConfig.addPassthroughCopy("assets");

  // Add language management plugin
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    // any valid BCP 47-compatible language tag is supported
    defaultLanguage: "fr", // Required, this site uses "en"
    // filters: {
    //   links: [
    //     { url: "/es/", code: "es", label: "Español" },
    //     { url: "/fr/", code: "fr", label: "Français" },
    //     { url: "/en/", code: "en", label: "English" },
    //   ],
    // },
  });

  // Returns work items, sorted by display order
  eleventyConfig.addCollection("sortOrder", (collection) => {
    return collection
      .getFilteredByGlob("restaurantProfiles/*.md")
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
