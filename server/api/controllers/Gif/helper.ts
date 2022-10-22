import { Prisma, Tag } from "@prisma/client";

const processTags = (data: Prisma.GifUpdateInput, tags: Tag[]) => {
  if (tags.length === 0) return;

  data["tags"] = {};
  data["tags"]["connectOrCreate"] = [];

  for (const tag of tags) {
    const name = tag.name.toLowerCase();
    if (name && name !== "") {
      const where = { name };
      const create = { name };
      data["tags"]["connectOrCreate"].push({ where, create });
    }
  }
};

export { processTags };
