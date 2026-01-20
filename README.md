# Ayush-R-Portfolio
An interactive galaxy-themed portfolio website built with Next.js, React Three Fiber, and Three.js, featuring animated 3D visuals and GitHub project integration.


#  Galaxy Portfolio Website

A high-performance, animated **personal portfolio website** with an immersive **galaxy background**, built to showcase projects, skills, and profile in a visually engaging way.

This project combines modern web technologies with real-time 3D graphics to create a smooth, interactive, and professional portfolio experience.

---
Link

ayushr-portfolio.vercel.app

##  Features

* **Animated Galaxy Background**
  Real-time particle-based galaxy rendered using **Three.js** and **React Three Fiber**.

*  **Next.js App Router Architecture**
  Optimized for performance, SEO, and scalability.

*  **Glassmorphism UI**
  Clean, modern overlay interface with blur and transparency effects.

*  **GitHub Projects Integration**
  Automatically fetches and displays repositories from GitHub.

*  **Scroll-Based Camera Animation**
  Galaxy movement and camera travel mapped to user scroll for a cinematic feel.

*  **Responsive Design**
  Works smoothly across desktop, tablet, and mobile devices.

*  **Deployed on Vercel**
  Fast global CDN delivery and seamless CI/CD.

---

##  Tech Stack

### Core

* **Next.js**
* **React**
* **Three.js**
* **React Three Fiber**

### Styling

* **Tailwind CSS**
* Glassmorphism UI patterns

### APIs & Tools

* **GitHub REST API**
* **Vercel** (Hosting & Deployment)
* **Git & GitHub**

---

##  Project Structure

```
├── app/
│   ├── layout.js          # Global layout with persistent 3D canvas
│   ├── page.js            # Main page with scroll sections
│   └── globals.css        # Global styles and CSS variables
│
├── components/
│   ├── CanvasContainer.jsx  # R3F Canvas wrapper
│   ├── Galaxy.jsx           # Galaxy particle system
│   ├── Hero.jsx             # Hero section
│   ├── About.jsx            # About section
│   ├── Skills.jsx           # Skills display
│   ├── Projects.jsx         # GitHub projects fetch & display
│   └── Contact.jsx          # Contact section
│
├── lib/
│   └── github.js           # GitHub API fetch logic
│
├── public/
│   └── assets/             # Static assets (icons, images)
│
├── package.json
└── README.md
```

---

##  Getting Started (Local Setup)

###  Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

###  Install Dependencies

```bash
npm install
```

###  Run Development Server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

##  Environment Variables (Optional)

If using a GitHub Personal Access Token (recommended for higher rate limits):

Create a `.env.local` file:

```env
GITHUB_TOKEN=your_github_token_here
```

Add the same variable in:

```
Vercel Dashboard → Project Settings → Environment Variables
```

---

##  Verification & Testing

### Build Check

```bash
npm run build
```

### Lint Check

```bash
npm run lint
```

### Manual Testing

* Galaxy renders correctly
* Scroll triggers smooth camera movement
* All sections are visible
* GitHub projects load successfully
* Responsive on different screen sizes

---

##  Known Considerations

* Galaxy particle count is optimized for performance but may be reduced on low-end devices.
* Three.js components are **client-only** to avoid SSR issues.
* Scroll-based animations should be throttled for best performance.

---

##  Deployment

This project is deployed using **Vercel**.

To deploy your own version:

1. Push the project to GitHub
2. Import the repo into Vercel
3. Add environment variables (if any)
4. Click **Deploy**

Vercel will automatically rebuild and publish on every push.

---

##  Customization Ideas

* Add dark/light mode toggle
* Add project filtering
* Add blog section
* Add performance-based particle scaling
* Replace GitHub projects with curated case studies

---

##  Author

**Ayush R**
B.Tech Artificial Intelligence Student
Full-Stack Developer | Tech Enthusiast

* GitHub: [https://github.com/frettedmelodist2007-eng](https://github.com/frettedmelodist2007-eng)
* LinkedIn: [https://www.linkedin.com/in/ayush-r](https://www.linkedin.com/in/ayush-r)
* Instagram: [https://www.instagram.com/fretted_melodist](https://www.instagram.com/fretted_melodist)

---

##  License

This project is licensed under the **MIT License**.
Feel free to fork, modify, and build upon it.

---

