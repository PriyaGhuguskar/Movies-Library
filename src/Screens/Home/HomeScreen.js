import React, { useEffect, useState } from 'react'
import './home.css'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { add } from '../../store/WatchListStore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';


const API_IMG = 'https://image.tmdb.org/t/p/w500/'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const [search, setSearch] = useState("");
    const [trending, setTrending] = useState([])
    const [movieName, setMovieName] = useState('')

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=59002511c086d7be02536c9e73b1568b')
            .then((data) => data.json())
            .then(result => setTrending(result.results))
    }, [])

    const addToWishlist = (movie) => {
        toast.success(`${movie?.title} added to Watchlist`)
        dispatch(add(movie))
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handlesearch = () => {
        const capitalizedText = capitalize(movieName)
        return trending.filter(
            (movie) =>
                movie?.title?.includes(capitalizedText)
        )
    }


    return (
        <>
            {/* Hero Banner */}
            <div className="heroBanner">
                <div className="backdrop-img">
                    <LazyLoadImage
                        alt=""
                        effect="blur"
                        src='https://image.tmdb.org/t/p/w500//xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg'
                    />
                </div>
                <div className="opacity-layer"></div>
                <div className="contentWrapper">
                    <div className="heroBannerContent">
                        <span className="title">Welcome.</span>
                        <span className="subTitle">Millions of movies to discover. Explore now.</span>
                        <div className="searchInput">
                            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="search for a movie's...." />
                            <button type='button' onClick={() => setMovieName(search)}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Trending */}
            <div className='carouselSection'>
                <div className="contentWrapper">
                    <span className="carouselTitle">Trending</span>
                </div>
                {/* <Carousel in treding /> */}

            </div>
            <div className="contentWrapper">

                <div className="slider-container">

                    <Slider {...settings}>

                        {handlesearch()?.map((item) => {
                            return (
                                <div key={item.id} className="carouselItem">
                                    <div className="posterBlock" onClick={() => navigate(`/movie/${item.id}`)}>
                                        <LazyLoadImage
                                            alt=""
                                            effect="blur"
                                            src={API_IMG + item?.poster_path}
                                        />
                                        <div className="circleRating">
                                            <CircularProgressbar
                                                value={item.vote_average.toFixed(1)}
                                                maxValue={10}
                                                text={item.vote_average.toFixed(1)}
                                                styles={buildStyles({
                                                    pathColor: item.vote_average.toFixed(1) < 5 ? "red" : item.vote_average.toFixed(1) < 7 ? "orange" : "green",
                                                })}
                                            />
                                        </div>

                                    </div>
                                    <div className="textBlock" onClick={() => navigate(`/movie/${item.id}`)}>
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_Date).format("MMMM D, YYYY")}
                                        </span>
                                    </div>
                                    <button className="wishlist" onClick={() => addToWishlist(item)}>
                                        Add To wishlist
                                    </button>
                                </div>

                            )
                        })}
                    </Slider>
                </div>

            </div>
        </>
    )
}

export default HomeScreen