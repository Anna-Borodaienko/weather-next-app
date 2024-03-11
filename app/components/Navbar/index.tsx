'use client';

import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { SearchInput } from '../SearchInput';
import { ThemeDropdown } from '../ThemeDropdown';

export const Navbar: React.FC = (): JSX.Element => {
  const router = useRouter();
  return (
    <div className='w-full py-4 flex items-center justify-between'>
      <div className='left'></div>
      <div className='search-container flex shrink-0 w-full gap-2 sm:w-fit'>
        <SearchInput />
        <div className='btn-group flex items-center gap-2'>
          <ThemeDropdown />
          <Button
            className='source-code flex items-center gap-2'
            onClick={() => {
              router.push(
                'https://github.com/Anna-Borodaienko/weather-next-app',
              );
            }}>
            <GitHubLogoIcon />
            Source Code
          </Button>
        </div>
      </div>
    </div>
  );
};
