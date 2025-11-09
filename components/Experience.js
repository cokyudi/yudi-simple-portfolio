"use client";

import userData from "../constants/data";
import React from "react";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <div>
      {/* Header */}
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-neutral-800 flex items-center justify-center md:justify-start">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold text-center md:text-left"
        >
          Experiences
        </motion.h1>
      </div>

      {/* Timeline */}
      <div className="bg-[#F1F1F1] dark:bg-neutral-900 -mt-4">
        <div className="grid grid-cols-1 max-w-xl mx-auto pt-20">
          {userData.experience.map((exp, idx) => (
            <React.Fragment key={"card-" + idx}>
              <ExperienceCard
                title={exp.title}
                desc={exp.desc}
                year={exp.year}
                company={exp.company}
                companyLink={exp.companyLink}
                index={idx}
              />

              {/* Timeline Connector */}
              {idx !== userData.experience.length - 1 && (
                <div className="divider-container flex flex-col items-center -mt-2">
                  <motion.div
                    className="w-4 h-4 bg-teal-300 rounded-full relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-4 h-4 bg-teal-300 rounded-full absolute inset-0 animate-ping"
                    ></motion.div>
                  </motion.div>
                  <motion.div
                    className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"
                    initial={{ height: 0 }}
                    whileInView={{ height: "6rem" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// ✅ Animated Experience Card
const ExperienceCard = ({ title, desc, year, company, companyLink, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative border p-6 rounded-xl shadow-md bg-white dark:bg-neutral-800 z-10 mx-4 cursor-pointer transition-all"
    >
      <h1 className="absolute -top-10 md:-left-10 text-4xl text-neutral-200 font-bold dark:text-neutral-700 select-none">
        {year}
      </h1>
      <h1 className="font-semibold text-xl">{title}</h1>
      <a
        href={companyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-500 hover:underline"
      >
        {company}
      </a>
      <p className="text-neutral-600 dark:text-neutral-400 my-2">{desc}</p>
    </motion.div>
  );
};