import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from './utils';

const SelectContext = createContext(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a <Select />');
  }
  return context;
}

function useCombinedRefs(...refs) {
  return useCallback(
    (node) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === 'function') {
          ref(node);
        } else {
          ref.current = node;
        }
      });
    },
    [refs]
  );
}

export function Select({
  value,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  onOpenChange,
  children,
  className,
}) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [internalOpen, setInternalOpen] = useState(false);
  const [items, setItems] = useState({});

  const isValueControlled = value !== undefined;
  const isOpenControlled = controlledOpen !== undefined;

  const currentValue = isValueControlled ? value : internalValue;
  const currentOpen = isOpenControlled ? controlledOpen : internalOpen;

  const setValue = useCallback(
    (nextValue) => {
      if (!isValueControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [isValueControlled, onValueChange]
  );

  const setOpen = useCallback(
    (nextOpen) => {
      if (!isOpenControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isOpenControlled, onOpenChange]
  );

  const registerItem = useCallback((itemValue, label) => {
    setItems((prev) => {
      if (prev[itemValue] === label) return prev;
      return { ...prev, [itemValue]: label };
    });

    return () =>
      setItems((prev) => {
        if (!(itemValue in prev)) return prev;
        const { [itemValue]: _removed, ...rest } = prev;
        return rest;
      });
  }, []);

  const contextValue = useMemo(
    () => ({
      value: currentValue,
      open: currentOpen,
      setValue,
      setOpen,
      items,
      registerItem,
      listId: `${id}-list`,
    }),
    [currentValue, currentOpen, setValue, setOpen, items, registerItem, id]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={cn('relative w-full', className)}>{children}</div>
    </SelectContext.Provider>
  );
}

export const SelectGroup = ({ children }) => <>{children}</>;

export const SelectTrigger = forwardRef(({ className, children, disabled, ...props }, ref) => {
  const { open, setOpen, listId } = useSelectContext();

  const handleKeyDown = (event) => {
    if (disabled) return;
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      setOpen(!open);
    }
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(
        'inline-flex h-11 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listId}
      onClick={() => {
        if (disabled) return;
        setOpen(!open);
      }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="flex-1 text-left">{children}</span>
      <ChevronDown className="h-4 w-4 opacity-60" />
    </button>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = ({ placeholder, className }) => {
  const { value, items } = useSelectContext();
  const label = value ? items[value] : '';

  return (
    <span className={cn('block truncate', label ? 'text-gray-900' : 'text-gray-500', className)}>
      {label || placeholder || ''}
    </span>
  );
};

export const SelectContent = forwardRef(({ className, children }, ref) => {
  const { open, setOpen, listId } = useSelectContext();
  const combinedRef = useCombinedRefs(ref);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      const node = combinedRef?.current ?? null;
      if (node && !node.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, setOpen, combinedRef]);

  return (
    <div
      ref={combinedRef}
      id={listId}
      className={cn(
        'absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg',
        !open && 'hidden',
        className
      )}
      role="presentation"
    >
      <ul className="max-h-60 overflow-y-auto p-1" role="listbox">
        {children}
      </ul>
    </div>
  );
});
SelectContent.displayName = 'SelectContent';

export const SelectLabel = ({ className, children }) => (
  <li className={cn('px-2 py-1.5 text-sm font-semibold text-gray-500', className)} role="presentation">
    {children}
  </li>
);

export const SelectItem = forwardRef(({ className, children, value, disabled }, ref) => {
  const { value: selectedValue, setValue, setOpen, registerItem } = useSelectContext();
  const label = useMemo(() => React.Children.toArray(children).join(' '), [children]);

  useEffect(() => {
    if (value === undefined) return undefined;
    const unregister = registerItem(value, label);
    return unregister;
  }, [value, label, registerItem]);

  const isSelected = selectedValue === value;

  const handleSelect = () => {
    if (disabled) return;
    setValue(value);
    setOpen(false);
  };

  return (
    <li
      ref={ref}
      role="option"
      aria-selected={isSelected}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm px-8 py-2 text-sm outline-none transition-colors hover:bg-[#1e3a5f]/10 focus:bg-[#1e3a5f]/10',
        disabled && 'pointer-events-none opacity-50',
        isSelected && 'text-[#1e3a5f] font-semibold',
        className
      )}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleSelect();
        }
      }}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      <span>{children}</span>
    </li>
  );
});
SelectItem.displayName = 'SelectItem';

export const SelectSeparator = ({ className }) => (
  <li className={cn('my-1 h-px bg-gray-200', className)} role="separator" />
);
