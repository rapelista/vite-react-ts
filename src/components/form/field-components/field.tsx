import { useFieldContext } from '~/components/form';
import { checkIsInvalid } from '~/components/form/helper';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  Field as ShadCNField,
} from '~/components/ui/field';

interface FieldProps extends React.ComponentProps<typeof ShadCNField> {
  label?: string;
  description?: string;
}

export function Field({ children, label, description, ...props }: FieldProps) {
  const field = useFieldContext();
  const isInvalid = checkIsInvalid(field);

  return (
    <ShadCNField {...props} data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

      {children}

      {description && <FieldDescription>{description}</FieldDescription>}

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </ShadCNField>
  );
}
