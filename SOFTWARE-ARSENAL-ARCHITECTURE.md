# Software Arsenal - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          OMAR'S PORTFOLIO WEBSITE                           │
│                              (Homepage - /)                                  │
└──────────────────┬──────────────────────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │   NAVBAR (Updated)   │
        │  [Software] Link     │
        └──────────┬───────────┘
                   │
        ┌──────────▼───────────────────────────────────────────────────┐
        │                  HOMEPAGE SECTIONS                            │
        ├───────────────────────────────────────────────────────────────┤
        │  • Hero                                                        │
        │  • About                                                       │
        │  • Experience                                                  │
        │  • Tech                                                        │
        │  • Approach                                                    │
        │  • Feedbacks                                                   │
        │                                                                │
        │  ┌──────────────────────────────────────────────────────┐    │
        │  │   🆕 SOFTWARE ARSENAL PREVIEW (Phase 3)              │    │
        │  │                                                        │    │
        │  │   ┌──────┐    ┌──────┐    ┌──────┐                  │    │
        │  │   │Tools │    │Programs│   │ Apps │                  │    │
        │  │   │#915EFF   │#00D4FF│   │#FF6B9D│                  │    │
        │  │   └───┬──┘    └───┬──┘    └───┬──┘                  │    │
        │  │       │           │           │                      │    │
        │  │       └───────────┴───────────┘                      │    │
        │  │                   │                                  │    │
        │  │         [View All Software] ───────────┐            │    │
        │  └──────────────────────────────────────┼──────────────┘    │
        │  • Contact                              │                    │
        └─────────────────────────────────────────┼────────────────────┘
                                                  │
                ┌─────────────────────────────────▼──────────────────────────┐
                │                 SOFTWARE HUB (Phase 1)                      │
                │                    Route: /software                         │
                ├─────────────────────────────────────────────────────────────┤
                │                                                             │
                │                 "Software Arsenal"                          │
                │                                                             │
                │     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
                │     │    TOOLS     │  │   PROGRAMS   │  │     APPS     │  │
                │     │              │  │              │  │              │  │
                │     │  📁 Folder   │  │  📁 Folder   │  │  📁 Folder   │  │
                │     │  Component   │  │  Component   │  │  Component   │  │
                │     │              │  │              │  │              │  │
                │     │  Color:      │  │  Color:      │  │  Color:      │  │
                │     │  #915EFF     │  │  #00D4FF     │  │  #FF6B9D     │  │
                │     │              │  │              │  │              │  │
                │     │  Utilities,  │  │  Desktop,    │  │  Web &       │  │
                │     │  Scripts,    │  │  Backend,    │  │  Mobile      │  │
                │     │  Extensions  │  │  Systems     │  │  Apps        │  │
                │     └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
                │            │                 │                 │           │
                └────────────┼─────────────────┼─────────────────┼───────────┘
                             │                 │                 │
                   ┌─────────▼─────┐ ┌─────────▼─────┐ ┌─────────▼─────┐
                   │ /software/    │ │ /software/    │ │ /software/    │
                   │   tools       │ │   programs    │ │   apps        │
                   └───────┬───────┘ └───────┬───────┘ └───────┬───────┘
                           │                 │                 │
         ┌─────────────────┴─────────────────┴─────────────────┴────────────┐
         │                CATEGORY DETAIL PAGE (Phase 2)                     │
         │                  Route: /software/:slug                           │
         ├───────────────────────────────────────────────────────────────────┤
         │                                                                   │
         │  [← Back to Arsenal]                                              │
         │                                                                   │
         │  📁 CATEGORY NAME (Tools / Programs / Apps)                       │
         │     Category Description                                          │
         │                                                                   │
         │  ┌─────────────────────────────────────────────────────────────┐ │
         │  │                  SOFTWARE CARDS GRID                         │ │
         │  │                                                               │ │
         │  │  ┌────────────┐  ┌────────────┐  ┌────────────┐            │ │
         │  │  │ ┌────────┐ │  │ ┌────────┐ │  │ ┌────────┐ │            │ │
         │  │  │ │ IMAGE  │ │  │ │ IMAGE  │ │  │ │ IMAGE  │ │            │ │
         │  │  │ └────────┘ │  │ └────────┘ │  │ └────────┘ │            │ │
         │  │  │            │  │            │  │            │            │ │
         │  │  │ Title      │  │ Title      │  │ Title      │            │ │
         │  │  │            │  │            │  │            │            │ │
         │  │  │ Description│  │ Description│  │ Description│            │ │
         │  │  │            │  │            │  │            │            │ │
         │  │  │ [Type]     │  │ [Type]     │  │ [Type]     │            │ │
         │  │  │ [Price] 🔗 │  │ [Price] 🔗 │  │ [Price] 🔗 │            │ │
         │  │  └────────────┘  └────────────┘  └────────────┘            │ │
         │  │                                                               │ │
         │  │  ┌────────────┐  ┌────────────┐  ┌────────────┐            │ │
         │  │  │ Software   │  │ Software   │  │ Software   │            │ │
         │  │  │ Card...    │  │ Card...    │  │ Card...    │            │ │
         │  │  └────────────┘  └────────────┘  └────────────┘            │ │
         │  └───────────────────────────────────────────────────────────┘ │
         │                                                                   │
         │  Showing X items                                                  │
         └───────────────────────────────────────────────────────────────────┘


┌────────────────────────────────────────────────────────────────────────────┐
│                         DATA ARCHITECTURE                                   │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  📁 src/constants/software.ts                                              │
│  ├── SOFTWARE_CATEGORIES[]                                                 │
│  │   ├── Tools      (id, name, slug, color, description)                  │
│  │   ├── Programs   (id, name, slug, color, description)                  │
│  │   └── Apps       (id, name, slug, color, description)                  │
│  │                                                                          │
│  └── SOFTWARE_ITEMS[]                                                       │
│      ├── Tool 1  (id, image, title, description, type, priceModel, ...)   │
│      ├── Tool 2                                                             │
│      ├── Tool 3                                                             │
│      ├── Tool 4                                                             │
│      ├── Program 1                                                          │
│      ├── Program 2                                                          │
│      ├── Program 3                                                          │
│      ├── App 1                                                              │
│      ├── App 2                                                              │
│      └── App 3                                                              │
│                                                                             │
│  📁 src/types/software.ts                                                   │
│  ├── interface SoftwareItem                                                │
│  ├── interface SoftwareCategory                                            │
│  └── type PriceModel = "Free" | "Paid" | "Both"                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌────────────────────────────────────────────────────────────────────────────┐
│                        COMPONENT HIERARCHY                                  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  App.tsx                                                                    │
│  ├── Route: "/"                                                             │
│  │   ├── Navbar                                                             │
│  │   ├── Hero                                                               │
│  │   ├── About                                                              │
│  │   ├── Experience                                                         │
│  │   ├── Tech                                                               │
│  │   ├── Approach                                                           │
│  │   ├── Feedbacks                                                          │
│  │   ├── 🆕 SoftwarePreview                                                │
│  │   │   └── CategoryFolder (x3)                                           │
│  │   │       └── Folder-TS-TW                                              │
│  │   ├── Contact                                                            │
│  │   └── Footer                                                             │
│  │                                                                           │
│  ├── Route: "/software"                                                     │
│  │   └── SoftwareHub                                                        │
│  │       └── CategoryFolder (x3)                                           │
│  │           └── Folder-TS-TW                                              │
│  │                                                                           │
│  └── Route: "/software/:slug"                                               │
│      └── CategoryDetail                                                     │
│          └── SoftwareCard (dynamic count)                                  │
│              ├── Image                                                      │
│              ├── Title                                                      │
│              ├── Description                                                │
│              ├── Type Badge                                                 │
│              ├── Price Badge                                                │
│              └── External Link                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌────────────────────────────────────────────────────────────────────────────┐
│                         ANIMATION FLOW                                      │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Page Load                                                                  │
│  ↓                                                                          │
│  ┌─ Title: Fade + Scale (0.6s)                                             │
│  ├─ Description: Fade (0.6s, delay 0.4s)                                   │
│  └─ Folders/Cards: Stagger (0.15s each)                                    │
│                                                                             │
│  Folder Hover                                                               │
│  ↓                                                                          │
│  ┌─ Lift Effect (-10px Y)                                                  │
│  ├─ Glow Activation                                                         │
│  └─ Text Color Change                                                       │
│                                                                             │
│  Card Hover                                                                 │
│  ↓                                                                          │
│  ┌─ Lift Effect (-8px Y)                                                   │
│  ├─ Image Scale (1.1x)                                                      │
│  ├─ Gradient Overlay                                                        │
│  └─ Border Brightness                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌────────────────────────────────────────────────────────────────────────────┐
│                        RESPONSIVE BREAKPOINTS                               │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Mobile (< 768px)                                                           │
│  └── 1 Column Grid                                                          │
│                                                                             │
│  Tablet (768px - 1024px)                                                    │
│  └── 2 Column Grid                                                          │
│                                                                             │
│  Desktop (> 1024px)                                                         │
│  └── 3 Column Grid                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌────────────────────────────────────────────────────────────────────────────┐
│                         TECH INTEGRATION                                    │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  React Router                                                               │
│  ├── useNavigate() ──→ Navigation between pages                            │
│  └── useParams()   ──→ Dynamic slug routing                                │
│                                                                             │
│  Framer Motion                                                              │
│  ├── initial, animate, exit ──→ Page transitions                           │
│  ├── whileHover ──→ Interactive hover states                               │
│  └── staggerChildren ──→ Sequential animations                             │
│                                                                             │
│  Tailwind CSS                                                               │
│  ├── Utility Classes ──→ Rapid styling                                     │
│  ├── Custom Colors ──→ Brand consistency                                   │
│  └── Responsive Grid ──→ Adaptive layouts                                  │
│                                                                             │
│  shadcn/ui                                                                  │
│  └── Folder-TS-TW ──→ Core folder component                                │
│                                                                             │
│  TypeScript                                                                 │
│  ├── Strict typing ──→ Type safety                                         │
│  └── Interfaces ──→ Contract enforcement                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Key Design Decisions

1. **Three-Tier Architecture**: Hub → Category → Detail
2. **Color-Coded Categories**: Purple (Tools), Cyan (Programs), Pink (Apps)
3. **Folder Metaphor**: Visual representation of organized software library
4. **Price Transparency**: Clear Free/Paid/Both indicators
5. **Progressive Enhancement**: Homepage preview → Full hub → Detailed view
6. **Animation Hierarchy**: Staggered loads for visual polish
7. **Responsive First**: Mobile-optimized with desktop enhancements
8. **Type Safety**: Full TypeScript implementation
9. **Scalability**: Easy to add new categories and items
10. **Performance**: Lazy loading and code splitting

## User Journey

```
User on Homepage
    ↓
Sees "Software Arsenal" Preview
    ↓
Clicks "View All Software"
    ↓
Arrives at Software Hub
    ↓
Clicks Category Folder (e.g., "Tools")
    ↓
Views Software Cards Grid
    ↓
Clicks External Link Icon
    ↓
Opens Software in New Tab
```
