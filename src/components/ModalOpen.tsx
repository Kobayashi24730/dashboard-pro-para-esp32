'use client';


interface DetalhesPirProps {
    isOpen: boolean
    onClose: () => void
}
export default function ModalOpen({isOpen, onClose}: DetalhesPirProps) {
    if(!isOpen) return null;
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white white:bg-zinc-900 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Título do Modal</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold p-1"
          >
            ✕
          </button>
        </div>

        <div>
          <p>Conteúdo do Modal</p>
        </div>

      </div>
    </div>
  );
}