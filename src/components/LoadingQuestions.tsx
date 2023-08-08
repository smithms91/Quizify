'use client';

import Image from 'next/image'
import React, { useEffect } from 'react'
import { Progress } from './ui/progress'
import { clear } from 'console';

type Props = {
  finished: boolean;
}

const loadingTexts = [
  "Generating Questions",
  "Unleashing the power of curiosity",
  "Brb.. Calling God",
  "Computing the difference between a duck and a deer",
  "Loading the questions",
  "Wait until you see these questions :)",
]

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = React.useState(0);
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length)
      setLoadingText(loadingTexts[randomIndex])
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) {
          return 100;
        }
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 2.5;
        }
        return prev + 0.5
      })
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [finished])

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center'>
      <Image src={'/loading.gif'} width={400} height={400} alt="Loading animation" />
      <Progress value={progress} className='w-full mt-4' />
      <h1 className='mt-2 text-xl'>{loadingText}</h1>
    </div>
  )
}

export default LoadingQuestions