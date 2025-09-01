# SEO Audit Frontend

A modern React dashboard built with **Vite, React-Router v6, Material-UI (MUI) & Tailwind CSS** that consumes the **SEO Audit Backend** REST API.  
Users can register/login, run PageSpeed & SERPStack audits, and view live analytics.

---

## 🚀 Quick Start

```bash
# 1. Clone & install
git clone https://github.com/Corv0id/seo-frontend.git
cd seo-frontend
npm install

# 2. Start dev server
npm run dev

## 🛠️ Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Bundler     | Vite                          |
| Framework   | React 18                      |
| Routing     | React-Router v6               |
| UI Library  | Material-UI (MUI v5)          |
| Styling     | Tailwind CSS                  |
| Icons       | React-Icons (Fa, Md)          |
| Auth        | JWT via localStorage          |
| HTTP        | Fetch API                     |

## 📦 Scripts

| Command            | Action                              |
|--------------------|-------------------------------------|
| `npm run dev`      | Start Vite dev server               |
| `npm run build`    | Build for production                |
| `npm run preview`  | Preview production build locally    |



## 🧩 Pages & Features

| Page           | Route            | Features                                             |
|----------------|------------------|------------------------------------------------------|
| **Login**      | `/login`         | JWT login / register                                 |
| **Dashboard**  | `/`              | Live stats, 7-day chart, audit counts                |
| **Audits**     | `/audits`        | Paginated table with PageSpeed & SERPStack results   |
| **Create Audit**| `/create-audit` | Domain + type form (pagespeed / serpstack)           |
| **Profile**    | `/profile`       | User details & logout                                |