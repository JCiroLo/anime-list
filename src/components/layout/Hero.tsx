import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { HeroPanel } from "@/components";
import { type TAnime } from "@/types/Anime";
import { Box } from "@mui/material";

type HeroProps = FC<{
  slides: TAnime[];
}>;

const Hero: HeroProps = ({ slides }) => {
  return (
    <Box position="relative">
      <Swiper onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
        {slides.map((anime) => (
          <SwiperSlide key={anime.id}>
            <HeroPanel anime={anime} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Hero;
