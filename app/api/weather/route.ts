import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_LOCATION } from '../../constants/defaultLocations';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = DEFAULT_LOCATION.coord.lat;
    const lon = DEFAULT_LOCATION.coord.lon;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch (error) {
    console.log(error);
    return new Response('Error fetching weather data', { status: 500 });
  }
}
