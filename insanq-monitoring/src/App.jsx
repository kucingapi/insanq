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

        const key = Object.keys(res.data.data[0]);
        const tableHeader = key
          .filter(
            (value) => value !== 'projects_types_id' && value !== 'created_by'
          )
          .map((value) => ({
            field: value,
            headerName: underscoreToSpace(value),
            width:
              value === 'projects_status_id'
                ? 250
                : value === 'description'
                ? 400
                : 150,
          }));
        const projectStatusData = projectStatus.data.data;
        console.log(key);
        const data = res.data.data.map((val) => {
          const projectStatusName = projectStatusData.find(
            (obj) => obj.id === val.projects_status_id
          );
          return { ...val, projects_status_id: projectStatusName.name };
        });
        setOriginalData(data);
        setTable({ rows: data, columns: tableHeader });
        setUpdatedAt(new Date());
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
      return selectedChips.includes(val.projects_status_id);
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
      <Alert severity="info">
        Waktu terakhir update (MM/DD/YYYY, HH:MM:SS):{' '}
        <Typography color="primary" fontWeight={700}>
          {updatedAt.toLocaleString()}
        </Typography>
      </Alert>
      <ColoredRowDataGrid table={table} />
    </Stack>
  );
}

export default App;
