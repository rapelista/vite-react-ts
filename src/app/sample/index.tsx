import { revalidateLogic } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { Save } from 'lucide-react';
import * as z from 'zod';

import { useAppForm } from '~/components/form';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Field, FieldGroup } from '~/components/ui/field';
import { SelectValue } from '~/components/ui/select';
import { worker } from '~/mock/worker';

const schema = z.object({
  text: z.string('Text is required').nonempty('Text is required'),
  textarea: z.string('Text is required').nonempty('Textarea is required'),
  select: z.object({
    string: z.string('Not a string'),
    number: z.number('Select is required'),
  }),
});

export const Route = createFileRoute('/sample/')({
  component: RouteComponent,
  beforeLoad: async () => {
    await worker.start();
  },
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      select: {},
    } as z.infer<typeof schema>,

    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: schema,
    },

    onSubmit: ({ value }) => {
      // eslint-disable-next-line no-console
      console.log(value);
    },
  });

  return (
    <div className="container mx-auto max-w-xl px-4 py-12">
      <Card>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.AppField name="text">
                {(field) => (
                  <field.Field label="Text">
                    <field.Text placeholder="Input text here&hellip;" />
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
                    <field.Select type="number">
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

              <Field>
                <form.AppForm>
                  <form.Preview />
                </form.AppForm>
              </Field>

              <Field orientation="horizontal">
                <Button>
                  <Save />
                  Save
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
