import React from "react";
import { useSelector } from "react-redux";
import CourseTable from "./CourseTable";

const StudentDashboard = () => {

    const student = useSelector((state) => state.auth.user);

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="flex items-center space-x-6 bg-white p-6 rounded shadow">
                <div className="w-24 h-24 bg-gray-200  rounded-full grid place-items-center">
                    {student?.profilePicture ? (
                        <img
                            src={student.profilePicture}
                            alt="Profile"
                            className="w-full h-full rounded-full"
                        />
                    ) : (
                        <div className="bg-gray-300 h-20 w-20 rounded-full bg-checkered"></div>
                    )}
                </div>
                <div className="pr-4">
                    <h1 className="text-2xl font-bold text-gray-700">{student?.name}</h1>
                    <p className="text-gray-500 my-2">شماره دانشجویی: {student?.id}</p>
                    <p className="text-gray-500">رشته: {student?.major}</p>
                </div>
            </div>


            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-700 mb-4">لیست دروس</h2>
                <CourseTable />
            </div>
        </div>
    );
};

export default StudentDashboard;
