import React, { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";

const PWAPrompt: React.FC = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        setOfflineReady(true);
      },
    });

    return () => {
      updateSW();
    };
  }, []);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return <div className="bg-white text-black p-4 w-full">
    pwa not required yet
  </div>;

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-white rounded-lg shadow-lg">
      {offlineReady && (
        <div>
          <p>App ready to work offline</p>
          <button onClick={close}>Close</button>
        </div>
      )}
      {needRefresh && (
        <div>
          <p>New content available, click to update</p>
          <button onClick={() => location.reload()}>Reload</button>
          <button onClick={close}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PWAPrompt;
