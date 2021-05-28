// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type ImageResult = {
  data: Image[];
  after: string | null;
};

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }): Promise<any> =>
    api.get<ImageResult>('/api/images', {
      params: { after: pageParam },
    });
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: (result, pages) => result.data.after,
  });
  const formattedData = useMemo(() => {
    return data?.pages.map(page => page.data.data).flat();
  }, [data]);
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <p>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </p>
  );
}
