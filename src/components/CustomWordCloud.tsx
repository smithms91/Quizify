'use client';

import { useTheme } from 'next-themes';
import React from 'react'
import D3WorldCloud from 'react-d3-cloud';
import { useRouter } from 'next/navigation'

type Props = {
  formattedTopics: { text: string, value: number }[];
}

const CustomWordCloud = ({ formattedTopics }: Props) => {
  const theme = useTheme();
  const router = useRouter();

  const fontSizeMapper = (word: { value: number }) => {
    return Math.log2(word.value) * 5 + 16;
  }

  return (
    <>
      <D3WorldCloud onWordClick={(event, word) => router.push(`/quiz?topic=${word.text}`)} data={formattedTopics} fill={theme.theme == 'dark' ? 'white' : 'black'} height={550} font="Times" fontSize={fontSizeMapper} rotate={0} padding={10} />
    </>
  )
}

export default CustomWordCloud