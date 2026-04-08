*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
body { font-family: 'DM Sans', sans-serif; background: #FEFCF9; color: #2C2C2C; }
textarea::placeholder, input::placeholder { color: #C0BAB0; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.14); }
@keyframes pulse { 0%, 100% { opacity: 0.25; transform: scale(0.85); } 50% { opacity: 0.8; transform: scale(1); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
::selection { background: rgba(124,139,126,0.15); }
