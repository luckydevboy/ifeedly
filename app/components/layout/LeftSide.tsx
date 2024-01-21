import { cx } from "class-variance-authority";

export default function LeftSide({ className }: { className?: string }) {
  return <aside className={cx([className])}></aside>;
}
