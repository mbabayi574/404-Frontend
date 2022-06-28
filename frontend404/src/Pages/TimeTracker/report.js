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

export default function ReportTracker(props) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "start", headerName: "start", width: 130 },
    { field: "end", headerName: "End", width: 130 },
    { field: "wasted", headerName: "Wasted", width: 80 },
    {
      field: "edit",
      headerName: "EDIT",
      renderCell: (params) => {
        const onCLick = (e) => {
          e.stopPropagation();
          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          // return alert(JSON.stringify(thisRow, null, 4));
          props.onEdit(thisRow);
        };
        return (
          <Button onClick={onCLick} color="primary" variant="outlined">
            Edit
          </Button>
        );
      },
    },
  ];
  const rows = [];
  const { list } = props;
  if (list.length > 0) {
    list.map((item) =>
      rows.push({
        id: item.id,
        date: item.date,
        start: item.start_point,
        end: item.end_point,
        wasted: item.wasted_time,
        edit: "Edit",
      })
    );
  }

  return (
    <div style={{ height: 530, width: 780, paddingLeft: 30, paddingRight: 85 }}>
      <DataGrid rows={rows} columns={columns} pageSize={8} />
    </div>
  );
}
