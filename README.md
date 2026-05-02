# Nova Insurance - Production-Ready Angular Application

A modern, scalable Angular insurance platform built with Angular 20, Angular Material, and following best practices for production deployments.

## ?? Project Structure

```
src/app/
+-- core/                          # Core module - singleton services
¦   +-- constants/                 # Application constants
¦   +-- interceptors/              # HTTP interceptors (error handling)
¦   +-- services/                  # Core services (SEO, Quote, Logger, Environment)
¦   +-- utils/                     # Utility functions (validators, storage, date utils)
+-- features/                      # Feature modules (lazy-loaded)
¦   +-- home/                      # Home page
¦   +-- quote/                     # Quote page (lazy-loaded)
¦   +-- contact/                   # Contact page (lazy-loaded)
¦   +-- about/                     # About page
¦   +-- insights/                  # Insights page
+-- insurance/                     # Insurance products module (lazy-loaded)
¦   +-- auto/                      # Auto insurance
¦   +-- business/                  # Business insurance
¦   +-- health/                    # Health insurance
¦   +-- life/                      # Life insurance
¦   +-- home-insurance/            # Home insurance
¦   +-- travel/                    # Travel insurance
¦   +-- insurance-type-base.component.ts
+-- layout/                        # Layout components
¦   +-- navbar/                    # Navigation bar
¦   +-- footer/                    # Footer
¦   +-- expert-assistant/          # AI expert chat widget
+-- app.component.*                # Root component
+-- app.config.ts                  # Application configuration
+-- app.routes.ts                  # Application routing

environments/
+-- environment.ts                 # Development environment
+-- environment.prod.ts            # Production environment
```

## ?? Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Angular CLI 20+

### Installation
```bash
npm install
```

### Development
```bash
npm start
```

### Production
```bash
npm run build:prod
```

## ??? Architecture

### Lazy Loading
- Quote & Contact pages lazy-loaded
- Insurance products grouped and lazy-loaded
- ~40% reduction in initial bundle size

### Services
- SeoService, QuoteService, LoggerService, EnvironmentService
- ErrorInterceptor for global HTTP error handling
- Singleton services provided at root level

## ?? Key Features

? Production-ready folder structure
? Lazy loading for performance
? Angular Material components
? Reactive forms with validation
? Material snackbar notifications
? Responsive design (mobile-first)
? Server-side rendering support
? Environment configuration
? Centralized error handling
? Theme system (Light/Dark/Red)
? SEO optimized
? TypeScript strict mode

## ?? Performance

- Initial bundle: ~766 KB
- Gzipped: ~102 KB
- Time to Interactive: < 3s
- Lighthouse Score: 90+

## ?? npm Scripts

```bash
npm start              # Dev server (port 4200)
npm run build          # Production build
npm run build:prod     # Production with AOT
npm run build:analyze  # Bundle analysis
npm run preview:prod   # Preview production
npm run serve:ssr      # Server-side rendering
npm test               # Unit tests
npm run lint           # ESLint
```

## ?? Tech Stack

- Angular 20.3.19
- Angular Material 20.2.14
- TypeScript 5.9.3
- RxJS 7.8.0
- SCSS

## ?? Support

For support: info@novainsurance.com
