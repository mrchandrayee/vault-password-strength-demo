# VAULT — Password Strength Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://mrchandrayee.github.io/vault-password-strength-demo/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org) [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

Runnable, responsive HTML/CSS/JavaScript reconstruction of the uploaded **7.47-second** screen recording (720 × 1280, 30 fps).

## Run
1. Extract `vault-password-strength-demo.zip`.
2. Open `index.html` in Chrome, Edge, Firefox or Safari.
3. Type in the Password field. The lock artwork, four-segment strength meter, tier title, crack-time label and entropy estimate update as you type.
4. Use the eye icon to show/hide the password.
5. Click **Suggest strong** to generate a sample multi-word passphrase.

No npm install, build tool, backend or API key is required.

Optional local server:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000`.

## What is visible in the video

The page is branded **VAULT · how strong is that password, really?** and has a dark navy/indigo/teal gradient background.

- Password input with eye/show control.
- “Suggest strong” action.
- Four visual lock stages and a four-segment meter:
  1. No lock at all — “The door is standing open.”
  2. A bent paperclip — “Cracked instantly.”
  3. A padlock — “Cracked in 2 seconds.”
  4. A deadbolt — “Cracked in 5 days.”
  5. A bank vault — “Cracked in 3 thousand years.”
- Large central message: “Wait for the last lock!”
- Two code-preview panels at the bottom, `index.html` (“one object”) and `script.js` (“a playhead, not a switch”).

The video types `moth-lantern`; the final visible state displays **A bank vault**, **Cracked in 3 thousand years**, and **71 bits of entropy**.

## Readable code fragments transcribed from the screen

The source panel is small, but these fragments are legible. Formatting and indentation have been normalized.

### HTML fragment
```html
<!-- ONE door, all the way up.
     What holds the seam shut is
     whatever you've earned. -->
<div class="lock">
  <div class="chip">
    <div class="door" id="door">
      <svg viewBox="0 0 150 150 260 260">
        <!-- paperclip · padlock
             deadbolt · bank vault -->
      </svg>
    </div>
  </div>

  <div class="meter">
    <i class="seg" data-t="1"></i>
    <i class="seg" data-t="2"></i>
    <!-- 3, 4 -->
  </div>
</div>
```

### JavaScript fragment
```js
// real entropy, in bits
const bits = len * Math.log2(pool);

const tier = bits < 30 ? 1  // paperclip
           : bits < 50 ? 2  // padlock
           : bits < 70 ? 3  // deadbolt
           : 4;             // vault

// ALL four builds live on ONE
// timeline. The tier isn't a
// switch — it's a PLAYHEAD.
//
// Which is why a backspace
// doesn't reset the lock.
// It UN-BUILDS it.
tl.tweenTo(MARK[tier], {
  duration: .9,
  ease: 'power2.inOut'
});
```

The complete original repository is not shown in the recording. These are the visible snippets, not a claim that all source lines were extracted.

## Files
- `index.html` — VAULT interface and source-preview panels.
- `styles.css` — dark gradient theme, input, lock card, meter and responsive layout.
- `app.js` — entropy estimate, tier selection, SVG lock stages, suggestion and visibility toggle.
- `README.md` — observations, transcribed fragments and run guide.

## Implementation notes and limitations
- The four lock illustrations are original inline SVG reconstructions, not extracted original image assets.
- The video shows the sample `moth-lantern` at 71 bits. To reproduce that displayed sample, this standalone demo uses a simplified 60-character pool estimate (`length × log2(60)`). The recording only shows the formula and thresholds, not the original pool-selection logic.
- Crack times are the visible tier labels from the video, not cryptographically calculated estimates. This is a visual/educational demo, not a real password-auditing or breach-check service.
- Password text is processed locally in the browser; it is not sent to a server.

## 👨‍💻 Author

**mrchandrayee** · [GitHub](https://github.com/mrchandrayee)

## 📄 License

[MIT License](./LICENSE)
