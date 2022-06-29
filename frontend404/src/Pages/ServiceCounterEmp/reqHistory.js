import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Snackbar,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function RequestHistory(props) {
  const columns = [
    { field: "option", headerName: "Option", width: 130 },
    { field: "date", headerName: "Request Date", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
  ];
  const rows = [];
  const { list } = props;
  if (list.length > 0) {
    list.map((item, index) =>
      rows.push({
        index: index,
        option: item.title,
        date: item.reqDate.toString(),
        status: item.status,
      })
    );
  }
  console.log("this is list", list);
  console.log(rows);

  return (
    <div style={{ height: 530, width: 420, paddingLeft: 20, paddingRight: 0 }}>
      <DataGrid
        getRowId={(row) => row.index}
        rows={rows}
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
