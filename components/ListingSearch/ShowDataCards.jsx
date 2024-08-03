import { Button, ButtonGroup, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import React from 'react'
import { SearchMap } from '../Maps/index'
import Footer from '../common/Footer/Footer';
import SearchCard from '../SearchPage/SearchCrd';

const defaultProps = {
    lat: Number(23.079727),
    lng: Number(77.37855),
  
    zoom: 13,
  };

function ShowDataCards({cardData}) {
  return (
    <div className="w-screen flex flex-grow pt-20">
        {/* static */}
        <div className="w-1/2 flex flex-col gap-4 p-4 mb-10 fixed ">
          <Card className="h-[70vh] ">
            <SearchMap center={defaultProps} />
          </Card>
        </div>
        {/* scrollable */}

        <div className="w-1/2 flex flex-col p-6 overflow-y-auto ml-auto height-full">
          <div className="flex justify-between items-center p-4">
            <h3 className="text-3xl uppercase font-bold">35000+ Properties</h3>
            <div className="flex space-x-2">
              <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
                hide map
              </Button>
              <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
                sort
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 w-full">
            <ButtonGroup
              radius="sm"
              size="lg"
              className="w-full border-default-300"
            >
              <Button className="flex-1">Homes</Button>
              <Button className="flex-1">Neighborhood</Button>
            </ButtonGroup>
          </div>

          <div className="grid p-4 grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-full">
            {cardData.map((card, index) => (
              // <Card key={index} className="py-4">
              //   <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              //     <p className="text-tiny uppercase font-bold">
              //       {card.description}
              //     </p>
              //     <small className="text-default-500">{card.address}</small>
              //     <h4 className="font-bold text-large">{card.title}</h4>
              //   </CardHeader>
              //   <CardBody className="overflow-visible py-2">
              //     <Image
              //       alt={`Card background for ${card.title}`}
              //       className="object-cover rounded-xl"
              //       src={card.imageUris[0]}
              //       width={270}
              //     />
              //   </CardBody>
              // </Card>
              <SearchCard key={index} property={card} />
            ))}
          </div>
          <Footer />
        </div>
      </div>
  )
}

export default ShowDataCards