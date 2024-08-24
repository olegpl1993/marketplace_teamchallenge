import { FC } from 'react';

import { ListingDataMapProps } from './ListingDataMap';

import { Product } from '@/enteties/Product';
import OfferController from '@/pages/AdminPage/ui/Tabs/ManagingOffers/OfferController';
import idIcon from '@/shared/assets/icons/id.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface ApiProductsResponse {
  products: Product[];
}

const ListingDataMapMobile: FC<ListingDataMapProps> = ({ id, isAscending }) => {
  const { data, isLoading } = useAxios<ApiProductsResponse>(
    `${ApiRoutes.PRODUCTS}?sellerId=${id}&sortDirection=${isAscending ? 1 : -1}`,
  );

  const editHandler = () => {};
  const publishHandler = () => {};
  const rejectHandler = () => {};
  const blockHandler = () => {};

  if (!isLoading && !data?.products) {
    return (
      <div>
        <Text Tag="p" text="Не знайдено" size="md" color="white" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[12px] w-full ">
      {!isLoading ? (
        data?.products.map((elem) => {
          return (
            <div
              key={elem?._id}
              className="h-[128px] min-w-[319px] w-full mb-3 p-3 bg-selected-dark rounded-2xl flex items-center justify-center flex-col"
            >
              <div className="flex items-center justify-around w-full">
                <div className="rounded-l-2xl">
                  <Text
                    Tag="p"
                    text={elem?.created_at.slice(0, 10)}
                    size="md"
                    color="white"
                  />
                </div>
                <div className="bg-disabled flex items-center justify-center gap-2 rounded-xl px-3">
                  <Icon Svg={idIcon} className="w-[16px] h-[16px] stroke-main-dark" />
                  <Text Tag="p" text={elem?.sellerId} size="md" color="dark" />
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <Text Tag="p" text={elem?.name} size="md" color="white" />
                </div>

                <div className="rounded-r-2xl">
                  <OfferController
                    editHandler={editHandler}
                    publishHandler={publishHandler}
                    rejectHandler={rejectHandler}
                    blockHandler={blockHandler}
                  />
                </div>
              </div>
            </div>

            // **************************************************!
            // <tr
            //   key={elem?._id}
            //   className="h-[128px] w-full flex items-center justify-center flex-col mb-3 bg-selected-dark rounded-2xl"
            // >
            //   <td className='flex items-center justify-center'>
            //   <td aria-label="Дата" className="pl-2.5 rounded-l-2xl">
            //     <Text Tag="p" text={elem?.created_at.slice(0, 10)} size="md" color="white" />
            //   </td>
            //   <td aria-label="ID Продавця" className="pl-2.5">
            //     <Text Tag="p" text={elem?.sellerId} size="md" color="white" />
            //   </td>
            //   </td>
            //   <td className='flex items-center justify-center'>
            //   <td aria-label="Назва товару" className="pl-2.5">
            //     <Text Tag="p" text={elem?.name} size="md" color="white" />
            //   </td>

            //   <td aria-label="Дії" className="rounded-r-2xl">
            //     <OfferController
            //       editHandler={editHandler}
            //       publishHandler={publishHandler}
            //       rejectHandler={rejectHandler}
            //       blockHandler={blockHandler}
            //     />
            //   </td>
            //   </td>
            // </tr>
          );
        })
      ) : (
        <div>
          <Text Tag="p" text="Loading..." size="md" color="white" />
        </div>
      )}
    </div>
  );
};

export default ListingDataMapMobile;
