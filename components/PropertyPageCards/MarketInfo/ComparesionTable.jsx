import React, { useState, useMemo } from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableHeader,
  TableRow,
  TableColumn,
  Chip,
  Tooltip,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

function ComparesionTable({ data }) {
  const [sortDescriptor, setSortDescriptor] = useState({});
  const [filters, setFilters] = useState({
    soldPrice: null,
    beds: null,
    baths: null
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const truncateAddress = (address) => {
    return address.length > 10 ? address.substring(0, 10) + "..." : address;
  };

  const convertToSqFt = (sqMeters) => {
    return Math.round(sqMeters * 10.7639);
  };

  const columns = [
    { key: "address", label: "ADDRESS" },
    { key: "soldDate", label: "SOLD DATE" },
    { key: "soldPrice", label: "SOLD PRICE" },
    { key: "status", label: "STATUS" },
    { key: "beds", label: "BEDS" },
    { key: "baths", label: "BATHS" },
    { key: "area", label: "AREA" },
    { key: "epc", label: "EPC CUR. & POT." },
  ];

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "address":
        return (
          <Tooltip content={item.full_address}>
            <User
              avatarProps={{
                icon: <Icon icon="mdi:home" width="20" height="20" />,
                className: "bg-gray-100",
              }}
              name={truncateAddress(item.full_address)}
            />
          </Tooltip>
        );
      case "soldDate":
        return item.saleEstimates && item.saleEstimates[0]
          ? formatDate(item.saleEstimates[0].ingestedAt)
          : "N/A";
      case "soldPrice":
        return item.saleEstimate
          ? `£${parseInt(item.saleEstimate.lowerPrice).toLocaleString()}`
          : "N/A";
      case "status":
        return (
          <Chip color="primary" variant="flat">
            Sold
          </Chip>
        );
      case "beds":
        return (
          <div className="flex items-center">
            <Icon icon="mdi:bed" className="mr-2" />
            {item.attributes.bedrooms || "N/A"}
          </div>
        );
      case "baths":
        return (
          <div className="flex items-center">
            <Icon icon="mdi:bathtub" className="mr-2" />
            {item.attributes.bathrooms || "N/A"}
          </div>
        );
      case "area":
        return item.epcData && item.epcData.totalFloorArea
          ? `${convertToSqFt(item.epcData.totalFloorArea)} ft²`
          : "N/A";
      case "epc":
        return item.epcData ? (
          <div className="flex gap-2">
            <Tooltip content="Current Energy Efficiency">
              <Chip color="success" variant="flat">
                {item.epcData.currentEnergyRating}
              </Chip>
            </Tooltip>
            <Tooltip content="Current Energy Rating">
              <Chip color="warning" variant="flat">
                {item.epcData.currentEnergyEfficiency}
              </Chip>
            </Tooltip>
          </div>
        ) : (
          "N/A"
        );
      default:
        return "N/A";
    }
  };

  const filteredAndSortedData = useMemo(() => {
    return [...data]
      .filter(item => {
        if (filters.soldPrice && item.saleEstimate) {
          const price = parseInt(item.saleEstimate.lowerPrice);
          const [min, max] = filters.soldPrice.split('-').map(Number);
          if (price < min || price > max) return false;
        }
        if (filters.beds && item.attributes.bedrooms !== filters.beds) return false;
        if (filters.baths && item.attributes.bathrooms !== filters.baths) return false;
        return true;
      })
      .sort((a, b) => {
        if (!sortDescriptor.column) return 0;

        let aValue, bValue;

        switch (sortDescriptor.column) {
          case "soldDate":
            aValue = a.saleEstimates && a.saleEstimates[0] ? new Date(a.saleEstimates[0].ingestedAt) : new Date(0);
            bValue = b.saleEstimates && b.saleEstimates[0] ? new Date(b.saleEstimates[0].ingestedAt) : new Date(0);
            break;
          case "soldPrice":
            aValue = a.saleEstimate ? parseInt(a.saleEstimate.lowerPrice) : 0;
            bValue = b.saleEstimate ? parseInt(b.saleEstimate.lowerPrice) : 0;
            break;
          case "beds":
            aValue = a.attributes.bedrooms || 0;
            bValue = b.attributes.bedrooms || 0;
            break;
          case "baths":
            aValue = a.attributes.bathrooms || 0;
            bValue = b.attributes.bathrooms || 0;
            break;
          default:
            return 0;
        }

        if (aValue === bValue) return 0;
        if (sortDescriptor.direction === "ascending") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  }, [data, sortDescriptor, filters]);

  const onSortChange = (descriptor) => {
    setSortDescriptor(descriptor);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const priceRanges = [
    { key: "0-100000", label: "£0 - £100,000" },
    { key: "100000-250000", label: "£100,000 - £250,000" },
    { key: "250000-500000", label: "£250,000 - £500,000" },
    { key: "500000-1000000", label: "£500,000 - £1,000,000" },
    { key: "1000000-100000000", label: "£1,000,000+" },
  ];

  const bedOptions = [1, 2, 3, 4, 5, "6+"];
  const bathOptions = [1, 2, 3, 4, "5+"];

  const renderFilterDropdown = (key, options, label) => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat">
          {filters[key] ? `${label}: ${filters[key]}` : label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label={`${label} filter options`}
        onAction={(selectedKey) => handleFilterChange(key, selectedKey)}
      >
        <DropdownItem key="all">All</DropdownItem>
        {options.map((option) => (
          <DropdownItem key={option.key || option}>
            {option.label || option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <div>
      <div className="flex gap-4 mb-4">
        
      </div>
      <Table
        aria-label="Property listings table"
        isHeaderSticky
        sortDescriptor={sortDescriptor}
        onSortChange={onSortChange}
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[400px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn 
              key={column.key} 
              allowsSorting={["soldDate", "soldPrice", "beds", "baths"].includes(column.key)}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredAndSortedData} className="h-[50vh] overflow-y-auto">
          {(item) => (
            <TableRow key={item.uprn}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ComparesionTable;