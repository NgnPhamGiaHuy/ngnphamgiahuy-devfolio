import React from "react";

import Hero from "@/components/sections/Hero";
import Header from "@/components/navigation/Header";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Resume from "@/components/sections/Resume";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import ScrollToTopButton from "@/components/ui/button/ScrollToTopButton";
import Map from "@/components/sections/Map";
import Footer from "@/components/navigation/Footer";

const Home: React.FC = () => {
    return (
        <div className={"min-h-[50vh] overflow-hidden relative"}>
            <Header />
            <div className={"wrapper"}>
                <Hero />
                <Services />
                <Skills />
                <Work />
                <Resume />
                <Testimonials />
                <Pricing />
                <Blog />
                <Contact />
                <Map />
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
};

export default Home;
