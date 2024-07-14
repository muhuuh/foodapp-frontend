// components/Recipes/CommentModal.js
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const CommentModal = ({
  isOpen,
  onRequestClose,
  comment,
  onCommentChange,
  onCommentSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Kommentar eingeben"
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Kommentar eingeben</h2>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={comment}
          onChange={onCommentChange}
          placeholder="Kommentar eingeben..."
        />
        <button
          onClick={onCommentSubmit}
          className="p-2 bg-green-500 text-white rounded"
        >
          Speichern
        </button>
      </div>
    </Modal>
  );
};

export default CommentModal;
