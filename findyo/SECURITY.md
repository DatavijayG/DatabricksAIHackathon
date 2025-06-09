# 🔒 SECURITY NOTICE

## API Key Security

This repository has been configured to handle Google Maps API keys securely:

### ✅ What's Protected
- `.env` files are in `.gitignore` and never committed
- Build folder is excluded from repository 
- API keys are only loaded from environment variables
- Graceful fallback when API key is missing

### 🚨 If You Expose an API Key
1. **Immediately regenerate** your Google Maps API key in Google Cloud Console
2. **Delete the exposed key** to prevent unauthorized usage
3. **Add domain restrictions** to your new API key
4. **Never commit** `.env` files or build folders

### 🛡️ Best Practices
- Always use GitHub Secrets for deployment
- Test locally with `.env` file (not committed)
- Monitor your Google Cloud Console for unusual API usage
- Set up billing alerts and quotas

### 📞 Need Help?
If you accidentally expose an API key:
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Delete or regenerate the compromised key immediately
3. Create a new key with proper restrictions
4. Update your GitHub Secrets

**Remember: Security is a shared responsibility!**
