import React from 'react'

interface IHomeProps {
    className?: string;
}

function Home({className = ""} : IHomeProps) {
    return (
        <div className={""}>Home</div>
    )
}

export default Home