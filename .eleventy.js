// Stage-1 proof-of-concept Eleventy config.
// Builds ONLY .njk templates (currently just modules/risk-insurance.njk) to _site/.
// Production is unaffected: vercel.json is unchanged and still serves the existing
// static .html files directly. This config exists to prove byte/behavior parity for
// one templatized module before any Stage-2 deploy change.
module.exports = function (eleventyConfig) {
  // Only treat .njk as templates. All existing .html stay untouched (not processed,
  // not copied) so the PoC cannot alter any current page.
  eleventyConfig.setTemplateFormats(["njk"]);

  eleventyConfig.ignores.add("node_modules");
  eleventyConfig.ignores.add("_site");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
