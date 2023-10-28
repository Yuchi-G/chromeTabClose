// タブを閉じる時間をミリ秒で設定（例：1時間）
var timeToClose = 3600000; // 1時間 = 60分 x 60秒 x 1000ミリ秒

// タイマーを管理するオブジェクト
var tabTimers = {};

// タブがアクティブになった時のリスナー
chrome.tabs.onActivated.addListener(function(activeInfo) {
  // 現在のタブに新しいタイマーを設定（既存のタイマーはクリア）
  if (tabTimers[activeInfo.tabId]) {
    clearTimeout(tabTimers[activeInfo.tabId]);
  }

  tabTimers[activeInfo.tabId] = setTimeout(function() {
    chrome.tabs.remove(activeInfo.tabId);
  }, timeToClose);
});

// タブが閉じられた時にタイマーをクリアするリスナー
chrome.tabs.onRemoved.addListener(function(tabId) {
  if (tabTimers[tabId]) {
    clearTimeout(tabTimers[tabId]);
    delete tabTimers[tabId];
  }
});