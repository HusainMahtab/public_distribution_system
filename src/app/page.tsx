"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaInstagram, FaNodeJs } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { TbBrandNextjs } from "react-icons/tb";
import { IoLogoReact } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import Link from "next/link";


function Home() {
  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/HusainMahtab?tab=repositories",
      color: "hover:text-gray-800",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/mahtab-husain-a4a4b1270/",
      color: "hover:text-blue-600",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/mahtab.husain.1401/",
      color: "hover:text-pink-600",
    },
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/mahtab.husain.1401/",
      color: "hover:text-blue-700",
    },
  ];
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 ">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Smart Distribution{" "}
              <span className="text-indigo-600">Management</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              Streamline your distribution process with our powerful card-based
              management system. Perfect for tracking, organizing, and
              optimizing your distribution network.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href={"/distributions"}
                className="bg-black px-4 py-2 rounded-lg text-white text-lg"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">
                    Distribution Card
                  </h3>
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Card Holder</span>
                    <span className="font-medium">John Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Card Number</span>
                    <span className="font-mono">•••• •••• •••• 1234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Serial Number</span>
                    <span className="font-mono">SN-789456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Unit</span>
                    <span className="font-medium">25</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              About Developer
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Content Container */}
          <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-20">
            {/* Image - Mobile & Desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/3 flex justify-center"
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-green-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                <img
                  src="https://github.com/HusainMahtab/portfolioAssignment/blob/main/front_end/src/assets/profileImage.png?raw=true"
                  alt="Mahtab Husain"
                  width={400}
                  height={400}
                  className="relative rounded-full w-64 h-64 lg:w-80 lg:h-80 object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-2/3 space-y-6"
            >
              {/* Introduction */}
              <div className="space-y-4">
                <p className="text-lg font-semibold text-gray-600">
                  Welcome to My Profile
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Hello, I'm a{" "}
                  <TypeAnimation
                    sequence={[
                      "Programmer",
                      1000,
                      "Developer",
                      1000,
                      "MERN Developer",
                      1000,
                      "Nextjs Developer",
                      1000,
                    ]}
                    wrapper="span"
                    speed={30}
                    style={{ display: "inline-block", color: "#10B981" }}
                    repeat={Infinity}
                  />
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Over 1 year of hands-on internship experience in full-stack
                  development. Proficient in diverse projects including a
                  E-Commerce Management System, E-Learning Back-End System,
                  School-Website, beats management-system Successfully
                  integrated payment systems like Razorpay. Skills: Frontend:
                  ReactJS HTML5 CSS3 TailwindCSS Nextjs-ClientSide
                  Backend:NodeJS ExpressJS Nextjs-ServerSide Database:MongoDB,
                  MySQL ,PG-admin,postgress Version-Control: Git, Github
                  Cloud:AWS(Amazon Web Services)
                </p>
              </div>

              {/* Social Links & Tech Stack */}
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                {/* Social Links */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                >
                  <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
                    Available On
                  </h3>
                  <div className="flex justify-center gap-6 text-3xl">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -5 }}
                        className={`text-gray-600 ${link.color} transition-colors duration-300`}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                >
                  <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
                    Tech Stack
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <FaNodeJs />, name: "NodeJs" },
                      { icon: <TbBrandNextjs />, name: "NextJs" },
                      { icon: <IoLogoReact />, name: "ReactJs" },
                      { icon: <SiMongodb />, name: "MongoDb" },
                      // Add more tech stack items as needed
                    ].map((tech, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors"
                      >
                        <span className="text-2xl text-gray-700">
                          {tech.icon}
                        </span>
                        <span className="font-medium text-gray-800">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to transform your distribution management?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that are already streamlining their
            distribution processes with our platform.
          </p>
          <Link
            href={"/distributions"}
            className="bg-black px-4 py-2 rounded-lg text-white text-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-white mb-6 md:mb-0">
              धनौरी-राशन
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-indigo-400 transition">
                Terms
              </a>
              <a href="#" className="hover:text-indigo-400 transition">
                Privacy
              </a>
              <a href="#" className="hover:text-indigo-400 transition">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} धनौरी-राशन. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default Home;
