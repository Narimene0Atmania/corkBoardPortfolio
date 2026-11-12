/* Corkboard portfolio
   1. Scales the 1600px board to the viewport (desktop) / reports usable width (phones)
   2. Project detail dialog
*/
(function () {
  'use strict';

  /* ---------- 1. layout ---------- */
  var DESIGN_W = 1600;
  var DESIGN_H = 1160;
  var SHELF_Y = 1066; // where the wooden shelf starts in wall.jpg
  var root = document.documentElement;
  var phone = window.matchMedia('(max-width: 767.98px)');

  function layout() {
    var w = root.clientWidth;
    if (phone.matches) {
      root.style.setProperty('--scale', '1');
      // viewport padding (8 + 8) + cork frame (10 + 10) + cork padding (14 + 14) = 64 → keep a little air
      root.style.setProperty('--avail', String(Math.max(200, w - 64)));
    } else {
      // fit the whole board inside the window (width and height)
      var s = Math.min(w / DESIGN_W, window.innerHeight / DESIGN_H);
      root.style.setProperty('--scale', String(s));
      var offsetTop = (window.innerHeight - DESIGN_H * s) / 2; // board is centred vertically
      root.style.setProperty('--shelf-y', (offsetTop + SHELF_Y * s) + 'px');
    }
  }
  layout();
  window.addEventListener('resize', layout);
  if (phone.addEventListener) phone.addEventListener('change', layout);

  /* ---------- 2. projects ----------
     Copy and links come from the main portfolio (narimene.com): lang/en/projects.php
     and config/projects.php. Edit this object to change the detail view.
     `shots`: [{ src, alt }]   `links`: [{ label, href }] (open in a new tab). */
  var SITE = 'https://narimene.com';
  var PROJECTS = {
    buscatcher: {
      title: 'BusCatcher', tag: 'THESIS', tagClass: 'tag--thesis',
      lead: 'Live bus tracking and role-based management across multiple university fleets.',
      body: ['BusCatcher gives every role, from a platform admin overseeing several universities down to individual drivers and students, a live view of the fleet: GPS tracking with automatic deviation and dwell alerts, route and stop management, and notifications that keep everyone on schedule. Built with my graduation-project partner, Madjida Benmammar.'],
      meta: 'Graduation project \u00b7 requirements analysis, systems design, build \u00b7 2026',
      features: [
        ['Live GPS tracking with automatic alerts', 'real-time bus positions on an interactive campus map. The system flags it on its own when a bus strays off-route or lingers too long at a stop.'],
        ['A real multi-university hierarchy', 'platform admin, university admin, operator, driver and student each get their own scoped dashboard, built to run several universities on one platform.'],
        ['Route & stop management', 'admins configure routes, stops and schedules without touching code, down to picking between alternative road paths for each segment.']
      ],
      stack: ['Laravel', 'Flutter', 'MySQL'],
      shots: [{ src: 'assets/projects/buscatcher-hero.webp', alt: 'BusCatcher\u2019s road route confirmation screen, showing a three-segment bus route on a map of Tlemcen with alternative road options for each segment.' }],
      links: [{ label: 'Live demo \u2197', href: SITE + '/demos/buscatcher/dashboard.html' }]
    },
    madrasa: {
      title: 'Madrasa', tag: 'SHIPPED', tagClass: 'tag--shipped',
      lead: 'School management for small private schools, in French, Arabic and English.',
      body: ['Madrasa covers the daily running of a private school of up to about a thousand students: enrolment, timetables, attendance, grades and report cards, and fees. It has four roles (admin, teacher, parent and student) and runs in French, Arabic (right to left) and English. I wrote the requirements first, ranked them Must, Should and Could, and built every Must. The demo is a static copy with sample data from a fictional school in Tlemcen, so changes are not saved.'],
      meta: 'Personal project \u00b7 requirements analysis, systems design, build \u00b7 2026',
      features: [
        ['Roll call from a phone', 'teachers mark present, absent or late in a few taps and can only edit the same school day; a parent is notified once when their child is marked absent.'],
        ['Grades on a configurable scale', 'the top mark, pass mark, weights and appreciation bands are settings, not code. A term goes from draft to published to locked.'],
        ['Report cards and receipts as PDFs', 'generated on the server in all three languages, with Arabic shaped and laid out right to left.']
      ],
      stack: ['Laravel', 'React', 'TypeScript'],
      shots: [{ src: 'assets/projects/madrasa-hero.webp', alt: 'The Madrasa admin dashboard: cards for 300 students, 97.9% attendance today, fees collected and students with a balance, above an attendance line chart and a monthly payments bar chart.' }],
      links: [{ label: 'Live demo \u2197', href: SITE + '/demos/madrasa/' }]
    },
    ombra: {
      title: 'OMBRA', tag: 'SHIPPED', tagClass: 'tag--shipped',
      lead: 'A multi-vendor clothing marketplace where independent shops sell side by side.',
      body: ['OMBRA lets independent clothing labels run their own shops on one storefront. Shoppers browse by category and style, filter by size, colour, price and rating, and check out with Stripe or PayPal in test mode; sellers manage products, orders and flash sales from a dashboard; admins moderate users, shops and reviews. No real money moves. The demo runs entirely in your browser on the seeded data, and your changes stay on your device.'],
      meta: 'Personal project \u00b7 systems design, build \u00b7 2026',
      features: [
        ['Shops with their own dashboards', 'each seller manages their own products with per-variant stock, orders item by item, and flash sales. Every server action checks the role and the shop first.'],
        ['Prices that cannot be trusted from the browser', 'flash-sale prices are worked out from their dates and the cart is repriced on the server at checkout. An order is only marked paid by the payment webhook.'],
        ['Search that forgives typos', 'one query handles relevance, filters and paging, with typo tolerance from PostgreSQL trigram matching. Every filter lives in the URL, so a filtered page can be shared.']
      ],
      stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
      shots: [{ src: 'assets/projects/ombra-hero.webp', alt: 'The OMBRA product listing on a dark page: filters for offers, category and style on the left, and a grid of clothing photos with the shop name, price and rating below each.' }],
      links: [{ label: 'Live demo \u2197', href: SITE + '/demos/ombra/' }]
    },
    plannari: {
      title: 'Plannari', tag: 'SHIPPED', tagClass: 'tag--shipped',
      lead: 'A day planner where time is optional, and nothing unfinished just vanishes.',
      body: ['Most to-do apps force a time onto every task, then quietly bury whatever didn\u2019t get done. Plannari makes time optional (a task can carry one, a duration, or neither) and anything left unchecked past its day becomes a debt you consciously reschedule, return, or drop. Navigation is an illustrated desk scene: tap the calendar, the to-do sheet, or the laptop to open the screen behind it.'],
      meta: 'Personal project \u00b7 concept, design, build \u00b7 2026, ongoing',
      features: [
        ['Time is optional, not required', 'a task can carry a time, a duration, or neither. Timed tasks stay locked in order, untimed ones drag anywhere between them.'],
        ['Debts instead of disappearing tasks', 'anything left unchecked past its day becomes a reviewable debt: reschedule it, send it back to its category, or drop it.'],
        ['Routines that cascade and catch clashes', 'adding a routine copies its steps into the day; give it a start time and the steps cascade through their durations, shifting or cancelling on collision.']
      ],
      stack: ['Flutter', 'Laravel', 'MySQL'],
      shots: [
        { src: 'assets/projects/plannari-hero.webp', alt: 'An illustrated desk scene with a wall calendar, a to-do list, and a laptop showing a planning dashboard.' },
        { src: 'assets/projects/plannari-sketch.jpg', alt: 'A hand-drawn pen sketch of the same desk scene, the original concept drawing for the app\u2019s navigation.' }
      ],
      links: [{ label: 'Live demo \u2197', href: SITE + '/demos/plannari/' }]
    },
    mealplannari: {
      title: 'Meal Plannari', tag: 'IN USE', tagClass: 'tag--inuse',
      lead: 'Meal planning, calorie tracking, and a pantry-aware shopping badge for every recipe.',
      body: ['Paid calorie-tracking apps rarely let you build your own recipes, and there\u2019s no way to tell if tonight\u2019s plan needs a shopping trip or not. Meal Plannari fixes both: a week of meals with nutrition and price computed live from a shared ingredient database, your own recipes kept private or submitted to a moderated catalog, and a per-meal badge for whether it\u2019s pantry-ready or needs a store run.'],
      meta: 'Personal project \u00b7 concept, design, build \u00b7 2026, ongoing',
      features: [
        ['Nutrition computed from ingredients', 'calories, macros and price for every meal are derived live from a shared ingredient database. Change one ingredient and every meal using it updates.'],
        ['Build & submit your own recipes', 'bilingual recipes with steps and ingredients, kept private or sent to an admin moderation queue to join the public catalog.'],
        ['Pantry-ready shopping badge', 'a per-meal indicator based on what share of the recipe is pantry staples versus what you\u2019d actually need to buy.']
      ],
      stack: ['Laravel', 'React', 'TypeScript'],
      shots: [{ src: 'assets/projects/mealplannari-hero.webp', alt: 'The meal browsing page, showing a grid of meal cards with photos, calories, macros, price, prep time, and shopping status for each.' }],
      links: [{ label: 'Live demo \u2197', href: SITE + '/demos/mealplannari/home.html' }]
    },
    'loai-atmania': {
      title: 'AI Consultant Portfolio', tag: 'SHIPPED', tagClass: 'tag--shipped',
      lead: 'A dark, data-driven portfolio for an AI infrastructure consultant.',
      body: ['This portfolio needed to read as evidence, not a r\u00e9sum\u00e9: proof the automation work actually holds up in production. The result is a fixed, single-viewport HUD-style console with a boot sequence on load, then six tabs (home, capabilities, work, process, stack, contact), with live-looking system stats and before/after automation metrics standing in for a bio.'],
      meta: 'Freelance project \u00b7 design, build \u00b7 2025',
      features: [
        ['Styled to match the work', 'boot sequence, terminal output, operator/agent language. It mirrors the actual product: AI agents running infrastructure.'],
        ['Two purpose-built layouts', 'under 1024px the site swaps to an entirely different scrolling layout, built from the same underlying data.'],
        ['Six-tab HUD nav', 'a fixed bottom tile nav plus a persistent "book a call" CTA that\u2019s always one click away.']
      ],
      stack: ['React', 'TypeScript', 'Vite'],
      shots: [{ src: 'assets/projects/loai-atmania-hero.webp', alt: 'The portfolio\u2019s dark dashboard-styled homepage, with an operator profile card, a live-looking system stats panel, and three automation result cards.' }],
      links: [{ label: 'Live demo \u2197', href: SITE + '/demos/loai-atmania/' }]
    }
  };

  var dlg = document.getElementById('detail');
  if (!dlg || typeof dlg.showModal !== 'function') return;

  var el = {
    title: document.getElementById('detail-title'),
    tag: document.getElementById('detail-tag'),
    lead: document.getElementById('detail-lead'),
    body: document.getElementById('detail-body'),
    meta: document.getElementById('detail-meta'),
    features: document.getElementById('detail-features'),
    stack: document.getElementById('detail-stack'),
    shots: document.getElementById('detail-shots'),
    links: document.getElementById('detail-links')
  };

  function fill(p) {
    el.title.textContent = p.title;
    el.tag.textContent = p.tag;
    el.tag.className = 'caps tag ' + p.tagClass;
    el.lead.textContent = p.lead;

    el.body.textContent = '';
    p.body.forEach(function (t) {
      var para = document.createElement('p');
      para.textContent = t;
      el.body.appendChild(para);
    });

    el.meta.textContent = p.meta || '';

    el.features.textContent = '';
    (p.features || []).forEach(function (f) {
      var li = document.createElement('li');
      var b = document.createElement('strong');
      b.textContent = f[0];
      li.appendChild(b);
      li.appendChild(document.createTextNode(': ' + f[1]));
      el.features.appendChild(li);
    });

    el.stack.textContent = '';
    p.stack.forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      el.stack.appendChild(li);
    });

    el.shots.textContent = '';
    p.shots.forEach(function (shot) {
      var img = document.createElement('img');
      img.src = shot.src;
      img.alt = shot.alt;
      el.shots.appendChild(img);
    });

    el.links.textContent = '';
    (p.links || []).forEach(function (l) {
      var a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.label;
      a.target = '_blank';
      a.rel = 'noopener';
      el.links.appendChild(a);
    });
  }

  document.querySelectorAll('[data-project]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var p = PROJECTS[btn.getAttribute('data-project')];
      if (!p) return;
      fill(p);
      dlg.showModal();
      dlg.querySelector('.detail__paper').scrollTop = 0;
    });
  });

  // close button
  dlg.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) { dlg.close(); return; }
    // click on the backdrop (the dialog box itself, outside the paper)
    if (e.target === dlg) dlg.close();
  });
})();
