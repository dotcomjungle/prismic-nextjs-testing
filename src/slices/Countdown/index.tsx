import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Countdown`.
 */
export type CountdownProps = SliceComponentProps<Content.CountdownSlice>;

/**
 * Component for "Countdown" Slices.
 */
const Countdown = ({ slice }: CountdownProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Something is coming at {slice.primary.countdown_date}!
    </section>
  );
};

export default Countdown;
