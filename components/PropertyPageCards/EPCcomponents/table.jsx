import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export function EnergyPerformanceTable({ data }) {
  return (
    <div>
      <h4 className="font-semibold text-sm pl-1 text-gray-500 mb-2">Breakdown Of property&apos;s energy performance</h4>
      <div className="overflow-y-auto " style={{ maxHeight: '200px' }}>
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
                <TableCell>{row.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
