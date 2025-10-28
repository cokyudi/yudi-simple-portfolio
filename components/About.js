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
                            I'm Yudi Dharma Putra,
                            Graduate of computer science with 7 years
                            experience working across full-stack and fron-end of web development in professional
                            company and industry.
                            I've been working mostly using PHP and Javascript with its framework such as 
                            Codeigniter, Laravel, AngularJS, Angular, jQuery.
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
                            私は Yudi Dharma Putra です。コンピュータ サイエンスの卒業生で、専門の企業や業界で Web 開発のフルスタックおよびフロントエンドで 4 年間働いた経験があります。 私は主に、Codeigniter、Laravel、AngularJS、Angular、jQuery などのフレームワークで PHP と Javascript を使用して作業してきました。

知識とスキルを向上させるために新しい技術を学ぶことに熱心です。
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