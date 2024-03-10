import React, { useState } from 'react'
import loginbg from '../../assets/loginbg.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../../store/AuthStore';
import { toast } from 'react-toastify';
import '../SignUp/signup.css'

const LoginLogout = () => {
    const dispatch = useDispatch()


    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const GetLogged = (users) => {
        dispatch(login(users));
    };

    const [inputError, setInputError] = useState(false);
    const [usernotExist, setUserNotExist] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };
    const getUsers = () => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };

    const handleLogin = () => {
        if (loginData.username.trim() === '' || loginData.password.trim() === '') {
            setInputError(true);
            return;
        }
        const users = getUsers();
        const foundUser = users.find(user => user.username === loginData.username && user.password === loginData.password);

        if (foundUser) {

            setUserNotExist(false)
            toast.success('User Successful Login ')
            navigate('/')
            GetLogged(login(foundUser))
        } else {
            setUserNotExist(true)
        }
    };

    const tosignupPage = () => {
        navigate('/signup')
    }
    return (
        <>
            <div className=' relative h-screen w-screen overflow-hidden'>
                <div className=' absolute top-0 left-0 h-full w-full'>
                    <img src={loginbg} alt='login Bg' className=' w-full h-full object-cover opacity-40' />
                </div>
                <div className=" absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">
                    <div className=" w-96 max-w-screen-md bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
                        <form className="flex flex-col" onSubmit={handleLogin}>
                            <div>
                                {usernotExist && <div className='error'> Username or Password are wrong</div>}
                            </div>
                            {/* username */}
                            <input type="text"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Username"
                                name='username' value={loginData.username} onChange={handleChange} />

                            {/* Password */}
                            <input type="password"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="password"
                                name="password" value={loginData.password} onChange={handleChange} />
                            {inputError && <div className="error">Enter valid Username or Password</div>}

                            <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                                Login
                            </button>
                        </form>
                        <button type="button" onClick={tosignupPage}
                            style={{ margin: '10px auto', fontWeight: '700px' }}
                        >
                            Create new User
                        </button>
                    </div>
                </div>


            </div>
        </>


    )
}

export default LoginLogout