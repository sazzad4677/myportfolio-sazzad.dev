# Separate Databases for Staging & Production

## Overview
Use Infisical's environment feature to manage different MongoDB databases for dev, staging, and production.

## Setup Steps

### 1. Configure Infisical Environments

In your Infisical dashboard (https://app.infisical.com):

1. Navigate to your project
2. Go to **Settings** → **Environments**
3. Ensure you have these environments:
   - `dev` (development)
   - `staging`
   - `production`

### 2. Add MONGODB_URI for Each Environment

For each environment, add the `MONGODB_URI` secret with different connection strings:

**Development (`dev`):**
```
mongodb+srv://user:pass@cluster0.../portfolio-dev?retryWrites=true&w=majority
```

**Staging (`staging`):**
```
mongodb+srv://user:pass@cluster0.../portfolio-staging?retryWrites=true&w=majority
```

**Production (`production`):**
```
mongodb+srv://user:pass@cluster0.../portfolio-prod?retryWrites=true&w=majority
```

> **Tip**: You can use the same MongoDB cluster but different database names, or separate clusters entirely.

### 3. Local Development

Your `.infisical.json` is now configured with `"defaultEnvironment": "dev"`, so running:

```bash
infisical run -- npm run dev
```

Will automatically use the **dev** environment and connect to `portfolio-dev` database.

### 4. Staging Deployment

When deploying to staging, run:

```bash
infisical run --env=staging -- npm start
```

Or set the environment in your CI/CD:

```yaml
# Example: GitHub Actions
- name: Deploy Staging
  run: infisical run --env=staging -- npm run build
  env:
    INFISICAL_TOKEN: ${{ secrets.INFISICAL_STAGING_TOKEN }}
```

### 5. Production Deployment

For production:

```bash
infisical run --env=production -- npm start
```

Or in CI/CD:

```yaml
# Example: Vercel
- name: Deploy Production
  run: infisical run --env=production -- vercel --prod
  env:
    INFISICAL_TOKEN: ${{ secrets.INFISICAL_PROD_TOKEN }}
```

## MongoDB Atlas Setup

### Option 1: Same Cluster, Different Databases
- Use one MongoDB cluster
- Create separate databases: `portfolio-dev`, `portfolio-staging`, `portfolio-prod`
- Use the same connection string but change the database name

### Option 2: Separate Clusters (Recommended for Production)
- Create separate clusters for staging and production
- Better isolation and security
- Independent scaling and monitoring

## Verification

Test each environment:

```bash
# Test dev
infisical run --env=dev -- node verify-api.js

# Test staging
infisical run --env=staging -- node verify-api.js

# Test production
infisical run --env=production -- node verify-api.js
```

## Best Practices

1. **Never use production data in dev/staging**
2. **Use different credentials** for each environment
3. **Restrict production access** to specific IP addresses in MongoDB Atlas
4. **Enable MongoDB Atlas backups** for production
5. **Monitor production database** usage and performance
6. **Use service tokens** in CI/CD instead of user tokens

## Infisical Service Tokens (for CI/CD)

Generate environment-specific tokens:

1. Go to Infisical → **Project Settings** → **Service Tokens**
2. Create tokens for each environment:
   - `STAGING_TOKEN` (access to staging env only)
   - `PRODUCTION_TOKEN` (access to production env only)
3. Add these as secrets in your deployment platform (Vercel, GitHub Actions, etc.)
