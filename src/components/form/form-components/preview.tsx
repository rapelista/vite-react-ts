import { useFormContext } from '~/components/form';
import { cn } from '~/lib/utils';

interface PreviewProps extends React.ComponentProps<'pre'> {}

export function Preview({ className, ...props }: PreviewProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(s) => s.values}>
      {(values) => (
        <pre {...props} className={cn('text-sm p-2 bg-muted', className)}>
          {JSON.stringify(values, null, 2)}
        </pre>
      )}
    </form.Subscribe>
  );
}
