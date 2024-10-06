import React, { FC, useState } from "react";
import { Stack, TextField } from "@mui/material";

import { Formatters, Schemas } from "@/utils";

import type { TList } from "@/types/List";

type TListFormProps = {
  id?: string;
  list?: TList;
  onSubmit: (data: TList) => void;
};

const ListForm: FC<TListFormProps> = ({ id, list, onSubmit }) => {
  const [currentList, setCurrentList] = useState<TList>(list || Schemas.list);
  const [hasSlugBeenUpdated, setHasSlugBeenUpdated] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (!hasSlugBeenUpdated) {
      if (name === "slug") {
        setHasSlugBeenUpdated(true);
      }

      if (name === "name") {
        setCurrentList((prev) => ({
          ...prev,
          [name]: value,
          slug: Formatters.string.slugify(value),
        }));
      }
    }

    setCurrentList((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    if (name === "slug") {
      setCurrentList((prev) => ({
        ...prev,
        [name]: Formatters.string.slugify(value),
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, slug } = currentList;

    if (!name || !slug) return;

    // Double check that slug has been formatted correctly
    onSubmit({ ...currentList, slug: Formatters.string.slugify(currentList.name) });
  };

  return (
    <Stack component="form" id={id} spacing={2} paddingTop={1} onSubmit={handleSubmit}>
      <TextField variant="filled" label="Name" name="name" value={currentList.name} required onChange={handleChange} />
      <TextField variant="filled" label="Slug" name="slug" value={currentList.slug} required onBlur={handleBlur} onChange={handleChange} />
      <TextField
        variant="filled"
        label="Optional description"
        name="description"
        value={currentList.description}
        rows={6}
        multiline
        onChange={handleChange}
      />
    </Stack>
  );
};

export default ListForm;
