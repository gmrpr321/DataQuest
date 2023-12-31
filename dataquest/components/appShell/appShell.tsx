import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group, Skeleton, Image } from "@mantine/core";
import React, { ReactNode } from "react";

interface BasicAppShellProps {
  children: ReactNode;
}

export default function BasicAppShell({ children }: BasicAppShellProps) {
  return (
    <AppShell header={{ height: { base: 70 } }} padding="md">
      <AppShell.Header style={{ height: "4.5rem" }}>
        <Group h="110%" w="103%">
          <Image
            height={55}
            width={55}
            style={{ margin: "auto" }}
            src="/logo.png"
            alt=""
          />
        </Group>
      </AppShell.Header>

      <AppShell.Main
        style={{
          display: "flex",
          overflow: "hidden",
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
