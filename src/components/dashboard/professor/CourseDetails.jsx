import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCourseAbsences } from './../../../redux/courseSlice';

const CourseDetails = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const allCourses = useSelector((state) => state.student.courses);

    const course = allCourses?.find((course) => String(course.id) === String(courseId));

    const [attendance, setAttendance] = useState({});

    const handleAttendanceChange = (studentId) => {
        setAttendance((prev) => ({
            ...prev,
            [studentId]: !prev[studentId],
        }));
    };
    console.log(attendance);


    const handleSubmitAttendance = () => {
        const absentStudents = course?.students?.filter(
            (student) => !attendance[student.studentId]
        );
        console.log(absentStudents);

        const updatedStudents = absentStudents.map((student) => ({
            studentId: student.studentId,
            absences: student.absences + 1,
        }));
        console.log(updatedStudents);


        if (updatedStudents.length > 0) {
            dispatch(updateCourseAbsences({ courseId: course.id, students: updatedStudents }));
            console.log("Absent students updated:", updatedStudents);
        } else {
            console.log("No absent students to update.");
        }

        Navigate("/dashboard");
    };

    return (
        <div className="course-details p-6">
            <h1 className="text-3xl font-bold mb-4">{course?.name}</h1>
            <h2 className="text-xl font-semibold mb-4">لیست دانشجویان</h2>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-left">
                    <thead>
                        <tr>
                            <th className="px-6 py-4 text-gray-600 font-semibold">شماره دانشجویی</th>
                            <th className="px-6 py-4 text-gray-600 font-semibold text-center">حضور</th>
                        </tr>
                    </thead>
                    <tbody>
                        {course?.students?.map((student) => (
                            <tr key={student.studentId} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{student.studentId}</td>
                                <td className="px-6 py-4 text-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-500"
                                        checked={attendance[student.studentId] || false}
                                        onChange={() => handleAttendanceChange(student.studentId)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 text-center">
                <button
                    onClick={handleSubmitAttendance}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    ثبت
                </button>
            </div>
        </div>
    );
};

export default CourseDetails;
