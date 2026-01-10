import { Button } from "@/components/ui/button";
import { useQuizzes } from "@/lib/hooks/useQuizzes";

function App() {
  const { data: quizzes, isLoading, error } = useQuizzes();

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex-col items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-[880px] m-auto">
          <h1 className="text-3xl font-bold text-gray-800">
            Enterwell Quiz 4 Rejd
          </h1>
          <span className="block text-xs text-gray-500 text-right w-full">
            by Branimir
          </span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-[880px] mt-4 m-auto">
          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-semibold mb-2">Quizzes</h2>
            {isLoading && <p className="text-blue-600">Loading quizzes...</p>}
            {error && <p className="text-red-600">Error: {error.message}</p>}
            {quizzes && (
              <p className="text-green-600">Found {quizzes.length} quizzes</p>
            )}
            <Button>Click me</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
