import dynamic from 'next/dynamic';

export const Map = dynamic(() => import('./Map'), {
  loading: () => <p>loading...</p>,
  ssr: false,
});
