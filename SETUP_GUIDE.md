# Google OAuth & Email Verification Setup Guide

## Step 1: Generate NextAuth Secret

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in your `.env.local` file.

---

## Step 2: Set Up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing one)
3. Enable the **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add these URIs under "Authorized redirect URIs":
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-deployment-domain.com/api/auth/callback/google
   ```
7. Copy your **Client ID** and **Client Secret**
8. Paste them in `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

---

## Step 3: Configure Gmail for Email Verification

### Option A: Gmail with App Password (Recommended)

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Find "App passwords" and create one for "Mail" and "Windows Computer"
4. Google will generate a 16-character password
5. In `.env.local`:
   ```
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-16-char-app-password
   EMAIL_FROM=your-email@gmail.com
   ```

### Option B: Use Another Email Provider

Replace the SMTP settings in `.env.local` with your provider:
- **SendGrid**: `smtp.sendgrid.net` (port 587)
- **Mailgun**: `smtp.mailgun.org` (port 587)
- **AWS SES**: `email-smtp.region.amazonaws.com` (port 587)

---

## Step 4: Set Up Local `.env.local` File

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Then fill in with your actual credentials:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-generated-secret>

GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=<your-email@gmail.com>
EMAIL_SERVER_PASSWORD=<your-app-password>
EMAIL_FROM=<your-email@gmail.com>

DATABASE_URL=file:./prisma/dev.db
```

---

## Step 5: Initialize Database with Prisma

```bash
# Install dependencies
npm install
# or
pnpm install

# Run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

---

## Step 6: Run the Application

```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000/signin` and test:
1. **Email sign-in**: Enter your email → Check your inbox for verification link
2. **Google sign-in**: Click Google button → Sign in with your Google account

---

## Step 7: Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" → Import your GitHub repo
4. Add Environment Variables:
   - Set same variables as `.env.local`
   - Change `NEXTAUTH_URL` to your Vercel domain:
     ```
     https://your-project.vercel.app
     ```
5. For production database, use:
   - **PlanetScale** (MySQL)
   - **Supabase** (PostgreSQL)
   - **MongoDB Atlas** (NoSQL)

---

## Troubleshooting

### Email not sending?
- ✅ Check SMTP credentials are correct
- ✅ Enable "Less secure apps" in Gmail (if not using app password)
- ✅ Check spam folder
- ✅ Verify `EMAIL_FROM` matches your email provider

### Google OAuth not working?
- ✅ Check Client ID and Secret are correct
- ✅ Verify redirect URI is registered in Google Cloud Console
- ✅ Make sure you're using http://localhost:3000 for local development

### Database connection error?
- ✅ Run `npx prisma migrate dev` to initialize database
- ✅ Check `DATABASE_URL` is correct
- ✅ For cloud databases, verify connection string format

---

## Next Steps

- Customize email templates in `app/api/auth/[...nextauth]/route.ts`
- Add more OAuth providers (GitHub, Discord, etc.)
- Add user profile completion flow
- Implement password reset functionality
