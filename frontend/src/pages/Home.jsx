import React from 'react';

function Home() {
    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            {/* Main Body */}
            <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <h1>Welcome to the Attendance Management System</h1>
                <p style={{ fontSize: '1.1rem', color: '#333' }}>
                    Streamline and track attendance effortlessly.
                </p>
            </main>
        </div>
    );
}

const navLinkStyle = {
    color: '#ffffff',
    marginLeft: '1.5rem',
    textDecoration: 'none',
    fontWeight: '500',
};

export default Home;
