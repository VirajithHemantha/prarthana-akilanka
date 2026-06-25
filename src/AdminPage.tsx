import React, { useState } from 'react';
import { Copy, Link as LinkIcon, CheckCircle } from 'lucide-react';

const PREFIXES = [
  'Mr.',
  'Mrs.',
  'Mr. & Mrs.',
  'Family of',
  'Ms.',
  'Miss',
  'Dr.',
  'Prof.',
  'Rev.'
];

export function AdminPage() {
  const [prefix, setPrefix] = useState('Mr. & Mrs.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [fullMessage, setFullMessage] = useState('');

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    params.set('prefix', prefix);
    params.set('name', guestName.trim());
    
    const link = `${baseUrl}/?${params.toString()}`;
    setGeneratedLink(link);
    
    const message = `Dear ${prefix} ${guestName.trim()}❤️\n\nWith joyful hearts, we warmly invite you and your family to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${link}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Prarthana & Akilanka`;
    
    setFullMessage(message);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy message: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-12 px-4 sm:px-6 lg:px-8 font-sans text-stone-800 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgba(176,137,104,0.15)] overflow-hidden border border-brand-beige/50">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display tracking-wide mb-2 text-stone-800">Link Generator</h2>
            <p className="text-stone-500 font-sans text-sm uppercase tracking-[0.2em]">Create personalized invitation links</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="prefix" className="block text-sm font-medium text-stone-700 mb-1 tracking-wide">
                Prefix
              </label>
              <select
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:ring-2 focus:ring-brand-beige-deep focus:border-transparent outline-none transition-all bg-white font-sans"
              >
                {PREFIXES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-stone-700 mb-1 tracking-wide">
                Guest Name
              </label>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:ring-2 focus:ring-brand-beige-deep focus:border-transparent outline-none transition-all bg-white font-sans"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!guestName.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-beige-deep text-white font-sans text-sm tracking-[0.2em] uppercase shadow-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              <LinkIcon className="w-5 h-5" />
              Generate Link
            </button>

            {generatedLink && (
              <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-2">
                 <div className="p-6 bg-brand-ivory rounded-xl border border-brand-beige/50">
                   <h3 className="text-lg font-display mb-4 text-stone-800">Generated Invitation</h3>
                   <div className="whitespace-pre-wrap font-sans text-sm text-stone-600 mb-6 bg-white p-4 rounded-lg border border-brand-beige/30">
                     {fullMessage}
                   </div>
                   
                   <div className="flex flex-col sm:flex-row gap-3">
                     <button
                       onClick={handleCopyLink}
                       className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-brand-beige-deep text-brand-beige-deep font-sans text-sm tracking-wide hover:bg-brand-beige/10 transition-colors"
                     >
                       {copiedLink ? <CheckCircle className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4" />}
                       {copiedLink ? 'Copied Link!' : 'Copy Link Only'}
                     </button>
                     <button
                       onClick={handleCopyMessage}
                       className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-beige-deep text-white font-sans text-sm tracking-wide shadow-md hover:bg-stone-800 transition-colors"
                     >
                       {copiedMessage ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                       {copiedMessage ? 'Copied Message!' : 'Copy Full Message'}
                     </button>
                   </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
