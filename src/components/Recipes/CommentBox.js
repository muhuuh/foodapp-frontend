// components/Recipes/CommentBox.js
import React, { useRef, useEffect } from "react";

const CommentBox = React.forwardRef(
  ({ comment, onCommentChange, onCommentSubmit }, ref) => {
    const commentBoxRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          commentBoxRef.current &&
          !commentBoxRef.current.contains(event.target)
        ) {
          onCommentSubmit(event);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onCommentSubmit]);

    return (
      <div
        ref={commentBoxRef}
        className="mt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <textarea
          className="w-full p-2 border rounded"
          value={comment}
          onChange={onCommentChange}
          placeholder="Kommentar eingeben..."
        />
        <button
          onClick={onCommentSubmit}
          className="mt-2 p-2 bg-green-500 text-white rounded"
        >
          Speichern
        </button>
      </div>
    );
  }
);

export default CommentBox;
