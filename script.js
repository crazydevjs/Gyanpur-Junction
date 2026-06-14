/* ============================================================
   Gyanpur Junction — interactions
   ============================================================ */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  /* --- Navbar background on scroll --- */
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu toggle --- */
  function closeMenu() {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  /* Close drawer when a link is tapped */
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* --- Scroll reveal animation --- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* --- Footer year --- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


/* ============================================================
   ORDER ONLINE — menu, cart & WhatsApp order
   ============================================================ */
(function () {
  'use strict';

  var ORDER_WA = '919616209085';        // WhatsApp number for orders
  var CAFE_NAME = 'Gyanpur Junction Cafe';

  /* ---- Menu data (from official Food Menu) ---- */
  var MENU = [
    { cat: 'Chai', icon: '🍵', items: [
      { n: 'Adrak/Elaichi Chai', p: 20 },
      { n: 'Kesar Chai', p: 25 },
      { n: 'Rose Chai', p: 25 },
      { n: 'Mashala Chai', p: 30 },
      { n: 'Jumbo Chai', p: 40 }
    ]},
    { cat: 'Hot Coffee', icon: '☕', items: [
      { n: 'Hot Coffee', p: 25 },
      { n: 'Chocolate Coffee', p: 30 },
      { n: 'Rose Coffee', p: 35 },
      { n: 'Kesar Coffee', p: 35 },
      { n: 'Jumbo Coffee', p: 50 }
    ]},
    { cat: 'Cold Coffee', icon: '🥤', items: [
      { n: 'Choco Cold Coffee', p: 99 },
      { n: 'Cold Coffee with Icecream', p: 120 },
      { n: 'Junction Special Cold Coffee', p: 149 }
    ]},
    { cat: 'Milkshake', icon: '🥛', note: 'Extra add-on icecream +₹25', items: [
      { n: 'Strawberry Shake', p: 110 },
      { n: 'Banana Shake', p: 110 },
      { n: 'Butterscotch Shake', p: 120 },
      { n: 'Pineapple Shake', p: 120 },
      { n: 'Kesar Shake', p: 110 },
      { n: 'Orange Shake', p: 120 },
      { n: 'Mango Shake', p: 120 },
      { n: 'Oreo Shake', p: 120 },
      { n: 'Kitkat Shake', p: 120 }
    ]},
    { cat: 'Mojito', icon: '🍹', items: [
      { n: 'Virgin Mojito', p: 89 },
      { n: 'Green Mint Mojito', p: 99 },
      { n: 'Lime & Lemon Mojito', p: 89 },
      { n: 'Bluecuraco Mojito', p: 99 }
    ]},
    { cat: 'Drinks', icon: '💧', items: [
      { n: 'Mineral Water 500ml', p: 10 },
      { n: 'Water 1000ml', p: 20 },
      { n: 'Mishrambu', p: 60 }
    ]},
    { cat: 'Fries', icon: '🍟', items: [
      { n: 'Salted Fries', p: 100 },
      { n: 'Mashala Fries (Peri-Peri)', p: 120 },
      { n: 'Loaded Fries', p: 150 }
    ]},
    { cat: 'Burger', icon: '🍔', items: [
      { n: 'Aloo Tikki Burger', p: 65 },
      { n: 'Veg Cheese Burger', p: 80 },
      { n: 'Paneer Cheese Burger', p: 99 },
      { n: 'Junction Special Burger', p: 120 },
      { n: 'Kurkure Burger', p: 150 }
    ]},
    { cat: 'Sandwich', icon: '🥪', items: [
      { n: 'Veggie Grilled Sandwich', p: 80 },
      { n: 'Corn & Cheese Sandwich', p: 75 },
      { n: 'Chilli Chatpata Sandwich', p: 80 },
      { n: 'Paneer Cheese Sandwich', p: 90 },
      { n: 'Corn Paneer Sandwich', p: 100 },
      { n: 'Junction Special Sandwich', p: 120 }
    ]},
    { cat: 'Pizza', icon: '🍕', sizes: ['Medium', 'Large'], items: [
      { n: 'Corn & Cheese', p: [150, 260], d: 'sweetcorn & cheese' },
      { n: 'Margarita', p: [140, 250], d: 'loaded with cheese' },
      { n: 'Paneer Cheese', p: [170, 290], d: 'cheese, paneer, capsicum & onion' },
      { n: 'Farm House', p: [170, 290], d: 'cheese, mushroom, capsicum & onion' },
      { n: 'Double Cheese', p: [170, 290], d: 'double cheese, capsicum & onion' },
      { n: 'Junction Loaded', p: [199, 320], d: 'cheese, capsicum, onion, corn, paneer, jalapeno, olives, mushroom' },
      { n: 'Paneer Makhani', p: [190, 299], d: 'paneer in makhani sauce' },
      { n: 'Tandoori Paneer', p: [190, 299], d: 'paneer in tandoori sauce' }
    ]},
    { cat: 'Maggie', icon: '🍜', items: [
      { n: 'Double Mashala Maggie', p: 50 },
      { n: 'Vegetable Maggie', p: 80 },
      { n: 'Shezwan Maggie', p: 75 },
      { n: 'Corn & Cheese Maggie', p: 80 },
      { n: 'Paneer & Cheese Maggie', p: 90 },
      { n: 'Junction Special Maggie', p: 120 }
    ]},
    { cat: 'Dosa', icon: '🥞', items: [
      { n: 'Paper Dosa', p: 80 },
      { n: 'Mashala Dosa', p: 100 },
      { n: 'Shezwan Paneer Dosa', p: 120 },
      { n: 'Paneer Mashala Dosa', p: 130 },
      { n: 'Junction Special Dosa', p: 150 }
    ]},
    { cat: 'Idli & More', icon: '🍲', items: [
      { n: 'Idli Sambhar', p: 60 },
      { n: 'Mashala Idli', p: 99 },
      { n: 'Sambhar Rice', p: 99 },
      { n: 'Onion & Tomato Utapam', p: 75 }
    ]},
    { cat: 'Pasta', icon: '🍝', items: [
      { n: 'Red Sauce Pasta', p: 120 },
      { n: 'Red Sauce Corn Pasta', p: 140 },
      { n: 'Red Sauce Paneer Pasta', p: 160 },
      { n: 'White Sauce Pasta', p: 140 },
      { n: 'White Sauce Corn Pasta', p: 160 },
      { n: 'White Sauce Paneer Pasta', p: 180 }
    ]},
    { cat: 'Veg Roll', icon: '🌯', items: [
      { n: 'Veg Roll', p: 70 },
      { n: 'Paneer Roll', p: 90 },
      { n: 'Junction Special Roll', p: 110 }
    ]},
    { cat: 'Ice Cream', icon: '🍨', sizes: ['Single', 'Double'], items: [
      { n: 'Vanilla', p: [30, 55] },
      { n: 'Butterscotch', p: [40, 70] },
      { n: 'Strawberry', p: [35, 65] },
      { n: 'Chocolate', p: [40, 70] }
    ]}
  ];

  var catsEl = document.getElementById('orderCats');
  var menuEl = document.getElementById('orderMenu');
  if (!catsEl || !menuEl) return;            // order section not on page

  var barEl = document.getElementById('cartBar');
  var modalEl = document.getElementById('cartModal');
  var itemsEl = document.getElementById('cartItems');
  var emptyEl = document.getElementById('cartEmpty');

  var cart = {};
  try { cart = JSON.parse(localStorage.getItem('gj_cart') || '{}') || {}; } catch (e) { cart = {}; }

  function save() { try { localStorage.setItem('gj_cart', JSON.stringify(cart)); } catch (e) {} }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-'); }

  /* ---- Render menu ---- */
  function unit(cat, it, size, price) {
    var fullName = size ? (it.n + ' (' + size + ')') : it.n;
    var id = slug(cat.cat + '-' + fullName);
    return '<div class="m-unit" data-id="' + id + '" data-name="' + esc(fullName) + '" data-price="' + price + '">' +
      (size ? '<span class="m-unit__size">' + size + '</span>' : '') +
      '<span class="m-unit__price">₹' + price + '</span>' +
      '<span class="m-unit__action"></span></div>';
  }
  function renderItem(cat, it) {
    var units = cat.sizes
      ? cat.sizes.map(function (s, i) { return unit(cat, it, s, it.p[i]); }).join('')
      : unit(cat, it, null, it.p);
    return '<div class="m-item"><div class="m-item__top">' +
      '<span class="m-item__name">' + esc(it.n) + '</span>' +
      (it.d ? '<span class="m-item__desc">' + esc(it.d) + '</span>' : '') +
      '</div><div class="m-item__units">' + units + '</div></div>';
  }
  function render() {
    catsEl.innerHTML = '<button class="cat-chip is-active" data-cat="all" type="button">All</button>' +
      MENU.map(function (c) {
        return '<button class="cat-chip" data-cat="' + esc(c.cat) + '" type="button">' + c.icon + ' ' + esc(c.cat) + '</button>';
      }).join('');
    menuEl.innerHTML = MENU.map(function (c) {
      var list = c.items.map(function (it) { return renderItem(c, it); }).join('');
      var note = c.note ? '<p class="menu-cat__note">' + esc(c.note) + '</p>' : '';
      return '<div class="menu-cat" data-cat="' + esc(c.cat) + '">' +
        '<h3 class="menu-cat__title">' + c.icon + ' ' + esc(c.cat) + '</h3>' + note +
        '<div class="menu-cat__list">' + list + '</div></div>';
    }).join('');
    updateActions();
  }

  function updateActions() {
    var units = menuEl.querySelectorAll('.m-unit');
    units.forEach(function (u) {
      var id = u.getAttribute('data-id');
      var slot = u.querySelector('.m-unit__action');
      var q = cart[id] ? cart[id].qty : 0;
      slot.innerHTML = q > 0
        ? '<div class="stepper"><button type="button" data-act="dec" data-id="' + id + '" aria-label="Kam karein">−</button><span>' + q + '</span><button type="button" data-act="inc" data-id="' + id + '" aria-label="Zyada karein">+</button></div>'
        : '<button class="add-btn" type="button" data-act="add" data-id="' + id + '">Add +</button>';
    });
  }

  /* ---- Cart helpers ---- */
  function totals() {
    var count = 0, sum = 0;
    Object.keys(cart).forEach(function (id) { count += cart[id].qty; sum += cart[id].qty * cart[id].price; });
    return { count: count, sum: sum };
  }
  function updateBar() {
    var t = totals();
    document.getElementById('cartCount').textContent = t.count;
    document.getElementById('cartTotalBar').textContent = t.sum;
    barEl.hidden = t.count === 0;
  }
  function updateModal() {
    var ids = Object.keys(cart);
    var t = totals();
    document.getElementById('cartTotal').textContent = t.sum;
    if (!ids.length) { itemsEl.innerHTML = ''; emptyEl.style.display = ''; return; }
    emptyEl.style.display = 'none';
    itemsEl.innerHTML = ids.map(function (id) {
      var c = cart[id];
      return '<div class="ci-row"><div class="ci-row__info">' +
        '<div class="ci-row__name">' + esc(c.name) + '</div>' +
        '<div class="ci-row__price">₹' + c.price + ' each</div></div>' +
        '<div class="stepper"><button type="button" data-act="dec" data-id="' + id + '">−</button><span>' + c.qty + '</span><button type="button" data-act="inc" data-id="' + id + '">+</button></div>' +
        '<div class="ci-row__lt">₹' + (c.price * c.qty) + '</div></div>';
    }).join('');
  }
  function updateAll() { updateActions(); updateBar(); updateModal(); }

  function add(id, name, price) {
    if (!cart[id]) cart[id] = { name: name, price: price, qty: 0 };
    cart[id].qty++;
  }
  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id].qty += delta;
    if (cart[id].qty <= 0) delete cart[id];
  }

  /* ---- Events: menu add/stepper ---- */
  menuEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var id = btn.getAttribute('data-id');
    var act = btn.getAttribute('data-act');
    if (act === 'add') {
      var u = btn.closest('.m-unit');
      add(id, u.getAttribute('data-name'), parseInt(u.getAttribute('data-price'), 10));
    } else if (act === 'inc') { changeQty(id, 1); }
    else if (act === 'dec') { changeQty(id, -1); }
    save(); updateAll();
  });

  /* ---- Events: cart modal stepper ---- */
  itemsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var id = btn.getAttribute('data-id');
    changeQty(id, btn.getAttribute('data-act') === 'inc' ? 1 : -1);
    save(); updateAll();
  });

  /* ---- Category filter ---- */
  catsEl.addEventListener('click', function (e) {
    var chip = e.target.closest('.cat-chip');
    if (!chip) return;
    catsEl.querySelectorAll('.cat-chip').forEach(function (c) { c.classList.toggle('is-active', c === chip); });
    var cat = chip.getAttribute('data-cat');
    menuEl.querySelectorAll('.menu-cat').forEach(function (g) {
      g.style.display = (cat === 'all' || g.getAttribute('data-cat') === cat) ? '' : 'none';
    });
  });

  /* ---- Modal open/close ---- */
  function openModal() { modalEl.hidden = false; document.body.style.overflow = 'hidden'; updateModal(); }
  function closeModal() { modalEl.hidden = true; document.body.style.overflow = ''; }
  barEl.addEventListener('click', openModal);
  modalEl.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modalEl.hidden) closeModal(); });

  /* ---- Clear cart ---- */
  document.getElementById('clearCart').addEventListener('click', function () {
    cart = {}; save(); updateAll();
  });

  /* ---- Send order to WhatsApp ---- */
  document.getElementById('sendWa').addEventListener('click', function () {
    var ids = Object.keys(cart);
    if (!ids.length) { alert('Please add something from the menu first.'); return; }
    var t = totals();
    var lines = ['*New Order — ' + CAFE_NAME + '*', ''];
    var i = 1;
    ids.forEach(function (id) {
      var c = cart[id];
      lines.push(i + '. ' + c.name + '  x' + c.qty + '  = ₹' + (c.price * c.qty));
      i++;
    });
    lines.push('');
    lines.push('*Total: ₹' + t.sum + '*');
    var name = document.getElementById('custName').value.trim();
    var addr = document.getElementById('custAddr').value.trim();
    if (name) lines.push('', '*Name:* ' + name);
    if (addr) lines.push('*Address / Table:* ' + addr);
    var url = 'https://wa.me/' + ORDER_WA + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank');
  });

  render();
  updateAll();
})();
