export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100" style={{ textAlign: "center" }}>
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">
            Learn more about our mission, values, and the team behind our
            success.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            Our mission is to empower individuals with the tools and knowledge
            they need to achieve their goals and transform their lives. We
            strive to create innovative solutions that make a positive impact on
            the world.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We embrace creativity and innovation to build cutting-edge
                solutions that solve real-world problems.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We believe in doing the right thing, always, and holding
                ourselves accountable for our actions.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">
                We foster a strong sense of community and collaboration to
                achieve shared goals.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
          <p className="text-gray-700 text-lg">
            Our dedicated team is committed to excellence and driven by passion.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Replace with your team members */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="/public/avatar1.jpg" // Replace with your image
                alt="Team Member"
              />
              <h3 className="text-lg font-bold">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="/public/avatar2.jpg" // Replace with your image
                alt="Team Member"
              />
              <h3 className="text-lg font-bold">Jane Smith</h3>
              <p className="text-gray-600">CTO</p>
            </div>
            {/* Add more team members here */}
          </div>
        </section>
      </main>
    </div>
  );
}
