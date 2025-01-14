'use client';
import React, { useEffect, useState } from 'react';

type LocalDateProps = {
  format?: Intl.DateTimeFormatOptions;
};

const LocalDate: React.FC<LocalDateProps> = ({ format }) => {
  const [date, setDate] = useState<string>(new Date().toISOString());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date().toISOString());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <time className='text-[0.6rem] font-medium content-center text-left md:text-right' suppressHydrationWarning>
      {new Date(date).toLocaleString('en-US', format).replace(/,/g, '')}
    </time>
  );
};

export default LocalDate;