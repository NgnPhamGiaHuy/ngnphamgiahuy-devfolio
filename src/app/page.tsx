import React from "react";

import Hero from "@/components/sections/Hero";
import Header from "@/components/navigation/Header";
import Services from "@/components/sections/Services";

const Home: React.FC = () => {
    return (
        <div className={"min-h-[50vh] overflow-hidden relative"}>
            <Header />
            <div className={"wrapper"}>
                <Hero />
                <Services />
            </div>
        </div>
    );
};

export default Home;
