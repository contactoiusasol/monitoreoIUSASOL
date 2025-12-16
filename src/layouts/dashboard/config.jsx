import ChartPieIcon from "@heroicons/react/24/solid/ChartPieIcon"
import DocumentTextIcon from "@heroicons/react/24/solid/DocumentTextIcon"
import ExclamationTriangleIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon"
import TableChartIcon from '@mui/icons-material/TableChart';
import StorageIcon from '@mui/icons-material/Storage';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import AvTimer from '@mui/icons-material/AvTimer';
import AutoGraph from '@mui/icons-material/AutoGraph';
import Addchart from '@mui/icons-material/Addchart';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    href: '/',
    icon: (
      <SvgIcon>
        <ChartPieIcon />
      </SvgIcon>
    ),
    label: 'Gráficas'
  },
  {
    href: '/tabla21m',
    icon: (
      <SvgIcon>
        <TableChartIcon />
      </SvgIcon>
    ),
    label: 'Tabla21M'
  },
  {
    href: '/databaseiusasol',
    icon: (
      <SvgIcon>
        <StorageIcon />
      </SvgIcon>
    ),
    label: 'BD'
  },
  {
    href: '/theme',
    icon: (
      <SvgIcon>
        <ElectricMeterIcon />
      </SvgIcon>
    ),
    label: 'Medidores'
  },
  {
    href: '/icons',
    icon: (
      <SvgIcon>
        <AvTimer />
      </SvgIcon>
    ),
    label: '5Minutales'
  },
  {
    href: '/porteo',
    icon: (
      <SvgIcon>
        <AutoGraph />
      </SvgIcon>
    ),
    label: 'Porteo'
  },
  {
    href: '/contratos',
    icon: (
      <SvgIcon>
        <DocumentTextIcon />
      </SvgIcon>
    ),
    label: 'Contratos'
  },
  {
    href: '/reportes',
    icon: (
      <SvgIcon>
        <Addchart />
      </SvgIcon>
    ),
    label: 'Reportes'
  },
  {
    href: '/error',
    icon: (
      <SvgIcon>
        <ExclamationTriangleIcon />
      </SvgIcon>
    ),
    label: 'error'
  }
];
