import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../Home/home.css'
import './watch.css'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { remove } from '../../store/WatchListStore';


const API_IMG = 'https://image.tmdb.org/t/p/w500/'

const WatchList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const trending = useSelector(state => state.watchlist)
    const IsLogged = useSelector(state => state.auth.isLoggedIn)

    const RemoveFromWatchlist = (id) => {
        dispatch(remove(id))
    }
    return (
        <>
            {IsLogged &&
                <div className="watchlistDiv">
                    {/* <IoArrowBackCircleSharp /> */}

                    <div className='watchlistTitle'>
                        <span onClick={() => navigate('/')}><IoArrowBackCircleSharp /> </span>
                        <span>Your Watchlist</span> </div>
                    {trending ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '30px' }}>
                            {trending?.map((item) => {
                                return (
                                    <div key={item.id} className="carouselItem" style={{ minWidth: '210px' }}>
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
                                        <button className="wishlist" onClick={() => RemoveFromWatchlist(item.id)}>
                                            Remove From WatchList
                                        </button>
                                    </div>

                                )
                            })}
                        </div>
                    ) : (
                        <button className="wishlist" onClick={() => navigate('/')}>
                            Add To WatchList
                        </button>
                    )}


                </div>
            }
        </>
    )
}

export default WatchList