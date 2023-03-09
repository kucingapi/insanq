import { useEffect, useState } from 'react';
import { API } from './API';
import { underscoreToSpace } from './utils/functions/underscoreToUpper';
import { DataGrid, GridLogicOperator, GridToolbar } from '@mui/x-data-grid';
import { Test } from './Test';
import ChipSelection from './ChipSelections';
import { Box, Stack, Typography, Button } from '@mui/material';

const filterModel = {
  items: [
    { id: 1, field: 'project_status_id', operator: 'is', value: 'New' },
    { id: 2, field: 'project_status_id', operator: 'is', value: 'Completed' },
  ],
  logicOperator: GridLogicOperator.Or,
};

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [table, setTable] = useState({ rows: [], columns: [] });
  const [selectedChips, setSelectedChips] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setTable({ rows: [], columns: [] });
    const fetchData = async () => {
      try {
        const res = await API.getTable('projects');
        const projectStatus = await API.getTable('project_statuses');

        const key = Object.keys(res.data.data[0]);
        const tableHeader = key.map((value) => ({
          field: value,
          headerName: underscoreToSpace(value),
          width: value === 'description' ? 400 : 150,
        }));
        const projectStatusData = projectStatus.data.data;
        console.log(key);
        const data = res.data.data.map((val) => {
          const projectStatusName = projectStatusData.find(
            (obj) => obj.id === val.project_status_id
          );
          return { ...val, project_status_id: projectStatusName.name };
        });
        setOriginalData(data);
        setTable({ rows: data, columns: tableHeader });
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);

  useEffect(() => {
    if (selectedChips.length === 0) {
      setTable({ rows: originalData, columns: table.columns });
      return;
    }
    const newData = originalData.filter((val) => {
      return selectedChips.includes(val.project_status_id);
    });
    setTable({ rows: newData, columns: table.columns });
  }, [selectedChips, refresh]);

  return (
    <Stack gap={5}>
      <Box>
        <Typography variant="h5" color="initial" mb={2}>
          Projek Status Filter
        </Typography>
        <ChipSelection
          selectedChips={selectedChips}
          setSelectedChips={setSelectedChips}
          refresh={refresh}
        />
      </Box>
      <Button
        onClick={() => setRefresh(!refresh)}
        variant="contained"
        color="primary"
      >
        Refresh
      </Button>
      <DataGrid
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        rows={table.rows}
        columns={table.columns}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
      />
    </Stack>
  );
}

export default App;
