// Interaction tracking — fires once per browser session on first interaction.
// Uses the same shared Apps Script web app as the other GG widgets (globe / FAQ /
// pricing): a single no-cors GET that appends a row to the 2026Registration tab
// (timestamp, button, ip, country, state, city, sponsor), with IP-based geo from
// ipapi.co. This widget is tagged button=ProgramWidget. Iframe height reporting is
// handled separately in widget.js, so it is intentionally omitted here.
(function () {
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxq8HofSFbnFxS7HeKQKZVhyuPIqpu_7NAWhvOzAXBzyxfatdeJu8hfGCRCahOINshA/exec';
  var TRACK_KEY  = 'ggProgramTracked';

  async function trackInteraction() {
    if (sessionStorage.getItem(TRACK_KEY)) return;
    sessionStorage.setItem(TRACK_KEY, '1');

    var params = new URLSearchParams({
      sheet:  '2026Registration',
      button: 'ProgramWidget'
    });

    try {
      var ctrl  = new AbortController();
      var timer = setTimeout(function () { ctrl.abort(); }, 3000);
      var geo   = await fetch('https://ipapi.co/json/', { signal: ctrl.signal }).then(function (r) { return r.json(); });
      clearTimeout(timer);
      if (geo.ip)           params.set('ip',      geo.ip);
      if (geo.country_name) params.set('country', geo.country_name);
      if (geo.region)       params.set('state',   geo.region);
      if (geo.city)         params.set('city',    geo.city);
    } catch (_) {}

    fetch(SCRIPT_URL + '?' + params.toString(), { mode: 'no-cors' }).catch(function () {});
  }

  // Any real interaction (tab click, expand, scroll-drag, etc.) begins with a
  // pointerdown. One fire per session.
  document.addEventListener('pointerdown', trackInteraction, { once: true });
})();
