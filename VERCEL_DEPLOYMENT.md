# How to Host this Website on Vercel (Step-by-Step Guide)

This application is fully prepared and pre-configured for **one-click deployment on Vercel** (with `vercel.json` and a serverless API handler for applications).

---

## Method 1: Deploy via GitHub (Recommended - Automatic Updates)

1. **Push this project to your GitHub repository**:
   - Create a new repository on [GitHub](https://github.com/new) (e.g. `bcas-international`).
   - Push your code to GitHub:
     ```bash
     git init
     git add .
     git commit -m "Initial commit for BCAS International website"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-repo-name>.git
     git push -u origin main
     ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in (or sign up with your GitHub account).
   - Click the **"Add New..."** button in the top right and select **"Project"**.
   - Under **Import Git Repository**, choose your repository and click **"Import"**.

3. **Configure Project Settings** (Vercel automatically detects these from `vercel.json`):
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Click "Deploy"**:
   - Within 45–60 seconds, your site will be live on a free SSL-secured `.vercel.app` domain (e.g. `https://bcas-international.vercel.app`).

---

## Method 2: Deploy using Vercel CLI (Direct from Terminal)

If you have Node.js installed locally on your computer:

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy to production
vercel --prod
```

---

## Adding Your Custom Domain (e.g. `bcasinternational.com`)

1. In your Vercel Dashboard, go to your project → **Settings** → **Domains**.
2. Type your domain (e.g., `admissions.bcas.lk` or `bcasinternational.com`) and click **Add**.
3. Add the displayed DNS records (CNAME or A record) at your domain registrar (GoDaddy, Namecheap, Cloudflare, LK Domain Registry, etc.).
4. Vercel will automatically provision a free, auto-renewing SSL certificate.

---

## What is Included & Pre-Configured?

- ✅ **`vercel.json`**: Pre-configured for Vite SPA routing, caching, and `/api/applications` serverless endpoints.
- ✅ **`/api/applications.ts`**: Serverless function ready to process student enquiry and assessment form submissions on Vercel.
- ✅ **Google Sheets Lead Sync**: Real-time leads sync directly into your Google Sheets admissions spreadsheet.
- ✅ **Direct WhatsApp Integration**: All counseling and assessment buttons connect directly to `+94 76 141 5273`.
