import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";


const getChipColor = (rating) => {
  switch (rating) {
    case "Poor":
      return "red";
    case "Very Poor":
      return "red";
    case "Average":
      return "orange";
    case "N/A":
      return "gray";
    case "Good":
      return "blue";
    case "Low":
      return "purple";
    case "Very Good":
      return "green";
    default:
      return "black"; // default color if none of the conditions match
  }
};

export function EnergyPerformanceTable({ data }) {
  return (
    <div>
      <h4 className="font-semibold text-sm pl-1 text-gray-500 mb-2">Breakdown Of property&apos;s energy performance</h4>
      <div className="overflow-y-auto " style={{ maxHeight: '300px' }}>
        <Table className="" isHeaderSticky removeWrapper aria-label="Energy performance breakdown table">
          <TableHeader bordered>
            <TableColumn>FEATURE</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>RATING</TableColumn>
          </TableHeader>
          <TableBody  >
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell >{row.feature}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  
                  <Chip
                    style={{
                      backgroundColor: getChipColor(row.rating),
                      color: "white", // text color for better readability
                    }}
                    >
                      {row.rating}
                    </Chip>


                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
