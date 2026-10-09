/* Gentle scroll background: soft colour drift, slow stars, faint ridges. No streaks or fast motion. */
(function () {
  var c = document.getElementById('net'), x = c.getContext('2d'), W, H, run = true, raf, sp = 0, stars = [];
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [top r,g,b, bottom r,g,b] - dark and close together so changes are subtle
  var S = [[8,5,20,20,12,42],[7,9,24,13,26,48],[6,14,24,11,34,46],[12,7,26,32,14,44],[9,9,26,20,18,52],[7,15,26,13,32,50],[14,6,22,36,14,36]];
  function size() {
    var d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0);
    stars = Array.from({ length: W < 700 ? 50 : 100 }, function () { return { x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + .3, a: Math.random() * .4 + .1, v: Math.random() * .08 + .02 }; });
  }
  function mix() {
    var f = sp * (S.length - 1), i = Math.min(Math.floor(f), S.length - 2), k = f - i, a = S[i], b = S[i + 1];
    return a.map(function (v, n) { return Math.round(v + (b[n] - v) * k); });
  }
  function frame() {
    var max = document.documentElement.scrollHeight - innerHeight, target = max > 0 ? scrollY / max : 0;
    sp += (target - sp) * .04;
    var col = mix(), g = x.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgb(' + col[0] + ',' + col[1] + ',' + col[2] + ')');
    g.addColorStop(1, 'rgb(' + col[3] + ',' + col[4] + ',' + col[5] + ')');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    stars.forEach(function (s) {
      if (!calm) { s.y -= s.v; if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; } }
      x.fillStyle = 'rgba(210,205,255,' + s.a + ')';
      x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.283); x.fill();
    });
    for (var L = 0; L < 2; L++) {
      var base = H * (.84 + L * .07) + sp * H * .04;
      x.beginPath(); x.moveTo(0, H);
      for (var px = 0; px <= W + 40; px += 40) x.lineTo(px, base - (Math.sin(px * .003 * (L + 1) + L * 3) * 26 + Math.sin(px * .009 + L) * 9));
      x.lineTo(W, H); x.closePath();
      x.fillStyle = 'rgba(' + Math.round(col[3] * .5) + ',' + Math.round(col[4] * .5) + ',' + Math.round(col[5] * .55) + ',' + (.35 + L * .2) + ')';
      x.fill();
    }
    if (run && !calm) raf = requestAnimationFrame(frame);
  }
  addEventListener('resize', function () { size(); if (calm) frame(); });
  if (calm) addEventListener('scroll', frame, { passive: true });
  document.addEventListener('visibilitychange', function () { run = !document.hidden; cancelAnimationFrame(raf); if (run) frame(); });
  size(); frame();
})();
