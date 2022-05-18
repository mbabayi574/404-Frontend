import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';





export default function ReportTracker(props) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'start', headerName: 'start', width: 130 },
    { field: 'end', headerName: 'End', width: 130},
    { field: 'wasted', headerName: 'Wasted', width: 80,},
  ];
  const rows = [];
  const {list} =props;
  if(list.length> 0){
    list.map((item) => rows.push({'id': item.id , 'date': item.date , 'start': item.start_point, 'end': item.end_point, 'wasted': item.wasted_time}))
  }
  
  return (
    <div style={{ height: 530, width: '100%', paddingLeft: 30, paddingRight: 85,}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
