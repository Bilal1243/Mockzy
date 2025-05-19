import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ShieldCheck,
  CalendarDays,
  Users,
  BarChart3,
  Megaphone,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

const features = [
  {
    title: "Live Mock Interviews",
    description:
      "Simulate real interviews with timers, feedback, and department-specific questions.",
    img: "https://cdn-icons-png.flaticon.com/512/476/476863.png",
  },
  {
    title: "Role-Based Dashboards",
    description:
      "Separate dashboards for students, faculties, and admins with tools tailored to each role.",
    img: "https://cdn-icons-png.flaticon.com/512/9068/9068062.png",
  },
  {
    title: "Real-Time Notifications",
    description:
      "Get notified when interviews are scheduled or feedback is submitted.",
    img: "https://cdn-icons-png.flaticon.com/512/10410/10410231.png",
  },
  {
    title: "Department-Wise Question Management",
    description:
      "Faculties can add, edit, and review interview questions by department.",
    img: "https://cdn-icons-png.flaticon.com/512/4712/4712000.png",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const techList = [
  "React",
  "Node.js",
  "MongoDB",
  "Express.js",
  "Razorpay",
  "Framer Motion",
  "Tailwind CSS",
  "Redux",
  "JWT",
  "Cloudinary",
  "Socket.IO",
];

const HomePage = () => {
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const startAnimation = () => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
      },
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    controls.stop(); // pause scrolling
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    startAnimation(); // resume scrolling
  };

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 text-gray-800 overflow-x-hidden">
      {" "}
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <motion.h1
          className="text-5xl font-bold mb-4 text-black"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Welcome to Mockzy
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Empowering students through realistic mock interviews, faculty-guided
          evaluations, and an organized admin system.
        </motion.p>
        <motion.div
          className="flex gap-4 flex-wrap justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100"
          >
            Register
          </Link>
        </motion.div>
      </section>
      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Platform Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-6 bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                variants={fadeIn}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Admin Plan Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Create your first organization
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Get complete control over Mockzy with an{" "}
            <span className="font-semibold text-blue-700">Admin account</span>.
            Just pay <span className="font-bold text-blue-600">₹499</span> to
            unlock exclusive features and manage your entire ecosystem.
          </motion.p>

          <motion.div
            className="bg-white p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              Key Admin Features
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div className="flex gap-4 items-start">
                <CalendarDays className="text-blue-600 w-6 h-6 mt-1" />
                <p>
                  Schedule and manage mock interview events with full date
                  control
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <ShieldCheck className="text-blue-600 w-6 h-6 mt-1" />
                <p>Verify and approve student and faculty accounts securely</p>
              </div>
              <div className="flex gap-4 items-start">
                <Users className="text-blue-600 w-6 h-6 mt-1" />
                <p>Oversee user activity across all departments efficiently</p>
              </div>
              <div className="flex gap-4 items-start">
                <BarChart3 className="text-blue-600 w-6 h-6 mt-1" />
                <p>View performance reports and analytics from interviews</p>
              </div>
              <div className="flex gap-4 items-start">
                <Megaphone className="text-blue-600 w-6 h-6 mt-1" />
                <p>Broadcast platform-wide announcements and alerts</p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/register"
                className="inline-block bg-black text-white px-8 py-3 rounded-xl text-lg font-medium shadow-md hover:bg-gray-800 transition"
              >
                Register as Admin – ₹499
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Built with Trusted Technologies
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
            Secure, scalable, and modern — our platform uses battle-tested tools
            to ensure reliability.
          </p>
          <div className="overflow-hidden relative">
            <motion.div
              className="flex gap-8 w-max mb-3"
              animate={controls}
              onMouseLeave={handleMouseLeave}
            >
              {[...techList, ...techList, ...techList].map((tech, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={`px-4 py-2 rounded-xl shadow text-sm font-medium transition-all duration-300 cursor-default
              ${
                hoveredIndex === null
                  ? "text-gray-800 bg-white"
                  : hoveredIndex === index
                  ? "text-black bg-white z-10 scale-105"
                  : "blur-sm opacity-40"
              }
            `}
                >
                  {tech}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Need Help?
            </h2>
            <p className="text-gray-600 text-lg">
              Our support team is here to assist you. Fill out the form and
              we’ll get back to you shortly.
            </p>
          </div>

          <form className="bg-gray-50 p-8 rounded-2xl shadow-lg space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                placeholder="Your Message"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-h-[150px]"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-xl shadow transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Mockzy. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
