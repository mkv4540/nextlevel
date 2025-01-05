// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';

// export default function Home() {
//   const courses = [
//     {
//       id: 1,
//       title: "Biology",
//       description: "Biology By Chaman Maam",
//       teacher: "Chaman Maam",
//       imgSrc: "/logo.png",
//     },
//     {
//       id: 2,
//       title: "Current Topic",
//       description: "Current topic by Barsha Maam",
//       teacher: "Barsha Maam",
//       imgSrc: "/logo.png",
//     },
//     {
//       id: 3,
//       title: "Ghanta Chakra",
//       description: "Ghanta Chakra by Meethi Maam",
//       teacher: "Meethi Maam",
//       imgSrc: "/logo.png",
//     },
//     {
//       id: 4,
//       title: "Current Affairs",
//       description: "Current Affairs Hot Topic by Donna Maam",
//       teacher: "Donna Maam",
//       imgSrc: "/logo.png",
//     },
//   ];

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
//       <h1 className="text-3xl font-bold mb-8">Class Notes</h1>
//       <h2 className="text-2xl font-bold mb-4">Learn and prepare for government exams with resources from our YouTube channel, NEXT LEVEL ACADEMY.</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
//         {courses.map((course) => (
//           <div
//             key={course.id}
//             className="group card hover:scale-105 transition-transform duration-300 bg-white shadow-lg rounded-lg overflow-hidden"
//           >
//             <Image
//               src={course.imgSrc}
//               alt={course.title}
//               width={300}
//               height={200}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold">{course.title}</h3>
//               <p className="text-gray-700 text-sm">{course.description}</p>
//               <p className="text-gray-600 text-xs mt-2">Teacher: {course.teacher}</p>
//               <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
//                 Visit Notes
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
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

  const courses = [
    {
      id: 1,
      title: "Biology",
      description: "Biology By Chaman Maam",
      teacher: "Chaman Maam",
      imgSrc: "/logo.png",
    },
    {
      id: 2,
      title: "Current Topic",
      description: "Current topic by Barsha Maam",
      teacher: "Barsha Maam",
      imgSrc: "/logo.png",
    },
    {
      id: 3,
      title: "Ghanta Chakra",
      description: "Ghanta Chakra by Meethi Maam",
      teacher: "Meethi Maam",
      imgSrc: "/logo.png",
    },
    {
      id: 4,
      title: "Current Affairs",
      description: "Current Affairs Hot Topic by Donna Maam",
      teacher: "Donna Maam",
      imgSrc: "/logo.png",
    },
  ];

  const handleNavigate = (id) => {
    router.push(`/courses/${id}`);
  };

  const handleNcertNavigate = (subject) => {
    router.push(`/ncert/${subject.toLowerCase()}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Study Material</h1>
      
      {/* NCERT Books Section */}
      <section id="ncert" className="w-full max-w-7xl px-8 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">NCERT Books</h2>
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
      </section>

      {/* Class Notes Section */}
      <section className="w-full max-w-7xl px-8">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Class Notes</h2>
        <p className="text-lg mb-8 text-gray-700">
          Learn and prepare for government exams with resources from our YouTube channel, NEXT LEVEL ACADEMY.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group card hover:scale-105 transition-transform duration-300 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <Image
                src={course.imgSrc}
                alt={course.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-gray-700 text-sm">{course.description}</p>
                <p className="text-gray-600 text-xs mt-2">Teacher: {course.teacher}</p>
                <button
                  onClick={() => handleNavigate(course.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Visit Notes
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

