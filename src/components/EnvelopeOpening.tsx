import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [opened, setOpened] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const prefix = params.get('prefix');
  const guestName = params.get('name');

  useEffect(() => {
    if (opened) {
      if (onMusicStart) onMusicStart();
      // Wait for flap to open, then slide card up
      const cardTimer = setTimeout(() => {
        setShowCard(true);
      }, 800);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 4500);

      return () => {
        clearTimeout(cardTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [opened, onComplete, onMusicStart]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        html, body, #root {
          width: 100%; min-height: 100%; margin: 0;
          background: #FAF9F6;
        }

        .scene {
          position: relative; min-height: 100vh; display: flex;
          align-items: center; justify-content: center;
          background-color: #FAF8F5;
          background-image: url("/floral_wedding_bg.png");
          background-size: cover;
          background-position: center;
          perspective: 2000px; overflow: hidden;
          font-family: "Cormorant Garamond", serif;
        }

        /* Envelope Wrapper */
        .envelope-wrapper {
          position: relative;
          width: min(520px, 92vw);
          height: min(360px, 64vw);
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 1s ease;
          margin-top: 40px; /* Make room for the top flap to open */
        }
        
        .envelope-wrapper:not(.is-open):hover {
          transform: translateY(-5px) scale(1.02);
        }

        /* When opened, push envelope down so card takes center stage */
        .envelope-wrapper.is-open {
          transform: translateY(12vh) scale(0.95);
        }

        .envelope-back {
          position: absolute; inset: 0;
          background: #EAE3D2;
          border-radius: 4px;
          box-shadow: 0 20px 40px -10px rgba(166,124,0,0.15);
        }

        /* The Card */
        .card-container {
          position: absolute;
          top: 10px; left: 10px; right: 10px; bottom: 10px;
          background: linear-gradient(180deg, #FFFFFF 0%, #FDFBF7 50%, #FAF9F6 100%);
          border-radius: 4px;
          box-shadow: 0 0 15px rgba(0,0,0,0.05);
          transform-origin: center center;
          transform: translateY(0) scale(1);
          transition: transform 1.8s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 1.5s ease;
          z-index: 2; /* Inside the pocket */
        }
        
        .envelope-wrapper.show-card .card-container {
          transform: translateY(-55%) scale(1.3);
          z-index: 10; /* Bring in front of all flaps */
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
        }

        /* Front flaps wrapper */
        .envelope-front {
          position: absolute; inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        .flap-wrapper { position: absolute; pointer-events: none; }
        .flap-inner { width: 100%; height: 100%; pointer-events: auto; }

        .flap-wrapper.left {
          top: 0; bottom: 0; left: 0; width: 51%;
          filter: drop-shadow(2px 0 5px rgba(0,0,0,0.08));
          z-index: 3;
        }
        .flap-wrapper.left .flap-inner {
          clip-path: polygon(0 0, 100% 50%, 0 100%);
          background: linear-gradient(to right, #FAF8F4, #EFEAE0);
        }

        .flap-wrapper.right {
          top: 0; bottom: 0; right: 0; width: 51%;
          filter: drop-shadow(-2px 0 5px rgba(0,0,0,0.08));
          z-index: 4;
        }
        .flap-wrapper.right .flap-inner {
          clip-path: polygon(100% 0, 0 50%, 100% 100%);
          background: linear-gradient(to left, #FAF8F4, #EFEAE0);
        }

        .flap-wrapper.bottom {
          bottom: 0; left: 0; right: 0; height: 60%;
          filter: drop-shadow(0 -3px 6px rgba(0,0,0,0.08));
          z-index: 5;
        }
        .flap-wrapper.bottom .flap-inner {
          clip-path: polygon(0 100%, 50% 0, 100% 100%);
          background: linear-gradient(to top, #FAF8F4, #EBE5D8);
        }

        .flap-wrapper.top {
          top: 0; left: 0; right: 0; height: 75%;
          filter: drop-shadow(0 5px 12px rgba(0,0,0,0.12));
          transform-origin: top;
          transform: rotateX(0deg);
          transition: transform 1s cubic-bezier(0.25, 1, 0.3, 1), z-index 0s 0.3s, filter 1s ease;
          z-index: 6;
        }
        .flap-wrapper.top .flap-inner {
          clip-path: polygon(0 0, 50% 100%, 100% 0);
          background: linear-gradient(to bottom, #FFFFFF, #F6F3EC);
          display: flex; flex-direction: column; align-items: center;
          padding-top: 15%;
        }
        
        .envelope-wrapper.is-open .flap-wrapper.top {
          transform: rotateX(180deg);
          z-index: 1; /* Drop behind */
          filter: drop-shadow(0 -5px 12px rgba(0,0,0,0.05));
        }

        /* Top Flap Graphics */
        .flap-initials {
          font-family: "Playfair Display", serif;
          font-style: italic;
          font-size: 34px;
          color: #B89645;
          margin-bottom: 4px;
          letter-spacing: 0.1em;
          font-weight: 500;
        }
        .flap-flower {
          width: 90px; height: 110px;
          object-fit: contain;
          mix-blend-mode: multiply;
          opacity: 0.9;
        }

        /* Card Content Styling */
        .card-inner {
          position: absolute; inset: 12px;
          border: 1px solid rgba(201,169,110,0.4);
          padding: 20px 16px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          background: #fff;
        }
        
        .card-inner::before {
          content: ''; position: absolute; inset: 4px; border: 0.5px solid rgba(201,169,110,0.2);
        }

        .text-eyebrow {
          font-family: 'Montserrat', sans-serif; font-size: 9px; letter-spacing: 0.4em;
          text-transform: uppercase; color: #A67C00; margin-bottom: auto; margin-top: 10px; z-index: 2;
        }

        .text-names {
          font-family: "Playfair Display", serif; font-size: 38px; line-height: 1.1;
          color: #A67C00; margin: 10px 0; font-weight: 500; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
        }
        
        .text-ampersand {
          font-family: "Playfair Display", serif; font-size: 26px; display: block;
          margin: 0; color: #c9a96e; font-style: italic;
        }

        .text-details {
          font-family: 'Montserrat', sans-serif; font-size: 8px; letter-spacing: 0.25em;
          text-transform: uppercase; color: #6b5b4e; line-height: 2.2; margin-top: auto; margin-bottom: 10px; z-index: 2;
        }

        .text-date {
          display: block; margin: 8px 0; font-size: 10px; font-weight: 500; letter-spacing: 0.25em; color: #A67C00;
        }

        .text-church {
          font-family: "Cormorant Garamond", serif; font-size: 13px; font-style: italic; color: #A67C00; text-transform: none;
        }

        .instruction-toast {
          position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%);
          color: #A67C00; font-family: "Montserrat", sans-serif; font-size: 10px;
          letter-spacing: 0.35em; text-transform: uppercase; opacity: 1; transition: opacity 0.5s; white-space: nowrap;
        }

        .envelope-wrapper.is-open .instruction-toast { opacity: 0; }

        @media (max-width: 600px) {
          .envelope-wrapper { width: 340px; height: 230px; }
          .envelope-wrapper.show-card .card-container { transform: translateY(-50%) scale(1.15); }
          .text-names { font-size: 32px; }
          .text-ampersand { font-size: 22px; }
          .card-inner { padding: 15px 10px; }
          .flap-wrapper.top .flap-inner { padding-top: 12%; }
          .flap-initials { font-size: 28px; }
          .flap-flower { width: 70px; height: 85px; }
        }
      `}</style>

      <div className="scene">
        <div
          className={`envelope-wrapper ${opened ? 'is-open' : ''} ${showCard ? 'show-card' : ''}`}
          onClick={() => {
            if (!opened) setOpened(true);
          }}
        >
          <div className="envelope-back"></div>

          {/* Inner Card */}
          <div className="card-container">
            <div className="card-inner">
              <div className="text-eyebrow">
                {guestName ? `Dear ${prefix} ${guestName},` : 'Promise of Love'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0', zIndex: 2 }}>
                <div style={{ width: '30px', height: '0.5px', background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />
                <div style={{ width: '4px', height: '4px', background: '#c9a96e', transform: 'rotate(45deg)', opacity: 0.7 }} />
                <div style={{ width: '30px', height: '0.5px', background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />
              </div>

              <h1 className="text-names">
                Prarthana
                <span className="text-ampersand">&</span>
                Akilanka
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0', zIndex: 2 }}>
                <div style={{ width: '30px', height: '0.5px', background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />
                <div style={{ width: '4px', height: '4px', background: '#c9a96e', transform: 'rotate(45deg)', opacity: 0.7 }} />
                <div style={{ width: '30px', height: '0.5px', background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />
              </div>


            </div>
          </div>

          <div className="envelope-front">
            <div className="flap-wrapper left">
              <div className="flap-inner"></div>
            </div>
            <div className="flap-wrapper right">
              <div className="flap-inner"></div>
            </div>
            <div className="flap-wrapper bottom">
              <div className="flap-inner"></div>
            </div>
          </div>

          <div className="flap-wrapper top">
            <div className="flap-inner">
              <div className="flap-initials">P <span style={{ fontSize: '0.7em' }}>&</span> A</div>
              <img src="/envelope_floral_motif.png" alt="Flower motif" className="flap-flower" />
              <Heart className="w-3 h-3 text-[#B89645] fill-[#B89645] mt-1" />
            </div>
          </div>

          <div className="instruction-toast">Click to open</div>
        </div>
      </div>
    </>
  );
}