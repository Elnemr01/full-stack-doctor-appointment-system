
import { assets } from "@/assets/assets"
import { Carousel } from "@/components/ui/carousel"
import { useMemo } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

const HomeSlider = () => {
    const navigate = useNavigate();
    const slides = useMemo(()=> [
        {
        src: assets.heroCarousel1,
        alt: "Hero Slide 1",
        },
        {
        src: assets.heroCarousel2,
        alt: "Hero Slide 2",
        },
        {
        src: assets.heroCarousel3,
        alt: "Hero Slide 3",
        },
    ],[]);

    const handleNavigate=()=> {
        if(!localStorage.getItem("user")) {
            toast.error("Please login to book an appointment")
            return;
        }

        navigate("/doctors",{replace:true});
    }

return (
        <section className="relative w-full">
        <Carousel
            items={slides}
            autoplay={true}
            interval={3000}
            showArrows={true}
            showDots={true}
            className="w-full h-[calc(100vh-70px)] overflow-hidden flex itmes-center justify-center"
            classNames={{
                item: "w-full h-full bg-cover bg-center",
            }}
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white px-6">
                <h2 className="text-xl md:text-6xl font-bold mb-6">
                    Book Your Appointment Today
                </h2>
                <p className="text-xlg md:text-xl mb-8 max-w-2xl mx-auto">
                    Get expert medical care from our experienced doctors. Schedule your visit in just a few clicks.
                </p>
                <button
                type="button"
                onClick={()=> handleNavigate()}
                className="inline-block bg-white text-blue-600 px-8 cursor-pointer
                py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                >
                    Browse Doctors
                </button>
            </div>
        </div>
        </section>
    )
}

export default HomeSlider