'use client'
import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Loader from './components/loader/loader'
import "./globals.css";

// Components with skeleton loaders
const Hero = React.lazy(() => import('./hero/page'))
const About = React.lazy(() => import('./About/mainPage/about'))
const Service = React.lazy(() => import('./Service/mainFile/Service'))
const Carousel = React.lazy(() => import('./components/ui/LogoCarousel'))
const WhyChooseUs = React.lazy(() => import('./components/ui/whyChooseUs'))
 
const Carrer = React.lazy(() => import("./carrer/carrer"))
 
// const Carrer = React.lazy(() => import("./whychoooseus/whychooseus"))
 
const Cta = React.lazy(() => import("./contact/mainPage/cta"))
const Faq = React.lazy(() => import("./faq/faq"))
const WhereweServe = React.lazy(() => import("./whereweserve/whereweserve"))
const Footer = React.lazy(() => import("./components/footer"))

// Skeleton loader components
const SectionSkeleton = ({ height = 'h-[60vh]' }) => (
  <div className={`w-full ${height} bg-gray-100 rounded-lg animate-pulse`} />
)

function Page() {
  return (
    <>
      <Loader >
      <React.Suspense fallback={<SectionSkeleton height="h-screen" />}>
        <Hero />
      </React.Suspense>

      <ScrollTriggeredSection>
        <React.Suspense fallback={<SectionSkeleton />}>
          <About />
        </React.Suspense>
      </ScrollTriggeredSection>

       <ScrollTriggeredSection>
        <React.Suspense fallback={<SectionSkeleton />}>
          <Carousel  />
        </React.Suspense>
      </ScrollTriggeredSection>

      <ScrollTriggeredSection>
        <React.Suspense fallback={<SectionSkeleton />}>
          <Service />
        </React.Suspense>
      </ScrollTriggeredSection>

      <ScrollTriggeredSection>
        <React.Suspense fallback={<SectionSkeleton />}>
          <WhyChooseUs />
        </React.Suspense>
      </ScrollTriggeredSection>

      <ScrollTriggeredSection>
        <React.Suspense fallback={<SectionSkeleton height="h-[80vh]" />}>
          <WhereweServe />
        </React.Suspense>
      </ScrollTriggeredSection>

      <ScrollTriggeredSection>
        <React.Suspense fallback={<SectionSkeleton />}>
          <Faq />
        </React.Suspense>
      </ScrollTriggeredSection>

      <ScrollTriggeredSection>
        <React.Suspense fallback={<SectionSkeleton height="h-[40vh]" />}>
          <Cta />
        </React.Suspense>
      </ScrollTriggeredSection>

      <ScrollTriggeredSection>
        <React.Suspense fallback={<SectionSkeleton />}>
          <Carrer />
        </React.Suspense>
      </ScrollTriggeredSection>

      
      </Loader>
    </>
  )
}

// Scroll-triggered animation wrapper
const ScrollTriggeredSection = ({ children }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' }
        },
        hidden: { 
          opacity: 0, 
          y: 40 
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export default Page