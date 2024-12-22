"use client"; // Ensure the canvas works in the browser

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc"; // Assuming SectionWrapper is a higher-order component
import { technologies } from "../constants"; // Ensure this exists or define it

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

// Wrapping the Tech component with the SectionWrapper HOC (Higher Order Component)
export default SectionWrapper(Tech, "");
