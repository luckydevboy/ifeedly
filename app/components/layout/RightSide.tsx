import { cx } from "class-variance-authority";

export default function RightSide({ className }: { className?: string }) {
  return <aside className={cx([className])}></aside>;
}
