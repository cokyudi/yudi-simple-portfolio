import userData from "../constants/data";
import React from "react";

export default function Experience() {
  return (
    <div>
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-neutral-800">
        <h1 className=" text-5xl md:text-7xl font-bold py-20 text-center md:text-left">
          Experiences
        </h1>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-neutral-900 -mt-4">
        <div className="grid grid-cols-1 dark:bg-neutral-900 max-w-xl mx-auto pt-20">
          {/* Experience card */}
          {userData.experience.map((exp, idx) => (
            <>
              <ExperienceCard
                key={idx}
                title={exp.title}
                desc={exp.desc}
                year={exp.year}
                company={exp.company}
                companyLink={exp.companyLink}
              />
              {idx === userData.experience.length - 1 ? null : (
                <div className="divider-container flex flex-col items-center -mt-2">
                  <div className="w-4 h-4 bg-teal-300 rounded-full relative z-10">
                    <div className="w-4 h-4 bg-teal-300 rounded-full relative z-10 animate-ping"></div>
                  </div>
                  <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

const ExperienceCard = ({ title, desc, year, company, companyLink }) => {
  return (
    <div className="relative experience-card border p-4 rounded-md shadow-xl bg-white dark:bg-neutral-800 z-10 mx-4">
      <h1 className="absolute -top-10 md:-left-10 md:-top-10 text-4xl text-neutral-200 font-bold dark:text-neutral-700">
        {year}
      </h1>
      <h1 className="font-semibold text-xl">{title}</h1>
      <a href={companyLink} className="text-neutral-500">
        {company}
      </a>
      <p className="text-neutral-600 dark:text-neutral-400 my-2">{desc}</p>
    </div>
  );
};
