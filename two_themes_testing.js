// e.g the theme id you want to split test
const THEME_ID = 129865547821;
// e.g: 50 if you want the redirection to occur 50ms after sdk init
const redirectAfter = 50;

function setVisibility(val) {
  if (document.body) document.body.style.opacity = val;
}

function isViewingTheme() {
  return window.Shopify.theme.id === THEME_ID;
}

if (isViewingTheme()) {
  const css = document.createElement("style");
  css.innerHTML = `#preview-bar-iframe { display: none !important; }`;
  document.head.appendChild(css);
  setVisibility(1);
  window.vslyThemeTest = THEME_ID;
} else {
  setVisibility(0);
}

setTimeout(() => {
  if (isViewingTheme()) {
    setVisibility(1);
    return;
  }
  setVisibility(0);

  const key = `${_USE_CASE}-${_USE_CASE_VARIANT}`;
  const event = JSON.stringify({
    type: "USE_CASE",
    payload: {
      use_case: _USE_CASE,
      use_case_variant: _USE_CASE_VARIANT,
    },
    options: {
      gaName: _USE_CASE_GA,
      gaVariant: _USE_CASE_GA_VARIANT,
    },
  });
  sessionStorage.setItem(key, event);

  const url = location.href;
  const redirectionUrl = `${url}${
    url.includes("?") ? "&" : "?"
  }vsly-redirected-from=${key}&preview_theme_id=${THEME_ID}`;

  location.href = redirectionUrl;
}, redirectAfter);