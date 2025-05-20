export type Props = {
  placeholder?: string;
  data: Data[];
  onChange: (value: string) => void;
};

export type Data = {
  label: string;
  value: string;
};
