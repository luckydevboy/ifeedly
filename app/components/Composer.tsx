"use client";

import { Editor, EditorState, convertToRaw } from "draft-js";
import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import "draft-js/dist/Draft.css";

import { Button } from "@/app/components/ui";

type Props = {
  onSubmit: (data: string) => void;
  isLoading: boolean;
  buttonPosition?: "inside" | "outside";
  placeholder: string;
};

export default function Composer({ onSubmit, isLoading, placeholder }: Props) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef<any>(null);

  const text = convertToRaw(editorState.getCurrentContent()).blocks[0].text;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = () => {
    onSubmit(text);
    setEditorState(EditorState.createEmpty());
  };

  const handleFocus = () => {
    editorRef.current && editorRef.current.focus();
  };

  return (
    <div className="flex flex-col">
      <div
        className="bg-seaSalt rounded-lg px-6 py-4 flex flex-col cursor-text"
        onClick={handleFocus}
        onFocus={handleFocus}
      >
        {isClient && (
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            placeholder={placeholder}
            ref={editorRef}
          />
        )}
        <Button
          className="self-end"
          circular
          disabled={!text || isLoading}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          <PaperAirplaneIcon className="w-4 h-4 text-white" />
        </Button>
      </div>
    </div>
  );
}
