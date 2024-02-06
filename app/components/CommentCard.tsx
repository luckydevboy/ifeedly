import { Comment } from "@/app/lib/definitions";
import { formatDistanceToNow } from "date-fns";

export default function CommentCard({ content, createdAt, author }: Comment) {
  return (
    <div className="flex gap-x-2">
      <img
        src={author.image}
        alt="Avatar"
        className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
      />
      <div className="space-y-4">
        <div className="flex items-center gap-x-2">
          <div className="font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            {author.name}
          </div>
          <div className="text-xs text-davysGray overflow-hidden text-ellipsis whitespace-nowrap">
            {author.username}
          </div>
          <div className="text-xs text-davysGray">&#9679;</div>
          <div className="text-xs text-davysGray overflow-hidden text-ellipsis whitespace-nowrap">
            {formatDistanceToNow(createdAt)}
          </div>
        </div>
        <div className="text-zinc-800">{content}</div>
      </div>
    </div>
  );
}
