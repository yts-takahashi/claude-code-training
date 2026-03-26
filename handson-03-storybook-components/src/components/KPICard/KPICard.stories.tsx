import type { Meta, StoryObj } from '@storybook/react';
import { KPICard } from './KPICard';

const meta: Meta<typeof KPICard> = {
  title: 'FinUI/KPICard',
  component: KPICard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KPICard>;

/** 融資残高 */
export const Default: Story = {
  args: {
    title: '融資残高',
    value: '¥12,345,678,900',
    changeRate: 3.2,
    changeLabel: '前月比',
    sparklineData: [100, 105, 102, 110, 108, 115, 120, 118, 125, 130, 128, 135],
    tooltip: '2024年3月末時点の融資残高合計',
  },
};

/** 延滞率 */
export const DelinquencyRate: Story = {
  args: {
    title: '延滞率',
    value: '1.23',
    unit: '%',
    changeRate: -0.15,
    changeLabel: '前月比',
    sparklineData: [1.5, 1.48, 1.45, 1.42, 1.38, 1.35, 1.30, 1.28, 1.25, 1.23],
  },
};

/** 新規申請件数 */
export const NewApplications: Story = {
  args: {
    title: '新規申請件数',
    value: 142,
    unit: '件',
    changeRate: 12.5,
    changeLabel: '前月比',
    sparklineData: [80, 95, 88, 110, 105, 120, 115, 130, 125, 140, 135, 142],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
};

/** 全KPI表示（ダッシュボード） */
export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="融資残高"
        value="¥12,345,678,900"
        changeRate={3.2}
        changeLabel="前月比"
        sparklineData={[100, 105, 102, 110, 108, 115, 120]}
      />
      <KPICard
        title="延滞率"
        value="1.23"
        unit="%"
        changeRate={-0.15}
        changeLabel="前月比"
        sparklineData={[1.5, 1.48, 1.45, 1.42, 1.38, 1.35, 1.23]}
      />
      <KPICard
        title="新規申請"
        value={142}
        unit="件"
        changeRate={12.5}
        changeLabel="前月比"
        sparklineData={[80, 95, 88, 110, 105, 120, 142]}
      />
      <KPICard
        title="承認率"
        value="87.5"
        unit="%"
        changeRate={2.1}
        changeLabel="前月比"
        sparklineData={[82, 83, 85, 84, 86, 85, 87.5]}
      />
    </div>
  ),
};
