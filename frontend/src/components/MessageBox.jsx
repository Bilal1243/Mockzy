import { XCircle, CheckCircle } from 'lucide-react';

export default function MessageBox({ message, type = 'error' }) {
  const isError = type === 'error';

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-4 text-sm 
        ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}
      `}
    >
      {isError ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
      <span>{message}</span>
    </div>
  );
}
