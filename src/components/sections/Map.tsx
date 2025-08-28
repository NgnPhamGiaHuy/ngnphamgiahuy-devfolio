import React from 'react';

const Map = () => {
    return (
        <section className={"relative"}>
            <div className={"flex mx-auto relative"}>
                <div className={"w-full min-h-[1px] flex relative"}>
                    <div className={"w-full flex flex-wrap content-start relative"}>
                        <iframe
                            src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2090.9739612868702!2d106.61914557100185!3d10.736979972065594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752d0057ce7589%3A0xf7092a37d7f3c9d0!2sThe%20Privia!5e0!3m2!1sen!2s!4v1756414516144!5m2!1sen!2s"}
                            loading={"lazy"}
                            className={"w-full h-[580px] [filter:brightness(80%)_contrast(125%)_saturate(0%)_blur(0px)_hue-rotate(0deg)]"}>
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Map;
