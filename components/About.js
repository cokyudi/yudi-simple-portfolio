"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import profile from "../public/profile.jpg"
import Experience from "./Experience"
import '/node_modules/flag-icons/css/flag-icons.min.css'

const About = (props) => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  return (
    <div className="container px-4 mx-auto">
      <div className="lg:space-x-5 lg:flex lg:flex-row item-center lg:-mx-4 flex flex-col text-center lg:text-left">

        {/* Profile Image */}
        <motion.div
          className="flex-shrink-0 lg:mt-12 lg:px-4 mb-10 ml-auto mr-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={profile}
            alt="Profile"
            priority={true}
            className="rounded-full shadow-lg"
            width={250}
            height={250}
            placeholder="blur"
          />
        </motion.div>

        {/* Text Section */}
        <div className="lg:px-4 lg:mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold text-gray-900 lg:text-7xl dark:text-white">
              {props.language}
            </h1>
          </motion.div>

          <div className="mt-6 text-gray-800 dark:text-white">
            {props.language === 'Hello !' ? (
              <>
                {[
                  "I’m a Frontend Engineer who loves transforming complex ideas into elegant, fast, and accessible web experiences.",
                  "Whether building fintech dashboards or compliance systems with React + TypeScript, I focus on creating meaningful, measurable impact.",
                  "Eager to learn new technologies to improve knowledge and skill."
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    className="mb-4 text-xl"
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={i}
                    viewport={{ once: true }}
                  >
                    {text}
                  </motion.p>
                ))}

                <motion.a
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 inline-block"
                  href="https://drive.google.com/file/d/1etom04V4sRfe9-h7a5aDrIVLlxj3cmLg/view?usp=sharing"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                  target="_blank"
                >
                  Download my CV here
                </motion.a>
              </>
            ) : (
              <>
                {/* Japanese version animations */}
                <motion.p
                  className="mb-4 text-xl"
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  custom={1}
                  viewport={{ once: true }}
                >
                  私は、複雑なアイデアを美しく、速く、そして誰もが使いやすい Web 体験へと変えることを得意とするフロントエンドエンジニアです。
                </motion.p>
                <motion.a
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 inline-block"
                  href="https://drive.google.com/file/d/1etom04V4sRfe9-h7a5aDrIVLlxj3cmLg/view?usp=sharing"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                  target="_blank"
                >
                  私の履歴書はこちらからダウンロードしてください
                </motion.a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Experience Section Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Experience />
      </motion.div>
    </div>
  )
}

export default About