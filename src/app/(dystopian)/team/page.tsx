"use client";

import React, { useState } from "react";
import TeamCarouselContainer from "@/components/(dystopian)/team/team-carousel-container";
import TeamCarousel from "@/components/(dystopian)/team/team-carousel";
import Pic1 from "public/images/img.png";
import Pic2 from "public/images/signin.jpg";
import Pic3 from "public/images/spon.png";
import Pic4 from "public/images/background.jpg";
import Pic5 from "public/images/iit-mandi-img.png";
import { type TeamData } from "@/app/types";
import MemberDetailsContainer from "@/components/(dystopian)/team/member-details-container";

const teamData: TeamData[] = [
  {
    name: "player 1",
    role: "convenor",
    // org: "web dev",
    image: Pic1,
    desc: "lorem ipsum",
    github: "",
    linkedin: "",
    instagram: "",
  },
  {
    name: "player 2",
    role: "head",
    org: "web dev",
    image: Pic2,
    desc: "lorem ipsum",
    github: "",
    linkedin: "",
    instagram: "",
  },
  {
    name: "player 3",
    role: "volunteer",
    org: "web dev",
    image: Pic3,
    desc: "lorem ipsum",
    github: "",
    linkedin: "",
    instagram: "",
  },
  {
    name: "player 4",
    role: "head",
    org: "content",
    image: Pic4,
    desc: "lorem ipsum",
    github: "",
    linkedin: "",
    instagram: "",
  },
  {
    name: "player 5",
    role: "volunteer",
    org: "content",
    image: Pic5,
    desc: "lorem ipsum",
    github: "",
    linkedin: "",
    instagram: "",
  },
];

const TeamPage = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid min-h-screen w-screen grid-rows-[600px_auto] bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
      <TeamCarouselContainer data={teamData} index={index}>
        <TeamCarousel data={teamData} index={index} setIndex={setIndex} />
      </TeamCarouselContainer>
      <MemberDetailsContainer>
        {[1, 2, 3, 4, 5].map((el) => (
          <div
            key={el}
            onClick={() => setIndex(el)}
            className="m-5 bg-red-400 p-12"
          >
            {el}
          </div>
        ))}
      </MemberDetailsContainer>
    </div>
  );
};

export default TeamPage;
