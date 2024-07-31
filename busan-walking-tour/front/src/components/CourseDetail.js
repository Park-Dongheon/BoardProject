import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/api/courses/${courseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch course details');
            }
            return response.json();
        })
        .then(data => {
            setCourse(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, [courseId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!course) return <p>No course found</p>;

    return (
        <div>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <p>Start: {course.startLocation}</p>
            <p>End: {course.endLocation}</p>
            <p>Length: {course.length} km</p>
            <p>Duration: {course.duration} hours</p>
        </div>
    );
};

export default CourseDetail;
