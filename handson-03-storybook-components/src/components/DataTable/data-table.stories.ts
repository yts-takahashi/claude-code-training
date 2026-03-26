import type { Meta, StoryObj } from '@storybook/angular';
import { DataTableComponent } from './data-table.component';
import { StatusBadgeComponent } from '../StatusBadge';

const sampleData = [
  { id: 'LA-2024-001', applicantName: '田中太郎', amount: 50000000, status: 'approved', appliedDate: '2024-03-01', branch: '東京本店' },
  { id: 'LA-2024-002', applicantName: '佐藤花子', amount: 30000000, status: 'pending', appliedDate: '2024-03-05', branch: '大阪支店' },
  { id: 'LA-2024-003', applicantName: '鈴木一郎', amount: 100000000, status: 'processing', appliedDate: '2024-03-10', branch: '名古屋支店' },
  { id: 'LA-2024-004', applicantName: '高橋美咲', amount: 20000000, status: 'rejected', appliedDate: '2024-03-12', branch: '福岡支店' },
  { id: 'LA-2024-005', applicantName: '山田次郎', amount: 75000000, status: 'approved', appliedDate: '2024-03-15', branch: '東京本店' },
  { id: 'LA-2024-006', applicantName: '伊藤由美', amount: 45000000, status: 'pending', appliedDate: '2024-03-18', branch: '大阪支店' },
  { id: 'LA-2024-007', applicantName: '渡辺健', amount: 60000000, status: 'processing', appliedDate: '2024-03-20', branch: '札幌支店' },
  { id: 'LA-2024-008', applicantName: '中村あかり', amount: 15000000, status: 'approved', appliedDate: '2024-03-22', branch: '仙台支店' },
  { id: 'LA-2024-009', applicantName: '小林誠', amount: 80000000, status: 'pending', appliedDate: '2024-03-25', branch: '東京本店' },
  { id: 'LA-2024-010', applicantName: '加藤裕子', amount: 35000000, status: 'approved', appliedDate: '2024-03-28', branch: '名古屋支店' },
  { id: 'LA-2024-011', applicantName: '吉田光男', amount: 90000000, status: 'processing', appliedDate: '2024-03-30', branch: '大阪支店' },
  { id: 'LA-2024-012', applicantName: '山本恵理', amount: 25000000, status: 'rejected', appliedDate: '2024-04-01', branch: '福岡支店' },
];

const columns = [
  { key: 'id', header: '申請番号', sortable: true, width: '140px' },
  { key: 'applicantName', header: '申請者名', sortable: true },
  { key: 'amount', header: '融資金額', sortable: true },
  { key: 'status', header: 'ステータス', sortable: true },
  { key: 'appliedDate', header: '申請日', sortable: true },
  { key: 'branch', header: '支店', sortable: true },
];

const meta: Meta<DataTableComponent> = {
  title: 'FinUI/DataTable',
  component: DataTableComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DataTableComponent>;

/** 融資申請一覧（基本） */
export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
    rowKey: 'id',
  },
};

/** ページネーション付き */
export const WithPagination: Story = {
  args: {
    data: sampleData,
    columns: columns,
    rowKey: 'id',
    pagination: true,
    pageSize: 5,
  },
};

/** 行選択（複数） */
export const WithMultiSelect: Story = {
  render: () => ({
    props: {
      data: sampleData.slice(0, 5),
      columns: columns,
      selected: [] as Array<string | number>,
      onSelectionChange(keys: Array<string | number>) {
        this['selected'] = keys;
      },
    },
    template: `
      <div>
        <p class="mb-2 text-sm text-gray-500">選択中: {{ selected.join(', ') || 'なし' }}</p>
        <fin-data-table
          [data]="data"
          [columns]="columns"
          rowKey="id"
          selectable="multiple"
          [selectedKeys]="selected"
          (selectionChange)="onSelectionChange($event)"
        ></fin-data-table>
      </div>
    `,
  }),
};

/** ローディング状態 */
export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    rowKey: 'id',
    loading: true,
    skeletonRows: 5,
  },
};

/** 空状態 */
export const Empty: Story = {
  args: {
    data: [],
    columns: columns,
    rowKey: 'id',
    emptyMessage: '該当する融資申請はありません',
  },
};
