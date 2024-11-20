import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../redux/studentSlice";

const CourseTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    const courses = useSelector((state) => state.student.courses);
    const student = useSelector((state) => state.auth.user);

    const studentCourses = courses?.filter(course =>
        student.courses.includes(Number(course.id))
    );


    const numberAbsences = studentCourses.map(course => {
        const studentInCourse = course.students.find(studentInCourse => studentInCourse.studentId === student.id);
        return studentInCourse ? studentInCourse.absences : 0;
    });

    return (
        <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="px-6 py-4 text-gray-600 font-bold border-b">نام درس</th>
                        <th className="px-6 py-4 text-gray-600 font-bold border-b">تعداد جلسات</th>
                        <th className="px-6 py-4 text-gray-600 font-bold border-b">تعداد غیبت</th>
                        <th className="px-6 py-4 text-gray-600 font-bold border-b">درصد حضور</th>
                    </tr>
                </thead>
                <tbody>
                    {studentCourses.map((course, index) => (
                        <tr key={course.id} className="hover:bg-gray-100">
                            <td className="px-6 py-4">{course.name}</td>
                            <td className="px-6 py-4">{course.totalSessions}</td>
                            <td
                                className="px-6 py-4 text-blue-500 cursor-pointer"
                            >
                                {numberAbsences[index]}
                            </td>
                            <td className="px-6 py-4">
                                {((course.totalSessions - numberAbsences[index]) / course.totalSessions) * 100} %
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default CourseTable;
