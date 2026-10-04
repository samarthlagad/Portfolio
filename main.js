"use strict";
const root = document.documentElement;
const $ = (s) => document.querySelector(s);
// Theme (remembers choice, falls back to light)
const saved = localStorage.getItem('theme');
if (saved)
    root.dataset.theme = saved;
$('#theme').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
});
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
// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
    }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// Scroll-spy
const links = document.querySelectorAll('.nav nav a');
const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting)
        links.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section').forEach(s => spy.observe(s));
// 3D tilt
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(el => {
        el.addEventListener('mousemove', e => {
            const b = el.getBoundingClientRect();
            const px = (e.clientX - b.left) / b.width - 0.5, py = (e.clientY - b.top) / b.height - 0.5;
            el.style.transform = `perspective(700px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-4px)`;
        });
        el.addEventListener('mouseleave', () => (el.style.transform = ''));
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
