# Competitor Watch — BUKI

Summary: Індекс конкурентів, за якими ведеться живе спостереження. Кожен конкурент — один append-only .md файл у цій теці: `<slug>.md`. Кожна перевірка дописується новим датованим+часовим записом внизу файлу — історія ніколи не перезаписується.

Sources: WebFetch/WebSearch перевірки через `competitor-site-watch` skill.

Last updated: 2026-09-13

---

| Конкурент | Файл | Ринок | Останній запис |
|---|---|---|---|
| Preply | [preply.md](preply.md) | Global / Польща | 2026-09-13 |
| Superprof | [superprof.md](superprof.md) | Польща | 2026-09-13 |

> ⚠️ Записи від 2026-09-13 отримані **виключно через WebSearch**. Прямий site-diff не виконувався: `preply.com` і `www.superprof.pl` віддають `EGRESS_BLOCKED` на рівні мережевого проксі сесії (розблокувати allowlist може лише користувач). Тому в цих записах ніде не стоїть «без змін» — лише «зміна підтверджена» або «перевірку не виконано». Деталі — у [reviews/2026-09-13-weekly-brief.md](reviews/2026-09-13-weekly-brief.md).

Insights board (Figma): **ще не створено** — блокує namespace mismatch у `.claude/agents/competitive-watch-agent.md`: у полі `tools:` вказано префікс `mcp__claude_ai_Figma__`, тоді як фактичний MCP-сервер у сесії має namespace `mcp__Figma__`. Через це агенту не пропускається жоден Figma-інструмент. Фікс — замінити префікс у frontmatter; після цього наступний запуск створить дошку й підставить лінк сюди. Стоп-геп-сітка «конкурент × тиждень» у markdown — у [reviews/2026-09-13-weekly-brief.md](reviews/2026-09-13-weekly-brief.md).

Окремо — [media-monitoring.md](media-monitoring.md): щоденний широкий скан нових медіа-згадок одразу по всіх брендах (BUKI, Preply, Superprof, Mathema, AllRight, Znohub/Tutlo), а не глибокий розбір одного конкурента.

## Тижневі брифи

- [reviews/2026-09-13-weekly-brief.md](reviews/2026-09-13-weekly-brief.md) — запуск 13.09: підтверджені зміни в обох конкурентів (Superprof купив Tutors.com 09.09 — 21-ше поглинання; Preply вивів AI зі слогана в продукт і б'ється з Duolingo). Топ-1 інсайт: конкуренти зайняли обидва полюси «AI vs людяність»

## Related pages

- [../index.md](../index.md)
- [../overview.md](../overview.md)
- [media-monitoring.md](media-monitoring.md)
