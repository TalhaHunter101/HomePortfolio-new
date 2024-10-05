import React from "react";
import {
  Table,
  Chip,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const statusColorMap = {
  Undecided: "warning",
  Conditions: "success",
  Pending: "warning",
};

const PlanningApplicationsTable = ({ planningData }) => {

    console.log("planningData data jnxccjd",planningData);
    
  const columns = [
    { name: "STATUS", uid: "status" },
    { name: "ADDRESS", uid: "address" },
    { name: "APPLICATION TYPE", uid: "applicationType" },
    { name: "REFERENCE", uid: "reference" },
    { name: "DATE RECEIVED", uid: "dateReceived" },
    { name: "DESCRIPTION", uid: "description" },
  ];

  const renderCell = (application, columnKey) => {
    const source = application._source;
    switch (columnKey) {
      case "status":
        return (
          <Chip color={statusColorMap[source?.other_fields?.decision] || "default"} variant="flat">
            {source?.other_fields?.decision || "Others"}
          </Chip>
        );
      case "address":
        return source.address;
      case "applicationType":
        return source.other_fields?.application_type || "N/A";
      case "reference":
        return source.uid;
      case "dateReceived":
        return source.other_fields?.date_received || "N/A";
      case "description":
        return source.description;
      default:
        return "N/A";
    }
  };

  return (
    <Table aria-label="Planning Applications table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid}>{column.name}</TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {planningData.map((item) => (
          <TableRow key={item._id}>
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(item, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlanningApplicationsTable;