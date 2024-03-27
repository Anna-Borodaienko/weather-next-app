import axios from 'axios';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface IconWeatherProps {
  iconCode: string;
}

export const IconWeather: React.FC<IconWeatherProps> = ({
  iconCode,
}: IconWeatherProps): JSX.Element => {
  const [iconUrl, setIconUrl] = useState('');

  const { theme } = useTheme();

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const response = await axios.get(
          `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
        );
        setIconUrl(response.config.url || '');
      } catch (error) {
        console.error('Error fetching icon:', error);
      }
    };

    fetchIcon();
  }, [iconCode]);

  return (
    <div>
      {iconUrl && (
        <Image
          src={iconUrl}
          alt='Weather icon'
          width={50}
          height={50}
          className={`flex justify-center ${theme === 'light' ? 'invert' : ''}`}
        />
      )}
    </div>
  );
};
