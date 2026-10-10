# ArenaWeb

Static website for Rika Omega Labs d.o.o. games.

- `index.html` is the default Croatian homepage and mirrors `index_hr.html`.
- `index_hr.html` and `index_en.html` are the Croatian and English homepages.
- `style.css` contains the shared homepage styles.
- `developer-profile-r-omega-l-512.png` is the shared RΩL brand icon.
- `developer-header-r-omega-l-4096x2304.png` and `.jpg` are the developer header exports.
- `download.css` contains the shared styles for both game download pages.
- `yamb/download.html` and `kartas/download.html` link to the game downloads.

When editing the Croatian homepage, keep `index.html` and `index_hr.html` in sync.
Serve the repository as the site root, for example with `python3 -m http.server 8765`.
