import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { Card as CardItem } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [selectedImg, setSelectedImg] = useState('');

  function openViewModal(urlImg: string): void {
    setSelectedImg(urlImg);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards.map(card => (
          <CardItem
            key={card.id}
            data={card}
            viewImage={() => {
              openViewModal(card.url);
            }}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={selectedImg} />
    </>
  );
}
