# Finance Tracking Frontend

This is the frontend for the finance_app project, built with [Next.js](https://nextjs.org) and [MUI](https://mui.com/).

## Features

- Dynamic pie chart analysis by year, month, category, and user
- Histogram of category sums (last 6 months)
- Proxy API requests to backend for analysis and data
- Editable chart labels and flexible chart creation/deletion
- Responsive UI with Material-UI components

## Getting Started

**Development:**
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production (Docker):**
This app is designed to run as part of the `finance_app` Docker Compose setup.  
See the main `finance_app` README for orchestration instructions.

## Editing

- Main page: `src/app/page.js`
- Analysis tab: `src/app/analysis/tab-0/tab0.js`
- API proxy: `/api/proxy/*` routes

## Environment

- Uses HTTPS in Docker (see Dockerfile and certs)
- Environment variables can be set via Docker Compose

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MUI Documentation](https://mui.com/)
- [Project Structure](../README.md) (main repo)

## Notes

- For backend API, ensure `finance_tracking_api` is running and accessible.
- Chart data is fetched from `/api/proxy/analysis/get_params` and `/api/proxy/analysis/get_pi_chart`.
- You can add, edit, and delete pie charts dynamically in the analysis tab.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
