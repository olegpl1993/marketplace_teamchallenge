import { FC, useState } from 'react';

import ListingSearchCalendar from './components/ListingSearchCalendar';
import ListingSearchInput from './components/ListingSearchInput';
import SpecyfyingSorting from './components/SpecyfyingSorting';

import sort from '@/shared/assets/icons/sort-date.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const ListingByDate: FC = () => {
  const [sortingOpen, setSortingOpen] = useState(false);

  return (
    <VStack className="w-full mb-2 lg:mb-0 items-center lg:justify-between gap-[18px] lg:gap-0">
      <div className="flex items-center justify-center rounded-[16px] relative">
        <Text
          Tag="span"
          text="Сортування за"
          size="sm"
          font-normal
          color="white"
          className="w-[99px] hidden md:block"
        />
        <Button variant="clear" onClick={() => setSortingOpen((prev) => !prev)}>
          <Icon
            aria-hidden="true"
            Svg={sort}
            width={24}
            height={32}
            className="stroke-white"
          />
        </Button>
        {sortingOpen && <SpecyfyingSorting />}
      </div>
      <ListingSearchInput />
      <ListingSearchCalendar classNameDateSort="hidden" />
    </VStack>
  );
};

export default ListingByDate;
