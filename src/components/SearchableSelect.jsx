import { useState, useEffect } from 'react';
import { useCombobox } from 'downshift';

export default function SearchableSelect({ items, selectedItem, onSelectedItemChange, placeholder }) {
  const [inputItems, setInputItems] = useState(items);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getLabelProps, // Added for completeness, good for accessibility
    highlightedIndex,
    getItemProps,
    closeMenu, // Useful for resetting
  } = useCombobox({
    items: inputItems,
    selectedItem,
    itemToString: (item) => (item ? item.item_name : ''),
    onSelectedItemChange: (changes) => {
      // This ensures the main form's state is updated when an item is selected
      onSelectedItemChange(changes);
      // Optional: Clear the search when an item is picked
      // setInputItems(items); 
    },
    onInputValueChange: ({ inputValue }) => {
      // This filters the list as the user types
      setInputItems(
        items.filter((item) =>
          item.item_name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    },
  });

  // === THIS IS THE FIX ===
  // This effect runs whenever the dropdown's open state changes.
  useEffect(() => {
    // If the menu is being opened...
    if (isOpen) {
      // ...reset the list of items to show ALL available options.
      setInputItems(items);
    }
  }, [isOpen, items]); // Dependency array ensures this runs when `isOpen` changes.


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
          type="button" // Important to prevent form submission
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

// Styles are unchanged
const styles = {
  container: { position: 'relative', width: '100%', margin: '8px 0' },
  inputContainer: { display: 'flex', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' },
  input: { width: '100%', padding: '12px', border: 'none', fontSize: '1em', outline: 'none' },
  toggleButton: { background: 'transparent', border: 'none', padding: '0 15px', cursor: 'pointer', fontSize: '0.8em' },
  menu: { position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: '200px', overflowY: 'auto', background: 'white', border: '1px solid #ccc', borderTop: 'none', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', margin: 0, padding: 0, listStyle: 'none', zIndex: 1000 },
  menuItem: { padding: '12px', cursor: 'pointer' },
  itemDetails: { fontSize: '0.9em', color: '#666', marginLeft: '8px' },
};