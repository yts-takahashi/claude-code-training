import type { Meta, StoryObj } from '@storybook/angular';
import { TimelineComponent } from './timeline.component';

const meta: Meta<TimelineComponent> = {
  title: 'FinUI/Timeline',
  component: TimelineComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TimelineComponent>;

/** 融資承認フロー */
export const Default: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: '申請受付',
        description: '融資申請書類を受理しました。',
        status: 'completed',
        datetime: '2024/03/01 09:00',
        assignee: '田中太郎（申請者）',
      },
      {
        id: '2',
        title: '一次審査',
        description: '信用情報・財務諸表の審査を完了しました。',
        status: 'completed',
        datetime: '2024/03/05 14:30',
        assignee: '佐藤花子（審査担当）',
      },
      {
        id: '3',
        title: '担保評価',
        description: '不動産担保の現地評価を実施中です。',
        status: 'current',
        datetime: '2024/03/10 10:00',
        assignee: '鈴木一郎（鑑定士）',
      },
      {
        id: '4',
        title: '二次審査（融資部長）',
        status: 'upcoming',
        assignee: '高橋部長',
      },
      {
        id: '5',
        title: '最終承認（支店長）',
        status: 'upcoming',
        assignee: '山田支店長',
      },
      {
        id: '6',
        title: '融資実行',
        status: 'upcoming',
      },
    ],
  },
};

/** 全ステップ完了 */
export const AllCompleted: Story = {
  args: {
    steps: [
      { id: '1', title: '申請受付', status: 'completed', datetime: '2024/03/01', assignee: '田中太郎' },
      { id: '2', title: '一次審査', status: 'completed', datetime: '2024/03/05', assignee: '佐藤花子' },
      { id: '3', title: '担保評価', status: 'completed', datetime: '2024/03/10', assignee: '鈴木一郎' },
      { id: '4', title: '二次審査', status: 'completed', datetime: '2024/03/12', assignee: '高橋部長' },
      { id: '5', title: '最終承認', status: 'completed', datetime: '2024/03/13', assignee: '山田支店長' },
      { id: '6', title: '融資実行', status: 'completed', datetime: '2024/03/15', assignee: '事務担当' },
    ],
  },
};

/** シンプル（2ステップ） */
export const Simple: Story = {
  args: {
    steps: [
      { id: '1', title: '審査担当者承認', status: 'completed', datetime: '2024/03/10' },
      { id: '2', title: '上席承認', status: 'current', datetime: '承認待ち' },
    ],
  },
};
