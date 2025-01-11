"use client";

import React from "react";
import { motion } from "motion/react";

const XText = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 104.4 179.69"
      className="h-24 md:h-36 lg:h-48"
      initial={{ fill: "#fffbeb00" }}
      animate={{ fill: "#fffbeb" }}
      transition={{ duration: 1, delay: 6, ease: "anticipate" }}
    >
      <motion.polygon
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 3.5, ease: "easeInOut" }}
        className="stroke-amber-50 stroke-2"
        points="1 178.69 28.11 178.69 28.11 148.58 35.63 148.58 35.63 133.52 43.16 133.52 43.16 118.46 50.69 118.46 50.69 103.4 53.71 103.4 53.71 118.46 61.23 118.46 61.23 133.52 68.77 133.52 68.77 148.58 76.29 148.58 76.29 178.69 103.4 178.69 103.4 136.53 95.87 136.53 95.87 121.47 88.34 121.47 88.34 106.41 80.81 106.41 80.81 91.35 73.28 91.35 73.28 88.34 80.81 88.34 80.81 73.28 88.34 73.28 88.34 58.22 95.87 58.22 95.87 43.16 103.4 43.16 103.4 1 76.29 1 76.29 31.12 68.77 31.12 68.77 46.18 61.23 46.18 61.23 61.23 53.71 61.23 53.71 76.29 50.69 76.29 50.69 61.23 43.16 61.23 43.16 46.18 35.63 46.18 35.63 31.12 28.11 31.12 28.11 1 1 1 1 43.16 8.53 43.16 8.53 58.22 16.06 58.22 16.06 73.28 23.59 73.28 23.59 88.34 31.12 88.34 31.12 91.35 23.59 91.35 23.59 106.41 16.06 106.41 16.06 121.47 8.53 121.47 8.53 136.53 1 136.53 1 178.69"
      />
    </motion.svg>
  );
};

export default XText;
