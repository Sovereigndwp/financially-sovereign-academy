// FSA Eleventy PoC — Stage 1B (deployment-isolated)
// Lives OUTSIDE the deploy root. Generates to a gitignored _site/ for local
// byte-identity verification ONLY. It does NOT feed Vercel: production serves
// the committed static HTML in /modules/*.html. Do not move this to repo root.
// Note: dir.includes/dir.data are resolved relative to dir.input, hence "../".
module.exports = function () {
  return {
    dir: { input: "src", includes: "../_includes", data: "../_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
