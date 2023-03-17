import { useEffect, useState } from 'react';
import { API } from './API';
import { underscoreToSpace } from './utils/functions/underscoreToUpper';
import ChipSelection from './ChipSelections';
import { Box, Stack, Typography, Button, Alert } from '@mui/material';
import { ColoredRowDataGrid } from './components/ColoredRowDataGrid';

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [table, setTable] = useState({ rows: [], columns: [] });
  const [selectedChips, setSelectedChips] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    setTable({ rows: [], columns: [] });
    const fetchData = async () => {
      try {
        const res = await API.getTable('projects');
        const projectStatus = await API.getTable('projects_status');
        const projectType = await API.getTable('projects_types');

        const key = Object.keys(res.data.data[0]);
        const tableHeader = key
          .filter(
            (value) =>
              value === 'created_at' ||
              value === 'id' ||
              value === 'projects_status_id' ||
              value === 'projects_types_id' ||
              value === 'name' ||
              value === 'description'
          )
          .map((value) => ({
            field: value,
            headerName: underscoreToSpace(value),
            width:
              value === 'projects_status_id'
                ? 230
                : value === 'description'
                ? 350
                : 130,
          }));
        const projectStatusData = projectStatus.data.data;
        const projectTypeData = projectType.data.data;
        console.log(key);
        const data = res.data.data.map((val) => {
          const projectStatusName = projectStatusData.find(
            (obj) => obj.id === val.projects_status_id
          );
          const projectTypeName = projectTypeData.find(
            (obj) => obj.id === val.projects_types_id
          );
          const description = val.description.replace(/<[^>]*>/g, '').trim();
          return {
            ...val,
            description,
            projects_status_id: projectStatusName.name,
            projects_types_id: projectTypeName.name,
          };
        });
        setOriginalData(data);
        setTable({ rows: data, columns: tableHeader });
        setUpdatedAt(new Date());
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    const minute = 60 * 1000;
    const intervalRefreshData = 5 * minute;
    const interval = setInterval(() => {
      fetchData();
    }, intervalRefreshData);
    fetchData();
    return () => clearInterval(interval);
  }, [refresh]);

  useEffect(() => {
    if (selectedChips.length === 0) {
      setTable({ rows: originalData, columns: table.columns });
      return;
    }
    const newData = originalData.filter((val) => {
      return selectedChips.includes(val.projects_status_id);
    });
    setTable({ rows: newData, columns: table.columns });
  }, [selectedChips, refresh]);

  return (
    <Stack>
      <Box>
        <ChipSelection
          selectedChips={selectedChips}
          setSelectedChips={setSelectedChips}
          refresh={refresh}
        />
      </Box>
      <ColoredRowDataGrid table={table} />
      <Alert
        sx={{ width: 'fit-content', position: 'fixed', right: 0 }}
        severity="info"
      >
        Waktu terakhir update (MM/DD/YYYY, HH:MM:SS):{' '}
        <Typography color="primary" fontWeight={700}>
          {updatedAt.toLocaleString()}
        </Typography>
        <Button
          onClick={() => setRefresh(!refresh)}
          variant="contained"
          color="primary"
        >
          Refresh
        </Button>
      </Alert>
    </Stack>
  );
}

export default App;
