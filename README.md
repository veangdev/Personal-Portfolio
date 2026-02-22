# Modern Portfolio Website

A professional, responsive portfolio website built with Next.js 15, featuring a masculine aesthetic, dark/light mode toggle, smooth GSAP animations, and optimized performance.

## 🚀 Features

- **Modern Design**: Clean, professional layout with masculine aesthetic
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Smooth Animations**: GSAP-powered animations with scroll triggers
- **Responsive Design**: Optimized for all devices and screen sizes
- **Performance Optimized**: Next.js Image optimization, font optimization, and more
- **SEO Ready**: Proper meta tags and semantic HTML structure
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: GSAP with ScrollTrigger
- **Fonts**: Inter & JetBrains Mono (optimized with next/font)
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **TypeScript**: Full type safety

## 📁 Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with font optimization
│   └── page.tsx             # Main portfolio page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── header.tsx           # Navigation header with theme toggle
│   ├── hero.tsx             # Hero section with profile image
│   ├── about.tsx            # About section with highlights
│   ├── skills.tsx           # Skills showcase
│   ├── projects.tsx         # Featured and other projects
│   ├── contact.tsx          # Contact form and information
│   ├── footer.tsx           # Footer with social links
│   └── theme-provider.tsx   # Theme context provider
├── public/
│   └── (add your images here)
├── tailwind.config.ts       # Tailwind configuration
└── README.md               # This file
\`\`\`

## 🎨 Customization Guide

### 1. Replace Placeholder Images

Replace the placeholder images in the \`public/\` directory:

- **Profile Image**: Add your headshot as \`public/profile.jpg\` (400x400px recommended)
- **Project Images**: Add project screenshots as \`public/project-1.jpg\`, \`public/project-2.jpg\`, etc.

Update image paths in components:
\`\`\`tsx
// In components/hero.tsx
<Image
  src="/profile.jpg"  // Update this path
  alt="Your Name - Full Stack Developer"
  width={400}
  height={400}
  // ...
/>
\`\`\`

### 2. Update Personal Information

#### Hero Section (\`components/hero.tsx\`)
\`\`\`tsx
<h1 className="hero-title text-5xl md:text-7xl font-bold leading-tight">
  Hi, I'm{' '}
  <span className="gradient-text">Your Name</span>  {/* Update name */}
</h1>
<h2 className="hero-subtitle text-2xl md:text-3xl text-muted-foreground font-medium">
  Your Title  {/* Update title */}
</h2>
<p className="hero-description text-lg text-muted-foreground max-w-2xl leading-relaxed">
  Your personal description...  {/* Update description */}
</p>
\`\`\`

#### About Section (\`components/about.tsx\`)
- Update the journey description
- Modify stats (projects completed, years of experience, etc.)
- Customize highlights and personal traits

#### Skills Section (\`components/skills.tsx\`)
- Update skill categories and individual skills
- Add or remove skill categories as needed

#### Projects Section (\`components/projects.tsx\`)
- Replace project data with your actual projects
- Update project descriptions, technologies, and links
- Add more projects or modify the layout

### 3. Update Contact Information

#### Contact Section (\`components/contact.tsx\`)
\`\`\`tsx
const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'your-email@example.com',  // Update email
    href: 'mailto:your-email@example.com'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',  // Update phone
    href: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Your City, State',  // Update location
    href: '#'
  }
]
\`\`\`

#### Social Media Links
Update social links in \`components/hero.tsx\` and \`components/footer.tsx\`:
\`\`\`tsx
<a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
<a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
<a href="mailto:your-email@example.com">
\`\`\`

### 4. Customize Colors and Fonts

#### Colors (\`app/globals.css\`)
Modify CSS custom properties for light and dark themes:
\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Primary color */
  --chart-1: 12 76% 61%;          /* Accent color */
  /* ... other colors */
}
\`\`\`

#### Fonts (\`app/layout.tsx\`)
Change fonts by importing different Google Fonts:
\`\`\`tsx
import { Cute_Font as YourFont, Cormorant as YourMonoFont } from 'next/font/google'

const yourFont = YourFont({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
\`\`\`

#### Tailwind Configuration (\`tailwind.config.ts\`)
- Modify color palette
- Add custom animations
- Adjust spacing and sizing

### 5. SEO and Metadata

Update metadata in \`app/layout.tsx\`:
\`\`\`tsx
export const metadata: Metadata = {
  title: 'Your Name - Your Title',
  description: 'Your professional description...',
  keywords: 'your, relevant, keywords',
  authors: [{ name: 'Your Name' }],
  // ... other metadata
}
\`\`\`

## 📧 Contact Form Setup

The contact form is currently set up for demonstration. To make it functional:

### Option 1: Next.js API Routes
Create \`app/api/contact/route.ts\`:
\`\`\`tsx
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Process form data
  // Send email using nodemailer, SendGrid, etc.
  
  return NextResponse.json({ success: true })
}
\`\`\`

### Option 2: Formspree Integration
1. Sign up at [Formspree](https://formspree.io/)
2. Update form action in \`components/contact.tsx\`:
\`\`\`tsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
\`\`\`

### Option 3: EmailJS
1. Set up EmailJS account
2. Install EmailJS: \`npm install @emailjs/browser\`
3. Integrate EmailJS in the contact form component

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Deploy**:
   \`\`\`bash
   vercel --prod
   \`\`\`

3. **Or connect GitHub repository**:
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Auto-deploy on every push

### Deploy to Netlify

1. Build the project:
   \`\`\`bash
   npm run build
   \`\`\`

2. Deploy the \`out\` folder to Netlify

### Environment Variables

If using external services, add environment variables:
\`\`\`bash
# For email services
SMTP_HOST=your-smtp-host
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password

# For analytics (optional)
GOOGLE_ANALYTICS_ID=your-ga-id

# For form services
FORMSPREE_ENDPOINT=your-formspree-endpoint
EMAILJS_SERVICE_ID=your-emailjs-service-id
EMAILJS_TEMPLATE_ID=your-emailjs-template-id
EMAILJS_PUBLIC_KEY=your-emailjs-public-key
\`\`\`

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/yourusername/portfolio
   cd portfolio
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open browser**: Navigate to \`http://localhost:3000\`

### Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run type-check\` - Run TypeScript checks

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Test responsiveness using browser dev tools or physical devices.

## ⚡ Performance Optimization

- **Next.js Image**: Automatic image optimization and lazy loading
- **Font Optimization**: next/font for optimal font loading
- **Code Splitting**: Automatic code splitting with Next.js
- **Static Generation**: Pre-rendered pages for better performance
- **Minification**: Automatic CSS and JS minification

### Performance Checklist

- [ ] Optimize images (WebP format, proper sizing)
- [ ] Minimize bundle size
- [ ] Enable compression (gzip/brotli)
- [ ] Use CDN for static assets
- [ ] Implement proper caching headers

## 🎯 SEO Optimization

- **Meta Tags**: Comprehensive meta tags in layout
- **Structured Data**: Add JSON-LD structured data
- **Sitemap**: Generate sitemap.xml
- **Robots.txt**: Configure robots.txt
- **Open Graph**: Social media preview optimization

## 🧪 Testing

### Manual Testing Checklist

- [ ] All navigation links work
- [ ] Theme toggle functions properly
- [ ] Animations trigger correctly
- [ ] Form validation works
- [ ] Responsive design on all devices
- [ ] Cross-browser compatibility
- [ ] Accessibility with screen readers

### Automated Testing (Optional)

Add testing frameworks:
\`\`\`bash
# Jest for unit testing
npm install --save-dev jest @testing-library/react

# Cypress for e2e testing  
npm install --save-dev cypress

# Lighthouse CI for performance
npm install --save-dev @lhci/cli
\`\`\`

## 🔒 Security

- **Content Security Policy**: Configure CSP headers
- **HTTPS**: Always use HTTPS in production
- **Environment Variables**: Never commit sensitive data
- **Dependencies**: Regularly update dependencies
- **Input Validation**: Validate all form inputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For hosting and deployment
- **shadcn/ui** - For beautiful UI components
- **GSAP** - For smooth animations
- **Tailwind CSS** - For utility-first styling

## 📞 Support

If you have questions or need help customizing your portfolio:

- **Email**: your-email@example.com
- **GitHub Issues**: Create an issue in the repository
- **Documentation**: Check Next.js and component documentation

---

**Happy coding! 🚀**

*Remember to star ⭐ the repository if you found it helpful!*
\`\`\`

Now let's add the missing scripts directory for additional functionality:
