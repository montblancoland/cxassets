import { PageShell } from "@/components/shared/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Help`,
};

export default function Page() {
  return (
    <main>
      <PageShell
        title="Help"
        bgImage="/assets/hero/banner-1.jpeg"
        contentClassName="container"
      >
        ...
      </PageShell>
    </main>
  );
}
