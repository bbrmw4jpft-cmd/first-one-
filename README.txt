BloodConnect — Prototype (Hackathon)
====================================

What you have:
- index.html -> main page with search, donor listing, and emergency request modal
- styles.css -> basic styling
- app.js -> prototype functionality using simulated donor data

How this prototype works:
- It's a static site (no backend). Donors are simulated in app.js.
- Search by blood group and pincode, click "Request Now" to open emergency form.
- The form simulates sending a request and shows an ETA (for demo only).

How to run locally (fast):
1. Download and unzip the project folder.
2. Open index.html in your browser (double-click) — site will load.
3. Or run a simple static server:
   - If you have Python 3: `python3 -m http.server 8000` inside the folder, then open http://localhost:8000

How to deploy (Netlify drag & drop):
1. Go to https://app.netlify.com/drop
2. Drag the folder (the contents) into the browser window.
3. Netlify will deploy and give you a live link.

How to turn this prototype into a real app:
- Replace simulated donors with a backend (Firebase / Node + DB)
- Use Firebase Auth to verify donors and hospitals
- Use Storage or Cloudinary to store verification documents
- Integrate WhatsApp / SMS APIs for instant notifications
- Integrate delivery partners, ambulances, or blood banks for logistics
- Add admin dashboards for hospitals and district health officers

Good luck with your hackathon! If you want, I can:
- create a short slide deck for your pitch
- make a README for the judging demo
- modify the prototype to use Firebase (auth + Firestore) quickly
