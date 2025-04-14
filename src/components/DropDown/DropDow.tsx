import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './DropDow.scss';

interface DropDownOption {
  value: string;
}

interface DropDownProps {
  onChange: (option: DropDownOption) => void;
  value: string;
}

const sortby = ['Newest', 'Alphabetically', 'Cheapest'];
const items = ['4', '8', '16', 'all'];

// const defaultOption = sortby[0];
// const defaltItems = items[1];

// export function MyDropdownSortBy({ onChange, value }: DropDownProps) {
//   return (
//     <Dropdown
//       options={sortby}
//       value={defaultOption}
//       onChange={option => onChange({ value: option.value })}
//     />
//   );
// }

// export function MyDropdownItems({ onChange }: DropDownProps) {
//   return (
//     <Dropdown
//       options={items}
//       value={defaltItems}
//       onChange={option => onChange({ value: option.value })}
//     />
//   );
// }
export function MyDropdownSortBy({ onChange, value }: DropDownProps) {
  return (
    <Dropdown
      options={sortby}
      value={value}
      onChange={option => onChange({ value: option.value })}
    />
  );
}

export function MyDropdownItems({ onChange, value }: DropDownProps) {
  return (
    <Dropdown
      options={items}
      value={value}
      onChange={option => onChange({ value: option.value })}
    />
  );
}
