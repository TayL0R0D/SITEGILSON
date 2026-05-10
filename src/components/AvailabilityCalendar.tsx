import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Send, ShieldCheck, CreditCard, QrCode, Receipt } from 'lucide-react';

const GOOGLE_API_KEY = 'AIzaSyBqhxsiXY6uFopnRE538oaqEZ1ZHOAuL6k';
const CALENDAR_ID = 'e46e3122f2495e36141a62e27bea8ad31c47638f114ada6641202ad1a8aeca54@group.calendar.google.com';
const DONO_WHATSAPP = '5521990193134'; // <-- Ajuste seu número aqui

export function AvailabilityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [blockedEvents, setBlockedEvents] = useState<{start: string, end: string}[]>([]);
  const [range, setRange] = useState<{ start: string | null, end: string | null }>({ start: null, end: null });
  const [formData, setFormData] = useState({ nome: '', contato: '', pagamento: 'pix' });
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${GOOGLE_API_KEY}&singleEvents=true&orderBy=startTime`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.items) {
          const events = data.items.map((event: any) => ({
            start: (event.start.dateTime || event.start.date).split('T')[0],
            end: (event.end.dateTime || event.end.date).split('T')[0]
          }));
          setBlockedEvents(events);
        }
      } catch (error) { console.error(error); }
    }
    fetchEvents();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(currentDate);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const getDateStr = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const isDayBlocked = (dateStr: string) => blockedEvents.some(event => dateStr >= event.start && dateStr < event.end);

  const handleDateClick = (day: number) => {
    const dateStr = getDateStr(day);
    if (isDayBlocked(dateStr)) return;
    if (!range.start || (range.start && range.end)) {
      setRange({ start: dateStr, end: null });
      setShowTerms(false);
    } else {
      const start = new Date(range.start);
      const end = new Date(dateStr);
      if (end < start) {
        setRange({ start: dateStr, end: null });
      } else {
        let hasBlocked = false;
        let tempDate = new Date(start);
        while (tempDate <= end) {
          if (isDayBlocked(tempDate.toISOString().split('T')[0])) {
            hasBlocked = true; break;
          }
          tempDate.setDate(tempDate.getDate() + 1);
        }
        if (hasBlocked) alert("Intervalo contém datas ocupadas.");
        else { setRange({ ...range, end: dateStr }); setShowTerms(true); }
      }
    }
  };

  const enviarParaWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Sou ${formData.nome}. Gostaria de reservar de ${range.start} até ${range.end}. Escolhi pagar os 30% via ${formData.pagamento.toUpperCase()}. Podemos fechar?`;
    window.open(`https://wa.me/${DONO_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto font-sans">
      <div className="flex items-center justify-between mb-6 text-green-800">
        <h3 className="text-xl font-bold flex items-center gap-2"><CalendarIcon /> Reservar Estadia</h3>
        <div className="flex gap-2">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight /></button>
        </div>
      </div>

      <div className="text-center mb-4 font-semibold text-gray-700 capitalize">{monthName} {year}</div>

      <div className="grid grid-cols-7 gap-1 text-center mb-6">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => <div key={d} className="text-xs text-gray-400 font-bold py-2">{d}</div>)}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = getDateStr(day);
          const blocked = isDayBlocked(dateStr);
          const selected = range.start === dateStr || range.end === dateStr || (range.start && range.end && dateStr >= range.start && dateStr <= range.end);
          return (
            <button key={day} disabled={blocked} onClick={() => handleDateClick(day)} className={`aspect-square flex items-center justify-center text-sm rounded-lg border transition-all ${blocked ? 'bg-red-50 text-red-300 border-red-50' : selected ? 'bg-green-600 text-white border-transparent font-bold' : 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100'}`}>{day}</button>
          );
        })}
      </div>

      {showTerms && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-green-50 border border-green-100 p-4 rounded-xl">
            <h4 className="flex items-center gap-2 text-green-800 font-bold text-sm mb-2"><ShieldCheck size={18} /> Confirmar Pré-Reserva</h4>
            <p className="text-xs text-green-700 mb-3">Para garantir sua data, solicitamos <strong>30% de sinal</strong> via:</p>
            
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button onClick={() => setFormData({...formData, pagamento: 'pix'})} type="button" className={`flex items-center justify-center gap-2 p-2 rounded-lg border text-xs font-bold transition-all ${formData.pagamento === 'pix' ? 'bg-white border-green-600 text-green-600 shadow-sm' : 'bg-transparent border-green-200 text-green-400'}`}>
                <QrCode size={14} /> PIX
              </button>
              <button onClick={() => setFormData({...formData, pagamento: 'boleto'})} type="button" className={`flex items-center justify-center gap-2 p-2 rounded-lg border text-xs font-bold transition-all ${formData.pagamento === 'boleto' ? 'bg-white border-green-600 text-green-600 shadow-sm' : 'bg-transparent border-green-200 text-green-400'}`}>
                <Receipt size={14} /> Boleto
              </button>
            </div>
          </div>

          <form onSubmit={enviarParaWhatsapp} className="space-y-3">
            <input required placeholder="Nome do Responsável" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-500" onChange={e => setFormData({...formData, nome: e.target.value})} />
            <input required placeholder="WhatsApp" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-500" onChange={e => setFormData({...formData, contato: e.target.value})} />
            
            <label className="flex items-start gap-3 cursor-pointer p-1">
              <input type="checkbox" required className="mt-1 accent-green-600" onChange={e => setAcceptedTerms(e.target.checked)} />
              <span className="text-[11px] text-gray-500">Estou ciente da antecipação de 30% via {formData.pagamento.toUpperCase()} para garantir a reserva das datas selecionadas.</span>
            </label>

            <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-100">
              <Send size={18} /> Confirmar e Pagar Sinal
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
