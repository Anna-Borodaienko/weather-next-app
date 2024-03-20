import axios from 'axios';
import { NextResponse } from 'next/server';

import { DEFAULT_LOCATION } from '../../constants/defaultLocations';

export async function GET() {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = DEFAULT_LOCATION.coord.lat;
    const lon = DEFAULT_LOCATION.coord.lon;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch (error) {
    console.log(error);
    return new Response('Error fetching forecast data', { status: 500 });
  }
}
