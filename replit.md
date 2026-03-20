# Quantum404AK Portfolio

A personal portfolio website for Akshaj Khurana (Quantum404AK), showcasing skills, projects, and contact information.

## Tech Stack

- **HTML5** - Site structure (`index.html`)
- **CSS3** - Styling (`styles.css`), with Google Fonts (Source Code Pro)
- **Static assets** - Images in `media/` directory

No build system or package manager — this is a pure static site.

## Project Structure

```
/
├── index.html              # Main portfolio page
├── styles.css              # All styles
├── media/                  # Image assets (icons, logos)
├── CNAME                   # Custom domain config (quantum404ak.is-a.dev)
├── google01aa2d021f234b27.html  # Google Search Console verification
└── README.md
```

## Running Locally

The site is served via Python's built-in HTTP server:

```
python3 -m http.server 5000 --bind 0.0.0.0
```

Workflow: **Start application** — runs on port 5000 (webview).

## Deployment

Configured as a **static** deployment with `publicDir: "."`.
