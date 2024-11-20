import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";

const Login = () => {
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        captcha: "",
    });
    const [captchaCode, setCaptchaCode] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const generateCaptcha = () => {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setCaptchaCode(code);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.captcha !== captchaCode) {
            alert("کد امنیتی نادرست است. لطفاً دوباره تلاش کنید.");
            generateCaptcha();
            return;
        }

        try {

            const usersResponse = await axios.get("http://localhost:5000/professors");
            const studentsResponse = await axios.get("http://localhost:5000/students");

            const user = [
                ...usersResponse.data,
                ...studentsResponse.data,
            ].find(
                (user) =>
                    user.userName === formData.id &&
                    user.password === formData.password
            );


            if (user) {
                dispatch(loginSuccess({ user }))
                setError("");
                navigate("/dashboard");
            } else {
                setError("نام کاربری یا رمز عبور اشتباه است.");
            }

        } catch (error) {
            console.error("خطا در برقراری ارتباط با سرور:", error);
            setError("خطا در برقراری ارتباط با سرور.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 bg-white rounded shadow-md"
            >
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
                    ورود به سامانه
                </h2>

                {error && (
                    <div className="mb-4 text-red-600 text-center">{error}</div>
                )}

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">نام کاربری</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">رمز عبور</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">کد امنیتی</label>
                    <div className="flex items-center space-x-2">
                        <span className="p-2 text-lg font-bold text-gray-800 bg-gray-200 rounded">
                            {captchaCode}
                        </span>
                        <button
                            type="button"
                            onClick={generateCaptcha}
                            className="text-blue-500 hover:underline"
                        >
                            دریافت کد جدید
                        </button>
                    </div>
                    <input
                        type="text"
                        name="captcha"
                        value={formData.captcha}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    ورود
                </button>
            </form>
        </div>
    );
};

export default Login;
