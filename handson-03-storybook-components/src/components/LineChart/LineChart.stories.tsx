import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'FinUI/LineChart',
  component: LineChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const monthlyLoanData = [
  { month: '2024/04', loanBalance: 1200000000, newLoans: 150000000, repayments: 120000000 },
  { month: '2024/05', loanBalance: 1230000000, newLoans: 180000000, repayments: 130000000 },
  { month: '2024/06', loanBalance: 1280000000, newLoans: 200000000, repayments: 140000000 },
  { month: '2024/07', loanBalance: 1340000000, newLoans: 210000000, repayments: 150000000 },
  { month: '2024/08', loanBalance: 1400000000, newLoans: 190000000, repayments: 160000000 },
  { month: '2024/09', loanBalance: 1430000000, newLoans: 170000000, repayments: 140000000 },
  { month: '2024/10', loanBalance: 1460000000, newLoans: 180000000, repayments: 150000000 },
  { month: '2024/11', loanBalance: 1490000000, newLoans: 185000000, repayments: 155000000 },
  { month: '2024/12', loanBalance: 1520000000, newLoans: 195000000, repayments: 160000000 },
  { month: '2025/01', loanBalance: 1555000000, newLoans: 200000000, repayments: 165000000 },
  { month: '2025/02', loanBalance: 1590000000, newLoans: 205000000, repayments: 170000000 },
  { month: '2025/03', loanBalance: 1630000000, newLoans: 215000000, repayments: 175000000 },
];

/** 融資残高推移 */
export const Default: Story = {
  args: {
    data: monthlyLoanData,
    xAxisKey: 'month',
    series: [
      { dataKey: 'loanBalance', name: '融資残高', color: '#1E40AF' },
    ],
    height: 350,
  },
};

/** 複数系列（新規融資 vs 返済） */
export const MultipleSeries: Story = {
  args: {
    data: monthlyLoanData,
    xAxisKey: 'month',
    series: [
      { dataKey: 'newLoans', name: '新規融資', color: '#1E40AF' },
      { dataKey: 'repayments', name: '返済額', color: '#DC2626', strokeDasharray: '5 5' },
    ],
    height: 350,
  },
};

/** 延滞率推移 */
export const DelinquencyTrend: Story = {
  args: {
    data: [
      { month: '2024/04', rate30: 1.2, rate60: 0.5, rate90: 0.2 },
      { month: '2024/05', rate30: 1.15, rate60: 0.48, rate90: 0.19 },
      { month: '2024/06', rate30: 1.1, rate60: 0.45, rate90: 0.18 },
      { month: '2024/07', rate30: 1.08, rate60: 0.42, rate90: 0.17 },
      { month: '2024/08', rate30: 1.05, rate60: 0.40, rate90: 0.16 },
      { month: '2024/09', rate30: 1.0, rate60: 0.38, rate90: 0.15 },
      { month: '2024/10', rate30: 0.98, rate60: 0.36, rate90: 0.14 },
      { month: '2024/11', rate30: 0.95, rate60: 0.34, rate90: 0.13 },
      { month: '2024/12', rate30: 0.92, rate60: 0.32, rate90: 0.12 },
    ],
    xAxisKey: 'month',
    series: [
      { dataKey: 'rate30', name: '30日延滞', color: '#D97706' },
      { dataKey: 'rate60', name: '60日延滞', color: '#DC2626' },
      { dataKey: 'rate90', name: '90日延滞', color: '#7C3AED' },
    ],
    yAxisFormatter: (v: number) => `${v}%`,
    tooltipFormatter: (v: number) => `${v.toFixed(2)}%`,
    height: 350,
  },
};
