"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import profile from "../public/profile.jpg"
import Experience from "./Experience"
import '/node_modules/flag-icons/css/flag-icons.min.css'
import Link from "next/link"

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
                  "I’m a full-stack engineer who enjoys building fast and accessible web applications.",
                  "Always learning and looking for ways to improve, both technically and personally."
                ].map((text, i) => (
                  <motion.p
                    key={'summary-en-'+i}
                    className="mb-4 text-xl"
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={i}
                  >
                    {text}
                  </motion.p>
                ))}

                <motion.div
                  key={'download-en'}
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  <motion.a
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 inline-block"
                    href="https://drive.google.com/file/d/1etom04V4sRfe9-h7a5aDrIVLlxj3cmLg/view?usp=sharing"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    custom={'link0'}
                    target="_blank"
                  >
                    Download my CV here
                  </motion.a>
                </motion.div>

                <motion.div
                  key={'read-blog-en'}
                  className="my-5"
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  <Link href={'/blog'}>
                    <motion.span 
                      className="inline-block text-sm font-medium text-teal-500 dark:text-teal-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read my blog →
                    </motion.span>
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                {[
                  "高速で使いやすいWebアプリケーションを作ることが好きなフルスタックエンジニアです。",
                  "技術的にも人としても、日々学びながら成長していきたいと思っています。"
                ].map((text, i) => (
                  <motion.p
                    key={'summary-jp-'+i}
                    className="mb-4 text-xl"
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={i}
                  >
                    {text}
                  </motion.p>
                ))}

                <motion.div
                  key={'download-jp'}
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  <motion.a
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 inline-block"
                    href="https://drive.google.com/file/d/1etom04V4sRfe9-h7a5aDrIVLlxj3cmLg/view?usp=sharing"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    custom={'link0'}
                    target="_blank"
                  >
                    履歴書はこちらからダウンロード
                  </motion.a>
                </motion.div>

                <motion.div
                  key={'read-blog-jp'}
                  className="my-5"
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  <Link href={'/blog'}>
                    <motion.span 
                      className="inline-block text-sm font-medium text-teal-500 dark:text-teal-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      私のブログへ →
                    </motion.span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>

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