import { FC } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { HeroPanel } from "@/components";
import type { TAnimeTrailer, TAnime } from "@/types/Anime";

type HeroProps = FC<{
  slides: TAnime[];
  currentTrailer: TAnimeTrailer | null;
  onWatchTrailer: (trailer: TAnimeTrailer, origin: string) => void;
}>;

const Hero: HeroProps = ({ slides, onWatchTrailer }) => {
  return (
    <Box position="relative">
      <Swiper
        speed={500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop
      >
        {slides.map((anime) => (
          <SwiperSlide key={anime.id}>
            <HeroPanel anime={anime} onWatchTrailer={onWatchTrailer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Hero;
