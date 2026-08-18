import React from "react";

const Modal = ({ 
  title, 
  isOpen, 
  logout, 
  onClose, 
  children,
  divider=true,
  onAction = null ,
  actionButton = null,
}) => {
  
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="w-full fixed inset-0 flex items-center justify-center z-50">
        <div className={`bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-700/50 ${logout && "!w-[280px]"}`}>
          
          {/* Header */}
          <div className={`flex items-center mb-4 ${!logout ? "w-full justify-between" :"items-center"}`}>
            <h2 className={`text-xl font-bold text-white ${!logout && ""}`}>
              {title}
            </h2>
            {!logout && <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition"
            >
              ✕
            </button>}
          </div>

          {/* Divider */}
          { divider && <div className="border-b border-slate-700/50 mb-4" />}
          {/* Content */}
          <div className="text-slate-300 mb-6">
            {children}
          </div>

          {/* Divider */}
          { divider && <div className="border-b border-slate-700/50 mb-4" />}

          {/* Footer */}
          <div className={`flex gap-3 w-full justify-end ${logout && "!justify-center"}`}>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            {actionButton && (
              <button
                onClick={onAction}
                className={`px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${logout && "bg-red-500 hover:bg-red-400"}`}
              >
                {actionButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;