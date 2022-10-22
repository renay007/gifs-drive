import { Prisma } from "@prisma/client";

const gifData = Prisma.validator<Prisma.GifArgs>()({
  select: { name: true, public_url: true, tags: true },
});

export type GifInput = Prisma.GifGetPayload<typeof gifData>;
