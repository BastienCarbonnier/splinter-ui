"use client"
import { createTheme } from '@mui/material';
import React from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/merger');
  
  return (
    <></>
  )
}
