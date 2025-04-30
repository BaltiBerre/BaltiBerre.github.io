# Baltasar Berretta - Project Manager Portfolio

A minimalist, modern portfolio website showcasing project coordination skills and experience for a project management role at Etsy.

## Project Structure

```
baltiberre.github.io/
│
├── public/
│   ├── images/         # For your photo and any project screenshots
│   └── favicon.ico     # Site favicon
│
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Navbar.js
│   │   └── Footer.js
│   │
│   ├── pages/          # Main page components
│   │   ├── Home.js     # Landing page
│   │   ├── Experience.js
│   │   ├── Projects.js
│   │   └── Contact.js
│   │
│   ├── data/           # Data files to keep content separate from presentation
│   │   ├── experienceData.js
│   │   ├── projectsData.js
│   │   └── skillsData.js
│   │
│   ├── styles/         # CSS modules for styling
│   │   ├── Global.module.css
│   │   ├── Navbar.module.css
│   │   ├── Home.module.css
│   │   ├── Experience.module.css
│   │   ├── Projects.module.css
│   │   ├── Contact.module.css
│   │   └── Footer.module.css
│   │
│   ├── App.js          # Main app component
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
│
├── package.json
└── README.md
```

## Features

- Clean, minimalist design with responsive layout
- Smooth scrolling and animations
- Experience carousel with left/right navigation
- Projects showcase with detailed PM highlights
- Contact form with validation
- Modular code structure for easy expansion

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/baltiberre/baltiberre.github.io.git
cd baltiberre.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

5. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Customization

### Personal Information

- Update your personal details in the Home.js, Contact.js, and Footer.js files
- Add your photo to the public/images directory and update the reference in Home.js

### Experience and Projects

- Modify the data files in the src/data directory to update your experience and projects:
  - experienceData.js: Work experience and internships
  - projectsData.js: Portfolio projects with PM highlights
  - skillsData.js: Skills categorized by area

### Styling

- Global styles are in index.css and App.css
- Component-specific styles are in the styles directory
- Color scheme can be adjusted in index.css and individual component CSS files

## Adding New Sections

To add a new section to the portfolio:

1. Create a new component in the pages directory
2. Add corresponding CSS in the styles directory
3. Update the Navbar.js to include the new section
4. Add the section to App.js

## Technologies Used

- React.js
- CSS Modules
- Lucide React (for icons)
- GitHub Pages (for hosting)

## License

This project is open source and available under the MIT License.