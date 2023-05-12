import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";

import { prisma } from "@acme/db";

import { appRouter, type AppRouter } from "../src/root";
import { createContext } from "../src/trpc";

// 测试之前清除所有数据
const clear = async () => {
  await prisma.library.deleteMany({});
};

test("@acme/api library add", async () => {
  await clear();
  const ctx = await createContext();
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["library"]["add"]>;
  const input: Input = {
    name: "test.library",
    dir: "/User/aaa/bb",
    type: "eagle",
  };

  // 添加
  expect(await caller.library.add(input)).toMatchObject(input);

  // 重复添加 dir 唯一
  void expect(() => caller.library.add(input)).rejects.toThrowError("dir");
});

test("@acme/api library update", async () => {
  const ctx = await createContext();
  const caller = appRouter.createCaller(ctx);

  const res = await prisma.library.findFirst();
  type Input = inferProcedureInput<AppRouter["library"]["update"]>;

  if (res) {
    const input: Input = {
      id: res.id,
      fileCount: 232,
      lastSyncTime: new Date(),
    };

    expect(await caller.library.update(input)).toMatchObject(input);
  }
});