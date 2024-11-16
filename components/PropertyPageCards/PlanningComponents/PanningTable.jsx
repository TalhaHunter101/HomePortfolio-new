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
  Grant: "success",
  Granted: "success",
  Approved: "success",
  Approve: "success",
  Approval: "success",
  "Approve with Conditions": "success",
  "Application Granted": "success",
  Conditions: "success",

  // Warning status
  Undecided: "warning",
  Pending: "warning",
  Withdrawn: "warning",

  // Danger status
  Refuse: "danger",
  Refused: "danger",
  Rejected: "danger",
};

const PlanningApplicationsTable = ({ planningData, timeFrame }) => {
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());

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
        const isExpanded = expandedDescriptions.has(application._id);
        const description = source.description;
        if (description.length <= 100) return description;

        return (
          <div>
            {isExpanded ? description : `${description.substring(0, 100)}`}

            <a
              href={source?.url}
              target="_blank"
              className="text-blue-500 hover:text-blue-700 ml-2 text-sm"
            >
              {isExpanded ? "Show less" : "Show full description"}
            </a>
          </div>
        );
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

  return (
    <div>
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
