import React from 'react'
import { Carousel } from "@/components/ui/carousel"
import { assets } from "@/assets/assets"

const HomeSlider = () => {
    const slides = [
    { src: assets.image1, alt: "Hero 1" },
    { src: assets.about, alt: "About us", content: (
        <div className="text-center text-white">
            <h2 className="text-4xl font-bold">Welcome to Our Clinic</h2>
        </div>
        )},
    ]

    return (
        <>
            <Carousel 
            items={slides} 
            className="h-[600px]" 
            autoplay 
            interval={5000}
            />
            dddd
        </>
    )
}

export default HomeSlider