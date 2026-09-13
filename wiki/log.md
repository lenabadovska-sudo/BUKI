# Log

Append-only лог усіх операцій над wiki.

---

## 2026-09-12 — створення проєкту BUKI, перенесення накопиченого контенту

Проєкт "BUKI | Marketing | Claude" виділено в окремий, повноцінний проєкт (раніше контекст BUKI випадково накопичувався всередині навчального проєкту "Olena Badovska | Workshop | Claude" — там він був явно позначений як "не пов'язано з Megogo, окремий кейс").

Перенесено:
- `buki-context-brief.md` — контекст-бриф BUKI Group (з 3 PDF-джерел), скопійовано з Workshop-проєкту без змін контенту
- `wiki/insights.md` (раніше `buki-insights.md` у Workshop) — інсайт про вплив ШІ на цінність репетиторства
- `artifacts/buki-ai-value-prop/one-pager.html` — деліверабл на основі insights.md, опублікований Artifact-URL не змінюється (https://claude.ai/code/artifact/42b1c5b9-69ae-40f0-8695-45f26f670202)
- `competitor-watch/preply.md`, `competitor-watch/superprof.md`, `competitor-watch/index.md` — живі логи спостереження за конкурентами через `competitor-site-watch` skill, перенесено з кореня проєкту в `wiki/competitors/` (виправлено внутрішні посилання на buki-context-brief.md — тепер відносний шлях у межах цього ж проєкту, а не в Workshop)

Створено:
- `CLAUDE.md`, `.gitignore`, `.claude/settings.json` — адаптовано з Workshop-шаблону під BUKI (генерична частина без змін, персона hypothesis-roaster переписана з "Megogo" на "BUKI")
- `.claude/agents/hypothesis-roaster.md`, `.claude/agents/prompt-security-auditor.md`
- `wiki/overview.md`, `wiki/now.md` — складено на основі `buki-context-brief.md`, за форматом сторінки
- `wiki/competitors/index.md` — індекс живого спостереження (перенесено зі старого `competitor-watch/index.md`)
- `wiki/index.md` (цей файл)

Оновлено (спільне, поза цим проєктом):
- `~/.claude/skills/competitor-site-watch/SKILL.md` — дефолтний шлях запису змінено з `BUKI | Marketing | Claude/competitor-watch/` на `BUKI | Marketing | Claude/wiki/competitors/`
- Workshop-проєкт (`Olena Badovska | Workshop | Claude/wiki/`) — видалено `buki-context-brief.md` (перенесено сюди), `index.md` і `log.md` там оновлено з посиланням на нове розташування

Git-репозиторій для цього проєкту ще не ініціалізовано окремо від Workshop (git init заплановано, чекає на remote/командний репозиторій, якщо він буде).

## 2026-09-13 — ingest master marketing context 2026 (growth/KPI-бриф)

Ще один рецидив змішування проєктів: `context.md` з "BUKI — Master Marketing Context 2026" знову з'явився в корені Workshop-проєкту (поза `wiki/`, без формату сторінки, без жодного `(source: ...)`) — той самий тип помилки, що й перенесення 2026-09-12. За запитом користувача файл перенесено сюди як сирe джерело й розкладено по wiki за ingest-протоколом (показано 5 тез, підтверджено користувачем перед записом).

На відміну від `buki-context-brief.md` (бренд-стратегія й аудиторія з 3 PDF), цей бриф — growth/KPI-шар: бізнес-амбіція 2026, канальні цілі (leads, paid, SEO, brand, supply), growth-формула, 6 CMO-питань. Перетину з наявним контентом майже немає.

Перенесено:
- Workshop-проєкт: видалено `context.md` з кореня
- Цей проєкт: створено `raw/briefs/buki-master-marketing-context-2026.md` (незмінна копія джерела)

Створено:
- `wiki/buki-master-marketing-context-2026.md` — сторінка-бриф з ключовими тезами
- `wiki/growth-model.md` — формула росту, North Star, 6 питань, аналітика як інфраструктура
- `wiki/paid-acquisition.md` — цілі paid acquisition UA/PL
- `wiki/supply-marketing.md` — найм викладачів: ціль, CAC-ліміт, ініціативи
- `wiki/seo-brand.md` — SEO-позиції, brand demand KPI, соцмережі, brand transformation, BUKI vs AI
- `wiki/pr-strategy.md` — роль PR, території, як вимірювати

Оновлено:
- `wiki/overview.md` — додано розділ "Бізнес-амбіція 2026" (Company Objective, Business Key Results, 3 двигуни росту, 2 горизонти стратегії), підрозділ "Що люди купують насправді", розширено "Конкуренти" (ширша категорія альтернатив), оновлено Related pages
- `wiki/now.md` — додано розділ "KPI-цілі, що визначають фокус 2026", нові пункти в "Що зараз робимо" (supply-маркетинг, analytics hygiene), оновлено Related pages
- `wiki/index.md`

Незакрите: числа в новому брифі не мають первинного джерела (вихідний Excel зі strategic tasks не розпарсено) — якщо файл з'явиться в `raw/`, потрібно звірити й прибрати цю прогалину в citation.

## 2026-09-13 — злиття context.md (buki-context-brief.md + buki-master-marketing-context-2026.md)

На запит користувача дві сторінки-брифи об'єднано в одну — `buki-context-brief.md` (бренд-стратегія й аудиторія, 3 PDF) і `buki-master-marketing-context-2026.md` (growth-модель і канальні KPI 2026) стали двома частинами однієї сторінки `wiki/context.md`. Обидва оригінальні джерела (3 PDF + raw-бриф) лишаються процитованими всередині — трасування "яка теза з якого джерела" не втрачено.

Видалено:
- `wiki/buki-context-brief.md`
- `wiki/buki-master-marketing-context-2026.md`

Створено:
- `wiki/context.md` — об'єднана сторінка, Частина 1 (бренд/аудиторія) + Частина 2 (growth/KPI)

Оновлено (посилання `[...](buki-context-brief.md)` / `[...](buki-master-marketing-context-2026.md)` → `[context.md](context.md)`, прибрано дублі в Related pages; інлайн-цитати `(source: buki-master-marketing-context-2026.md)`, що посилаються на raw-файл у `raw/briefs/`, НЕ чіпались — raw-файл не змінювався):
- `wiki/index.md` — дві сторінки в списку замінено на одну
- `wiki/overview.md`, `wiki/now.md` — Sources і Related pages
- `wiki/seo-brand.md`, `wiki/insights.md`, `wiki/growth-model.md`, `wiki/paid-acquisition.md`, `wiki/supply-marketing.md`, `wiki/pr-strategy.md` — Related pages / інлайн-посилання
- `wiki/competitors/preply.md`, `wiki/competitors/superprof.md` — інлайн-посилання на контекст аудиторії

Не чіпалось навмисно: `raw/` (обидва raw-файли лишаються окремими — раніше джерело правди), і цей лог (append-only, минулі записи описують стан на момент запису).

## 2026-09-13 — створення ad-creative-agent і каркасу wiki/creatives

За запитом користувача розроблено `ad-creative-agent` — subagent, що перетворює рісерч конкурентів (Meta Ad Library) і дані квіз-воронки на скоровані ідеї креативів і Production Brief, з відправкою в рендер (Hackfield) лише після явного підтвердження. MCP-сервери для Meta Ad Library і Hackfield наразі не підключені в проєкті — subagent сам перевіряє їх доступність через `ToolSearch` на кроці 0 і явно повідомляє, якщо їх бракує, замість вигадувати дані.

Створено:
- `.claude/agents/ad-creative-agent.md` — subagent (opus, за зразком `hypothesis-roaster.md`): перевірка джерел → рісерч конкурентів + воронка → звірка з `wiki/creatives` → генерація ідей → скоринг (5 критеріїв, 0–5 кожен) → Production Brief → рендер лише після підтвердження
- `wiki/creatives/index.md` — новий розділ wiki (каркас, ще без конкретних креативів — жодного raw-джерела з ними поки нема)

Оновлено:
- `wiki/index.md` — новий розділ "Креативи"

Незакрите: `wiki/creatives/briefs/` заповниться першими Production Brief лише після першого реального запуску агента (потребує підключення Meta Ad Library MCP і джерела даних воронки).

## 2026-09-13 — уточнення render-етапу: Figma замість "Hackfield"

При розборі підключення MCP з'ясувалось, що "Hackfield" з попереднього запиту — не окремий сервіс, а малося на увазі щось інше; користувач підтвердив: **Figma**. MCP-сервер `claude.ai Figma` вже підключений і авторизований, окремої обгортки будувати не треба.

Оновлено:
- `.claude/agents/ad-creative-agent.md` — крок 0 (Figma замість "Hackfield MCP, якого нема"), крок 6 (production feasibility = чи збирається макет у Figma), крок 8 (макет через `use_figma` лише після підтвердження, з дотриманням `/figma-use` skill), tools у frontmatter (додано `mcp__claude_ai_Figma__use_figma`, `create_new_file`, `get_screenshot`)

Незакрите (не змінилось): Meta Ad Library MCP і джерело даних воронки все ще не підключені — користувач не впевнений, чи є вже Facebook Developer App/access token; це наступний крок.

## 2026-09-13 — створення wiki/team.md (оргструктура команди)

Користувач надав скріншоти Google Sheet «Team structure» (вкладки Core team, BUKI team, BUKI School team) і попросив оновити інфо про команду. Оскільки таблиця містила чутливі персональні дані (особисті телефони, особисті Gmail, дати народження), перед записом уточнено обсяг через AskUserQuestion — користувач обрав **лише структуру** (ім'я, посада, підпорядкування, місто, office/remote), без контактних даних, і **нову окрему сторінку** замість розділу в overview.md.

Створено:
- `wiki/team.md` — оргструктура по департаментах (Core team, Marketing, Engineers, Product & Analytics, Operations, BUKI Operations, BUKI School Operations). Розшифровано зі скріншотів; секції Sales | PL/RO/BG і частина Teachers | UA позначені як low-confidence (дрібний текст) — узагальнено без поіменного списку замість ризику помилкових імен.

Оновлено:
- `wiki/index.md` — додано рядок для team.md

Незакрите: файл-джерело (Google Sheet) не додано в `raw/` — сторінка складена напряму зі скріншотів у розмові, без збереження копії джерела. Якщо потрібна точна звірка Sales|PL/RO/BG, варто експортувати відповідні вкладки таблиці в `raw/` і оновити team.md за ingest-протоколом.

## 2026-09-13 — створення tone-of-voice.md та tone-of-voice-buki-school.md (детальний бренд-неймінг і ToV)

Користувач надав скріншоти Google Sheet «Marketing || Brand&comms || rules» (вкладки «Правила комунікації BUKI», «Правила комунікації BUKI School», «ToV», «ToV BUKI School») і попросив оновити дані про бренд-войс. Перед записом уточнено через AskUserQuestion: (1) чи ядро ToV «Ми партнер, не наставник» суперечить архетипу «головний тренер»/Наставник із context.md — користувач підтвердив, що це тон **продуктової/сервісної комунікації**, окремий шар від маркетингового бренд-голосу, конфлікту нема; (2) куди записувати — обрано **нові окремі сторінки** замість розширення context.md.

Створено:
- `wiki/tone-of-voice.md` — бренд-неймінг BUKI (тільки «BUKI», без варіацій), позиціонування («платформа/екосистема», не «маркетплейс/база»), масштабність і географічна нейтральність (тільки сумарні глобальні цифри), звертання завжди «ви», етика щодо конкурентів, термінологія («адміністратор» → «менеджер підтримки»), + ядро ToV для продукту/сервісу (партнер, чесність, чітке «ні»+альтернатива, активна проста мова, структура тексту, канали, заборони). Позначено потенційну неточність: «платформа/екосистема» тут vs «відкритий маркетплейс» в overview.md — не виправлено автоматично, позначено як відкрите питання для звірки.
- `wiki/tone-of-voice-buki-school.md` — детальні правила для BUKI School: неймінг (завжди два слова, не окремий бренд у зовнішніх комунікаціях), позиціонування, головне повідомлення (турбота як система + повна відповідальність, без «успішного успіху»), лексика турботи, тон і стиль, звертання «ви», опіка без контролю, заборонені повідомлення (гарантії результату НМТ/вступу, конкуренти, знецінення тривоги батьків), обов'язковий підпис «З турботою про майбутнє! BUKI School», термінологія («адміністратор» → «менеджер з турботи»), детальні принципи ToV (близькість без надмірності, впевненість без зарозумілості, підтримка без нагляду, мова прогресу) і повні списки «наші слова / не наші слова».

Оновлено:
- `wiki/index.md` — додано рядки для обох нових сторінок
- `.claude/skills/buki-brand-voice/SKILL.md` — доповнено правилами неймінгу, забороненими формулюваннями, обов'язковим підписом для School і посиланнями на нові wiki-сторінки

Незакрите: файл-джерело (Google Sheet) не додано в `raw/` — сторінки складені напряму зі скріншотів у розмові, без збереження копії джерела (як і з `wiki/team.md` раніше). Розбіжність «платформа/екосистема» vs «маркетплейс» в overview.md лишається невирішеною — вимагає уточнення в наступній розмові.
