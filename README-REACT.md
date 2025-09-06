# $FUND Landing Page

A modern, responsive React landing page for $FUND, a pre-launch crypto investment token.

## 🚀 Features

- **Modern Design**: Clean, minimal crypto-finance aesthetic
- **Responsive**: Fully responsive design for all devices
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **React**: Modern functional components with hooks
- **Animations**: Smooth hover effects and transitions
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🎨 Design

- **Color Scheme**: Dark background (navy/charcoal) + accent gradient (teal → purple) + white text
- **Typography**: Inter font family for modern, clean look
- **Layout**: Responsive grid layouts with rounded cards and soft shadows
- **Animations**: Fade-in, hover scale, and smooth transitions

## 📱 Sections

1. **Hero Section** - Main headline and CTA
2. **Problem & Solution** - Explains the investment challenge and $FUND's solution
3. **How It Works** - 3-step process explanation
4. **Key Benefits** - Feature highlights with checkmarks
5. **Tokenomics Preview** - Token details and example investment
6. **Roadmap** - 3-phase development timeline
7. **Email Capture** - Waitlist signup form
8. **Footer** - Links, disclaimer, and contact info

## 🛠️ Tech Stack

- **React 18** - Modern React with functional components
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
registration-website/
├── src/
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # React entry point
│   └── index.css        # TailwindCSS imports and custom styles
├── LandingPage.jsx      # Main landing page component
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # TailwindCSS configuration
├── postcss.config.js    # PostCSS configuration
└── README-REACT.md      # This file
```

## 🎯 Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`
- Flexible grid layouts
- Optimized for all screen sizes

### Animations
- Hover effects on cards and buttons
- Smooth transitions
- Fade-in animations
- Scale transforms

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      navy: {
        900: '#0f172a', // Custom navy color
      },
    },
  },
}
```

### Animations
Add custom animations in `tailwind.config.js`:

```javascript
animation: {
  'fade-in': 'fadeIn 0.6s ease-in-out',
  'slide-up': 'slideUp 0.6s ease-out',
}
```

## 📝 Content Updates

To update the content, edit the `LandingPage.jsx` file. All text content is clearly marked with comments for easy editing.

## 🚀 Deployment

The project builds to static files that can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload `dist` contents

## 📄 License

MIT License - feel free to use this template for your projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ using React and TailwindCSS
