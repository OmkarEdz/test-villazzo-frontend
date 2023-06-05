import React, { useState } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { fetchAPI } from "../lib/api"
import Image from "next/image"
import { getStrapiMedia } from "../lib/media"
import Link from 'next/link'
import axios from 'axios'
import Slider from 'react-slick';

var settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots:false,
  arrows: false,
  autoplay: true,
};

const Home = ({
  global,
  footerData,
  navigation,
  homepage,
}) => {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <>
      <Header navigation={navigation} global={global} />

      {/* homepage BOOK WITH VILLAZZO section start here */}
      <div className="mainContainer">
        <h2 className="bookHead">{homepage.attributes.bookVillazzoSection.Heading}</h2>
        <div className="bookBoxeWrap">
          <div className="bookItem">
            <p className="bookItemImg">
              <Image
                loader={myLoader}
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${homepage.attributes.bookVillazzoSection.BookItemIconURL1}`}
                layout="fill"
                alt="Book Item"
              />
            </p>
            <h5 className="bookItemHead">{homepage.attributes.bookVillazzoSection.BookItemTitle1}</h5>
            <p className="bookItemDesc">{homepage.attributes.bookVillazzoSection.BookItemContent1}</p>
          </div>
          <div className="bookItem">
            <p className="bookItemImg">
              <Image
                loader={myLoader}
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${homepage.attributes.bookVillazzoSection.BookItemIconURL2}`}
                layout="fill"
                alt="Book Item"
              />
            </p>
            <h5 className="bookItemHead">{homepage.attributes.bookVillazzoSection.BookItemTitle2}</h5>
            <p className="bookItemDesc">{homepage.attributes.bookVillazzoSection.BookItemContent2}</p>
          </div>
          <div className="bookItem">
            <p className="bookItemImg">
              <Image
                loader={myLoader}
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${homepage.attributes.bookVillazzoSection.BookItemIconURL3}`}
                layout="fill"
                alt="Book Item"
              />
            </p>
            <h5 className="bookItemHead">{homepage.attributes.bookVillazzoSection.BookItemTitle3}</h5>
            <p className="bookItemDesc">{homepage.attributes.bookVillazzoSection.BookItemContent3}</p>
          </div>
        </div>
        <p className="contBtn inqury-btn"><a href="javascript:;">FIND OUT MORE</a></p>
      </div>
      {/* homepage BOOK WITH VILLAZZO section end here */}

      {/* homepage testimonial section start here */}
      <div className="homeTestiWrapper" style={{backgroundImage:`url(${process.env.NEXT_PUBLIC_STRAPI_API_URL}${homepage.attributes.HomepageTestimonials.BackgroundImageURL})`}}>
        <div className="homeTestiCotainer">
          <h3>{homepage.attributes.HomepageTestimonials.Heading}</h3>
          <Slider {...settings}>
            <div className="slideItem">
              "{homepage.attributes.HomepageTestimonials.ClientReview1}"
            </div>
            <div className="slideItem">
              "{homepage.attributes.HomepageTestimonials.ClientReview2}"
            </div>
            <div className="slideItem">
              "{homepage.attributes.HomepageTestimonials.ClientReview3}"
            </div>
            <div className="slideItem">
              "{homepage.attributes.HomepageTestimonials.ClientReview4}"
            </div>
            <div className="slideItem">
              "{homepage.attributes.HomepageTestimonials.ClientReview5}"
            </div>
          </Slider>
        </div>
      </div>
      {/* homepage testimonial section end here */}

      <Footer footerProp={footerData} />
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [
    globalRes,
    footerRes,
    navigationRes,
    homepageRes,
  ] = await Promise.all([
    fetchAPI("/global", { populate: "*" }),
    fetchAPI("/footer", { populate: "deep" }),
    fetchAPI("/header-nav", { populate: "*" }),
    fetchAPI("/homepage", { populate: "*" }),
  ])

  return {
    props: {
      global: globalRes.data,
      footerData: footerRes.data,
      navigation: navigationRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  }
}

export default Home
