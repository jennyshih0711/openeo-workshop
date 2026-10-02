# 國土治理工作坊報名網站

GitHub Pages 靜態網站，Firebase Firestore 儲存報名與分組，Firebase Authentication 提供匿名學員身分與 Google 管理者登入。

## 發布

GitHub Settings → Pages → Deploy from a branch → main / root。
網站： https://jennyshih0711.github.io/openeo-workshop/

## 資料

- registrations：姓名、電子郵件、電話、系所、餐飲，管理者可查詢名單；學員僅能存取自己的單筆。
- roster：分組用姓名與組別，所有訪客取得匿名身分後可查詢。
- teams：每組最多 3 人，以交易同步組員與 roster，空組別才可刪除。

管理者使用 jennyshih0711@gmail.com Google 帳號登入。舊的測試密碼不再使用。
Firebase 公開設定不是管理密鑰；資料保護由 firestore.rules 負責。修改規則後需另在 Firebase 控制台發布。

## 限制

同一個瀏覽器身分只能報名一次；更換裝置或清除瀏覽器資料不會自動辨識重複報名。分組頁依需求允許訪客協助任何已報名者選組與移除組員。姓名在分組頁可見，其他報名資訊受權限保護。

正式資料庫不匯入本機測試資料。網站載入會移除舊的 openeo_workshop_v1 瀏覽器快取，不會刪除 Firebase 紀錄。
