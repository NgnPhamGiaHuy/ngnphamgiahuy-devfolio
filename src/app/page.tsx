import React from "react";

import Hero from "@/components/sections/Hero";
import Header from "@/components/navigation/Header";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Resume from "@/components/sections/Resume";

const Home : React.FC = () => {
    return (
        <div className={"min-h-[50vh] overflow-hidden relative"}>
            <Header />
            <div className={"wrapper"}>
                <Hero />
                <Services />
                <Skills />
                <Work />
                <Resume />
            </div>
        </div>
    );
};

export default Home;
