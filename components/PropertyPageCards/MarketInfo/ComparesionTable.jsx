import React from "react";
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
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

function ComparesionTable({ data }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const truncateAddress = (address) => {
    return address.length > 10 ? address.substring(0, 10) + '...' : address;
  };

  const convertToSqFt = (sqMeters) => {
    return Math.round(sqMeters * 10.7639);
  };

  const columns = [
    { key: "address", label: "ADDRESS" },
    { key: "daysOtm", label: "DAYS OTM" },
    { key: "soldDate", label: "SOLD DATE" },
    { key: "soldPrice", label: "SOLD PRICE" },
    { key: "status", label: "STATUS" },
    { key: "beds", label: "BEDS" },
    { key: "baths", label: "BATHS" },
    { key: "area", label: "AREA" },
    { key: "epc", label: "EPC CUR. & POT." },
    { key: "distance", label: "DISTANCE" },
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
      case "daysOtm":
        return "No data";
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
              <Chip color="warning" variant="flat">
                {item.epcData.currentEnergyEfficiency}
              </Chip>
            </Tooltip>
            <Tooltip content="Current Energy Rating">
              <Chip color="success" variant="flat">
                {item.epcData.currentEnergyRating}
              </Chip>
            </Tooltip>
          </div>
        ) : "N/A";
      case "distance":
        return "N/A";
      default:
        return "N/A";
    }
  };

  return (
    <Table aria-label="Property listings table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.uprn}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default ComparesionTable;