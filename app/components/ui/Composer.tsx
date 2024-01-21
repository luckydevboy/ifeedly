"use client";

import { Editor, EditorState, convertToRaw } from "draft-js";
import { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import "draft-js/dist/Draft.css";
import { cx } from "class-variance-authority";

type Props = {
  onSubmit: (data: string) => void;
  isLoading: boolean;
};

export default function Composer({ onSubmit, isLoading }: Props) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [isClient, setIsClient] = useState(false);

  const text = convertToRaw(editorState.getCurrentContent()).blocks[0].text;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = () => {
    onSubmit(text);
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div className="bg-zinc-100 rounded-lg px-6 py-4 flex flex-col">
      {isClient && (
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Share your knowledge..."
        />
      )}
      <button
        className={cx([
          "bg-blue-500 p-2 rounded-full self-end disabled:bg-blue-500/40 relative",
          isLoading && "animate-pulse",
        ])}
        disabled={!text}
        onClick={handleSubmit}
      >
        <PaperAirplaneIcon className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}