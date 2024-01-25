import { Post } from "@/app/lib/definitions";
import { formatDistanceToNow } from "date-fns";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function Card({
  content,
  reactions,
  created_time,
  user,
}: Omit<Post, "id">) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2 text-zinc-800">
        <div className="font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {user.name}
        </div>
        <div className="text-xs text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap">
          {user.username}
        </div>
        <div className="text-xs text-zinc-400">&#9679;</div>
        <div className="text-xs text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap">
          {formatDistanceToNow(created_time)}
        </div>
      </div>
      <div className="text-zinc-800">{content}</div>
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <HeartIcon className="text-zinc-500 h-4 w-4" />
          <span className="text-zinc-500 text-sm font-medium">
            {reactions.likes}
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <ChatBubbleLeftRightIcon className="text-zinc-500 h-4 w-4" />
          <span className="text-zinc-500 text-sm font-medium">
            {reactions.comments}
          </span>
        </div>
      </div>
    </div>
  );
}
