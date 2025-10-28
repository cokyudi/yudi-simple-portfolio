import React from "react"
import {useState} from 'react';
import Image from "next/image"
import profile from "../public/profile.jpg"
import Experience from "./Experience"
import '/node_modules/flag-icons/css/flag-icons.min.css'

const About = (props) => {
    return (
        <div className="container px-4 mx-auto">
            <div className="lg:space-x-5 lg:flex lg:flex-row item-center lg:-mx-4 flex flex-col text-center lg:text-left"> 
                <div className="flex-shrink-0 lg:mt-12 lg:px-4 mb-10 ml-auto mr-auto">
                    <Image
                        src={profile}
                        alt="Profile"
                        priority={true}
                        className="rounded-full"
                        width={250}
                        height={250}
                        placeholder="blur"
                    />
                </div>
                <div className="lg:px-4 lg:mt-12 ">
                    <div className="lg:grid grid-cols-3 gaps-4">
                        <div className="lg:col-span-2 lg:text-left">  
                            <h1 className="text-5xl font-bold text-gray-900 lg:text-7xl dark:text-white pointer">
                                {props.language}
                            </h1>
                        </div>
                    </div>
                    {props.language==='Hello !' && 
                        <div className="mt-6 text-gray-800 dark:text-white">
                            <p className="mb-1 text-xl">
                            I’m a Frontend Engineer who loves transforming complex ideas into elegant, fast, and accessible web experiences.
                            My journey—from Indonesia to working in Japan—has been all about learning how technology, design, and people intersect.

                            Whether building fintech dashboards or compliance systems with React + TypeScript, I focus on creating meaningful, measurable impact: faster load times, smoother UX, happier users.

                            I thrive in collaborative environments where engineers and designers work together to craft experiences that matter.
                            </p>
                            <p className="mb-1 text-xl">
                            Eager to learn new
                            technologies to improve knowledge and skill. 
                            </p>
                            <p className="mb-4 text-xl">
                            Download my CV <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://drive.google.com/file/d/1-L4cYTaNxdfS3FzceDZHduve_kjjGrJi/view?usp=sharing">here</a>
                            </p>
                        </div>
                    }

                    {props.language!=='Hello !' && 
                        <div className="mt-6 text-gray-800 dark:text-white">
                            <p className="mb-1 text-xl">
                            私は、複雑なアイデアを美しく、速く、そして誰もが使いやすい Web 体験へと変えることを得意とするフロントエンドエンジニアです。
                            インドネシアから日本でのキャリアへと歩んできた中で、テクノロジー・デザイン・人との関わりがどのように交わり、価値を生み出すのかを学んできました。

                            React と TypeScript を用いたフィンテック向けダッシュボードやコンプライアンスシステムの開発などを通して、
                            「速い読み込み」「快適なユーザー体験」「満足度の高い利用体験」といった、意味のある・測定可能な成果を追求しています。

                            エンジニアとデザイナーが協力し、価値あるユーザー体験を共に作り上げる環境で働くことに喜びを感じています。
                            </p>
                            <p className="mb-1 text-xl">
                            新しいことを学びたがる
                            知識とスキルを向上させる技術。
                            </p>
                            <p className="mb-4 text-xl">
                            <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://drive.google.com/file/d/1UKI_8xicqqeTTOx1yLcq8Q0mMHDaTi1C/view?usp=sharing">
                            私の履歴書はこちらからダウンロードしてください
                            </a>
                            </p>
                        </div>
                    }
                </div>
            </div>
            <Experience/>
        </div>
    )
}

export default About;