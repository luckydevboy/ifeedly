import { Post } from "@/app/lib/definitions";
import { formatDistanceToNow } from "date-fns";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function Card({
  content,
  reactions,
  updatedAt,
  author,
}: Omit<Post, "id">) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2">
        {/*<div className="font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap">*/}
        {/*  {user.name}*/}
        {/*</div>*/}
        <div className="text-xs text-davysGray overflow-hidden text-ellipsis whitespace-nowrap">
          {author.username}
        </div>
        <div className="text-xs text-davysGray">&#9679;</div>
        <div className="text-xs text-davysGray overflow-hidden text-ellipsis whitespace-nowrap">
          {formatDistanceToNow(updatedAt)}
        </div>
      </div>
      <div className="text-zinc-800">{content}</div>
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <HeartIcon className="text-davysGray h-4 w-4" />
          <span className="text-davysGray text-sm font-medium">
            {reactions.likes}
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <ChatBubbleLeftRightIcon className="text-davysGray h-4 w-4" />
          <span className="text-davysGray text-sm font-medium">
            {/*{reactions.comments}*/}0
          </span>
        </div>
      </div>
    </div>
  );
}
