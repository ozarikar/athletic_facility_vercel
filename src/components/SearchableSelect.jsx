import { useState } from 'react';
import { useCombobox } from 'downshift';

// This is our new, beautiful, searchable dropdown component
export default function SearchableSelect({ items, selectedItem, onSelectedItemChange, placeholder }) {
  const [inputItems, setInputItems] = useState(items);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    selectedItem,
    onSelectedItemChange,
    itemToString: (item) => (item ? item.item_name : ''),
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.item_name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    },
  });

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <input
          placeholder={placeholder}
          style={styles.input}
          {...getInputProps()}
        />
        <button
          aria-label="toggle menu"
          style={styles.toggleButton}
          {...getToggleButtonProps()}
        >
          {isOpen ? '▲' : '▼'}
        </button>
      </div>
      <ul
        {...getMenuProps()}
        style={{ ...styles.menu, display: isOpen && inputItems.length > 0 ? 'block' : 'none' }}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={{
                ...styles.menuItem,
                backgroundColor: highlightedIndex === index ? '#f0f0f0' : 'white',
                fontWeight: selectedItem === item ? 'bold' : 'normal',
              }}
              key={`${item.id}-${index}`}
              {...getItemProps({ item, index })}
            >
              {item.item_name}
              <span style={styles.itemDetails}>
                (Available: {item.available_quantity})
                {item.available_quantity / item.total_quantity <= 0.2 && " - Low Stock!"}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    margin: '8px 0',
  },
  inputContainer: {
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: 'none',
    fontSize: '1em',
    outline: 'none',
  },
  toggleButton: {
    background: 'transparent',
    border: 'none',
    padding: '0 15px',
    cursor: 'pointer',
    fontSize: '0.8em',
  },
  menu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: '200px',
    overflowY: 'auto',
    background: 'white',
    border: '1px solid #ccc',
    borderTop: 'none',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    zIndex: 1000,
  },
  menuItem: {
    padding: '12px',
    cursor: 'pointer',
  },
  itemDetails: {
    fontSize: '0.9em',
    color: '#666',
    marginLeft: '8px',
  },
};