import React from "react";

import Hero from "@/components/sections/Hero";
import Header from "@/components/navigation/Header";
import Services from "@/components/sections/Services";
import Professional from "@/components/sections/Professional";

const Home : React.FC = () => {
    return (
        <div className={"min-h-[50vh] overflow-hidden relative"}>
            <Header />
            <div className={"wrapper"}>
                <Hero />
                <Services />
                <Professional />
            </div>
        </div>
    );
};

export default Home;
