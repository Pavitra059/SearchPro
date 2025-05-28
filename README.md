# 🔍 SearchPro

**SearchPro** is a beginner-friendly yet powerful React.js search interface that provides real-time search suggestions. It pulls data from a local JSON server (`db.json`) and highlights user search terms as they type. The app includes input debouncing, caching, and intuitive result prioritization (results that start with the search term appear first).

---

## 🚀 Features

- ✅ Live search with real-time suggestions
- ✅ Input debouncing for better performance
- ✅ Cache mechanism to reduce redundant filtering
- ✅ Prioritizes matches that **start with** the query
- ✅ Highlights matched keywords
- ✅ Built using functional components and React hooks

---

## 🧰 Technologies Used

- **React.js** (with Hooks)
- **CSS** (Basic styling)
- **json-server** (for mock API)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https: https://github.com/Pavitra059/SearchPro.git
cd searchpro
npm install
npm run dev => for frontend
json-server --watch db.json --port 4000 => for run db.json

