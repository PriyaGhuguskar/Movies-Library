import React, { useState } from 'react'
import loginbg from '../../assets/loginbg.jpg'
import { useNavigate } from 'react-router-dom'
import './signup.css'
import { toast } from 'react-toastify';

const SignUpScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const [userError, setUserError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const getUsers = () => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {

            const users = getUsers();
            const newUser = {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                phone: formData.phone,
            };
            const existingUserName = users.find(user => user.username === formData.username);
            const existingUseremail = users.find(user => user.email === formData.password);

            if (existingUserName || existingUseremail) {
                setUserError(true);
                return;
            }

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            setFormData({})

            setErrors({});
            setUserError(false)
            toast.success('User Created Successfully')
            navigate('/login');

            console.log('Form submitted:', formData);
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.username) {
            errors.username = 'Username is required';
        }
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Invalid email format';
        }
        if (!data.password) {
            errors.password = 'Password is required';
        }

        if (data.confirmPassword !== data.password) {
            errors.confirmPassword = 'Passwords do not match';
        }
        if (!data.phone) {
            errors.phone = 'Phone number is required';
        } else if (!isValidPhoneNumber(data.phone)) {
            errors.phone = 'Invalid phone number format';
        }
        else if ((data.phone).length !== 10) {
            errors.phone = 'Invalid phone number format';
        }
        return errors;
    };

    const isValidEmail = (email) => {
        // Basic email validation regex
        return /\S+@\S+\.\S+/.test(email);
    };

    const isValidPhoneNumber = (phone) => {
        // Basic phone number validation regex
        return /^[0-9]{10}$/.test(phone);
    };
    const toLoginPage = () => {
        navigate('/login');
    }


    return (

        <>
            <div className=' relative h-screen w-screen overflow-hidden'>
                <div className=' absolute top-0 left-0 h-full w-full'>
                    <img src={loginbg} alt='login Bg' className=' w-full h-full object-cover opacity-40' />
                </div>

                <div className=" absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">

                    <div className=" w-96 max-w-screen-md bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New User</h2>

                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <div>
                                {userError && <div className='error'> Username or email ID already exist</div>}
                            </div>
                            {/* username */}
                            <input type="text"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Username"
                                name='username' value={formData.username} onChange={handleChange} />
                            {errors.username && <div className="error">{errors.username}</div>}

                            {/* email */}
                            <input type="email"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Email"
                                name="email" value={formData.email} onChange={handleChange} />
                            {errors.email && <div className="error">{errors.email}</div>}


                            <input type="password"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="password"
                                name="password" value={formData.password} onChange={handleChange} />
                            {errors.password && <div className="error">{errors.password}</div>}

                            <input type="password"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Confirm Password"
                                name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

                            <input type="number"
                                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Phone no."
                                name="phone" value={formData.phone} onChange={handleChange} />
                            {errors.phone && <div className="error">{errors.phone}</div>}


                            <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                                Sign Up
                            </button>
                        </form>
                        <button type="button" onClick={toLoginPage}
                            style={{ margin: '10px auto', fontWeight: '700px' }}
                        // className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        >
                            Login Exiting User
                        </button>
                    </div>
                </div>


            </div>
        </>
    );
}

export default SignUpScreen