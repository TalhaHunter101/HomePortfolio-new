import React, { useState, useMemo } from "react";
import {
  Table,
  Chip,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const statusColorMap = {
  // Success status
  "Application Permitted": "success",
  "Grant": "success",
  "Granted": "success",
  "Approved": "success",
  "Approve": "success",
  "Approval": "success",
  "Approve with Conditions": "success",
  "Application Granted": "success",
  "Conditions": "success",

  // Warning status
  "Undecided": "warning",
  "Pending": "warning",
  "Withdrawn": "warning",

  // Danger status
  "Refuse": "danger",
  "Refused": "danger",
  "Rejected": "danger",
};

const PlanningApplicationsTable = ({ planningData, timeFrame }) => {
  // State to manage the selected time frame (6 or 12 months)
  // const [timeFrame, setTimeFrame] = useState(6);

  // Dropdown options
  // const timeFrameOptions = [
  //   { key: 6, label: "Last 6 Months" },
  //   { key: 12, label: "Last 12 Months" },
  // ];

  const columns = [
    { name: "STATUS", uid: "status" },
    { name: "ADDRESS", uid: "address" },
    { name: "APPLICATION TYPE", uid: "applicationType" },
    { name: "REFERENCE", uid: "reference" },
    { name: "DATE RECEIVED", uid: "dateReceived" },
    { name: "DESCRIPTION", uid: "description" },
  ];

  // Function to render each cell in the table
  const renderCell = (application, columnKey) => {
    const source = application._source;
    switch (columnKey) {
      case "status":
        return (
          <Chip
            color={statusColorMap[source?.app_state] || "warning"}
            variant="flat"
          >
            {source?.app_state || "Others"}
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
        return source.description.length > 100
          ? `${source.description.substring(0, 100)}...`
          : source.description;
      default:
        return "N/A";
    }
  };

  // Memoized filtered data to optimize performance
  const filteredData = useMemo(() => {
    const now = new Date();
    const monthsAgo = new Date();
    monthsAgo.setMonth(now.getMonth() - timeFrame);

    return planningData.filter((item) => {
      const dateReceivedStr = item._source.other_fields?.date_received;
      if (!dateReceivedStr) return false;

      const dateReceived = new Date(dateReceivedStr);
      return dateReceived >= monthsAgo && dateReceived <= now;
    });
  }, [planningData, timeFrame]);
  

  // Handler for dropdown selection
  // const handleTimeFrameChange = (key) => {
  //   setTimeFrame(Number(key));
  // };

  return (
    <div>
      {/* Dropdown for selecting time frame */}
      {/* <div style={{ marginBottom: "1rem" }}>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat">
              Show: {timeFrame} Months ▼
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            selectionMode="single"
            selectedKeys={new Set([timeFrame.toString()])}
            onSelectionChange={(keys) => handleTimeFrameChange([...keys][0])}
          >
            {timeFrameOptions.map((option) => (
              <DropdownItem key={option.key.toString()}>
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div> */}

      {/* Table displaying the filtered data */}
      <Table
        aria-label="Planning Applications table"
        className="max-h-[60vh]"
        isHeaderSticky
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
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
    </div>
  );
};

export default PlanningApplicationsTable;
