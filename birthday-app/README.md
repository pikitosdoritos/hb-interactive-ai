# Magical Birthday App ✨

A fully functional, interactive birthday greeting website designed for a 10-year-old girl. Built with HTML, CSS, and Vanilla JavaScript for maximum performance and easy deployment.

## Features
- **🎈 Pop-able Balloons**: Floating balloons that pop with a sound and confetti effect when clicked!
- **🎁 Interactive Gift**: Click to open a beautifully animated CSS gift box revealing a surprise message.
- **🎂 Blow out the Candles**: An animated cake with candles that can be "blown out" by clicking the button, triggering a smoke animation.
- **🌠 Make a Wish**: A fun input field for making a wish, which appears with a magical text reveal.
- **🎵 Background Music**: A toggle button for background music (using a happy placeholder tune from an open-source CDN).
- **⭐ Secret Easter Egg**: A hidden star in the bottom left corner triggers a massive firework confetti show!
- **📝 Editable Message**: The main greeting paragraph is fully editable by clicking on it, so you can customize the message before showing it!

## File Structure
- `index.html`: The main page structure and content.
- `style.css`: All the styling, variables (pastel colors), animations, and responsive design.
- `script.js`: The interactivity logic (confetti, audio generation, balloon spawning, click events).
- `vercel.json`: Configuration file for clean URL deployment on Vercel.

## How to Customize
1. **Background Music**: 
   Open `index.html` and look for the `<audio id="bg-music">` tag. Replace the `src` attribute with a link to your favorite MP3 file.
2. **Personal Message**: 
   You can edit the text inside `<p id="personal-message">` directly in the code, or literally just click the text while viewing the live website to edit it on the fly!

## 🚀 Easy Deployment Instructions

This project requires zero build steps! You can deploy it to a free host in less than 2 minutes.

### Option 1: Vercel (Recommended)
1. Go to [Vercel.com](https://vercel.com/) and sign up / log in.
2. You can either:
   - **Upload via Browser**: Go to your dashboard, click "Add New..." -> "Project". Under the "Import Third-Party Git Repository" there is usually an option to deploy a folder, or you can drag-and-drop the `birthday-app` folder directly into the Vercel dashboard.
   - **Upload via CLI**: Install Vercel CLI (`npm i -g vercel`), open your terminal in the `birthday-app` folder, and type `vercel`. Follow the prompts!
3. The included `vercel.json` ensures cache control and clean URLs.

### Option 2: Netlify
1. Go to [Netlify.com](https://netlify.com/) and sign up / log in.
2. In your "Team Overview" or "Sites" page, simply drag and drop the `birthday-app` folder into the designated "Drag and drop your site output folder here" area.
3. Your site will be live instantly! You can then customize the generated URL in the "Site Settings".

### Option 3: GitHub Pages
1. Create a new public repository on GitHub.
2. Upload these files to the repository.
3. Go to the repository "Settings" -> "Pages".
4. Under "Source", select the `main` branch and click Save.
5. In a few minutes, your site will be live at `https://[your-username].github.io/[repo-name]/`.

Enjoy the magic! ✨
