import { createFileRoute } from '@tanstack/react-router';

import { useAppForm } from '~/components/form';
import { Card, CardContent } from '~/components/ui/card';
import { FieldGroup } from '~/components/ui/field';
import { SelectContent, SelectItem, SelectValue } from '~/components/ui/select';

export const Route = createFileRoute('/sample')({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      text: '',
      textarea: '',
      select: '1',
    },
  });

  return (
    <div className="container mx-auto max-w-xl px-4 py-12">
      <Card>
        <CardContent>
          <form>
            <FieldGroup>
              <form.AppField name="text">
                {(field) => (
                  <field.Field label="Text">
                    <field.TextField placeholder="Input text here&hellip;" />
                  </field.Field>
                )}
              </form.AppField>

              <form.AppField name="textarea">
                {(field) => (
                  <field.Field label="Textarea">
                    <field.Textarea placeholder="Input here&hellip;" />
                  </field.Field>
                )}
              </form.AppField>

              <form.AppField name="select">
                {(field) => (
                  <field.Field label="Select">
                    <field.Select>
                      <field.SelectTrigger>
                        <SelectValue placeholder="Select Here" />
                      </field.SelectTrigger>

                      <SelectContent>
                        <SelectItem value="1">Option 1</SelectItem>
                        <SelectItem value="2">Option 2</SelectItem>
                      </SelectContent>
                    </field.Select>
                  </field.Field>
                )}
              </form.AppField>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
