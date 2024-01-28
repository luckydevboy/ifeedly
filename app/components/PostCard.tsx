import { Post } from "@/app/lib/definitions";
import { formatDistanceToNow } from "date-fns";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon as HeartIconOutline,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useLikePost } from "@/app/api/hooks";
import { cx } from "class-variance-authority";
import toast from "react-hot-toast";

export default function PostCard({
  content,
  reactions,
  createdAt,
  author,
  _id,
}: Post) {
  const [likes, setLikes] = useState(reactions.likes);
  const [liked, setLiked] = useState(reactions.isLiked);
  const likePost = useLikePost();

  const handleLike = () => {
    if (liked) {
      likePost.mutateAsync(_id).then(() => {
        setLikes(likes - 1);
        setLiked(false);
      });
    } else {
      likePost.mutateAsync(_id).then(() => {
        setLikes(likes + 1);
        setLiked(true);
      });
    }
  };

  const handleShare = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}/posts/${_id}`;
    try {
      await navigator.share({
        title: `Post by ${author}`,
        url,
      });
    } catch (error) {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard.");
    }
  };

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
        <div className="flex items-center gap-x-4">
          <div
            className="flex items-center gap-x-1 cursor-pointer"
            onClick={handleLike}
          >
            {liked ? (
              <HeartIconSolid className="h-4 w-4 text-coquelicot" />
            ) : (
              <HeartIconOutline className="h-4 w-4 text-davysGray" />
            )}
            <span
              className={cx([
                "text-sm font-medium",
                liked ? "text-coquelicot" : "text-davysGray",
              ])}
            >
              {likes}
            </span>
          </div>
          <div className="flex items-center gap-x-1">
            <ChatBubbleLeftRightIcon className="text-davysGray h-4 w-4" />
            <span className="text-davysGray text-sm font-medium">
              {/*{reactions.comments}*/}0
            </span>
          </div>
          <ShareIcon
            className="text-davysGray h-4 w-4 cursor-pointer"
            onClick={handleShare}
          />
        </div>
      </div>
    </div>
  );
}
