# Production Deployment Guide

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing (`npm test`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] TypeScript strict mode enabled
- [ ] No console.log statements in production code
- [ ] All TODO/FIXME comments addressed

### Performance
- [ ] Bundle size analyzed and optimized
- [ ] Lazy loading configured for all feature routes
- [ ] Tree-shaking verified (check `dist/` size)
- [ ] Image assets optimized
- [ ] CSS/JS minified
- [ ] Service worker configured (if applicable)

### Security
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Environment secrets not in repository
- [ ] Dependencies up to date (`npm audit`)
- [ ] No sensitive data in localStorage
- [ ] XSS protection verified

### SEO & Accessibility
- [ ] Meta tags configured
- [ ] Canonical URLs set
- [ ] Structured data markup verified
- [ ] ARIA labels added
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified

### Browser & Device Support
- [ ] Tested on Chrome, Firefox, Safari, Edge
- [ ] Mobile responsive (iOS/Android)
- [ ] Touch events properly handled
- [ ] Geolocation permissions work

### Environment Configuration
- [ ] `environment.prod.ts` configured with correct API URL
- [ ] Logger service set to ERROR level
- [ ] No debug code in production build

## Build Process

### 1. Production Build
```bash
npm run build:prod
```

### 2. Verify Build Artifacts
```bash
# Check bundle sizes
ls -lh dist/nova-insurance/browser/

# Gzipped size should be < 200KB
gzip-size dist/nova-insurance/browser/main-*.js
```

### 3. Server-Side Rendering (Optional)
```bash
npm run serve:ssr
```

### 4. Bundle Analysis
```bash
npm run build:analyze
```

## Deployment Steps

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Custom domain configuration in Vercel dashboard
```

### Option 2: Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Deploy
firebase deploy
```

### Option 3: Docker
```bash
# Build Docker image
docker build -t nova-insurance:1.0.0 .

# Run container
docker run -p 80:4200 nova-insurance:1.0.0

# Push to registry
docker push your-registry/nova-insurance:1.0.0
```

### Option 4: Traditional Server (Nginx/Apache)
```bash
# 1. Build the application
npm run build:prod

# 2. Copy dist files to server
scp -r dist/nova-insurance/browser/* user@server:/var/www/nova-insurance/

# 3. Configure server (see nginx.conf example)

# 4. Enable HTTPS with Let's Encrypt
# 5. Set up redirects and caching headers
```

## Post-Deployment Verification

### Performance Monitoring
- [ ] Lighthouse score 90+ (Vercel Analytics)
- [ ] Core Web Vitals within targets
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1

### Functionality Testing
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Navigation works on all routes
- [ ] Lazy loading working (check Network tab)
- [ ] API calls successful
- [ ] Error handling functional

### Analytics & Monitoring
- [ ] Google Analytics configured
- [ ] Error tracking enabled
- [ ] Performance monitoring active
- [ ] Uptime monitoring configured

## Rollback Plan

If deployment fails:

```bash
# Revert to previous version
git revert <commit-hash>
npm run build:prod

# Or use deployment service rollback feature
vercel rollback
firebase functions:rollback
```

## Environment Variables (Production)

Create `.env.production` file:
```
API_URL=https://api.novainsurance.com
ENABLE_ANALYTICS=true
ENABLE_SERVICE_WORKER=true
LOG_LEVEL=error
```

## Nginx Configuration Example

```nginx
server {
    listen 443 ssl http2;
    server_name novainsurance.com www.novainsurance.com;

    ssl_certificate /etc/letsencrypt/live/novainsurance.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/novainsurance.com/privkey.pem;

    root /var/www/nova-insurance;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# HTTP redirect
server {
    listen 80;
    server_name novainsurance.com www.novainsurance.com;
    return 301 https://$server_name$request_uri;
}
```

## Maintenance

### Regular Tasks
- [ ] Monitor error logs
- [ ] Update dependencies monthly (`npm update`)
- [ ] Review and respond to user feedback
- [ ] Backup database (if applicable)
- [ ] Check SSL certificate expiration

### Security Updates
- [ ] Run `npm audit` weekly
- [ ] Install security patches immediately
- [ ] Keep Angular and dependencies updated
- [ ] Review GitHub security advisories

## Support & Escalation

**Production Support**: support@novainsurance.com
**Emergency Hotline**: +1-XXX-XXX-XXXX
**Status Page**: https://status.novainsurance.com

---

Last Updated: May 2, 2026
