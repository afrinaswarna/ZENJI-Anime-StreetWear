import React from 'react';
import HeroSection from '../components/HeroSection';
import BestSellerProducts from '../components/BestSellerProducts';
import BigSale from '../components/BigSale';
import TeeComboBuilder from '../components/TeeComboBuilder';
import CreateYourOwnStory from '../components/CreateYourOwnStory';
import NewArrival from '../components/NewArrival';
import MarqueeSection from '../components/MarqueeSection';

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <NewArrival/>
            <BestSellerProducts/>
            <BigSale/>
            <CreateYourOwnStory/>
            <TeeComboBuilder/>
            <MarqueeSection/>
            
        </div>
    );
};

export default Home;