# Findyo 🐾

Findyo is a pet-friendly travel assistant that helps pet owners find accommodations, veterinary services, and travel resources for seamless adventures with their furry companions.

## Purpose

- **Pet Travel Planning**: Find pet-friendly hotels, restaurants, and activities
- **Emergency Veterinary Services**: Locate nearby vets and pet hospitals during travel
- **Travel Tips & Guidance**: Get expert advice for traveling with pets
- **Interactive Chat Support**: AI-powered assistance for all your pet travel questions

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Modern CSS with CSS Variables, Custom Components
- **Mapping**: Google Maps JavaScript API
- **Fonts**: Plus Jakarta Sans, Inter
- **Deployment**: GitHub Pages via GitHub Actions

## Features

- **AI Chat Interface**: Intelligent pet travel assistant with quick action buttons
- **Interactive Map**: Find pet-friendly services with color-coded markers
- **Travel Tips Library**: Comprehensive tips organized by categories
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Responsive Design**: The application is designed to be mobile-friendly and accessible.

## Installation

To get started with the HopeFinder project, follow these steps:

## Installation & Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd findyo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your Google Maps API key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Fork/Clone** this repository to your GitHub account

2. **Add your Google Maps API Key** as a GitHub Secret:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `REACT_APP_GOOGLE_MAPS_API_KEY`
   - Value: Your actual Google Maps API key

3. **Update package.json homepage**:
   - Replace `yourusername` in the homepage URL with your GitHub username
   - `"homepage": "https://yourusername.github.io/findyo"`

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (this will be created automatically by the action)

5. **Push to main/master branch** - the deployment will happen automatically!

### Local Development with Environment Variables

1. Copy `.env.example` to `.env`
2. Add your Google Maps API key
3. The app will work fully with maps integration

### Production Deployment

- The app gracefully handles missing API keys by showing a placeholder
- All sensitive information is kept in GitHub Secrets
- Automatic builds and deployments via GitHub Actions

## Usage

- **Chat with Findyo**: Get personalized pet travel assistance
- **Find Services**: Use quick buttons to find hotels, vets, or get travel tips
- **Interactive Map**: Explore pet-friendly locations (requires API key)
- **Travel Tips**: Browse categorized travel advice for pets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is a non-commercial public-good prototype. Please respect the purpose and intent of the application when using or modifying the code.