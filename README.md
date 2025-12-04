# Modern Portfolio Landing Page

A stunning, modern portfolio landing page built with **Next.js 15**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**. Features smooth scrolling navigation, beautiful animations, and comprehensive SEO optimization.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat&logo=tailwind-css)

## ✨ Features

- 🎨 **Modern Design**: Dark theme with glassmorphism, vibrant gradients, and premium aesthetics
- 🎯 **Smooth Scrolling**: Native CSS smooth scroll + JavaScript navigation with active section tracking
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- 🎭 **Animations**: Scroll-triggered animations and micro-interactions using Framer Motion
- 🔍 **SEO Optimized**: Comprehensive metadata, Open Graph, Twitter cards, and semantic HTML
- ⚡ **Performance**: Built with Next.js 16 and Turbopack for lightning-fast development
- 🎨 **Customizable**: Easy-to-modify design system with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository (or use this existing project)
cd galactic-event

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
├── app/
│   ├── globals.css          # Global styles with smooth scroll
│   ├── layout.tsx            # Root layout with SEO metadata
│   └── page.tsx              # Main page
├── components/
│   ├── Navigation.tsx        # Smooth scroll navigation
│   ├── Hero.tsx              # Hero section
│   ├── About.tsx             # About section
│   ├── Skills.tsx            # Skills showcase
│   ├── Projects.tsx          # Projects grid
│   └── Contact.tsx           # Contact section
├── tailwind.config.ts        # Tailwind customization
└── package.json              # Dependencies
```

## 🎨 Sections

1. **Hero**: Animated introduction with rotating roles and CTA buttons
2. **About**: Professional background with animated stats
3. **Skills**: Tech stack showcase with proficiency levels
4. **Projects**: Featured projects with hover effects
5. **Contact**: Contact information and social links

## 🔧 Customization

### Update Personal Information

1. **Name & Description**: Edit `components/Hero.tsx` (line 62)
2. **About Text**: Update `components/About.tsx` (lines 48-62)
3. **Contact Info**: Modify `components/Contact.tsx` (lines 9-27)
4. **SEO Metadata**: Update `app/layout.tsx` (lines 14-73)

### Add Your Projects

Edit `components/Projects.tsx` (lines 7-67):
- Replace placeholder projects with your actual work
- Update titles, descriptions, and tech tags
- Add real GitHub and demo URLs

### Customize Skills

Modify `components/Skills.tsx` (lines 6-70):
- Adjust proficiency levels
- Add or remove skills
- Update categories

### Change Colors

Edit `tailwind.config.ts`:
- Update color palette (lines 12-24)
- Modify gradients (lines 86-90)

## 🌟 Tech Stack

- **Framework**: Next.js 16.0.3
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.x
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Performance

- ⚡ Next.js App Router for optimal performance
- 🎨 CSS-in-JS with Tailwind for small bundle sizes
- 📦 Automatic code splitting
- 🖼️ Optimized fonts with next/font
- 🚀 Fast refresh for instant updates

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

- **Email**: your@email.com
- **LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com)
- **GitHub**: [github.com/yourusername](https://github.com)

---

Built with ❤️ using Next.js and Tailwind CSS
