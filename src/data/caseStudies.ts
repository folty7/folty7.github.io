export type Stat = {
  value: string
  label: string
}

export type WorkItem = {
  lead: string
  detail?: string
}

export type Screen = {
  src: string
  alt: string
}

export type CaseStudyCopy = {
  type: string
  role: string
  stats: Stat[]
  workedOn: WorkItem[]
  hardest: string[]
  flow?: string[]
  learned: string[]
}

export type CaseStudy = {
  screens: Screen[]
  en: CaseStudyCopy
  sk: CaseStudyCopy
}

const screen = (folder: string, file: string, alt: string): Screen => ({
  src: `/screens/${folder}/${encodeURIComponent(file)}`,
  alt
})

export const caseStudies: Record<string, CaseStudy> = {
  lyra: {
    screens: [
      screen('lyra', 'kire-pc.png', 'Lyra — desktop view'),
      screen('lyra', 'kira-tablet.png', 'Lyra — tablet view'),
      screen('lyra', 'iphone-mockup-suggestions.png', 'Lyra — playlist suggestions on mobile'),
      screen('lyra', 'iphone-mockup-playlists.png', 'Lyra — playlists on mobile')
    ],
    en: {
      type: 'A full-stack web app that turns a messy Spotify library into playlists. AI groups saved tracks by genre, mood, and activity.',
      role: 'Sole author. Design, frontend, backend, and deployment.',
      stats: [
        { value: '5,000', label: 'saved tracks per library' },
        { value: '3', label: 'grouping modes' },
        { value: '2', label: 'deployed services' }
      ],
      workedOn: [
        { lead: 'Spotify OAuth 2.0 flow', detail: 'login, token handling, and refresh on the Express backend' },
        { lead: 'Library import', detail: 'paginated loading of up to 5,000 saved tracks' },
        { lead: 'Gemini integration', detail: 'structured schema prompting for playlist suggestions' },
        { lead: 'Review-and-edit UI', detail: 'nothing is written to Spotify until the user approves it' },
        { lead: 'Client state in Zustand', detail: 'and a responsive Tailwind interface' },
        { lead: 'Containerized deployment', detail: 'frontend and API deployed separately on Vercel and Railway' }
      ],
      hardest: [
        'LLM output has to be something the UI can actually render and edit.',
        'I defined a strict response schema for Gemini, so suggestions come back as predictable data instead of free text.'
      ],
      flow: ['Spotify login', 'Load library', 'Gemini groups tracks', 'Review & edit', 'Push to Spotify'],
      learned: [
        'Treat LLM output like an API contract. Define the schema first.',
        'People trust AI suggestions more when they can change them before anything is saved.',
        'Deploying the frontend and API separately forces clean boundaries between them.'
      ]
    },
    sk: {
      type: 'Full-stack webová aplikácia, ktorá z neprehľadnej Spotify knižnice spraví playlisty. AI zoskupí uložené skladby podľa žánru, nálady a aktivity.',
      role: 'Jediný autor. Dizajn, frontend, backend aj nasadenie.',
      stats: [
        { value: '5 000', label: 'uložených skladieb v knižnici' },
        { value: '3', label: 'spôsoby zoskupenia' },
        { value: '2', label: 'nasadené služby' }
      ],
      workedOn: [
        { lead: 'Spotify OAuth 2.0 flow', detail: 'prihlásenie, práca s tokenmi a ich obnova na Express backende' },
        { lead: 'Import knižnice', detail: 'stránkované načítanie až 5 000 uložených skladieb' },
        { lead: 'Integrácia Gemini', detail: 'structured schema prompting pre návrhy playlistov' },
        { lead: 'UI na kontrolu a úpravu', detail: 'do Spotify sa nič nezapíše, kým to používateľ neschváli' },
        { lead: 'Klientsky stav v Zustand', detail: 'a responzívne rozhranie v Tailwinde' },
        { lead: 'Kontajnerizované nasadenie', detail: 'frontend a API nasadené samostatne na Verceli a Railway' }
      ],
      hardest: [
        'Výstup z LLM musí byť niečo, čo UI dokáže naozaj zobraziť a upraviť.',
        'Pre Gemini som definoval striktnú schému odpovede, takže návrhy prichádzajú ako predvídateľné dáta, nie voľný text.'
      ],
      flow: ['Spotify login', 'Načítanie knižnice', 'Gemini zoskupí skladby', 'Kontrola a úprava', 'Odoslanie do Spotify'],
      learned: [
        'Výstup z LLM treba brať ako API kontrakt. Najprv schéma.',
        'Ľudia viac dôverujú AI návrhom, keď ich môžu pred uložením upraviť.',
        'Samostatné nasadenie frontendu a API vynúti čisté hranice medzi nimi.'
      ]
    }
  },

  'personal-blog': {
    screens: [],
    en: {
      type: 'A blog platform with an authenticated CMS. Posts, comment threads, tags, and image uploads, in a TypeScript monorepo.',
      role: 'Sole author. Data model, API, admin, and public frontend.',
      stats: [
        { value: '21', label: 'REST endpoints' },
        { value: '1', label: 'TypeScript monorepo' },
        { value: 'WebGL', label: 'custom animated background' }
      ],
      workedOn: [
        { lead: 'Authenticated admin', detail: 'writing, editing, and publishing posts' },
        { lead: 'Comment threads and tag organization' },
        { lead: 'Image upload', detail: 'with a reusable media picker' },
        { lead: 'Prisma schema over PostgreSQL', detail: 'behind 21 REST endpoints' },
        { lead: 'TanStack Query data layer', detail: 'caching and invalidation on the client' },
        { lead: 'Custom Three.js WebGL background', detail: 'and Framer Motion page transitions' },
        { lead: 'Dockerized local environment' }
      ],
      hardest: [
        'Keeping the API, the admin, and the public site consistent as the data model grew.',
        'The Prisma schema is the single source of truth, and TanStack Query keeps the UI in sync with it.'
      ],
      flow: ['Admin edit', 'REST API', 'Prisma', 'PostgreSQL', 'Query cache'],
      learned: [
        'A clear schema saves more time than any amount of UI polish.',
        'Cache invalidation is a product decision: what should the user see right after saving?',
        'A monorepo pays off as soon as frontend and backend share types.'
      ]
    },
    sk: {
      type: 'Blogová platforma s autentifikovaným CMS. Články, vlákna komentárov, tagy a nahrávanie obrázkov v TypeScript monorepe.',
      role: 'Jediný autor. Dátový model, API, administrácia aj verejný frontend.',
      stats: [
        { value: '21', label: 'REST endpointov' },
        { value: '1', label: 'TypeScript monorepo' },
        { value: 'WebGL', label: 'vlastné animované pozadie' }
      ],
      workedOn: [
        { lead: 'Autentifikovaná administrácia', detail: 'písanie, úprava a publikovanie článkov' },
        { lead: 'Vlákna komentárov a organizácia tagov' },
        { lead: 'Nahrávanie obrázkov', detail: 's opakovane použiteľným media pickerom' },
        { lead: 'Prisma schéma nad PostgreSQL', detail: 'za 21 REST endpointmi' },
        { lead: 'Dátová vrstva v TanStack Query', detail: 'cache a invalidácia na klientovi' },
        { lead: 'Vlastné Three.js WebGL pozadie', detail: 'a prechody stránok vo Framer Motion' },
        { lead: 'Lokálne prostredie v Dockeri' }
      ],
      hardest: [
        'Udržať API, administráciu a verejný web konzistentné, keď dátový model rástol.',
        'Prisma schéma je jediný zdroj pravdy a TanStack Query s ňou udržiava UI v synchronizácii.'
      ],
      flow: ['Úprava v admine', 'REST API', 'Prisma', 'PostgreSQL', 'Query cache'],
      learned: [
        'Jasná schéma ušetrí viac času než akékoľvek ladenie UI.',
        'Invalidácia cache je produktové rozhodnutie: čo má používateľ vidieť hneď po uložení?',
        'Monorepo sa oplatí hneď, ako frontend a backend zdieľajú typy.'
      ]
    }
  },

  'microservice-logger': {
    screens: [],
    en: {
      type: 'A logging platform built from microservices. One API gateway in front of several services, all running in Docker Compose.',
      role: 'Sole author. Architecture, services, gateway, and frontend.',
      stats: [
        { value: '5', label: 'services in Docker Compose' },
        { value: '1', label: 'API gateway' },
        { value: '2', label: 'auth strategies' }
      ],
      workedOn: [
        { lead: 'Sails.js API gateway', detail: 'a single entry point proxying to FeathersJS services' },
        { lead: 'Schema-driven data layer', detail: 'over MongoDB' },
        { lead: 'JWT and OAuth', detail: 'authentication strategies' },
        { lead: 'Sensitive field masking', detail: 'in gateway middleware' },
        { lead: 'React 19 + TypeScript frontend' },
        { lead: 'Docker Compose orchestration', detail: 'the whole system starts with one command' }
      ],
      hardest: [
        'Several services, one public surface, and no sensitive data leaking to the client.',
        'Masking happens in the gateway, so no individual service has to remember to do it.'
      ],
      flow: ['Client', 'Gateway: auth + masking', 'Feathers services', 'MongoDB'],
      learned: [
        'A gateway is the right place for rules that must never be forgotten.',
        'Microservices trade code complexity for operational complexity. Compose makes it manageable locally.',
        'Schemas keep services honest with each other.'
      ]
    },
    sk: {
      type: 'Logovacia platforma postavená z mikroslužieb. Jedna API gateway pred viacerými službami, všetko beží v Docker Compose.',
      role: 'Jediný autor. Architektúra, služby, gateway aj frontend.',
      stats: [
        { value: '5', label: 'služieb v Docker Compose' },
        { value: '1', label: 'API gateway' },
        { value: '2', label: 'autentifikačné stratégie' }
      ],
      workedOn: [
        { lead: 'Sails.js API gateway', detail: 'jediný vstupný bod, ktorý proxyuje FeathersJS služby' },
        { lead: 'Schema-driven dátová vrstva', detail: 'nad MongoDB' },
        { lead: 'JWT a OAuth', detail: 'autentifikačné stratégie' },
        { lead: 'Maskovanie citlivých polí', detail: 'v middleware gateway' },
        { lead: 'Frontend v React 19 + TypeScript' },
        { lead: 'Orchestrácia v Docker Compose', detail: 'celý systém sa spustí jedným príkazom' }
      ],
      hardest: [
        'Viac služieb, jedno verejné rozhranie a žiadne citlivé dáta, ktoré by unikli ku klientovi.',
        'Maskovanie prebieha v gateway, takže žiadna služba si naň nemusí pamätať sama.'
      ],
      flow: ['Klient', 'Gateway: auth + maskovanie', 'Feathers služby', 'MongoDB'],
      learned: [
        'Gateway je správne miesto pre pravidlá, na ktoré sa nesmie zabudnúť.',
        'Mikroslužby menia zložitosť kódu na prevádzkovú zložitosť. Compose ju lokálne skrotí.',
        'Schémy udržujú služby voči sebe navzájom poctivé.'
      ]
    }
  },

  'ucm-connect': {
    screens: [
      screen('ucmconnect', 'dashboard-dark.png', 'UCM Connect — dashboard, dark theme'),
      screen('ucmconnect', 'dashboard-light.png', 'UCM Connect — dashboard, light theme'),
      screen('ucmconnect', 'subject-posts-dark.png', 'UCM Connect — subject posts'),
      screen('ucmconnect', 'post-detail-dark.png', 'UCM Connect — post detail'),
      screen('ucmconnect', 'subject-info-dark.png', 'UCM Connect — subject info'),
      screen('ucmconnect', 'user-account-dark.png', 'UCM Connect — user account'),
      screen('ucmconnect', 'admin-panel-dark.png', 'UCM Connect — admin panel')
    ],
    en: {
      type: 'A Reddit-inspired community platform for students of the University of Ss. Cyril and Methodius. Subjects, posts, discussions, and administration.',
      role: 'Lead frontend developer. UI design in Figma and the Vue frontend.',
      stats: [
        { value: 'Lead', label: 'frontend role' },
        { value: '2', label: 'themes, light and dark' },
        { value: 'Live', label: 'in production' }
      ],
      workedOn: [
        { lead: 'UI design in Figma', detail: 'before implementation' },
        { lead: 'Frontend architecture', detail: 'Vue 3, Composition API, and TypeScript' },
        { lead: 'State management in Pinia' },
        { lead: 'PrimeVue component layer', detail: 'with light and dark themes' },
        { lead: 'REST API integration' },
        { lead: 'Main screens', detail: 'dashboard, subject posts, post detail, user account, and admin panel' }
      ],
      hardest: [
        'Keeping many screens consistent while a team builds them in parallel.',
        'Design first in Figma, then a shared component layer on PrimeVue that every screen reuses.'
      ],
      flow: ['Figma', 'Shared components', 'Pinia stores', 'REST API'],
      learned: [
        'Leading the frontend is as much about agreements as it is about code.',
        'Designing in Figma first makes implementation faster, not slower.',
        'Theming is easier to build in from the start than to add later.'
      ]
    },
    sk: {
      type: 'Komunitná platforma inšpirovaná Redditom pre študentov Univerzity sv. Cyrila a Metoda. Predmety, príspevky, diskusie a administrácia.',
      role: 'Lead frontend developer. UI dizajn vo Figme a frontend vo Vue.',
      stats: [
        { value: 'Lead', label: 'frontend rola' },
        { value: '2', label: 'témy, svetlá a tmavá' },
        { value: 'Live', label: 'v produkcii' }
      ],
      workedOn: [
        { lead: 'UI dizajn vo Figme', detail: 'ešte pred implementáciou' },
        { lead: 'Architektúra frontendu', detail: 'Vue 3, Composition API a TypeScript' },
        { lead: 'State management v Pinia' },
        { lead: 'Komponentová vrstva na PrimeVue', detail: 'so svetlou a tmavou témou' },
        { lead: 'Integrácia REST API' },
        { lead: 'Hlavné obrazovky', detail: 'dashboard, príspevky predmetu, detail príspevku, používateľský účet a admin panel' }
      ],
      hardest: [
        'Udržať veľa obrazoviek konzistentných, keď ich tím stavia paralelne.',
        'Najprv dizajn vo Figme, potom zdieľaná komponentová vrstva na PrimeVue, ktorú používa každá obrazovka.'
      ],
      flow: ['Figma', 'Zdieľané komponenty', 'Pinia stores', 'REST API'],
      learned: [
        'Viesť frontend znamená rovnako dohody ako kód.',
        'Dizajn najprv vo Figme implementáciu zrýchli, nie spomalí.',
        'Témy je jednoduchšie zabudovať od začiatku než dorábať neskôr.'
      ]
    }
  },

  'svatomarianska-put': {
    screens: [
      screen('svmp', 'Screenshot 2026-06-10 at 18.01.44.png', 'Svätomariánska púť — homepage'),
      screen('svmp', 'Screenshot 2026-06-10 at 18.07.16.png', 'Svätomariánska púť — section'),
      screen('svmp', 'Screenshot 2026-06-10 at 18.07.36.png', 'Svätomariánska púť — section'),
      screen('svmp', 'Screenshot 2026-06-10 at 18.07.55.png', 'Svätomariánska púť — section'),
      screen('svmp', 'Screenshot 2026-06-10 at 18.02.14.png', 'Svätomariánska púť — detail')
    ],
    en: {
      type: 'A highly interactive WordPress site for a pilgrimage route, commissioned by the Prešov Self-Governing Region.',
      role: 'Frontend developer. Custom theme built from the Figma design.',
      stats: [
        { value: '1000s', label: 'visitors each season' },
        { value: 'Figma', label: 'to pixel-perfect theme' },
        { value: 'Cross', label: 'browser, BrowserStack-verified' }
      ],
      workedOn: [
        { lead: 'Pixel-perfect responsive layouts', detail: 'in SCSS, straight from Figma' },
        { lead: 'GSAP animations', detail: 'across the whole site' },
        { lead: 'Swiper.js sliders and custom JavaScript components' },
        { lead: 'Asset pipeline in Gulp', detail: 'minification and optimization' },
        { lead: 'Cross-browser testing', detail: 'in BrowserStack' }
      ],
      hardest: [
        'Rich animation without hurting performance on phones.',
        'Animations and assets were tuned for mobile first, then verified across real browsers and devices.'
      ],
      flow: ['Figma', 'SCSS + JS components', 'Gulp build', 'WordPress theme', 'BrowserStack'],
      learned: [
        'A public-sector site is judged on the oldest phone in the audience, not the newest.',
        'Animation should guide attention, not compete for it.',
        'Pixel-perfect is a conversation with the designer, not a screenshot diff.'
      ]
    },
    sk: {
      type: 'Vysoko interaktívny WordPress web pre pútnickú trasu na objednávku Prešovského samosprávneho kraja.',
      role: 'Frontend developer. Vlastná téma postavená podľa dizajnu z Figmy.',
      stats: [
        { value: 'Tisíce', label: 'návštevníkov každú sezónu' },
        { value: 'Figma', label: 'do pixel-perfect témy' },
        { value: 'Cross', label: 'browser, overené v BrowserStacku' }
      ],
      workedOn: [
        { lead: 'Pixel-perfect responzívne layouty', detail: 'v SCSS, priamo z Figmy' },
        { lead: 'GSAP animácie', detail: 'naprieč celým webom' },
        { lead: 'Swiper.js slidery a vlastné JavaScript komponenty' },
        { lead: 'Asset pipeline v Gulpe', detail: 'minifikácia a optimalizácia' },
        { lead: 'Cross-browser testovanie', detail: 'v BrowserStacku' }
      ],
      hardest: [
        'Bohaté animácie bez straty výkonu na mobiloch.',
        'Animácie a assety som ladil najprv pre mobil a potom overil v reálnych prehliadačoch a zariadeniach.'
      ],
      flow: ['Figma', 'SCSS + JS komponenty', 'Gulp build', 'WordPress téma', 'BrowserStack'],
      learned: [
        'Web pre verejný sektor sa posudzuje podľa najstaršieho telefónu v publiku, nie najnovšieho.',
        'Animácia má viesť pozornosť, nie o ňu súperiť.',
        'Pixel-perfect je rozhovor s dizajnérom, nie porovnanie screenshotov.'
      ]
    }
  }
}
