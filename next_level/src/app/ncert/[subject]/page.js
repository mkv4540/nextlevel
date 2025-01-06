'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function NcertSubject() {
  const params = useParams();
  const subject = params.subject;

  const classes = [6, 7, 8, 9, 10, 11, 12];

  // Expanded chapter structure for all classes
  const chapters = {
    6: [
      { id: 1, title: "Chapter 1: Introduction", pdfUrl: "https://ncert-notes-nextlevel.s3.ap-south-1.amazonaws.com/Geography/class6-chapter1" },
      { id: 2, title: "Chapter 2: Basic Concepts", pdfUrl: `https://ncert-notes-nextlevel.s3.ap-south-1.amazonaws.com/${subject}/class6-chapter1` },
      { id: 3, title: "Chapter 3: Advanced Topics", pdfUrl: "/pdfs/class6/chapter3.pdf" },
    ],
    7: [
      { id: 1, title: "Chapter 1: Fundamentals", pdfUrl: "/pdfs/class7/chapter1.pdf" },
      { id: 2, title: "Chapter 2: Core Concepts", pdfUrl: "/pdfs/class7/chapter2.pdf" },
      { id: 3, title: "Chapter 3: Key Topics", pdfUrl: "/pdfs/class7/chapter3.pdf" },
    ],
    8: [
      { id: 1, title: "Chapter 1: Basic Principles", pdfUrl: "/pdfs/class8/chapter1.pdf" },
      { id: 2, title: "Chapter 2: Main Concepts", pdfUrl: "/pdfs/class8/chapter2.pdf" },
      { id: 3, title: "Chapter 3: Important Topics", pdfUrl: "/pdfs/class8/chapter3.pdf" },
    ],
    9: [
      { id: 1, title: "Chapter 1: Foundation", pdfUrl: "/pdfs/class9/chapter1.pdf" },
      { id: 2, title: "Chapter 2: Essential Topics", pdfUrl: "/pdfs/class9/chapter2.pdf" },
      { id: 3, title: "Chapter 3: Key Concepts", pdfUrl: "/pdfs/class9/chapter3.pdf" },
    ],
    10: [
      { id: 1, title: "Chapter 1: Core Topics", pdfUrl: "/pdfs/class10/chapter1.pdf" },
      { id: 2, title: "Chapter 2: Major Concepts", pdfUrl: "/pdfs/class10/chapter2.pdf" },
      { id: 3, title: "Chapter 3: Advanced Studies", pdfUrl: "/pdfs/class10/chapter3.pdf" },
    ],
    11: [
      { id: 1, title: "Chapter 1: Basic Theory", pdfUrl: "/pdfs/class11/chapter1.pdf" },
      { id: 2, title: "Chapter 2: Advanced Theory", pdfUrl: "/pdfs/class11/chapter2.pdf" },
      { id: 3, title: "Chapter 3: Complex Topics", pdfUrl: "/pdfs/class11/chapter3.pdf" },
    ],
    12: [
      { id: 1, title: "Chapter 1: Foundation Topics", pdfUrl: "/pdfs/class12/chapter1.pdf" },
      { id: 2, title: "Chapter 2: Advanced Topics", pdfUrl: "/pdfs/class12/chapter2.pdf" },
      { id: 3, title: "Chapter 3: Final Topics", pdfUrl: "/pdfs/class12/chapter3.pdf" },
    ],
  };

  const [selectedClass, setSelectedClass] = useState(null);

  const handleDownload = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Next Level Academy
            </Link>
            <Link href="/studymaterial#ncert" className="text-gray-600 hover:text-gray-800">
              NCERT Books
            </Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-gray-100 py-8 px-4 pt-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 capitalize">
            NCERT {subject} Books
          </h1>

          {/* Class Selection */}
          <div className="mb-6 bg-white rounded-lg p-4 shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Select Class</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-4">
              {classes.map((classNum) => (
                <button
                  key={classNum}
                  onClick={() => setSelectedClass(classNum)}
                  className={`p-2 md:p-4 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
                    selectedClass === classNum
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:shadow-md border border-gray-200'
                  }`}
                >
                  Class {classNum}
                </button>
              ))}
            </div>
          </div>

          {/* Chapter List */}
          {selectedClass && chapters[selectedClass] && (
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
                Class {selectedClass} Chapters
              </h2>
              <div className="space-y-3">
                {chapters[selectedClass].map((chapter) => (
                  <div
                    key={chapter.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 gap-2"
                  >
                    <span className="text-gray-700 font-medium text-sm md:text-base">{chapter.title}</span>
                    <button
                      onClick={() => handleDownload(chapter.pdfUrl)}
                      className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
} 
