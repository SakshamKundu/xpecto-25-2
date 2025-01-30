"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { type TeamData } from "@/app/types";

interface Props {
  data: TeamData[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const TeamCarousel = ({ data, index, setIndex }: Props) => {
  const [apiDesktop, setApiDesktop] = useState<CarouselApi>();
  const [apiMobile, setApiMobile] = useState<CarouselApi>();

  useEffect(() => {
    if (!apiDesktop) return;
    apiDesktop.scrollTo(index);
  }, [apiDesktop, index]);

  useEffect(() => {
    if (!apiDesktop) return;
    setIndex(apiDesktop.selectedScrollSnap());
    console.log(apiDesktop.selectedScrollSnap());
  }, [apiDesktop, setIndex]);

  useEffect(() => {
    if (!apiMobile) return;
    apiMobile.scrollTo(index);
  }, [apiMobile, index]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-5 lg:px-12">
      <Carousel
        setApi={setApiDesktop}
        opts={{
          align: "center",
          loop: true,
        }}
        orientation="vertical"
        className="hidden w-full md:block"
      >
        <CarouselContent className="-mt-1 h-[calc(100vh)]">
          {data.map((el, index) => (
            <CarouselItem
              key={index}
              className="relative flex flex-col items-center justify-center pt-5 md:basis-1/2"
            >
              <div className="relative h-full max-h-[400px] w-full border-2 border-amber-50 lg:max-h-[500px]">
                <Image
                  src={el.image}
                  alt={"Volunteer pic"}
                  className="h-full w-full object-cover"
                />
                {index}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        setApi={setApiMobile}
        opts={{
          align: "center",
          loop: true,
        }}
        orientation="horizontal"
        className="flex h-full w-full flex-col items-center justify-center py-5 md:hidden"
      >
        <CarouselContent className="h-full">
          {data.map((el, index) => (
            <CarouselItem
              key={index}
              className="relative h-full max-h-[300px] max-w-[400px] basis-3/4 pl-5"
            >
              <Image
                src={el.image}
                alt={"Volunteer pic"}
                className="h-full w-full border-2 border-amber-50 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TeamCarousel;
