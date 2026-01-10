"use client"
import Link from "next/link"
import React from "react"
import ThemeSwitch from "./ThemeSwitch"

const Navigation = (props) => {
    function handleClick() {
        if (props.text==='Hello !') {
            props.onChangeLanguage('こんにちは');    
        } else if (props.text==='こんにちは') {
            props.onChangeLanguage('Hello !');    
        }
    }
    return (
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur dark:bg-black/80">
            <nav className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
                <Link
                    href="/"
                    className="font-semibold tracking-wide text-gray-900 dark:text-white hover:text-teal-500 hover:dark:text-teal-300 transition"
                >
                    YUDI DHARMA PUTRA
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        href="/blog"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-500 hover:dark:text-teal-300 transition"
                    >
                        Blog
                    </Link>

                    <button
                        onClick={handleClick}
                        aria-label="Switch language"
                        className="flex items-center"
                    >
                        <span
                        className={`fi ${
                            props.text === "Hello !" ? "fi-gb" : "fi-jp"
                        } text-xl cursor-pointer`}
                        />
                    </button>

                    <ThemeSwitch />
                </div>
            </nav>
        </header>
    )
}

export default Navigation;