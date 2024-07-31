// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside>
            <h3>Explore</h3>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/map">Map</Link></li>
            </ul>
            <h3>Filters</h3>
            <form>
                <label htmlFor="search">Search:</label>
                <input type="text" id="search" name="search" />
                <button type="submit">Search</button>
            </form>
        </aside>
    );
};

export default Sidebar;
