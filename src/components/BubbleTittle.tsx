import React from "react";
import { ITitleBubble } from "@/utility/Types";

const Bubble: React.FC<ITitleBubble> = ({ title }) => {
    return (
        <div className="flex flex-wrap m-4 justify-center w-2/4 bg-color1 border rounded-full transition-all duration-300 hover:bg-color2 hover:shadow-lg hover:cursor-pointer">
            <p className="py-3 text-center text-sm sm:text-base lg:text-lg">
                {title}
            </p>
        </div>
    );
};

export default Bubble;
