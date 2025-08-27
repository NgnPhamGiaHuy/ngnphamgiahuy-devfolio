import React from "react";

import { QuoteCardProps } from "@/types";

const QuoteCard : React.FC<QuoteCardProps> = ({ item }) => {
    return (
        <div className={"w-full h-auto flex items-center justify-center shrink-0 transition-transform transform translate-z-0 backface-hidden box-border relative"}>
            <div className={"w-full py-[30px] px-[35px] bg-white rounded-[18px] overflow-hidden relative"}>
                <div className={"w-full mb-[30px] block relative"}>
                    <img src={item.image} alt={"image"} className={"max-w-full w-full h-[180px] rounded-[18px] object-center object-cover border-none shadow-none relative"}/>
                    <div className={"top-0 left-0 w-[66px] h-[66px] bg-white rounded-br-[18px] absolute"}>
                        <svg xmlns={"http://www.w3.org/2000/svg"} viewBox={"0 0 320 320"} className={"w-[44px] h-[44px] stroke-black stroke-12 fill-primary"}>
                            <path d="M239.64 74.01c-32.16-.89-59.56 23.76-61.9 55.85-2.59 35.43 25.38 64.97 60.26 64.97 0 0 0 15.82-10.97 34.02-5.9 9.79 4.91 21.1 15.04 15.8 30.22-15.81 62.45-48.71 56.36-110.25-3.24-32.64-26.45-59.5-58.79-60.39zm-156.74 0c-32.16-.89-59.56 23.76-61.9 55.85-2.59 35.43 25.38 64.97 60.26 64.97 0 0 0 15.82-10.97 34.02-5.9 9.79 4.91 21.1 15.04 15.8 30.22-15.81 62.45-48.71 56.36-110.25-3.25-32.64-26.45-59.5-58.79-60.39z"></path>
                        </svg>
                    </div>
                </div>
                <div className={"min-h-[110px] opacity-80"}>
                    <p>{ item.quote }</p>
                </div>
                <div className={"mt-[30px]"}>
                    <h6 className={"!m-0 text-[24px] max-md:text-[18px]"}>
                        <span>{ item.name }</span>
                    </h6>
                    <div>
                        <span>{ item.name }</span>
                    </div>
                </div>
                <div className={"content-card-pattern"}></div>
            </div>
        </div>
    );
};

export default QuoteCard;
