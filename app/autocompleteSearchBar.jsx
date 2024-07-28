import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { motion } from 'framer-motion';
import { Icon } from "@iconify/react";



export default function AutocompleteSearch({properties}) {





  
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [priceRange, setPriceRange] = useState("all");
  const  [propertyType , setPropertyType] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const [bathrooms, setBathrooms] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    console.log("searching for", searchTerm );


    let results = properties.filter((property) => {
        return property.description.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setResults(results);


    }

    useEffect(() => {
        if(searchTerm === "") {
            setResults([]);
            return;
        }
        handleSearch();
    }, [searchTerm]);


  return (

  <div className="">
      <Card className="w-full  p-4 flex flex-col lg:flex-row gap-4">
        <Input placeholder="Search" variant="bordered"  className="flex-grow" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button color="secondary" className="w-full lg:w-auto text-white font-semibold"   
        onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
        ><p className="p-1 flex items-start">Advance <Icon icon="akar-icons:chevron-down" className="m-1 font-bold" /></p></Button>
      </Card>

{
    results.length > 0 && (
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, y: -20 }}

      >
        <Card className="w-full p-4 mt-4">
      {results.map((result) => (

              <h1 key={result} className="text-lg font-semibold">{result.post_town}</h1>
           
      ))}
        </Card>
      </motion.div>
    )

}


      {
        isAdvancedSearch && (
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          <Card >
            <CardBody className="w-full p-4 mt-1 flex flex-col lg:flex-row gap-4">
            <Select
              placeholder="Price range"
              variant="bordered"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="100000">$100,000</SelectItem>
              <SelectItem value="200000">$200,000</SelectItem>
              <SelectItem value="300000">$300,000</SelectItem>
              <SelectItem value="400000">$400,000</SelectItem>
              <SelectItem value="500000">$500,000</SelectItem>
              <SelectItem value="600000">$600,000</SelectItem>
              <SelectItem value="700000">$700,000</SelectItem>
              <SelectItem value="800000">$800,000</SelectItem>
              <SelectItem value="900000">$900,000</SelectItem>
              <SelectItem value="1000000">$1,000,000</SelectItem>
            </Select>
            <Select
              placeholder="Property type"
              variant="bordered"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </Select>
            <Select
              placeholder="Bedrooms"
              variant="bordered"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="7">7</SelectItem>
              </Select>
            </CardBody>
            <CardFooter className="">
                <Button color="secondary" className="w-full lg:w-auto text-white font-semibold" ><p className="p-1">Search</p></Button>
                </CardFooter>
           
         
        </Card>
        
        </motion.div>
        )
      }

    </div>
  );
}