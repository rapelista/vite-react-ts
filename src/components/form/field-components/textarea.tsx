import { useFieldContext } from '~/components/form';
import { checkIsInvalid } from '~/components/form/helper';
import { Textarea as ShadCNTextarea } from '~/components/ui/textarea';

interface TextareaProps extends React.ComponentProps<typeof ShadCNTextarea> {}

export function Textarea(props: TextareaProps) {
  const field = useFieldContext<string>();
  const isInvalid = checkIsInvalid(field);

  return (
    <ShadCNTextarea
      {...props}
      aria-invalid={isInvalid}
      id={field.name}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
