// Set this variable to the themes that you are currently testing:
const THEMES_BEING_TESTED = [129865547821, 128515538989];
const waitFor = loomi_api.awaitCondition;

if (location.href.includes("vslyForcePreview")) {
  return;
}

waitFor(() => !!window.vslyThemeTest, 100, 5).catch(() => {
  if (window.Shopify.theme.role === `main`) return;
  if (THEMES_BEING_TESTED.includes(window.Shopify.theme.id)) {
    location.replace(
      location.href.includes("?")
        ? `${location.href}&preview_theme_id=`
        : `${location.href}?preview_theme_id=`
    );
  }
});
