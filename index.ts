
/** ServiceWorkerスクリプトのパス */
const sw_path = "/sunchogu/service_worker/main.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(sw_path, { scope: "/sunchogu" }).then(reg => {
  console.log("\x1b[92m[index.js]\x1b[0m", "ServiceWorker registered", reg);
  }).catch(error => {
    console.error("[index.js]", error);
  });
} else {
  console.warn("[index.js]", "navigator.serviceWorker is not available.");
}

window.addEventListener("DOMContentLoaded", _ => {

  // create calender
  document.querySelector("body > div.content > div.calender > div.month");
});

window.addEventListener("online", _ => {
  console.log("\x1b[92m[index.js]\x1b[0m", "online");
}, false);

window.addEventListener("offline", _ => {
  console.log("\x1b[92m[index.js]\x1b[0m", "offline");
}, false);
