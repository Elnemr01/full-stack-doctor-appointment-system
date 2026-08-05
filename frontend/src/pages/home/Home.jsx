import Footer from '@/myComponents/footer/Footer'
import HomeSlider from '@/myComponents/homeSlider/HomeSlider'
import MainLayout from '@/myComponents/mainLayout/MainLayout'
import SomeDoctors from '@/myComponents/someDoctors/SomeDoctors'
import React from 'react'

const Home = () => {
    return (
        <MainLayout>
            <HomeSlider/>
            <SomeDoctors/>
            <Footer/>
        </MainLayout>
    )
}

export default Home