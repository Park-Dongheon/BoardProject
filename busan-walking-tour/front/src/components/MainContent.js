// src/components/MainContent.js
import React, { useEffect, useState } from 'react';
import { fetchWalkingCourses } from '../api/fetchWalkingCourses';
import CourseList from './CourseList';
import Map from './Map'; // 지도 컴포넌트

const MainContent = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWalkingCourses(1, 10)
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <h2>Busan Walking Tours</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <CourseList courses={courses} />
            <Map latitude={35.1796} longitude={129.0756} /> {/* 부산의 위도와 경도 */}
        </main>
    );
};

export default MainContent;
