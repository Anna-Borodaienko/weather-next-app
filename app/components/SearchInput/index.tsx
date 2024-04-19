// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import { DEFAULT_SUGGESTIONS as suggestions } from '@/app/constants/defaultLocations';
import { useGlobalContextUpdate } from '@/app/context/GlobalContext';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { commandIcon } from '../icons';

export const SearchInput: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const { setActiveCityCoords } = useGlobalContextUpdate();

  const changeActiveCityCoords = (lat: number, lon: number) => {
    setActiveCityCoords({ lat, lon });
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'SEARCH_CITY',
    requestOptions: {
      types: ['(cities)'],
    },
    debounce: 300,
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API by setting the second parameter to "false"
      setValue(description, false);
      setOpen(false);
      setValue('');
      clearSuggestions();
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        changeActiveCityCoords(lat, lng);
      });
    };

  return (
    <div className='search-btn'>
      <Button
        variant={'outline'}
        size={'lg'}
        onClick={() => setOpen(true)}
        className='border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200'>
        <p className='text-sm text-muted-foreground'>Search city...</p>
        <div className='command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2'>
          {commandIcon}
          <span className='text-[9px]'>F</span>
        </div>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}>
        <CommandInput
          placeholder='Search city...'
          value={value}
          onValueChange={setValue}
          disabled={!ready}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            {!data.length && (
              <>
                {suggestions.map((suggestion, i) => (
                  <CommandItem
                    key={i}
                    onSelect={handleSelect(suggestion)}>
                    {suggestion.description}
                  </CommandItem>
                ))}
              </>
            )}
            {status === 'OK' &&
              data.map((suggestion) => (
                <CommandItem
                  key={suggestion.place_id}
                  onSelect={handleSelect(suggestion)}>
                  {suggestion.description}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
