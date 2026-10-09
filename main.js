"use strict";
const root = document.documentElement;
const $ = (s) => document.querySelector(s);
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
// Typing effect
const roles = ['Aspiring Software Engineer', 'Cybersecurity Enthusiast', 'Student & Builder'];
const typed = $('#typed');
let r = 0, c = 0, del = false;
function type() {
    const word = roles[r];
    typed.textContent = word.slice(0, c);
    c += del ? -1 : 1;
    let wait = del ? 35 : 75;
    if (!del && c > word.length) {
        del = true;
        wait = 1400;
    }
    else if (del && c < 0) {
        del = false;
        r = (r + 1) % roles.length;
        c = 0;
        wait = 300;
    }
    setTimeout(type, wait);
}
type();
// Split headings into words for a masked rise
document.querySelectorAll('h2').forEach(h => {
    h.setAttribute('aria-label', h.textContent || '');
    h.innerHTML = (h.textContent || '').split(' ').map((w, k) => `<span class="w" aria-hidden="true"><span style="--k:${k}">${[...w].map(ch => `<i>${ch}</i>`).join('')}</span></span>`).join('');
});
document.querySelectorAll('.stag').forEach(g => [...g.children].forEach((el, i) => el.style.setProperty('--i', String(i))));
// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
    }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// Scroll-spy
const links = document.querySelectorAll('.nav nav a');
const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting)
        links.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section').forEach(s => spy.observe(s));
// Scroll progress, parallax, timeline line
const bar = $('#bar'), tl = $('.timeline'), aur = $('.aurora'), hero = $('.hero-text');
function onScroll() {
    const y = scrollY, max = root.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (!calm) {
        aur.style.transform = `translateY(${y * -0.12}px)`;
        if (y < innerHeight)
            hero.style.transform = `translateY(${y * 0.18}px)`;
    }
    const b = tl.getBoundingClientRect();
    tl.style.setProperty('--p', String(Math.min(1, Math.max(0, (innerHeight * 0.7 - b.top) / b.height))));
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();
// Cursor glow
const glow = $('#glow');
addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
// Card spotlight, 3D tilt, magnetic buttons
document.querySelectorAll('.card').forEach(el => el.addEventListener('mousemove', e => {
    const b = el.getBoundingClientRect();
    el.style.setProperty('--mx', e.clientX - b.left + 'px');
    el.style.setProperty('--my', e.clientY - b.top + 'px');
}));
if (!calm) {
    document.querySelectorAll('[data-tilt]').forEach(el => {
        el.addEventListener('mousemove', e => {
            const b = el.getBoundingClientRect();
            const px = (e.clientX - b.left) / b.width - 0.5, py = (e.clientY - b.top) / b.height - 0.5;
            el.style.transform = `perspective(700px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateY(-6px)`;
        });
        el.addEventListener('mouseleave', () => (el.style.transform = ''));
    });
    document.querySelectorAll('.btn').forEach(b => {
        b.addEventListener('mousemove', e => {
            const r2 = b.getBoundingClientRect();
            b.style.transform = `translate(${(e.clientX - r2.left - r2.width / 2) * 0.2}px, ${(e.clientY - r2.top - r2.height / 2) * 0.3}px)`;
        });
        b.addEventListener('mouseleave', () => (b.style.transform = ''));
    });
}
// Contact form (opens email app)
$('#form').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const name = String(f.get('name')).trim(), email = String(f.get('email')).trim(), msg = String(f.get('msg')).trim();
    const err = $('#err');
    if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) {
        err.textContent = 'Enter your name, a valid email and a message.';
        return;
    }
    err.textContent = '';
    location.href = `mailto:samarth.r.lagad@gmail.com?subject=${encodeURIComponent('Portfolio message from ' + name)}&body=${encodeURIComponent(msg + '\n\n' + name + ' (' + email + ')')}`;
});
$('#yr').textContent = String(new Date().getFullYear());
// Mobile menu
const menu = $('#menu'), navLinks = $('#links');
function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape')
    setMenu(false); });
// Back to top
const topBtn = $('#top');
addEventListener('scroll', () => topBtn.classList.toggle('show', scrollY > 700), { passive: true });
topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' }));
// ---- Scroll journey: hero zoom-out, horizontal projects, depth HUD ----
const pin = $('#projects'), track = $('.proj-grid'), depth = $('#depth'), sceneName = $('#scene');
pin.classList.add('in');
const scenes = [['home', 'Surface'], ['about', 'Shallows'], ['skills', 'Reef'], ['projects', 'Trench'], ['journey', 'Abyss'], ['certs', 'Deep sea'], ['contact', 'Core']];
const many = () => [...track.children].filter(c => !c.hidden).length > 1;
pin.classList.toggle('single', !many());
const pinned = () => innerWidth > 900 && innerHeight >= 680 && many();
function sizePin() {
    pin.style.height = pinned() ? `${innerHeight + Math.max(0, track.scrollWidth - innerWidth * 0.9) * 1.1}px` : '';
}
let smooth = 0;
function journey() {
    const max = root.scrollHeight - innerHeight, p = max > 0 ? scrollY / max : 0;
    smooth += (p - smooth) * 0.15;
    depth.textContent = String(Math.round(smooth * 3200)).padStart(4, '0');
    const idx = Math.min(scenes.length - 1, Math.round(p * (scenes.length - 1)));
    sceneName.textContent = scenes[idx][1];
    if (!calm && scrollY < innerHeight * 1.2) {
        const k = Math.min(1, scrollY / (innerHeight * 0.8));
        hero.style.transform = `translateY(${scrollY * 0.25}px) scale(${1 - k * 0.25})`;
        hero.style.opacity = String(1 - k * 0.9);
    }
    if (pinned()) {
        const rect = pin.getBoundingClientRect(), total = pin.offsetHeight - innerHeight;
        const q = Math.min(1, Math.max(0, -rect.top / total));
        track.style.transform = `translateX(${-q * Math.max(0, track.scrollWidth - innerWidth * 0.9)}px)`;
    }
    else
        track.style.transform = '';
    if (Math.abs(p - smooth) > 0.0005)
        requestAnimationFrame(journey);
}
addEventListener('scroll', () => requestAnimationFrame(journey), { passive: true });
addEventListener('resize', () => { sizePin(); journey(); });
addEventListener('load', () => { sizePin(); journey(); });
sizePin();
journey();
// Keyboard access: focusing a project card scrolls the sideways track to it
track.addEventListener('focusin', e => {
    if (!pinned())
        return;
    const card = e.target.closest('.proj');
    if (!card)
        return;
    const total = pin.offsetHeight - innerHeight, dist = Math.max(1, track.scrollWidth - innerWidth * 0.9);
    scrollTo({ top: pin.offsetTop + total * Math.min(1, card.offsetLeft / dist), behavior: 'auto' });
});
// ---- Scroll-scrubbed text: words light up as you read down the About statement ----
const lead = $('#about p');
const words = [];
[...lead.childNodes].forEach(n => {
    if (n.nodeType !== 3)
        return;
    const frag = document.createDocumentFragment();
    (n.textContent || '').split(/(\s+)/).forEach(t => {
        if (!t.trim()) {
            frag.append(t);
            return;
        }
        const sp = document.createElement('span');
        sp.className = 'sw';
        sp.textContent = t;
        words.push(sp);
        frag.append(sp);
    });
    n.replaceWith(frag);
});
function scrub() {
    const b = lead.getBoundingClientRect();
    const p = calm ? 1 : Math.min(1, Math.max(0, (innerHeight * 0.85 - b.top) / (innerHeight * 0.55 + b.height * 0.4)));
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('lit', i < lit));
}
addEventListener('scroll', scrub, { passive: true });
scrub();
// ---- Cinematic preloader ----
const pre = $('#pre'), pct = $('#pct'), pbar = $('#pbar');
let n = 0;
const boot = setInterval(() => {
    n = Math.min(100, n + 3 + Math.random() * 7);
    pct.textContent = String(Math.floor(n)).padStart(3, '0');
    pbar.style.transform = `scaleX(${n / 100})`;
    if (n >= 100) {
        clearInterval(boot);
        setTimeout(() => { pre.classList.add('done'); setTimeout(() => pre.remove(), 1100); }, 250);
    }
}, 45);
let seen = false;
try {
    seen = !!sessionStorage.getItem('seen');
    sessionStorage.setItem('seen', '1');
}
catch { /* storage blocked */ }
if (seen) {
    clearInterval(boot);
    pre.remove();
}
['click', 'keydown'].forEach(ev => addEventListener(ev, () => { n = 100; }, { once: true }));
// ---- Custom cursor ----
const cur = $('#cur'), ring = $('#ring');
let cx = 0, cy = 0, rx = 0, ry = 0;
addEventListener('mousemove', e => { root.classList.add('has-cursor'); cx = e.clientX; cy = e.clientY; cur.style.transform = `translate(${cx}px,${cy}px)`; });
(function follow() { rx += (cx - rx) * 0.16; ry += (cy - ry) * 0.16; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(follow); })();
document.addEventListener('mouseover', e => ring.classList.toggle('big', !!e.target.closest('a,button,.card')));
// ---- Hidden terminal (press ` or click the button) ----
const term = $('#term'), tout = $('#tout'), tcmd = $('#tcmd');
const say = (t, cls = '') => { const d = document.createElement('div'); d.textContent = t; if (cls)
    d.className = cls; tout.append(d); tout.scrollTop = tout.scrollHeight; };
const cmds = {
    help: () => say('commands: about, skills, projects, contact, github, whoami, clear, exit'),
    about: () => say('Student heading into software engineering and cybersecurity.'),
    skills: () => say('JavaScript, TypeScript, Python, Web security, Wireshark, Burp Suite, Linux, Git'),
    projects: () => say('QRShield: browser-based quishing detector. More coming up. Scroll to Projects.'),
    contact: () => say('samarth.r.lagad@gmail.com'),
    github: () => { say('opening github.com/samarthlagad ...'); window.open('https://github.com/samarthlagad', '_blank', 'noopener'); },
    whoami: () => say('a future security engineer who reads your URLs before you click them.'),
    clear: () => tout.replaceChildren(),
    exit: () => toggleTerm(false),
};
const past = [];
let hi = 0;
function toggleTerm(open) {
    term.hidden = !open;
    if (open) {
        if (!tout.childElementCount)
            say('Welcome. Type "help" to see commands.', 'c');
        tcmd.focus();
    }
}
$('#tbtn').addEventListener('click', () => toggleTerm(term.hasAttribute('hidden')));
$('#tclose').addEventListener('click', () => toggleTerm(false));
addEventListener('keydown', e => {
    if (e.key === '`' && document.activeElement !== tcmd && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || '')) {
        e.preventDefault();
        toggleTerm(term.hasAttribute('hidden'));
    }
    if (e.key === 'Escape')
        toggleTerm(false);
});
tcmd.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && past.length) {
        hi = Math.max(0, hi - 1);
        tcmd.value = past[hi];
        e.preventDefault();
    }
    if (e.key !== 'Enter')
        return;
    const v = tcmd.value.trim().toLowerCase();
    tcmd.value = '';
    if (!v)
        return;
    past.push(v);
    hi = past.length;
    say('$ ' + v, 'c');
    if (v.startsWith('sudo'))
        say('nice try. permission denied.', 'e');
    else if (cmds[v])
        cmds[v]();
    else
        say(`command not found: ${v}. Try "help".`, 'e');
});
// ---- Heading glitch on hover ----
document.querySelectorAll('h2').forEach(h => h.addEventListener('mouseenter', () => {
    h.classList.remove('glitch');
    void h.offsetWidth;
    h.classList.add('glitch');
    setTimeout(() => h.classList.remove('glitch'), 520);
}));
// ---- Counters & skill bars ----
$('#s-proj').dataset.count = String(document.querySelectorAll('.proj:not([hidden])').length);
$('#s-skill').dataset.count = String(document.querySelectorAll('#skills .tags span').length);
function countUp(el) {
    const to = Number(el.dataset.count), from = Number(el.dataset.from || 0), suf = el.dataset.suffix || '';
    if (calm) {
        el.textContent = to + suf;
        return;
    }
    const t0 = performance.now();
    const step = (t) => {
        const k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(from + (to - from) * e) + suf;
        if (k < 1)
            requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}
const cio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
        countUp(e.target);
        cio.unobserve(e.target);
    }
}), { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));
// ---- Page-wipe transition between sections ----
const wipe = $('#wipe'), wl = $('#wlabel');
let wiping = false;
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href') || '';
    const tgt = id.length > 1 ? document.querySelector(id) : null;
    if (!tgt || wiping || calm)
        return;
    e.preventDefault();
    wiping = true;
    wl.textContent = tgt.querySelector('h2')?.getAttribute('aria-label') || (id === '#home' ? 'Home' : (a.textContent || '').trim());
    wipe.classList.add('in');
    setTimeout(() => {
        const top = id === '#home' ? 0 : tgt.getBoundingClientRect().top + scrollY - 90;
        scrollTo({ top, behavior: 'instant' });
        history.replaceState(null, '', id);
        wipe.classList.replace('in', 'out');
        setTimeout(() => { wipe.classList.remove('out'); wiping = false; }, 560);
    }, 560);
}));
