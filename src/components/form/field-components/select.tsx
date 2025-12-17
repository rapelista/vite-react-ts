import { useFieldContext } from '~/components/form';
import { checkIsInvalid } from '~/components/form/helper';
import {
  Select as ShadCNSelect,
  SelectContent as ShadCNSelectContent,
  SelectItem as ShadCNSelectItem,
  SelectTrigger as ShadCNSelectTrigger,
} from '~/components/ui/select';

type SelectValue = string | number | null | undefined;

interface SelectProps extends React.ComponentProps<typeof ShadCNSelect> {}

export function Select(props: SelectProps) {
  const field = useFieldContext<SelectValue>();

  const value =
    field.state.value !== null && field.state.value !== undefined
      ? typeof field.state.value === 'number'
        ? field.state.value.toString()
        : field.state.value
      : '';

  const handleValueChange = (value: string) => {
    if (typeof field.state.value === 'number') {
      const numberValue = Number(value);

      if (!isNaN(numberValue)) {
        field.handleChange(numberValue);
      }
    } else {
      field.handleChange(value);
    }
  };

  return (
    <ShadCNSelect
      {...props}
      name={field.name}
      value={value}
      onValueChange={handleValueChange}
    />
  );
}

interface SelectTriggerProps
  extends React.ComponentProps<typeof ShadCNSelectTrigger> {}

export function SelectTrigger(props: SelectTriggerProps) {
  const field = useFieldContext();
  const isInvalid = checkIsInvalid(field);

  return (
    <ShadCNSelectTrigger {...props} aria-invalid={isInvalid} id={field.name} />
  );
}

interface SelectContentProps<TData>
  extends Omit<React.ComponentProps<typeof ShadCNSelectContent>, 'children'> {
  items: Array<TData>;
  children?: (value: TData) => React.ReactNode;
}

export function SelectContent<
  T extends
    | string
    | number
    | {
        value: string | number;
        label: string;
      },
>({ children, items, ...props }: SelectContentProps<T>) {
  const renderItems = (): React.ReactNode => {
    if (typeof children === 'function') {
      return items.map(children);
    }

    return items.map((item) => {
      if (typeof item === 'object') {
        return (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        );
      } else {
        return (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        );
      }
    });
  };

  return <ShadCNSelectContent {...props}>{renderItems()}</ShadCNSelectContent>;
}

interface SelectItemProps
  extends Omit<React.ComponentProps<typeof ShadCNSelectItem>, 'value'> {
  value: string | number;
}

export function SelectItem({ value, ...props }: SelectItemProps) {
  const stringValue = typeof value === 'number' ? value.toString() : value;

  return <ShadCNSelectItem {...props} value={stringValue} />;
}
