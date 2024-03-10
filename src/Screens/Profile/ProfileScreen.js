import React from 'react'
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import './profile.css'
import { logout } from '../../store/AuthStore';
import { useNavigate } from "react-router-dom";



const ProfileScreen = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user);
    const logOutUser = () => {
        navigate('/')
        dispatch(logout());
    }

    return (
        <div style={{ paddingTop: '100px' }}>
            <div style={{ padding: '40px' }}>
                <div className=' flex gap-4'>
                    <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green'])}
                        className=' rounded'
                        name={user.payload.username} />


                    <div className="right">
                        <div className="title">
                            {user.payload.username}
                        </div>

                        <div className="overview">
                            <div className="heading">Email : {user.payload.email}</div>
                        </div>

                        <div className="overview">
                            <div className="heading">Phone Nu. : {user.payload.phone}</div>
                        </div>
                    </div>
                </div>

                <div className=' flex justify-between'>
                    <div type="button" onClick={() => logOutUser()}
                        className=" text-white font-bold py-2 px-4 rounded-md mt-4 transition border border-white ">
                        Log Out
                    </div>

                    <div className=' flex gap-5'>
                        <button type="button" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                            Favourite
                        </button>
                        <button type="button"
                            onClick={() => navigate('/watchlist')}
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                            watchlist
                        </button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default ProfileScreen



