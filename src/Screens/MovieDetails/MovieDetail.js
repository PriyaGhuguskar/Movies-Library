import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './detail.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
import PosterFallback from '../../assets/no-poster.png'
import dayjs from "dayjs";
import { add } from '../../store/WatchListStore'
import { useDispatch } from 'react-redux';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const API_IMG = 'https://image.tmdb.org/t/p/w500/'

const MovieDetail = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const [detail, setDetail] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=59002511c086d7be02536c9e73b1568b`)
            .then((data) => data.json())
            .then(result => setDetail(result))

    }, [id])
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const addToWishlist = (movie) => {
        dispatch(add(movie))
    }

    return (
        <div className="detailsBanner">

            <div className="backdrop-img">
                <LazyLoadImage
                    alt="movie poster"
                    effect="blur"
                    src={API_IMG + detail?.poster_path}
                />
            </div>



            <div className="opacity-layer"></div>

            <div className="contentWrapper">
                <div className="content">
                    <div className="left">
                        {detail?.poster_path ?
                            (<LazyLoadImage className="posterImg"
                                alt="movie poster"
                                effect="blur"
                                src={API_IMG + detail?.poster_path}
                            />)
                            :
                            (
                                <LazyLoadImage className="posterImg"
                                    alt="movie poster"
                                    effect="blur"
                                    src={PosterFallback}
                                />
                            )
                        }
                    </div>


                    <div className="right">
                        <div className="title">
                            {`${detail?.title} ( ${dayjs(detail?.release_date).format("YYYY")} )`}
                        </div>


                        <div className="subtitle">{detail?.tagline}</div>
                        <div className='genres'>
                            {detail?.genres?.map((g) => {

                                return (
                                    <div key={g?.id} className="genre">
                                        {g?.name}
                                    </div>
                                )
                            })}
                        </div>


                        <div className="circlerate">
                            <div className="circleRating">
                                <CircularProgressbar
                                    value={detail?.vote_average?.toFixed(1)}
                                    maxValue={10}
                                    text={detail?.vote_average?.toFixed(1)}
                                    styles={buildStyles({
                                        pathColor:
                                            detail?.vote_average?.toFixed(1) < 5 ? "red" : detail?.vote_average?.toFixed(1) < 7 ? "orange" : "green",
                                    })}
                                />
                            </div>


                        </div>


                        <div className="overview">
                            <div className="heading">Overview</div>
                            <div className="description">{detail?.overview}</div>
                        </div>

                        <div className="info">
                            {detail?.status && <>
                                <div className="infoItem">
                                    <span className="text bold">Status:{" "}</span>
                                    <span className="text">{detail?.status}</span>
                                </div>
                            </>}

                            {detail?.release_date && <>
                                <div className="infoItem">
                                    <span className="text bold">Release Date:{" "}</span>
                                    <span className="text">{dayjs(detail?.release_date).format("MMM D,YYYY")}</span>
                                </div>
                            </>}

                            {detail?.runtime && <>
                                <div className="infoItem">
                                    <span className="text bold">Runtime:{" "}</span>
                                    <span className="text">{toHoursAndMinutes(detail?.runtime)}</span>
                                </div>
                            </>}
                        </div>

                        <button type="button" onClick={() => addToWishlist(detail)}
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                            Add To watchlist
                        </button>


                    </div>
                </div>
            </div>



        </div>

    )
}

export default MovieDetail