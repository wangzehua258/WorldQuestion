# 🚀 WorldQuestion Deployment Guide

## Overview
This project consists of:
- **Frontend**: Next.js app (deploy to Vercel)
- **Backend**: Express.js API (deploy to Railway/Render)
- **Database**: MongoDB Atlas
- **Domain**: thinkornot.com

## Step 1: Deploy Backend API

### Option A: Railway (Recommended)

1. **Sign up for Railway**
   ```bash
   # Go to https://railway.app
   # Connect your GitHub account
   ```

2. **Deploy Backend**
   ```bash
   # In Railway dashboard:
   # 1. Click "New Project"
   # 2. Select "Deploy from GitHub repo"
   # 3. Select your repository
   # 4. Set root directory to: backend
   # 5. Railway will auto-detect Node.js
   ```

3. **Set Environment Variables in Railway**
   ```env
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   CORS_ORIGIN=https://thinkornot.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Get Backend URL**
   - Railway will provide: `https://your-app-name.railway.app`
   - Your API will be at: `https://your-app-name.railway.app/api`

### Option B: Render

1. **Sign up for Render**
   ```bash
   # Go to https://render.com
   # Connect your GitHub account
   ```

2. **Deploy Backend**
   ```bash
   # In Render dashboard:
   # 1. Click "New +" → "Web Service"
   # 2. Connect your GitHub repo
   # 3. Set root directory to: backend
   # 4. Build Command: npm install
   # 5. Start Command: npm start
   ```

3. **Set Environment Variables in Render**
   ```env
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   CORS_ORIGIN=https://thinkornot.com
   ```

## Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Frontend**
   ```bash
   # In your project root (not backend folder)
   vercel --prod
   ```

4. **Set Environment Variables in Vercel**
   ```bash
   # Go to Vercel dashboard → Your project → Settings → Environment Variables
   # Add:
   NEXT_PUBLIC_API_URL=https://your-backend-domain.railway.app/api
   ```

5. **Configure Custom Domain**
   ```bash
   # In Vercel dashboard:
   # 1. Go to Settings → Domains
   # 2. Add: thinkornot.com
   # 3. Add: www.thinkornot.com
   # 4. Follow DNS configuration instructions
   ```

## Step 3: Domain Configuration

### DNS Setup for thinkornot.com

1. **In your domain registrar (where you bought thinkornot.com):**
   ```bash
   # Add these DNS records:
   
   # For root domain (thinkornot.com)
   Type: A
   Name: @
   Value: 76.76.19.19
   
   # For www subdomain
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

2. **Alternative: Use Vercel's DNS**
   ```bash
   # In Vercel dashboard:
   # 1. Go to Settings → Domains
   # 2. Click "Configure" for thinkornot.com
   # 3. Choose "Use Vercel DNS"
   # 4. Update nameservers at your registrar
   ```

## Step 4: Database Setup

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   ```bash
   # Go to https://mongodb.com/atlas
   # Create free account
   ```

2. **Create Database**
   ```bash
   # 1. Create new cluster (free tier)
   # 2. Create database: worldquestion
   # 3. Create user with read/write permissions
   # 4. Get connection string
   ```

3. **Add Sample Data**
   ```bash
   # In your backend folder:
   npm run seed
   ```

## Step 5: Test Deployment

1. **Test Backend**
   ```bash
   curl https://your-backend-domain.railway.app/health
   # Should return: {"success":true,"message":"WorldQuestion API is running"}
   ```

2. **Test Frontend**
   ```bash
   # Visit https://thinkornot.com
   # Should load the WorldQuestion homepage
   ```

3. **Test API Connection**
   ```bash
   # Check browser console for API calls
   # Should connect to your backend successfully
   ```

## Environment Variables Summary

### Backend (Railway/Render)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/worldquestion
JWT_SECRET=your_super_secret_jwt_key
CORS_ORIGIN=https://thinkornot.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.railway.app/api
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check that thinkornot.com is in the allowed origins
   - Verify CORS_ORIGIN environment variable

2. **Domain Not Working**
   - Check DNS propagation (can take 24-48 hours)
   - Verify nameservers are correct
   - Check SSL certificate status

3. **API Connection Failed**
   - Verify NEXT_PUBLIC_API_URL is correct
   - Check backend is running and accessible

4. **Database Connection Failed**
   - Verify MONGODB_URI is correct
   - Check MongoDB Atlas network access settings

### Debug Commands

```bash
# Check backend logs
railway logs

# Check frontend build
vercel logs

# Test API locally
curl http://localhost:5001/health

# Test frontend locally
npm run dev

# Check domain DNS
nslookup thinkornot.com
```

## Post-Deployment

1. **Set up SSL Certificate** (Automatic with Vercel)
   - Vercel automatically provides SSL for custom domains

2. **Monitor Performance**
   - Use Vercel Analytics
   - Monitor Railway/Render logs

3. **Set up CI/CD**
   - Connect GitHub for automatic deployments
   - Set up preview deployments

## Security Checklist

- [ ] Environment variables are set (not in code)
- [ ] CORS is properly configured for thinkornot.com
- [ ] Rate limiting is enabled
- [ ] MongoDB connection is secure
- [ ] No sensitive data in client-side code
- [ ] HTTPS is enabled (automatic with Vercel/Railway)
- [ ] Domain DNS is properly configured 