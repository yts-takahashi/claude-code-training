import type { Meta, StoryObj } from '@storybook/angular';
import { KPICardComponent } from './kpi-card.component';

const meta: Meta<KPICardComponent> = {
  title: 'FinUI/KPICard',
  component: KPICardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<KPICardComponent>;

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
  },
};

/** 全KPI表示（ダッシュボード） */
export const Dashboard: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <fin-kpi-card
          title="融資残高"
          value="¥12,345,678,900"
          [changeRate]="3.2"
          changeLabel="前月比"
          [sparklineData]="[100, 105, 102, 110, 108, 115, 120]"
        ></fin-kpi-card>
        <fin-kpi-card
          title="延滞率"
          value="1.23"
          unit="%"
          [changeRate]="-0.15"
          changeLabel="前月比"
          [sparklineData]="[1.5, 1.48, 1.45, 1.42, 1.38, 1.35, 1.23]"
        ></fin-kpi-card>
        <fin-kpi-card
          title="新規申請"
          [value]="142"
          unit="件"
          [changeRate]="12.5"
          changeLabel="前月比"
          [sparklineData]="[80, 95, 88, 110, 105, 120, 142]"
        ></fin-kpi-card>
        <fin-kpi-card
          title="承認率"
          value="87.5"
          unit="%"
          [changeRate]="2.1"
          changeLabel="前月比"
          [sparklineData]="[82, 83, 85, 84, 86, 85, 87.5]"
        ></fin-kpi-card>
      </div>
    `,
  }),
};
