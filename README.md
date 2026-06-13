# Gyanpur Junction — Cafe & Restaurant (Landing Page)

Ek professional, fully-responsive landing page Gyanpur Junction Cafe & Restaurant ke liye.
Mobile-first banaya gaya hai (kyunki zyada log mobile pe khologe).

## Files
- `index.html` — saara content / structure
- `styles.css` — design, colors aur responsive layout
- `script.js` — mobile menu, scroll animations
- `assets/` — yahan apni asli photos daalo (banani padegi folder)

## Kaise dekhein
Bas `index.html` ko browser me double-click karo. Bas ho gaya — kuch install nahi karna.

---

## ⚠️ ZAROORI: Apni asli photos & reviews lagao

Abhi page me **professional placeholder photos (Unsplash se, free)** lagi hain taaki vibe dikhe.
Google aur Instagram se photos code se automatic nahi laayi ja sakti (login/copyright). Toh manually badlo:

### 1) Photos badalna
- `assets/` folder banao project ke andar.
- Apni Instagram/Google wali photos `assets/` me daalo (jaise `hero.jpg`, `pizza.jpg`, etc.)
- `index.html` me jahan bhi `https://images.unsplash.com/...` likha hai, use apni file se replace karo.
  - Example: `src="https://images.unsplash.com/photo-xxxx..."` → `src="assets/pizza.jpg"`
- Hero ki badi background photo `styles.css` me hai — `.hero { background: url('...') }` line me apni photo ka path daalo.

### 2) Reviews badalna
- `index.html` me `<!-- ============ REVIEWS ============ -->` section dhoondo.
- Har `<blockquote class="review">` me Google se asli review ka text, naam aur stars daal do.

### 3) Menu items
- `<!-- ============ MENU / SPECIALTIES ============ -->` section me dish ka naam aur description apne hisaab se badlo.

### 4) Timings / Phone
- `<!-- ============ VISIT / LOCATION ============ -->` section me sahi timings aur phone number daal do.

---

## Live kaise karein (free hosting)
- **Netlify**: netlify.com pe folder drag-and-drop karo — turant live.
- **GitHub Pages**: repo banao, push karo, Pages enable karo.
- **Vercel**: vercel.com pe import karo.

## Pehle se laga hua hai
- ✅ Instagram link: https://www.instagram.com/gyanpurjunction/
- ✅ Google Maps location embed (Gyanpur, Bhadohi)
- ✅ Mobile menu, smooth scroll, animations
- ✅ Floating Instagram button
- ✅ WhatsApp/social share preview (Open Graph)
