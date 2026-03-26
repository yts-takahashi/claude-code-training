import type { Meta, StoryObj } from '@storybook/react';
import { CurrencyDisplay } from './CurrencyDisplay';

const meta: Meta<typeof CurrencyDisplay> = {
  title: 'FinUI/CurrencyDisplay',
  component: CurrencyDisplay,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CurrencyDisplay>;

/** 融資残高 */
export const Default: Story = {
  args: {
    amount: 50000000,
    size: 'lg',
  },
};

/** 色分け表示 */
export const ColorCoded: Story = {
  render: () => (
    <div className="space-y-2">
      <div><CurrencyDisplay amount={12345678} colorCoded size="lg" /></div>
      <div><CurrencyDisplay amount={-5432100} colorCoded size="lg" /></div>
      <div><CurrencyDisplay amount={0} colorCoded size="lg" /></div>
    </div>
  ),
};

/** サイズバリエーション */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <div><CurrencyDisplay amount={1234567} size="sm" /></div>
      <div><CurrencyDisplay amount={1234567} size="md" /></div>
      <div><CurrencyDisplay amount={1234567} size="lg" /></div>
      <div><CurrencyDisplay amount={1234567} size="xl" /></div>
    </div>
  ),
};

/** 変動率付き */
export const WithChangeRate: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <span className="text-sm text-gray-500 block">融資残高</span>
        <CurrencyDisplay amount={12345678900} size="xl" changeRate={3.2} />
      </div>
      <div>
        <span className="text-sm text-gray-500 block">延滞残高</span>
        <CurrencyDisplay amount={151891200} size="xl" changeRate={-0.8} colorCoded />
      </div>
    </div>
  ),
};

/** テーブルセルでの使用例 */
export const InTableCell: Story = {
  render: () => (
    <table className="text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left px-3 py-2">項目</th>
          <th className="text-right px-3 py-2">金額</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="px-3 py-2">融資実行額</td>
          <td className="px-3 py-2 text-right"><CurrencyDisplay amount={50000000} size="sm" /></td>
        </tr>
        <tr className="border-b">
          <td className="px-3 py-2">返済済み</td>
          <td className="px-3 py-2 text-right"><CurrencyDisplay amount={-15000000} size="sm" colorCoded showSign /></td>
        </tr>
        <tr className="border-b font-semibold">
          <td className="px-3 py-2">残高</td>
          <td className="px-3 py-2 text-right"><CurrencyDisplay amount={35000000} size="sm" /></td>
        </tr>
      </tbody>
    </table>
  ),
};
