import type { Meta, StoryObj } from '@storybook/angular';
import { FormFieldComponent } from './form-field.component';

const meta: Meta<FormFieldComponent> = {
  title: 'FinUI/FormField',
  component: FormFieldComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FormFieldComponent>;

/** テキスト入力 */
export const Default: Story = {
  args: {
    label: '申請者名',
    name: 'applicantName',
    placeholder: '氏名を入力してください',
    required: true,
  },
};

/** バリデーションエラー */
export const WithError: Story = {
  args: {
    label: '融資金額',
    name: 'amount',
    type: 'number',
    value: '-100',
    error: '融資金額は正の数値で入力してください',
    required: true,
  },
};

/** ヘルパーテキスト */
export const WithHelperText: Story = {
  args: {
    label: '金利（年率）',
    name: 'interestRate',
    type: 'number',
    placeholder: '例: 2.5',
    helperText: '小数点以下1桁まで入力可能です（単位: %）',
  },
};

/** セレクトボックス */
export const SelectBox: Story = {
  args: {
    label: '融資種別',
    name: 'loanType',
    type: 'select',
    required: true,
    options: [
      { value: 'business', label: '事業資金' },
      { value: 'equipment', label: '設備投資' },
      { value: 'working_capital', label: '運転資金' },
      { value: 'real_estate', label: '不動産担保' },
      { value: 'government', label: '制度融資' },
    ],
  },
};

/** テキストエリア */
export const TextArea: Story = {
  args: {
    label: '審査コメント',
    name: 'reviewComment',
    type: 'textarea',
    placeholder: '審査に関するコメントを入力してください...',
    rows: 4,
  },
};

/** 融資申請フォーム */
export const LoanApplicationForm: Story = {
  render: () => ({
    template: `
      <div class="max-w-lg space-y-4">
        <fin-form-field label="申請者名" name="name" placeholder="氏名" [required]="true"></fin-form-field>
        <div class="grid grid-cols-2 gap-4">
          <fin-form-field label="融資金額" name="amount" type="number" placeholder="50000000" [required]="true"></fin-form-field>
          <fin-form-field
            label="融資種別"
            name="type"
            type="select"
            [required]="true"
            [options]="[
              { value: 'business', label: '事業資金' },
              { value: 'equipment', label: '設備投資' },
              { value: 'working_capital', label: '運転資金' }
            ]"
          ></fin-form-field>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <fin-form-field label="融資期間（年）" name="term" type="number" placeholder="5"></fin-form-field>
          <fin-form-field label="希望金利" name="rate" type="number" placeholder="2.5" helperText="年率（%）"></fin-form-field>
        </div>
        <fin-form-field label="申請日" name="date" type="date" [required]="true"></fin-form-field>
        <fin-form-field label="備考" name="note" type="textarea" placeholder="追加の情報があれば記入してください" [rows]="3"></fin-form-field>
      </div>
    `,
  }),
};

/** 無効・読み取り専用 */
export const DisabledAndReadOnly: Story = {
  render: () => ({
    template: `
      <div class="max-w-md space-y-4">
        <fin-form-field label="申請番号" name="id" value="LA-2024-001" [readOnly]="true"></fin-form-field>
        <fin-form-field label="承認者" name="approver" value="山田太郎" [disabled]="true"></fin-form-field>
      </div>
    `,
  }),
};
