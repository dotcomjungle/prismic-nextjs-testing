import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;



/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const heroStyle = {
    backgroundImage: `url(${slice.primary.background.url})`,
    backgroundColor: slice.primary.overlaycolor ? slice.primary.overlaycolor : "",
    backgroundBlendMode: "multiply",
    backgroundSize: "cover",

  }
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      style={heroStyle}
    >
      <h1>{slice.primary.title}</h1>
      {slice.items.map((item, index) => <PrismicNextLink key={index} field={item.buttonlink} >{item.buttonlabel}</PrismicNextLink>)}
    </section>
  );
};

export default Hero;
