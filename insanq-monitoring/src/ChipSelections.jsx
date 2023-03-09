import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API } from './API';
import { Stack } from '@mui/system';

const data = ['Sekolah', 'Perusahaan', 'Individu', 'Internal', 'Puskesmas'];

function ChipSelection({ selectedChips, setSelectedChips, refresh }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const rawData = await API.getTable('project_statuses');
      setData(rawData.data.data);
    };
    fetchData();
  }, [refresh]);

  const handleChipClick = (chipName) => {
    if (selectedChips.includes(chipName)) {
      setSelectedChips(selectedChips.filter((chip) => chip !== chipName));
    } else {
      setSelectedChips([...selectedChips, chipName]);
    }
  };

  return (
    <Stack gap={1} direction="row">
      {data.map((chipName) => (
        <Chip
          key={chipName.name}
          label={chipName.name}
          onClick={() => handleChipClick(chipName.name)}
          color={selectedChips.includes(chipName.name) ? 'primary' : 'default'}
          variant={
            selectedChips.includes(chipName.name) ? 'default' : 'outlined'
          }
        />
      ))}
    </Stack>
  );
}

export default ChipSelection;
