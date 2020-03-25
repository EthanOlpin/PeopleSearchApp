import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Welcome</h1>
            <p>This is a web app completed in fufillment of Health Catalyst's technical assesment
            for Full Stack Engineer Intern candidates. This app integrates a Web API utilizing .NET Entity Framework
            and a frontend comprised of React.js components. Due to the requirement that solutions can be cloned and
            run without additional setup steps, my API relies on an in-memory database, but could easily be reconfigured
            with a remote database if desired.</p>
            <h2>Getting started</h2>
            <p>To begin, we can add some people to the database by selecting "Add People" from the navigation menu
            at the top of the screen. Once we have added some people to the database we can try searching for them
            on the "Search" page.</p>
        </div>)
}

export default Home