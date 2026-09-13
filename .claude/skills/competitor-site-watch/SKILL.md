---
name: competitor-site-watch
description: Check a competitor's website and log what changed since the last check — new pages, pricing changes, homepage or landing-page messaging shifts — plus the marketing insight behind the change, not just a diff. Use this whenever the user asks to look at a competitor's site, wants a competitive/pricing analysis, mentions checking on a competitor by name, asks things like "подивись що там у Preply", "перевір прайсинг конкурента", "чи є щось нове на сайті X", "what changed on their homepage", or wants to keep an eye on a competitor's positioning over time. Especially relevant for marketplace or subscription businesses comparing pricing tiers across multiple markets/currencies (e.g. a company selling in both Ukraine and Poland). Trigger even if the user doesn't say "monitor" or "log" — a one-off "check out competitor X's pricing page" still benefits from being appended as a dated record so the *next* check has something to compare against.
compatibility: Uses only WebSearch and WebFetch — no MCP browser tools (no Chrome DevTools, no screenshots). This means visual/design comparison isn't possible; comparisons rely on fetched text/HTML and search results.
---

# Competitor Site Watch

Competitor analysis is only worth repeating if each check builds on the last one. A single "here's what their homepage says today" summary is a snapshot in time — useful once, forgotten by the next quarter. The point of this skill is to make every check cheap to compare against the last one, so "what changed" becomes the actual deliverable, and the interpretation (why does this change matter for us) rides along with it.

## Where records live

This is BUKI work, and BUKI is its own project — not something to bury inside an unrelated client's project folder. Default location, relative to this project's root (wherever it's checked out — local machine or a cloud sandbox):

```
wiki/competitors/
  index.md            -- one row per competitor: name, file, market, last entry date
  <competitor-slug>.md -- one append-only file per competitor, all history in one place
```

This lives under `wiki/competitors/` because that project's `CLAUDE.md` treats it as regular wiki content (its own project-level `wiki-curator` conventions apply — page format header, `wiki/index.md` entry, `wiki/log.md` entry), not a separate top-level folder. Each `<competitor-slug>.md` carries the standard page-format header (Summary / Sources / Last updated) on top, then the append-only log body below a `---` divider — keep both in sync: update `Last updated` in the header whenever you append a new entry.

If that folder doesn't exist when you need it, create it there rather than writing into whatever project happens to be open — don't assume the currently open project is BUKI's just because that's where the conversation started. If the user is clearly already working inside a dedicated BUKI project elsewhere (they opened it, or told you its path), use that instead and follow its conventions if it has any.

**Append-only, one file per competitor.** Don't create a new dated file per check — that scatters history across files and makes "what changed since 3 checks ago" require opening several documents. Everything about one competitor accumulates in their single `.md` file, oldest entry at the top, newest appended at the bottom.

## Workflow

**1. Pin down scope.** Which competitor? Which market/domain — a company selling into both Ukraine and Poland needs the `.ua`/`.pl` (or language-switched) version checked separately, since pricing and positioning genuinely differ by market. Which pages matter — usually homepage + pricing page, sometimes a specific landing page the user names. If genuinely ambiguous, ask; if it's inferable from context already given, don't stall on it.

**2. Read the competitor's file, if it exists.** Open `wiki/competitors/<slug>.md` and read the **last entry** (bottom of the file) — that's what you're comparing against. If the file doesn't exist yet, this check is a baseline: say so plainly in the new entry instead of inventing a "no change" comparison.

**3. Fetch the current state.**
   - `WebFetch` the homepage and the pricing page directly. Read what actually comes back — WebFetch gets you the page's text/HTML, not a rendered browser view, so client-side-rendered widgets (some pricing calculators, region-picker pricing) may not appear in the fetched content. When the pricing you'd expect to see isn't in the fetch result, say that explicitly rather than filling the gap with a guess.
   - `WebSearch` to fill in what fetching one page can't: recent news or announcements about the competitor (funding, pricing change press coverage, product launches), and to find pages you might not know the URL for (e.g. `site:preply.com pricing poland` or "Superprof nowy cennik 2026"). Search-result snippets can also cross-check a price you're unsure the fetch captured correctly.
   - If a page requires login, redirects by region, or is otherwise blocked — note that plainly as a limitation. An honest gap beats a guessed number.

**4. Extract structured facts** from what you fetched/found: value prop or headline, nav/page structure, promoted categories or features, and — for pricing — every tier with its exact price, currency, billing period, and any visible promo/discount.

**5. Compare against the last entry in the file.** Go through, concretely:
   - New pages, nav items, or offerings → name them
   - Pricing changes → old value → new value and the % change, labeled by market/currency (a UAH price moving and a PLN price moving are separate facts — never blend or convert them for the report)
   - Homepage/messaging changes → what the headline or value prop used to emphasize vs. now
   - No visible change → say so; that's a legitimate, useful finding, not a non-result

**6. Append the new entry.** Add it to the bottom of `wiki/competitors/<slug>.md`, in Ukrainian (keep English marketing/technical terms as-is — `CTR`, `ARPU`, `pricing`, tier names, brand names). **Record both date and time** for every entry, not just the date — same-day re-checks (e.g. verifying a price that looked odd) need to be distinguishable. Use this shape:

```markdown
## [YYYY-MM-DD HH:MM] — перевірка

Джерела: [URL(s) перевірених сторінок]

### Що перевірено
Сторінки, ринок/домен, будь-які обмеження доступу (регіон, логін, WebFetch не показав JS-контент тощо).

### Зміни з часу останньої перевірки
(або "Перший запис — базова точка для порівняння", якщо це перший запис у файлі)
- конкретні факти: що додалось/зникло/змінилось, з порівнянням до попереднього запису вище

### Прайсинг
Таблиця тарифів з валютою і ринком, з чітким позначенням, чи це промо-ціна.

### Інсайти
Не просто "що змінилось", а що це означає: навіщо вони це зробили, чи варто на це реагувати. Позначай припущення як (припущення) — не видавай здогад за факт.

---
```

Use a `---` divider between entries so the file stays easy to scan even after a dozen checks.

**7. Update the index and give a short chat summary.** Update `wiki/competitors/index.md`'s row for this competitor (last entry date), and update the `Last updated` line in the page-format header of the competitor's own file. Then tell the user, briefly, what changed and where the file lives — don't repeat the whole entry in chat, the file is the artifact.

## Common pitfalls

- **WebFetch isn't a browser.** It won't execute JavaScript, so a pricing widget that renders client-side may come back blank or incomplete. Don't report "no pricing found" as if that means the competitor removed pricing — say the fetch may have missed it, and cross-check with a WebSearch for cached snippets before concluding anything changed.
- **Don't collapse markets.** A UA-market price and a PL-market price are different facts with different currencies; keep them in separate rows/sections.
- **Don't diff on vibes.** Point to the specific fetched text that changed, not a general impression that "it feels different now" — without screenshots, precision in the extracted text is the only evidence you have.
- **Same-day re-checks are real entries.** If the user asks to re-verify something within the same day, still append a new entry with its own timestamp rather than editing the previous one — the file's value is in never losing a data point.
- **Missing history isn't a blocker.** First time checking a competitor is fine — say it's a baseline and move on. The comparison value shows up starting on the *second* entry.
