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

![Screenshot 2025-02-16 062732](https://github.com/user-attachments/assets/20842e77-a385-4ce2-a5c0-487909bb69df)![Screenshot 2025-02-16 053027](https://github.com/user-attachments/assets/bdbf14ca-2aa5-4322-bb97-f7c0b0ebfea8)
![Screenshot 2025-02-16 063441](https://github.co![Screenshot 2025-02-16 062651](https://github.com/user-attachments/assets/a0d439b7-e8aa-4171-902f-2a8d2ea5a1f1)
![Screenshot 2025-02-16 053041](https://github.com/user-attachments/assets/684fa576-84fb-40cb-8e21-ff4078c3f902)
m/user-attachments/assets/d930a4a4-7efd-4ec5-ab3d-029e6386e57b)



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
