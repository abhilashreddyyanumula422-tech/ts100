import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Upload",
    text: "Students upload documents easily through our platform.",
    image: "https://cdn-icons-png.flaticon.com/512/724/724933.png",
  },
  {
    title: "Review",
    text: "Our team reviews and verifies your documents carefully.",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
  },
  {
    title: "Process",
    text: "We coordinate with the university to process your request.",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
  },
  {
    title: "Deliver",
    text: "Final verified documents are delivered securely.",
    image: "https://cdn-icons-png.flaticon.com/512/1048/1048946.png",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  // 🔥 Auto animation when scroll
  useEffect(() => {
    let interval;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          interval = setInterval(() => {
            setActiveStep(i);
            i++;
            if (i >= steps.length) clearInterval(interval);
          }, 1500);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (interval) clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* 🔥 HEADING */}
        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* 🔥 LEFT SIDE (STEPS) */}
          <div className="relative flex justify-between items-center">

            {/* LINE */}
            <div className="absolute top-6 left-0 w-full h-1 bg-gray-200"></div>

            {steps.map((step, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveStep(index)}
                className="relative z-10 flex flex-col items-center cursor-pointer"
              >
                {/* CIRCLE */}
                <motion.div
                  animate={{
                    scale: activeStep === index ? 1.3 : 1,
                    backgroundColor:
                      activeStep >= index ? "#2563EB" : "#e5e7eb",
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                >
                  {index + 1}
                </motion.div>

                {/* TEXT */}
                <p
                  className={`mt-3 text-sm font-semibold ${
                    activeStep === index
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            ))}
          </div>

          {/* 🔥 RIGHT SIDE (IMAGE + TEXT) */}
          <div className="h-[320px] flex items-center justify-center">

            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <img
                src={steps[activeStep].image}
                alt="step"
                className="w-28 mx-auto mb-5"
              />

              <h3 className="text-xl font-bold text-blue-700">
                {steps[activeStep].title}
              </h3>

              <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                {steps[activeStep].text}
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;