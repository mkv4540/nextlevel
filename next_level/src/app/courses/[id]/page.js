'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function CoursePage() {
  const { id } = useParams();

  const courses = [
    {
      id: 1,
      title: "Biology",
      description: "Biology By Chaman Maam",
      features: ["100% Quality Education", "India's Top Teacher", "Live and Recorded Lectures"],
      teacher: "Chaman Maam",
      imgSrc: "/logo.png",
      downloadUrl: "https://nextlevel-classnotes.s3.ap-south-1.amazonaws.com/biology-by-chaman-maam/DBMS+Unit+3+Decode+.pdf",
    },
    {
      id: 2,
      title: "Current Topic",
      description: "Current topic by Barsha Maam",
      features: ["100% Quality Education", "India's Top Teacher", "Live and Recorded Lectures"],
      teacher: "Barsha Maam",
      imgSrc: "/logo.png",
      downloadUrl: "https://nextlevel-classnotes.s3.ap-south-1.amazonaws.com/biology-by-chaman-maam/DBMS+Unit+3+Decode+.pdf",
    },
    {
      id: 3,
      title: "Ghanta Chakra",
      description: "Ghanta Chakra by Meethi Maam",
      features: ["100% Quality Education", "India's Top Teacher", "Live and Recorded Lectures"],
      teacher: "Meethi Maam",
      imgSrc: "/logo.png",
      downloadUrl: "https://nextlevel-classnotes.s3.ap-south-1.amazonaws.com/biology-by-chaman-maam/DBMS+Unit+3+Decode+.pdf",
    },
    {
      id: 4,
      title: "Current Affairs",
      description: "Current Affairs Hot Topic by Donna Maam",
      features: ["100% Quality Education", "India's Top Teacher", "Live and Recorded Lectures"],
      teacher: "Donna Maam",
      imgSrc: "/logo.png",
      downloadUrl: "https://nextlevel-classnotes.s3.ap-south-1.amazonaws.com/biology-by-chaman-maam/DBMS+Unit+3+Decode+.pdf",
    },
  ];

  const course = courses.find((course) => course.id === parseInt(id));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <main className=" text-black min-h-screen py-8 px-4 bg-cyan-100">
      <div className="max-w-8xl mx-auto bg-white ">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 m-20">
            <h1 className="text-4xl font-bold ">{course.title}</h1>
            <p className="text-lg font-semibold">{course.description}</p>
            <ul className="space-y-2 text-sm">
              {course.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span> {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src={course.imgSrc}
              alt={course.title}
              width={300}
              height={200}
              className="rounded-lg shadow-md m-20"
            />
          </div>
        </div>

        {/* Video & Additional Sections */}
        <div className="mt-12">
          <div className="border-t border-gray-300 p-4 flex items-center justify-between">
            <h3 className="font-semibold text-lg">Download All Notes</h3>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
              onClick={() => window.open(course.downloadUrl, '_blank')}
            >
              Download Now
            </button>
          </div>
          <div className="bg-white text-black mt-4 rounded-lg shadow-md">
            <div className="p-4">
              <h3 className="font-semibold text-lg">Syllabus Overview</h3>
              <p className="text-sm text-gray-600">11 Lecture</p>
            </div>
            <div className="border-t border-gray-300 p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Lecture 1 notes -</h3>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
                onClick={() => window.open(course.downloadUrl, '_blank')}
              >
                Open Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

