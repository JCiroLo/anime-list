import { FC } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { AnimeBanner } from "@/components";

import type { TAnime } from "@/types/Anime";

type HeroProps = {
  slides: TAnime[];
};

const Hero: FC<HeroProps> = ({ slides }) => {
  return (
    <Box position="relative">
      <Swiper
        speed={500}
        autoplay={{
          delay: 7500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop
      >
        {slides.map((anime) => (
          <SwiperSlide key={anime.id}>
            <AnimeBanner anime={anime} animated />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Hero;
