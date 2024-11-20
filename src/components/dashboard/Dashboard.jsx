import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from './student/StudentDashboard ';
import ProfessorDashboard from './professor/ProfessorDashboard';

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();


    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="mb-4 text-xl font-bold text-center text-gray-800">
                {`خوش آمدید، ${user.name}`}
            </h2>
            {user.major ? (
                < StudentDashboard />
            ) : (
                < ProfessorDashboard />
            )}
        </div>
    );
};

export default Dashboard;
