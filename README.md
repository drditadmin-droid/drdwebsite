# DRD Website

## Stack
- **Frontend**: HTML / CSS / JS → Vercel
- **Backend**: Node.js (Express/Fastify) → Render
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (JWT)
- **Storage**: Supabase Storage
- **Email**: Resend / Nodemailer

## Structure
```
drdwebsite/
├── frontend/
│   ├── index.html
│   ├── pages/
│   └── assets/
│       ├── css/
│       ├── js/
│       └── images/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       └── utils/
├── .gitignore
└── README.md
```

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
