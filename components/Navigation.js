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
        <div className="sticky top-0 z-20 py-2 bg-white md:py-6 md:mb-6 dark:bg-black">
            <div className="container px-4 mx-auto lg:max-w-4xl flex items-center justify-between">
                <Link href="/">
                    <a
                        className={"font-medium tracking-wider transition-colors text-gray-900 hover:text-sky-500 uppercase dark:text-white"}
                    >
                        Yudi Dharma Putra
                    </a>
                </Link>
                <div>
                    <span onClick={handleClick} style={{width: 2 + 'rem', height: 2 + 'rem', verticalAlign: 'text-bottom',  cursor: 'pointer'}} className={props.text==='Hello !'? 'fi fi-gb h-20':'fi fi-jp h-20'}></span>
                    <ThemeSwitch/>
                </div>
            </div>
        </div>
    )
}

export default Navigation;