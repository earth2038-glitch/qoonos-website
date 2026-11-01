# Qoonos公式Webサイト

Qoonos株式会社の公式Webサイト用、静的1ページサイトです。既存の `family-office-os` とは分離して運用することを前提にしています。

## 構成

- `index.html` — 公式サイト本体
- `styles.css` — デザインとレスポンシブ対応
- `script.js` — モバイルメニュー、最小限の表示演出
- `assets/qoonos-symbol-transparent.png` — 支給シンボルマークの透過PNG（ヘッダー・フッター・faviconで使用）
- `assets/favicon.svg` — 旧暫定アイコン（現在は未使用）
- `.github/workflows/deploy-pages.yml` — GitHub Pages自動デプロイ
- `PUBLICATION_CHECKLIST.md` — 公開前の確認事項
- `sitemap.xml` — 正式URLを掲載するサイトマップ
- `robots.txt` — クロール許可とサイトマップの場所

ビルドツールや外部ライブラリは不要です。デモ画面はHTML/CSS/SVGで構成し、すべて架空データです。

## 古いSafariへの互換対応

本文はJavaScriptの実行に依存せず、最初から表示します。JavaScriptはiOS 9でも構文解析できるES5で記述し、CSS変数・Grid・min/clamp・insetを使えないブラウザには色、文字サイズ、位置、縦並びの代替設定を用意しています。現在のブラウザでは従来の段組み・色・文字サイズを維持します。

画面に入った文章・画像に、一度だけ0.65秒のフェードと18pxの移動を加えます。初代iPad mini向けの接頭辞付きCSSアニメーションも用意し、スクロール判定はIntersectionObserverを使わずに行います。画面外の要素をあらかじめ透明にはせず、JavaScriptやアニメーションが非対応でも本文は表示されたままです。端末で「視差効果を減らす」等が設定され、ブラウザがprefers-reduced-motionを通知した場合は演出を行いません。背景の斜線・円弧は削除したままです。

JavaScriptが無効でも本文とナビゲーションリンクを表示します。初代iPad miniの実機での最終確認項目は、本文の表示、メニュー開閉、ページ内移動、デモ図、メールリンクです。古いCSS機能への代替設定では段組みや余白が現在のSafariと多少異なります。

## ローカル確認

このフォルダで次を実行します。

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いてください。

## 新しいGitHubリポジトリへの登録

GitHub上で空の公開リポジトリ `qoonos-website` を作成します。READMEや `.gitignore` はGitHub側で追加しません。その後、このフォルダで実行します。

```bash
git init -b main
git add .
git commit -m "Build Qoonos official website"
git remote add origin https://github.com/<GitHubアカウントまたは組織>/qoonos-website.git
git push -u origin main
```

`<GitHubアカウントまたは組織>` は実際の所有者名に置き換えてください。

## GitHub Pagesの公開

1. GitHubで `qoonos-website` の **Settings → Pages** を開く
2. **Build and deployment → Source** で **GitHub Actions** を選ぶ
3. **Actions** タブで `Deploy to GitHub Pages` の完了を確認する
4. Pages画面に表示される公開URLを開く

以後、`main` ブランチへのpushで自動公開されます。初回公開前に必ず `PUBLICATION_CHECKLIST.md` を完了してください。

## 公開URLとSEO設定

正式URLは `https://www.qoonos.com/` です。GitHub PagesのCustom domainとEnforce HTTPSを設定済みで、`qoonos.com` から正式URLへ転送します。DNSはお名前.comのレンタルサーバー用ネームサーバーで管理しています。GitHub Actions方式のため、ドメイン設定はGitHub Pages側で管理し、`CNAME` ファイルは不要です。

検索結果向けタイトルは「Qoonos株式会社｜資産承継シミュレーション・Family Office OS」です。canonical、OGPのURL、WebSite構造化データのURL、sitemap.xmlは正式URLに統一しています。サイト名はQoonos、別表記はQoonos株式会社です。未確認の読み仮名や登記情報は構造化データに追加していません。ページ内アンカーは別ページとしてサイトマップへ登録しません。

これらはGoogleへ情報を伝えるための設定です。検索順位、表示タイトル、サイト名、スペル補正候補やAIによる概要の変更を保証するものではありません。Google Search Consoleの所有権確認・サイトマップ送信はアカウント側で別途実施してください。

## Google Search Consoleの登録・確認

1. https://search.google.com/search-console/ に、継続して管理するGoogleアカウントでログインします。
2. 「プロパティを追加」から「ドメイン」を選び、`qoonos.com` を入力します。httpsやwwwは付けません。
3. DNSでの所有権確認用に表示されるTXTレコードの値をコピーします。値はGoogleが発行する `google-site-verification=…` 全体です。
4. お名前.comの契約者としてレンタルサーバーのコントロールパネルにログインし、「ドメイン → qoonos.com → DNS → DNSレコードを追加」を開きます。以前使用したNaviのDNS管理画面ではなく、現在のネームサーバーに対応するコントロールパネルで設定します。
5. タイプはTXT、ホスト名は空欄（qoonos.com本体）、TTLは3600、値はGoogleが発行した文字列にして追加します。空欄で登録できなければ、その画面の入力方式を確認してから進めます。既存のSPF用TXT、MX、A、wwwのCNAME、ネームサーバーは変更しません。
6. Search Consoleへ戻り「確認」を押します。見つからない場合はDNS反映を待って再確認します。確認用TXTは確認完了後も残します。
7. 「サイトマップ」から `https://www.qoonos.com/sitemap.xml` を送信します。
8. 「URL検査」で `https://www.qoonos.com/` を調べ、「公開URLをテスト」で取得できることを確認します。必要に応じて「インデックス登録をリクエスト」を実行します。表示される「ユーザーが指定した正規URL」と「Googleが選択した正規URL」も確認します。
9. 「検索結果」等のパフォーマンス画面で、検索語句Qoonosの表示回数・クリック数を継続して確認します。登録直後はデータが表示されるまで時間がかかる場合があります。

公式案内：
- 所有権確認：https://support.google.com/webmasters/answer/9008080?hl=ja
- サイト名：https://developers.google.com/search/docs/appearance/site-names?hl=ja
- サイトマップ：https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=ja

## 更新時の注意

- FOS本体のコード、顧客情報、実データ、内部仕様を追加しない
- 画面例には架空データだけを使い、デモ表示であることを明記する
- 税務・法務・投資判断を保証する表現を避ける
- 会社情報、連絡先、ドメインは確認できた事実だけを公開する
