import { FC } from "react";
import { PageWrapper, Text } from "@/components";

type TAbout = FC;

const About: TAbout = () => {
  return <PageWrapper content={<Text variant="h1">About</Text>}></PageWrapper>;
};

export default About;
