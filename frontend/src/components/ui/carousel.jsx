"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

function Carousel({
  items = [],
  className,
  autoplay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  classNames = {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    if (!autoplay || items.length <= 1) return
    const timer = setInterval(() => {
      if (!isHovered) next()
    }, interval)
    return () => clearInterval(timer)
  }, [autoplay, interval, isHovered, next, items.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (items.length === 0) return null

  return (
    <div
      className={cn("relative overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {item.render ? item.render() : (
              <img
                src={item.src}
                alt={item.alt || `Slide ${index + 1}`}
                className={cn("w-full h-auto object-cover", classNames.item)}
              />
            )}
            {item.content && (
              <div className={cn("absolute inset-0 flex items-center justify-center p-8", classNames.content)}>
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {showArrows && items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-opacity",
              "opacity-0 hover:opacity-100 group-hover:opacity-100",
              classNames.prev
            )}
            onClick={prev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-opacity",
              "opacity-0 hover:opacity-100 group-hover:opacity-100",
              classNames.next
            )}
            onClick={next}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {showDots && items.length > 1 && (
        <div className={cn("absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2", classNames.dots)}>
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/75",
                classNames.dot
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CarouselItem({ children, className, ...props }) {
  return <div className={cn("w-full flex-shrink-0", className)} {...props}>{children}</div>
}

Carousel.Item = CarouselItem

export { Carousel }