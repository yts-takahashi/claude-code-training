import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar, SidebarItem } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'FinUI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const iconDashboard = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const iconLoan = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const iconCustomer = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const iconReport = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const iconSettings = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const sampleItems: SidebarItem[] = [
  { key: 'dashboard', label: 'ダッシュボード', icon: iconDashboard },
  {
    key: 'loans',
    label: '融資管理',
    icon: iconLoan,
    badge: 5,
    children: [
      { key: 'loans-list', label: '融資申請一覧' },
      { key: 'loans-new', label: '新規申請' },
      { key: 'loans-approval', label: '承認待ち' },
    ],
  },
  {
    key: 'customers',
    label: '顧客管理',
    icon: iconCustomer,
    children: [
      { key: 'customers-list', label: '顧客一覧' },
      { key: 'customers-new', label: '新規登録' },
    ],
  },
  { key: 'reports', label: 'レポート', icon: iconReport },
  { key: 'settings', label: '設定', icon: iconSettings },
];

/** デフォルト */
export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Sidebar
        items={sampleItems}
        activeKey={active}
        onItemClick={setActive}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />
    );
  },
};

/** 折りたたみ状態 */
export const Collapsed: Story = {
  render: () => (
    <Sidebar
      items={sampleItems}
      activeKey="dashboard"
      collapsed
    />
  ),
};
