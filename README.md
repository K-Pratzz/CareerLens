# 🚀 CareerLens – Job Dashboard

CareerLens is a modern React-based web application that helps users explore remote job opportunities, filter them based on preferences, and save jobs for later.

It is built with a clean UI, responsive layout, and essential frontend features like API integration, state management, and local storage.

---

## 🌐 Live Demo
(Add your deployed link here)

---

## 📌 Features

- 🔍 Search jobs by title  
- 📍 Filter jobs by location  
- 🔄 Sort jobs (A–Z / Z–A)  
- 💾 Save and remove jobs (stored in LocalStorage)  
- 🌙 Dark / Light mode toggle  
- 📱 Fully responsive design  
- ⚡ Fast and smooth UI  

---

## 🛠️ Tech Stack

- Frontend: React (Vite)  
- Routing: React Router DOM  
- State Management: useState, useEffect  
- API: Fetch API  
- Styling: CSS (global.css)  
- Storage: LocalStorage  

---

## 🌍 API Used

Remotive Jobs API  
https://remotive.com/api/remote-jobs

---

## 📁 Project Structure

src/ ├── components/ │     ├── Navbar.jsx │     ├── JobCard.jsx │ ├── pages/ │     ├── Jobs.jsx │     ├── Saved.jsx │ ├── services/ │     ├── jobApi.js │ ├── styles/ │     ├── global.css │ ├── App.jsx ├── main.jsx

---

## ⚙️ Installation & Setup

1. Clone the repository:
git clone 

2. Navigate to the project:
cd careerlens

3. Install dependencies:
npm install

4. Run the app:
npm run dev

---

## 💡 How It Works

- On load, the app fetches job data from the API  
- Users can search, filter, and sort jobs dynamically  
- Saved jobs are stored in LocalStorage and persist across sessions  
- Theme preference (dark/light) is also stored in LocalStorage  

---

## 🎯 Learning Outcomes

This project demonstrates:

- React component structure  
- API integration using Fetch  
- State management with Hooks  
- Conditional rendering  
- LocalStorage usage  
- Responsive UI design  

---

## 🚀 Future Improvements

- Infinite scrolling or pagination  
- Debounced search for better performance  
- Better UI animations  
- Job detail page  
- Authentication system  

---

## 👤 Author
Kumari Pratibha

---

## ⭐ Acknowledgements

- Remotive API for job data  
- React documentation and community
