export default function Perks({selected,onChange}) {
    function handleCbClick(ev) {
      const {checked,name} = ev.target;
      if (checked) {
        onChange([...selected,name]);
      } else {
        onChange([...selected.filter(selectedName => selectedName !== name)]);
      }
    }
    return (
      <>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
          </svg>
          <span>Free Wifi</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            
            <path strokeLinecap="round" strokeLinejoin="round" d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12zm-9.75-1.5a1.5 1.5 0 0 1-1.5 1.5H10.5l.75.75v-4.5L10.5 9h2.25a1.5 1.5 0 0 1 1.5 1.5zm1.5 0a3 3 0 0 0-3-3H10.5a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h2.25a3 3 0 0 0 3-3zm-4.5 6.75v-4.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0z"></path>
          </svg>
          <span>Free parking spot</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('airport-shuttle')} name="airport-shuttle" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M108.42 55.84H44.26a9 9 0 0 0-8.94 8.94v20.67H19.58a9 9 0 0 0-8.93 8.94v14.8a9 9 0 0 0 8.93 8.94h6.47c2.2 7.332 9.928 11.491 17.26 9.291a13.861 13.861 0 0 0 9.29-9.291h22.8c2.2 7.332 9.928 11.491 17.26 9.291a13.861 13.861 0 0 0 9.29-9.291h1.53c7.658-.006 13.864-6.212 13.87-13.87V64.78a9 9 0 0 0-8.93-8.94zm.93 8.94v20.67H92.68V63.84h15.74a.94.94 0 0 1 .93.94zM68 85.45V63.84h16.68v21.61zM44.26 63.84H60v21.61H43.32V64.78c0-.52.42-.94.94-.94zM39.32 120a5.87 5.87 0 1 1 5.87-5.87 5.88 5.88 0 0 1-5.87 5.87zm49.36 0a5.87 5.87 0 1 1 5.87-5.87 5.87 5.87 0 0 1-5.87 5.87zm14.8-9.87H102c-2.2-7.332-9.928-11.491-17.26-9.291a13.861 13.861 0 0 0-9.29 9.291H52.6c-2.2-7.332-9.928-11.491-17.26-9.291a13.861 13.861 0 0 0-9.29 9.291h-6.47a.94.94 0 0 1-.93-.94v-14.8a.94.94 0 0 1 .93-.94h89.77v10.81a5.87 5.87 0 0 1-5.87 5.87zm-92.29-82a4 4 0 0 1 5.467-1.451l.003.001 6.69 3.88 12.33-6-13.79-8a4 4 0 0 1 4-6.91l18.4 10.73 13.07-6.4a4.003 4.003 0 1 1 3.52 7.19l-36 17.6a4 4 0 0 1-3.76-.13l-8.54-5a4 4 0 0 1-1.39-5.52z"></path>            
          </svg>
          <span>Aiport Shuttle</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('no-smoking')} name="no-smoking" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9h2.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 0 0 1.5h7.5A2.25 2.25 0 0 0 24 12.75v-3a2.25 2.25 0 0 0-2.25-2.25H19.5a.75.75 0 0 0 0 1.5zM5.25 13.5h-1.5l.75.75v-6L3.75 9h7.5a.75.75 0 0 0 0-1.5h-7.5a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h1.5a.75.75 0 0 0 0-1.5zM15 12v2.25a.75.75 0 0 0 1.5 0V12a.75.75 0 0 0-1.5 0zM0 8.25v6a.75.75 0 0 0 1.5 0v-6a.75.75 0 0 0-1.5 0zm1.28 15.53l22.5-22.5A.75.75 0 0 0 22.72.22L.22 22.72a.75.75 0 1 0 1.06 1.06zM4.5.75A2.25 2.25 0 0 1 2.25 3 2.25 2.25 0 0 0 0 5.25a.75.75 0 0 0 1.5 0 .75.75 0 0 1 .75-.75A3.75 3.75 0 0 0 6 .75a.75.75 0 0 0-1.5 0z"></path>
          </svg>
          <span>Non-smoking rooms</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('restaurant')} name="restaurant" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
               stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.999.75v22.5a.75.75 0 0 0 1.5 0V.75a.75.75 0 0 0-1.5 0zm3 0V7.5a2.259 2.259 0 0 1-2.252 2.25 2.258 2.258 0 0 1-2.248-2.252V.75a.75.75 0 0 0-1.5 0V7.5a3.76 3.76 0 0 0 3.748 3.75 3.76 3.76 0 0 0 3.752-3.748V.75a.75.75 0 0 0-1.5 0zm6.75 15.75h3c1.183.046 2.203-.9 2.25-2.111a2.22 2.22 0 0 0 0-.168c-.25-6.672-.828-9.78-3.231-13.533a1.508 1.508 0 0 0-2.77.81V23.25a.75.75 0 0 0 1.5 0V1.503c0 .003.001 0 .003 0a.006.006 0 0 1 .008.002c2.21 3.45 2.75 6.354 2.99 12.773v.053a.696.696 0 0 1-.721.67L15.749 15a.75.75 0 0 0 0 1.5z"></path>
          </svg>
          <span>Restaurant</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('service')} name="service" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.868 3.379a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0zm1.5 0a3.375 3.375 0 1 0-6.75 0 3.375 3.375 0 0 0 6.75 0zm-4.125 13.875v4.5a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-1.5 0zm9.505-10.122a2.25 2.25 0 0 0-3.12.624 1.15 1.15 0 0 1-1.364.442 12.11 12.11 0 0 0-8.516 0 1.15 1.15 0 0 1-1.37-.44 2.252 2.252 0 1 0-3.75 2.494 5.642 5.642 0 0 0 6.62 2.19l-1.004-.706v10.018a2.25 2.25 0 0 0 4.5 0h-1.5a2.25 2.25 0 0 0 4.5 0l.006-10.024H15l-.255.705a5.636 5.636 0 0 0 6.628-2.185 2.25 2.25 0 0 0-.625-3.118zm-.832 1.248a.75.75 0 0 1 .208 1.04 4.137 4.137 0 0 1-4.87 1.605.75.75 0 0 0-1.004.705l-.006 10.024a.75.75 0 1 1-1.5 0c0-1-1.5-1-1.5 0a.75.75 0 0 1-1.5 0V11.736a.75.75 0 0 0-1.005-.705 4.143 4.143 0 0 1-4.86-1.61.752.752 0 1 1 1.25-.833A2.65 2.65 0 0 0 8.279 9.6a10.608 10.608 0 0 1 7.457.001 2.65 2.65 0 0 0 3.141-1.015.75.75 0 0 1 1.039-.207zM18 5.254a2.25 2.25 0 0 1 4.5 0l.75-.75h-6l.75.75zm-1.5 0c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75 3.75 3.75 0 1 0-7.5 0zm4.5-3v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0zm-19.5 3a2.25 2.25 0 0 1 4.5 0l.75-.75h-6l.75.75zm-1.5 0c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75 3.75 3.75 0 1 0-7.5 0zm4.5-3v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0z"></path>
            
          </svg>
          <span>Room Service</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('bar')} name="bar" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.252 24h6a.75.75 0 0 0 0-1.5h-6a.75.75 0 0 0 0 1.5zm3.75-.75v-9a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0zm7.5-16.19a1.5 1.5 0 0 0-1.06-2.56H4.062a1.5 1.5 0 0 0-1.06 2.56l7.72 7.72a.75.75 0 0 0 1.06 0l7.72-7.72zM18.44 6l-7.72 7.72h1.061L4.062 6h14.379zM.752 1.5h2.822a.75.75 0 0 1 .671.415l1.836 3.67a.75.75 0 1 0 1.342-.67L5.587 1.244A2.25 2.25 0 0 0 3.574 0H.752a.75.75 0 1 0 0 1.5zm15.81 3.603a2.997 2.997 0 1 1 1.511 2.038.75.75 0 0 0-.713 1.319 4.497 4.497 0 1 0-2.268-3.06.75.75 0 1 0 1.47-.297z"></path>
          </svg>
          <span>Bar</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('family-rooms')} name="family-rooms" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 5.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zm-6.182 15.093l.188 1.5A.75.75 0 0 0 18 22.5h3a.75.75 0 0 0 .744-.657l.75-6-.744.657h1.5a.75.75 0 0 0 .75-.75V13.5a4.5 4.5 0 0 0-7.2-3.6.75.75 0 1 0 .9 1.2 3 3 0 0 1 4.8 2.4v2.25l.75-.75h-1.5a.75.75 0 0 0-.744.657l-.75 6L21 21h-3l.744.657-.188-1.5a.75.75 0 0 0-1.488.186zM6.75 5.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM5.444 20.157l-.188 1.5L6 21H3l.744.657-.75-6A.75.75 0 0 0 2.25 15H.75l.75.75V13.5a3 3 0 0 1 4.8-2.4.75.75 0 1 0 .9-1.2A4.5 4.5 0 0 0 0 13.5v2.25c0 .414.336.75.75.75h1.5l-.744-.657.75 6A.75.75 0 0 0 3 22.5h3a.75.75 0 0 0 .744-.657l.188-1.5a.75.75 0 0 0-1.488-.186zM13.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM15 9a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm-3 3a4.5 4.5 0 0 0-4.5 4.5v.75c0 .414.336.75.75.75h1.5l-.74-.627.75 4.5a.75.75 0 0 0 .74.627H12a.75.75 0 0 0 0-1.5h-1.5l.74.627-.75-4.5a.75.75 0 0 0-.74-.627h-1.5l.75.75v-.75a3 3 0 0 1 3-3 .75.75 0 0 0 0-1.5zm0 1.5a3 3 0 0 1 3 3v.75l.75-.75h-1.5a.75.75 0 0 0-.74.627l-.75 4.5.74-.627H12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .74-.627l.75-4.5-.74.627h1.5a.75.75 0 0 0 .75-.75v-.75A4.5 4.5 0 0 0 12 12a.75.75 0 0 0 0 1.5z"></path>
                     
          </svg>
          <span>Family rooms</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('fitness-center')} name="fitness-center" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.788.659a2.25 2.25 0 0 0 0 3.181l4.37 4.371a2.25 2.25 0 0 0 3.183-3.181L18.97.659a2.25 2.25 0 0 0-3.181 0zm1.06 1.06a.75.75 0 0 1 1.06 0l4.373 4.371a.75.75 0 0 1-1.061 1.06l-4.372-4.37a.75.75 0 0 1 0-1.06zM11.545.657a2.25 2.25 0 0 0-.001 3.182v.002l8.616 8.614a2.251 2.251 0 1 0 3.18-3.186L14.73.658a2.25 2.25 0 0 0-3.18-.005l-.006.006zm1.061 1.06l.002-.001a.75.75 0 0 1 1.06.001l8.613 8.613a.751.751 0 1 1-1.061 1.064L12.605 2.78a.75.75 0 0 1 0-1.061zM1.72 16.848a.75.75 0 0 1 1.06 0l4.372 4.371a.75.75 0 0 1-1.07 1.051L1.719 17.91a.75.75 0 0 1 0-1.06zm-1.061-1.06a2.25 2.25 0 0 0 0 3.181L5.03 23.34a2.25 2.25 0 0 0 3.19-3.172l-4.38-4.38v-.001a2.25 2.25 0 0 0-3.183 0zm1.06-3.184a.75.75 0 0 1 1.06 0l8.616 8.615a.751.751 0 0 1-1.064 1.062L1.719 13.67a.75.75 0 0 1-.003-1.062l.002-.003zM.66 11.543l-.006.007A2.25 2.25 0 0 0 .66 14.73l8.61 8.61a2.251 2.251 0 0 0 3.186-3.182L3.84 11.544a2.25 2.25 0 0 0-3.181 0zm6.428 4.309l8.765-8.765H14.79l2.121 2.121v-1.06l-8.764 8.764h1.06l-2.121-2.121v1.06zm-1.06-1.061a.75.75 0 0 0 0 1.06l2.12 2.122a.75.75 0 0 0 1.061 0l8.765-8.765a.75.75 0 0 0 0-1.06l-2.121-2.122a.75.75 0 0 0-1.061 0l-8.765 8.765z"></path>               
          </svg>
          <span>Fitness center</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('breakfast')} name="breakfast" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h12a.75.75 0 0 1 .75.75v7.5a6.75 6.75 0 0 1-13.5 0v-7.5a.75.75 0 0 1 .75-.75zm0-1.5A2.25 2.25 0 0 0 1.5 5.25v7.5a8.25 8.25 0 0 0 16.5 0v-7.5A2.25 2.25 0 0 0 15.75 3h-12zm-3 18h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zm16.5-15h1.5a3.763 3.763 0 0 1 3.75 3.752 3.762 3.762 0 0 1-3.752 3.748H17.1a.75.75 0 0 0 0 1.5h1.65A5.263 5.263 0 0 0 24 9.752 5.264 5.264 0 0 0 18.752 4.5H17.25a.75.75 0 0 0 0 1.5z"></path>      
          </svg>
          <span>Breakfast</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('coffee-maker')} name="coffee-maker" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M.75 24h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zM24 2.25A2.25 2.25 0 0 0 21.75 0H4.5a2.25 2.25 0 0 0-2.25 2.25v6A2.25 2.25 0 0 0 4.5 10.5H12a.75.75 0 0 1 .75.75v12c0 .414.336.75.75.75h9.75a.75.75 0 0 0 .75-.75v-21zm-1.5 0v21l.75-.75H13.5l.75.75v-12A2.25 2.25 0 0 0 12 9H4.5a.75.75 0 0 1-.75-.75v-6a.75.75 0 0 1 .75-.75h17.25a.75.75 0 0 1 .75.75zM18.75 24h4.5a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75h-3A2.25 2.25 0 0 0 18 14.25v9c0 .414.336.75.75.75zm0-1.5l.75.75v-9a.75.75 0 0 1 .75-.75h3l-.75-.75v10.5l.75-.75h-4.5zM6 9.75v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm2.25-4.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5 0a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0zm13.5-.75h-4.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5zm0 3h-4.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5zM2.344 18c0 .866.012 1.295.069 1.833C2.69 22.437 4.003 24 6.844 24c2.234 0 3.38-1.189 3.977-3.297.057-.203.11-.411.168-.66l.136-.599c.029-.126.054-.228.077-.32a1.5 1.5 0 0 0-1.454-1.874H3.094a.75.75 0 0 0-.75.75zm1.5 0l-.75.75h6.655c-.027.107-.054.22-.086.357l-.135.595c-.053.229-.1.415-.15.592-.434 1.53-1.085 2.206-2.534 2.206-1.97 0-2.736-.912-2.94-2.825-.05-.47-.06-.861-.06-1.675zm-.75-.75a3 3 0 0 0-3 3 .75.75 0 0 0 1.5 0 1.5 1.5 0 0 1 1.5-1.5.75.75 0 0 0 0-1.5z"></path>
            
          </svg>
          <span>Tea/Coffee Maker in All Rooms</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.125 3.56a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0zm1.5 0a3.375 3.375 0 1 0-6.75 0 3.375 3.375 0 0 0 6.75 0zm3.454 18.335l-1.836-3.67a.75.75 0 0 0-.671-.415H11.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v6c0 .414.336.75.75.75h3.75a.75.75 0 0 1 .671.415l2.25 4.5a.75.75 0 0 1-1.342.67zm-1.342.671a2.25 2.25 0 1 0 4.026-2.012l-2.25-4.5A2.25 2.25 0 0 0 16.5 14.81h-3.75l.75.75v-6a2.25 2.25 0 0 0-4.5 0v7.5a2.25 2.25 0 0 0 2.25 2.25h4.322l-.67-.415 1.835 3.672zm-4.362-.958a5.25 5.25 0 0 1-5.25-9.096.75.75 0 1 0-.75-1.299 6.75 6.75 0 1 0 6.75 11.694.75.75 0 1 0-.75-1.3z"></path>            
          </svg>
          <span>Facilities for disabled guests</span>
        </label>
      </>
    );
  }