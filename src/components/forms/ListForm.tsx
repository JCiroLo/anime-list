import { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { Formatters, Schemas, Validators } from "@/utils";

import type { ChangeEvent, FC, FocusEvent } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { TList } from "@/types/List";

type TListFormProps = {
  id?: string;
  list?: TList;
  onSubmit: (data: TList) => void;
};
type TChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type TBlurEvent = FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

const ListForm: FC<TListFormProps> = ({ id, list, onSubmit }) => {
  const formData = useForm<TList>({ defaultValues: list || Schemas.list, mode: "onBlur" });
  const { control, setValue, handleSubmit } = formData;

  const [hasSlugBeenUpdated, setHasSlugBeenUpdated] = useState(false);

  const handleFieldChange = (event: TChangeEvent, onChange: (event: TChangeEvent) => void) => {
    const { name, value } = event.target;

    if (!hasSlugBeenUpdated) {
      if (name === "slug") {
        setHasSlugBeenUpdated(true);
      }

      if (name === "name") {
        setValue("slug", Formatters.string.slugify(value));
      }
    }

    onChange(event);
  };

  const handleFieldBlur = (event: TBlurEvent, onBlur: (event: TBlurEvent) => void) => {
    const { value, name } = event.target;

    if (name === "slug") {
      setValue("slug", Formatters.string.slugify(value));
    }

    onBlur(event);
  };

  const handleFormSubmit: SubmitHandler<TList> = (data) => {
    const { name, slug } = data;

    if (!name || !slug) return;

    // Double check that slug has been formatted correctly
    onSubmit({ ...data, slug: Formatters.string.slugify(data.name) });
  };

  return (
    <Stack component="form" id={id} spacing={2} paddingTop={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ ...Validators.list.name }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            variant="filled"
            label="Name"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            required
            onChange={(event) => handleFieldChange(event, field.onChange)}
          />
        )}
      />
      <Controller
        name="slug"
        control={control}
        rules={{ ...Validators.list.slug }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            variant="filled"
            label="Slug"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message || "This will be used to identify your list, it must be unique"}
            required
            onBlur={(event) => handleFieldBlur(event, field.onBlur)}
            onChange={(event) => handleFieldChange(event, field.onChange)}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{ ...Validators.list.description }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            variant="filled"
            label="Optional description"
            rows={6}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            multiline
            onChange={(event) => handleFieldChange(event, field.onChange)}
          />
        )}
      />
    </Stack>
  );
};

export default ListForm;
