import React from "react"
import {useState} from 'react';
import Image from "next/image"
import profile from "../public/profile.jpg"
import Experience from "./Experience"

const About = () => {
    const [buttonText, setButtonText] = useState('Hello !');

    function handleClick() {
        if (buttonText==='Hello !') {
            setButtonText('こんにちは !');    
        } else if (buttonText==='こんにちは !') {
            setButtonText('Hello !');    
        }
    }
    return (
        <div className="container px-4 mx-auto">
            <div className="lg:space-x-5 lg:flex lg:flex-row item-center lg:-mx-4 flex flex-col text-center lg:text-left"> 
                <div className="flex-shrink-0 lg:mt-12 lg:px-4 mb-10">
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
                    <h1 onClick={handleClick} className="text-3xl font-bold text-gray-900 lg:text-7xl dark:text-white pointer">
                        {buttonText}
                    </h1>
                    <div className="mt-6 text-gray-800 dark:text-white">
                        <p className="mb-1">
                        I'm Yudi Dharma Putra,
                        Graduate of computer science with 4 years
                        experience working across full-stack and fron-end of web development in professional
                        company and industry.
                        I've been working mostly using PHP and Javascript with its framework such as 
                        Codeigniter, Laravel, AngularJS, Angular, jQuery.
                        </p>
                        <p className="mb-4">
                        Eager to learn new
                        technologies to improve knowledge and skill. 
                        </p>
                    </div>
                </div>
            </div>
            <Experience/>
        </div>
    )
}

export default About;