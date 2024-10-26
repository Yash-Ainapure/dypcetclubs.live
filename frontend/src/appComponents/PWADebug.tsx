// src/components/PWADebug.tsx
import React, { useEffect, useState } from "react";

const PWADebug: React.FC = () => {
  const [swStatus, setSwStatus] = useState<string>("Checking...");
  const [hasCache, setHasCache] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [checks, setChecks] = useState({
    serviceWorker: false,
    manifest: false,
    https: false,
    installable: false,
  });
  const [cacheStatus, setCacheStatus] = useState<{
    appCache: boolean;
    imageCache: boolean;
    totalItems: number;
    cacheNames: string[];
  }>({
    appCache: false,
    imageCache: false,
    totalItems: 0,
    cacheNames: [],
  });

  useEffect(() => {
    const checkServiceWorker = async () => {
      try {
        if ("serviceWorker" in navigator) {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            setSwStatus("Service Worker Registered ✅");
          } else {
            setSwStatus("Service Worker Not Found ❌");
          }
        } else {
          setSwStatus("Service Worker Not Supported ❌");
        }
      } catch (error) {
        setSwStatus(`Error: ${error}`);
      }
    };

    checkServiceWorker();
  }, []);

  useEffect(() => {
    // Check Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        setChecks((c) => ({ ...c, serviceWorker: !!registration }));
      });
    }

    // Check HTTPS
    setChecks((c) => ({
      ...c,
      https:
        window.location.protocol === "https:" ||
        window.location.hostname === "localhost",
    }));

    // Check Manifest
    const linkElement = document.querySelector('link[rel="manifest"]');
    setChecks((c) => ({ ...c, manifest: !!linkElement }));

    // Check Installability
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setChecks((c) => ({ ...c, installable: true }));
    });
  }, []);

  const checkCache = async () => {
    if ("caches" in window) {
      try {
        const cacheNames = await caches.keys();
        let totalItems = 0;

        // Reset status
        setCacheStatus((prev) => ({
          ...prev,
          appCache: false,
          imageCache: false,
          cacheNames,
        }));

        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName);
          const items = await cache.keys();
          totalItems += items.length;

          // Log cache contents for debugging
          // console.log(
          //   `Cache "${cacheName}" contents:`,
          //   items.map((item) => item.url)
          // );

          if (cacheName.includes("app-cache")) {
            setCacheStatus((prev) => ({ ...prev, appCache: true }));
          }
          if (cacheName.includes("image-cache")) {
            setCacheStatus((prev) => ({ ...prev, imageCache: true }));
          }
        }

        setCacheStatus((prev) => ({
          ...prev,
          totalItems,
        }));
      } catch (error) {
        console.error("Cache check failed:", error);
      }
    }
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if ("caches" in window) {
      caches.has("app-cache").then((exists) => setHasCache(exists));
    }
    checkCache();
    const interval = setInterval(checkCache, 5000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="bg-white"
      style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}
    >
      <h3>PWA Debug Info</h3>
      <p>Service Worker Status: {swStatus}</p>
      <h2>PWA Verification</h2>
      <ul>
        <li>
          ✅ Service Worker: {checks.serviceWorker ? "Active" : "Inactive"}
        </li>
        <li>✅ HTTPS/Localhost: {checks.https ? "Secure" : "Insecure"}</li>
        <li>✅ Manifest: {checks.manifest ? "Found" : "Not Found"}</li>
        <li>
          ✅ Installable: {checks.installable ? "Yes" : "No/Already Installed"}
        </li>
      </ul>
      <h3>Network Status</h3>
      <p>Current Status: {isOnline ? "🟢 Online" : "🔴 Offline"}</p>
      <p>Try turning off your network to test offline functionality!</p>
      <br />
      Cache Status: {hasCache ? "✅ Ready" : "❌ Not Ready"}
      <br />
      <div style={{ fontSize: "14px" }} className="text-black bg-white">
        <div>App Cache: {cacheStatus.appCache ? "✅" : "❌"}</div>
        <div>Image Cache: {cacheStatus.imageCache ? "✅" : "❌"}</div>
        <div>Cached Items: {cacheStatus.totalItems}</div>
        <div style={{ fontSize: "12px", marginTop: "8px", color: "#666" }}>
          Active Caches: {cacheStatus.cacheNames.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default PWADebug;
