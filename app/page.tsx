import { Navbar } from './components/Navbar';

const Home: React.FC = (): JSX.Element => {
  return (
    <main className='mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto'>
      <Navbar />
    </main>
  );
};

export default Home;
