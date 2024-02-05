import React from 'react';
import Footer from './Footer';
import Notes from './Notes';
const Home = (props) => {
    const {showAlert} = props;
    return (
        <div>
            <Notes showAlert={showAlert} />
            <Footer />
        </div>

    )
}

export default Home
