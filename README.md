# Enterwell Quiz 4 Rejd

A modern and interactive Quiz Maker application built with React, designed to allow users to create, manage, and take quizzes. It features a user-friendly interface, robust data handling, and a slideshow-like quiz-taking experience.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher is required)
- [npm](https://www.npmjs.com/) (usually comes with Node.js) or [pnpm](https://pnpm.io/)

### Steps

1.  **Clone the repository:**

    `git clone https://github.com/branimirv/quiz.git`

    `cd enterwell-quiz`

2.  **Install dependencies:**

    `pnpm install`

3.  **Usage:**

    - Running the application
    - To start the development server locally:

      `pnpm run dev`

    - Building for production:

      `pnpm run build`

## Features

- **Create & Edit Quizzes**: Intuitive forms for adding and modifying quiz names and questions.
- **Question Recycling**: Reuse existing questions from previous quizzes to save time.
- **Interactive Quiz Slideshow**: Take quizzes one question at a time with a reveal answer button.
- **Shareable Quiz URLs**: Each quiz slideshow has a unique, shareable link.
- **Keyboard Navigation**: Navigate the slideshow using arrow keys, spacebar, and escape.
- **Local Storage Persistence**: All quiz data is mocked and saved locally in the browser.
- **Modern UI**: Built with Tailwind CSS and shadcn/ui for a clean and responsive design.
- **Optimized Performance**: Utilizes React's `useCallback` and `useMemo` for efficient rendering.
- **Robust Error Handling**: Implements Error Boundaries for graceful error recovery.
- **Form Validation**: Ensures data integrity with Zod and React Hook Form.

## Tech Stack

- **React 18** - Frontend UI library
- **TypeScript** - For type safety and improved code quality
- **TanStack Router** - Type-safe, file-based routing
- **TanStack Query** - Data fetching, caching, and synchronization for server state
- **Zod** - Schema declaration and validation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn/ui** - Reusable UI components built on Tailwind and Radix UI
- **Vite** - Fast development build tool
