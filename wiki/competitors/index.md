# Competitor Watch — BUKI

Summary: Індекс конкурентів, за якими ведеться живе спостереження. Кожен конкурент — один append-only .md файл у цій теці: `<slug>.md`. Кожна перевірка дописується новим датованим+часовим записом внизу файлу — історія ніколи не перезаписується.

Sources: WebFetch/WebSearch перевірки через `competitor-site-watch` skill.

Last updated: 2026-09-21

---

| Конкурент | Файл | Ринок | Останній запис |
|---|---|---|---|
| Preply | [preply.md](preply.md) | Global / Польща | 2026-09-21 |
| Superprof | [superprof.md](superprof.md) | Польща | 2026-09-21 |
| GoStudent | [gostudent.md](gostudent.md) | Global (Австрія, K-12) | 2026-09-21 |
| Tutlo | [tutlo.md](tutlo.md) | Польща (тільки англійська) | 2026-09-21 |

> ⚠️ Записи від 2026-09-13 до 2026-09-21 отримані **виключно через WebSearch**. Прямий site-diff не виконувався четвертий тиждень поспіль для Preply/Superprof, і цього тижня (21.09) egress-блок вперше поширився й на GoStudent та Tutlo — `preply.com`, `www.superprof.pl`, `www.gostudent.org` і `tutlo.com` усі повернули `EGRESS_BLOCKED` на рівні мережевого проксі сесії (розблокувати allowlist може лише користувач). Тому в записах цього тижня ніде не стоїть «без змін, підтверджено фетчем» — лише «зміна підтверджена через WebSearch» або «перевірку сайту не виконано». Деталі — у [reviews/2026-09-21-weekly-brief.md](reviews/2026-09-21-weekly-brief.md).

Insights board (Figma): [BUKI Competitive Watch — Insights Board](https://www.figma.com/design/EYyAK9JeEkWQkbmNtuvcSS) — накопичувальна дошка, 2 колонки (2026-09-13, 2026-09-14). **Колонку за 2026-09-21 не додано** — Figma MCP на Starter-плані впав у tool-call rate limit під час цього запуску (`You've reached the Figma MCP tool call limit on the Starter plan`). Потрібно або дочекатись скидання ліміту й дописати колонку окремим заходом, або підвищити план. Дошка лишається основним джерелом для порівняння тижнів, просто відстає на один тиждень від текстових брифів.

Окремо — [media-monitoring.md](media-monitoring.md): щоденний широкий скан нових медіа-згадок одразу по всіх брендах (BUKI, Preply, Superprof, Mathema, AllRight, Znohub/Tutlo), а не глибокий розбір одного конкурента.

## Тижневі брифи

- [reviews/2026-09-21-weekly-brief.md](reviews/2026-09-21-weekly-brief.md) — запуск 21.09: жоден конкурент не дав нової стратегічної події; головна подія тижня — операційна (egress-блок поширився на всі 4 домени, Figma-дошку не оновлено через rate limit). Другорядний плюс: партнерська стаття на Interia.pl ставить BUKI в один ряд з Superprof/Preply/GoStudent.
- [reviews/2026-09-14-weekly-brief.md](reviews/2026-09-14-weekly-brief.md) — запуск 14.09 (вікно лише 1 доба від попереднього): нових датованих подій в обох конкурентів немає, але дозаписано раніше не зафіксований контекст ("The Better Duo" — анти-Duolingo кампанія Preply з 2025; купівля Tutore/eTutor фондом Innova Capital, Польща, 2024). Без термінової дії цього тижня.
- [reviews/2026-09-13-weekly-brief.md](reviews/2026-09-13-weekly-brief.md) — запуск 13.09: підтверджені зміни в обох конкурентів (Superprof купив Tutors.com 09.09 — 21-ше поглинання; Preply вивів AI зі слогана в продукт і б'ється з Duolingo). Топ-1 інсайт: конкуренти зайняли обидва полюси «AI vs людяність»

## Related pages

- [../index.md](../index.md)
- [../overview.md](../overview.md)
- [media-monitoring.md](media-monitoring.md)
