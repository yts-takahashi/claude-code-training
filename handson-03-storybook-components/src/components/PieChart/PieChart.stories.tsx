import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';

const meta: Meta<typeof PieChart> = {
  title: 'FinUI/PieChart',
  component: PieChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PieChart>;

/** 審査結果の内訳 */
export const Default: Story = {
  args: {
    data: [
      { name: '承認', value: 245, color: '#16A34A' },
      { name: '審査中', value: 52, color: '#D97706' },
      { name: '却下', value: 38, color: '#DC2626' },
      { name: '期限切れ', value: 15, color: '#94A3B8' },
    ],
    height: 350,
  },
};

/** ドーナツチャート（業種別融資残高） */
export const DonutChart: Story = {
  args: {
    data: [
      { name: '製造業', value: 4500000000 },
      { name: 'サービス業', value: 3200000000 },
      { name: '不動産業', value: 2800000000 },
      { name: '小売業', value: 1500000000 },
      { name: 'IT・通信', value: 1200000000 },
      { name: 'その他', value: 800000000 },
    ],
    height: 350,
    innerRadius: 60,
    outerRadius: 100,
    tooltipFormatter: (v: number) => `¥${(v / 100000000).toFixed(1)}億円`,
  },
};

/** 融資期間別構成比 */
export const LoanTermDistribution: Story = {
  args: {
    data: [
      { name: '1年以内', value: 120, color: '#1E40AF' },
      { name: '1-3年', value: 85, color: '#2563EB' },
      { name: '3-5年', value: 65, color: '#3B82F6' },
      { name: '5-10年', value: 45, color: '#60A5FA' },
      { name: '10年超', value: 25, color: '#93C5FD' },
    ],
    height: 350,
    innerRadius: 50,
    outerRadius: 100,
    tooltipFormatter: (v: number) => `${v}件`,
  },
};
