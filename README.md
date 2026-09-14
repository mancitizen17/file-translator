# Serverless File Translator — Live Demo

This is a lightweight, Vercel-hosted demo of the architecture and idea behind
[serverless-file-processor](https://github.com/mancitizen17/serverless-file-processor),
which is built on **AWS S3 + Lambda + AWS Translate**.

Vercel doesn't run AWS Lambda or provide S3 buckets, so this demo reimplements
the same core idea — upload/paste text, translate it — as a Vercel serverless
function calling a free public translation API. It exists purely to give
recruiters a clickable, working link. The "real" architecture (event-driven,
AWS-native, production-shaped) lives in the original repo.

## How to deploy this yourself (free)

1. Create a new GitHub repo (e.g. `file-translator-demo`) and push this folder to it.
2. Go to https://vercel.com and sign up/log in with your GitHub account.
3. Click **Add New → Project**, select your new repo, and click **Deploy**.
   No configuration needed — Vercel auto-detects the `api/` folder as
   serverless functions and `public/` as static files.
4. After ~30 seconds you'll get a live URL like `your-project.vercel.app`.

## What to put on your resume

- **Project:** Serverless File Translator (AWS S3, Lambda, Translate)
- **Live demo:** your-project.vercel.app *(implementation note: demo uses a
  lightweight serverless function; full AWS architecture in repo README)*
- **Code:** link to the original GitHub repo
