import { useFieldContext } from '~/components/form';
import { checkIsInvalid } from '~/components/form/helper';
import { Input } from '~/components/ui/input';

interface TextFieldProps extends React.ComponentProps<typeof Input> {}

export function TextField(props: TextFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = checkIsInvalid(field);

  return (
    <Input
      {...props}
      aria-invalid={isInvalid}
      id={field.name}
      name={field.name}
      type="text"
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
