(function () {
  var c = document.getElementById('net'), x = c.getContext('2d'), pts = [], mouse = { x: -999, y: -999 };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function size() {
    c.width = innerWidth; c.height = innerHeight;
    pts = Array.from({ length: Math.min(80, Math.floor(innerWidth / 18)) }, function () {
      return { x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 };
    });
  }
  addEventListener('resize', size); size();
  addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
  function rgb() { return getComputedStyle(document.documentElement).getPropertyValue('--dot').trim(); }
  (function loop() {
    x.clearRect(0, 0, c.width, c.height);
    var col = rgb();
    pts.forEach(function (p, i) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > c.width) p.vx *= -1;
      if (p.y < 0 || p.y > c.height) p.vy *= -1;
      x.fillStyle = 'rgba(' + col + ',.55)'; x.beginPath(); x.arc(p.x, p.y, 1.8, 0, 6.283); x.fill();
      for (var j = i + 1; j < pts.length; j++) {
        var d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
        if (d < 130) { x.strokeStyle = 'rgba(' + col + ',' + (.22 * (1 - d / 130)) + ')'; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(pts[j].x, pts[j].y); x.stroke(); }
      }
      var m = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (m < 160) { x.strokeStyle = 'rgba(' + col + ',.4)'; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(mouse.x, mouse.y); x.stroke(); }
    });
    requestAnimationFrame(loop);
  })();
})();
