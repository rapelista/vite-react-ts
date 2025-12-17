import { createFileRoute } from '@tanstack/react-router';

import { useAppForm } from '~/components/form';
import { Card, CardContent } from '~/components/ui/card';
import { FieldGroup } from '~/components/ui/field';
import { SelectValue } from '~/components/ui/select';

export const Route = createFileRoute('/sample')({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      text: '',
      textarea: '',

      select: {
        string: '1',
        number: 1,
      },
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

              <form.AppField name="select.string">
                {(field) => (
                  <field.Field label="Select">
                    <field.Select>
                      <field.SelectTrigger>
                        <SelectValue placeholder="Select Here" />
                      </field.SelectTrigger>

                      <field.SelectContent items={[1, 2, 3]} />
                    </field.Select>
                  </field.Field>
                )}
              </form.AppField>

              <form.AppField name="select.number">
                {(field) => (
                  <field.Field label="Select with Number Value">
                    <field.Select>
                      <field.SelectTrigger>
                        <SelectValue placeholder="Select Here" />
                      </field.SelectTrigger>

                      <field.SelectContent
                        items={[
                          {
                            id: 1,
                            name: 'Akmal',
                          },
                          {
                            id: 2,
                            name: 'Salsa',
                          },
                        ].map((item) => ({
                          value: item.id,
                          label: item.name,
                        }))}
                      />
                    </field.Select>
                  </field.Field>
                )}
              </form.AppField>

              <form.AppForm>
                <form.Preview />
              </form.AppForm>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
