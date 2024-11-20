import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../../../redux/studentSlice";

const ProfessorDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const professor = useSelector((state) => state.auth.user);
    const allCourses = useSelector((state) => state.student.courses);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    const courses = allCourses.filter((course) =>
        professor?.courses?.includes(Number(course.id))
    );


    const handleCourseClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="bg-blue-500 text-white p-6 rounded-lg shadow-md mb-6">
                <h1 className="text-3xl font-bold">سلام {professor?.name} 👋</h1>
                <p className="text-lg mt-2">به داشبورد اساتید خوش آمدید!</p>
            </header>

            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">دروس ارائه‌شده:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer border border-gray-200 hover:border-blue-500"
                            onClick={() => handleCourseClick(course.id)}
                        >
                            <h3 className="text-lg font-semibold text-blue-500 mb-2">
                                {course.name}
                            </h3>
                            <p className="text-gray-600">
                                تعداد جلسات: {course.totalSessions}
                            </p>
                            <p className="text-gray-600">
                                تعداد دانشجویان: {course.students.length}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProfessorDashboard;
