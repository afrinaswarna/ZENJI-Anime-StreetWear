import React from 'react';
import HeroSection from '../components/HeroSection';
import BestSellerProducts from '../components/BestSellerProducts';
import BigSale from '../components/BigSale';
import TeeComboBuilder from '../components/TeeComboBuilder';
import CreateYourOwnStory from '../components/CreateYourOwnStory';

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <BestSellerProducts/>
            <BigSale/>
            <TeeComboBuilder/>
            <CreateYourOwnStory/>
        </div>
    );
};

export default Home;