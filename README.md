# QR Code Generator

Serverless QR code generator with:

- React + Vite frontend
- Python AWS Lambda backend

## Folder Structure

qr-generator-project/
├── backend/ ← Lambda function + dependencies
├── frontend/ ← React/Vite application
└── README.md

## Quick Start

### Backend (Lambda)

1. `cd backend`
2. `pip install -r requirements.txt -t ./package`
3. `cd package && zip -r ../lambda.zip . && cd .. && zip -g lambda.zip lambda_function.py`
4. Upload `lambda.zip` to new Lambda function (Python 3.12)
5. Enable Function URL (Auth type: NONE)

### Frontend

1. `cd frontend`
2. `npm install`
3. `cp .env.example .env`
4. Edit `.env` → add your Lambda Function URL
5. `npm run dev` ← local development
6. `npm run build` ← production build
7. Deploy `dist/` to AWS Amplify / S3+CloudFront
