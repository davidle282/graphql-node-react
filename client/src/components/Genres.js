import { Card } from "antd";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useGenres from "../redux/actions/genreActions";

const { Meta } = Card;

function Genres(props) {
  const { onChange, selected } = props;
  const { genreList } = useGenres();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "5px",
          backgroundColor: "white",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSelectChange = (id) => {
    onChange("genreId", id);
  };

  return (
    <Slider {...settings}>
      {genreList?.map((genre) => (
        <Card
          key={genre.id}
          cover={<img alt="image" src={genre.image} />}
          onClick={() => handleSelectChange(genre.id)}
          bodyStyle={{
            backgroundColor: selected ===genre.id ? "#ccc" : null
          }}
        >
          <Meta title={genre.name} />
        </Card>
      ))}
    </Slider>
  );
}

export default Genres;
