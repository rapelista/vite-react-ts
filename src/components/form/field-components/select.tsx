import { useFieldContext } from '~/components/form';
import { checkIsInvalid } from '~/components/form/helper';
import {
  Select as ShadCNSelect,
  SelectTrigger as ShadCNSelectTrigger,
} from '~/components/ui/select';

interface SelectProps extends React.ComponentProps<typeof ShadCNSelect> {}

export function Select(props: SelectProps) {
  const field = useFieldContext<string>();

  return (
    <ShadCNSelect
      {...props}
      name={field.name}
      value={field.state.value}
      onValueChange={field.handleChange}
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
