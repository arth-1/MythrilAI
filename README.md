# Mythril AI

Mythril AI is a startup advisor companion that provides:
- **AI Services & Chatbot**: Get expert startup advice with conversational AI.
- **CSV Data Visualization**: Easily visualize and interpret your data.
- **Image Generation (Future)**: Generate images for creative insights.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, ShadCn UI, Radix UI, Lucide React
- **Backend**: Next.js API routes, Prisma ORM (with Accelerate extension)
- **Database**: PostgreSQL (via Prisma)
- **Authentication**: Clerk
- **AI/ML Integration**: Hugging Face (Deepseek & Stable-Diffusion)
- **State Management**: Zustand
- **Forms & Validations**: React Hook Form, Zod, Hookform Resolvers
- **Data Processing**: PapaParse, XLSX
- **Charting & Visualization**: Chart.js, Recharts, React-Chartjs-2
- **Utilities**: Axios, Typewriter Effect, Clsx
- **Linting & Type Safety**: ESLint, TypeScript

## Screenshots

![Screenshot 2025-02-16 053027](https://github.com/user-attachments/assets/bf8ae933-320c-4bb0-b97c-4cc47d757035)
![Screenshot 2025-02-16 063441](https://github.com/user-attachments/assets/0fa65794-061e-4b57-a6da-d280b0bcb4d9)
![Screenshot 2025-02-16 062732](https://github.com/user-attachments/assets/cac423d9-6247-4dbd-83f1-f772e865bd16)
![Screenshot 2025-02-16 062651](https://github.com/user-attachments/assets/29454250-4370-4a8c-81e7-121a574585c5)
![Screenshot 2025-02-16 053041](https://github.com/user-attachments/assets/27bd1b0c-02f5-48a8-98ad-22957369a638)



## Getting Started

To run AI-SaaS locally, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/arth-1/MythrilAI.git
cd ai-saas
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
```

3. **Configure environment variables**:

To ensure proper functionality, set up environment variables for API keys and other sensitive information. Create a `.env` file in the root directory and populate it with the necessary variables. For reference, consult the `.env.example` file for the required variables.

4. **Run the application**:

```bash
npm run dev
# or
yarn dev
```

The application should now be running locally at `http://localhost:3000`.

## Deployment

AI-SaaS can be deployed to various hosting platforms that support Next.js applications. Before deployment, make sure you have configured the necessary environment variables for production.

## Contributions

Contributions to AI-SaaS are highly appreciated! If you encounter any bugs or have suggestions for new features, please feel free to open an issue or submit a pull request.

When contributing, adhere to the existing code style and include comprehensive test cases for new features.
