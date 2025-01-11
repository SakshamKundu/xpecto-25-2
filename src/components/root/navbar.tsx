"use client";

import React from "react";
import Image from "next/image";
import Tardis from "public/images/tardis.png";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

const TardisNav = () => {
  const path = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 200 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 1,
        delay: path === "/" ? 10 : 0.5,
        ease: "backOut",
      }}
    >
      <motion.div
        initial={{ translateY: 0 }}
        animate={{ translateY: 10 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="cursor-pointer"
      >
        <Image src={Tardis} alt={"Tardis lol"} className="transition-all" />
      </motion.div>
    </motion.div>
  );
};

export default TardisNav;
