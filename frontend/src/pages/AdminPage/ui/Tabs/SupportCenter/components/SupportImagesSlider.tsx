import { FC } from 'react';

import Slider from 'react-slick';

import NextArrow from '@/shared/ui/Slider/NextArrow';
import PrevArrow from '@/shared/ui/Slider/PrevArrow';

interface Props {
  images: string[];
}

const SupportImagesSlider: FC<Props> = (props) => {
  const { images } = props;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider
      {...settings}
      className="w-[292px] h-[244px] md:w-[364px] md:h-[320px] lg:w-[498px] lg:h-[420px] flex justify-center items-center bg-dark-grey rounded-2xl"
    >
      {(images || []).map((item, i) => (
        <img
          key={i}
          src={`${process.env.BASE_URL}${item}`}
          alt={item}
          className="w-[292px] h-[244px] md:w-[364px] md:h-[320px] lg:w-[498px] lg:h-[420px] object-contain"
        />
      ))}
    </Slider>
  );
};

export default SupportImagesSlider;
