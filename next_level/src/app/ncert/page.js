'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NcertBooks() {
  const router = useRouter();

  const ncertBooks = [
    {
      id: 1,
      subject: "History",
      description: "NCERT History textbooks from Class 6 to 12",
      imgSrc: "/history-book.png",
    },
    {
      id: 2,
      subject: "Geography",
      description: "NCERT Geography textbooks from Class 6 to 12",
      imgSrc: "/geography-book.png",
    },
    {
      id: 3,
      subject: "Science",
      description: "NCERT Science textbooks from Class 6 to 12",
      imgSrc: "/science-book.png",
    },
    {
      id: 4,
      subject: "Mathematics",
      description: "NCERT Mathematics textbooks from Class 6 to 12",
      imgSrc: "/math-book.png",
    },
  ];

  const handleNcertNavigate = (subject) => {
    router.push(`/ncert/${subject.toLowerCase()}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-24 pb-8">
      <div className="w-full max-w-7xl px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">NCERT Books</h1>
        <p className="text-lg mb-8 text-gray-700">
          Download NCERT textbooks chapter-wise for different subjects and classes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ncertBooks.map((book) => (
            <div
              key={book.id}
              className="group card hover:scale-105 transition-transform duration-300 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <Image
                src={book.imgSrc}
                alt={book.subject}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{book.subject}</h3>
                <p className="text-gray-700 text-sm mt-2">{book.description}</p>
                <button
                  onClick={() => handleNcertNavigate(book.subject)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 w-full"
                >
                  View Books
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 
