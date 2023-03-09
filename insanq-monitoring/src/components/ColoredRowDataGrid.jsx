import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { darken, lighten, styled } from '@mui/material/styles';

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .super-app-theme--Selesai-Lap-Lengkap': {
    backgroundColor: getBackgroundColor(
      theme.palette.success.light,
      theme.palette.mode
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.success.light,
        theme.palette.mode
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.success.light,
        theme.palette.mode
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.success.light,
          theme.palette.mode
        ),
      },
    },
  },
  '& .super-app-theme--Selesai-Kirim-Invoice-&-Laporan': {
    backgroundColor: getBackgroundColor(
      theme.palette.success.main,
      theme.palette.mode
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.success.main,
          theme.palette.mode
        ),
      },
    },
  },
  '& .super-app-theme--Selesai-Kirim-Rekap': {
    backgroundColor: getBackgroundColor(
      theme.palette.warning.main,
      theme.palette.mode
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode
        ),
      },
    },
  },
  '& .super-app-theme--Selesai-Kirim-Berkas': {
    backgroundColor: getBackgroundColor(
      theme.palette.secondary.main,
      theme.palette.mode
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.secondary.main,
        theme.palette.mode
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.secondary.main,
        theme.palette.mode
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.secondary.main,
          theme.palette.mode
        ),
      },
    },
  },
  '& .super-app-theme--Selesai-Pelaksanaan-Test': {
    backgroundColor: getBackgroundColor(
      theme.palette.secondary.light,
      theme.palette.mode
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.secondary.light,
        theme.palette.mode
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.secondary.light,
        theme.palette.mode
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.secondary.light,
          theme.palette.mode
        ),
      },
    },
  },
}));

export const ColoredRowDataGrid = ({ table }) => {
  return (
    <StyledDataGrid
      slots={{
        toolbar: GridToolbar,
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 25,
          },
        },
      }}
      rows={table.rows}
      columns={table.columns}
      checkboxSelection
      disableRowSelectionOnClick
      autoHeight
      getRowClassName={(params) => {
        const className = params.row.project_status_id.replace(/\s+/g, '-');
        return `super-app-theme--${className}`;
      }}
      slotProps={{
        sx: {
          background: 'black',
        },
      }}
    />
  );
};
