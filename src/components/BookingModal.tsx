import { useState } from 'react'
import { X, Calendar, Info, CheckCircle2, CreditCard, QrCode } from 'lucide-react'

interface BookingModalProps {
  checkIn: Date
  checkOut: Date
  onClose: () => void
}

export function BookingModal({ checkIn, checkOut, onClose }: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [method, setMethod] = useState<'pix' | 'card' | null>(null);

  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const WHATSAPP_NUMBER = '5521990193134';
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const message = `Olá! Fiz o pagamento simulado para o Sitio L&G:\n\nCheck-in: ${formatDate(checkIn)}\nCheck-out: ${formatDate(checkOut)}\nMétodo: ${method === 'pix' ? 'PIX' : 'Cartão'}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-[#2D5016] p-6 text-white relative">
          <button onClick={onClose} className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
          <h3 className="text-2xl font-bold">{step === 'details' ? 'Sua Reserva' : 'Pagamento'}</h3>
          <p className="opacity-80 text-sm">{nights} noites no Sitio L&G</p>
        </div>

        <div className="p-6 space-y-6">
          {step === 'details' ? (
            <>
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-3 text-sm">
                <div className="flex justify-between"><span>Check-in</span><span className="font-bold">{formatDate(checkIn)}</span></div>
                <div className="flex justify-between"><span>Check-out</span><span className="font-bold">{formatDate(checkOut)}</span></div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-stone-400">Escolha como pagar o sinal:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => {setMethod('pix'); setStep('payment')}} className="flex flex-col items-center gap-2 p-4 border-2 border-stone-100 rounded-2xl hover:border-[#2D5016] transition-all">
                    <QrCode className="text-[#2D5016]" /> <span className="font-bold">PIX</span>
                  </button>
                  <button onClick={() => {setMethod('card'); setStep('payment')}} className="flex flex-col items-center gap-2 p-4 border-2 border-stone-100 rounded-2xl hover:border-[#2D5016] transition-all">
                    <CreditCard className="text-[#2D5016]" /> <span className="font-bold">Cartão</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4 animate-in slide-in-from-right duration-300">
              {method === 'pix' ? (
                <div className="space-y-3">
                  <div className="w-40 h-40 bg-stone-100 mx-auto rounded-xl flex items-center justify-center border-2 border-dashed border-stone-300">
                    <QrCode size={80} className="text-stone-300" />
                  </div>
                  <p className="text-sm font-medium">Escaneie o QR Code acima para pagar o sinal.</p>
                  <div className="bg-stone-100 p-2 rounded text-[10px] font-mono break-all">00020126330014BR.GOV.BCB.PIX011112345678901</div>
                </div>
              ) : (
                <div className="space-y-3 text-left">
                  <input className="w-full p-3 rounded-xl border border-stone-200 text-sm" placeholder="Nome no Cartão" />
                  <input className="w-full p-3 rounded-xl border border-stone-200 text-sm" placeholder="0000 0000 0000 0000" />
                  <div className="flex gap-2">
                    <input className="w-1/2 p-3 rounded-xl border border-stone-200 text-sm" placeholder="MM/AA" />
                    <input className="w-1/2 p-3 rounded-xl border border-stone-200 text-sm" placeholder="CVV" />
                  </div>
                </div>
              )}
              <button onClick={() => setStep('details')} className="text-xs text-stone-400 underline">Voltar e alterar método</button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-stone-50 border-t border-stone-100">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold transition-all ${step === 'payment' ? 'bg-[#25D366] text-white shadow-lg' : 'bg-stone-200 text-stone-400 pointer-events-none'}`}
          >
            {step === 'payment' ? 'Confirmar e avisar no WhatsApp' : 'Selecione o pagamento acima'}
          </a>
        </div>
      </div>
    </div>
  )
}
