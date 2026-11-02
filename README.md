# Rabbit Hole Day

Short trails through good corners of the web. Open a stop, read or watch it, come back, and the next one is waiting. Progress is saved in your browser.

Live at [rabbithole.day](https://rabbithole.day). Made by [Ashish Rao](https://ashishrao.me).

## Run it

Plain HTML, CSS and JavaScript. No build step.

```bash
python3 -m http.server 8000 --directory site
```

Then open http://localhost:8000.

## Add a rabbit hole

1. Copy `site/holes/how-big-is-the-universe.js` to `site/holes/<slug>.js` and rewrite it. The comment at the top explains each field.
2. Add `<script src="holes/<slug>.js"></script>` to `site/index.html` with the other holes.
3. Put pictures in `site/img/`, and a 480px square copy of the cover in `site/img/thumbs/`:

   ```bash
   sips -s format jpeg -s formatOptions 68 -z 480 480 site/img/<cover>.jpg --out site/img/thumbs/<cover>.jpg
   ```

4. Run `node tools/check.mjs` to catch mistakes and dead links.
5. Push to `main`. Cloudflare Workers deploys the `site` folder (settings in `wrangler.jsonc`).
