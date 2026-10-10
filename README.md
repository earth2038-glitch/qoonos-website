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

ビルドツールや外部ライブラリは不要です。デモ画面はHTML/CSS/SVGで構成し、すべて架空データです。

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

## 独自ドメイン（取得・所有確認後のみ）

独自ドメインは現時点で未確認のため、`CNAME` ファイルを含めていません。ドメインを確定後、GitHub Pagesの **Custom domain** から設定し、DNS事業者側でGitHubが案内するレコードを登録してください。DNS仕様は変更される可能性があるため、設定時点のGitHub公式ドキュメントを確認してください。

設定後は **Enforce HTTPS** を有効にします。ルートドメインと `www` のどちらを正規URLにするかも事前に決めてください。

## 更新時の注意

- FOS本体のコード、顧客情報、実データ、内部仕様を追加しない
- 画面例には架空データだけを使い、デモ表示であることを明記する
- 税務・法務・投資判断を保証する表現を避ける
- 会社情報、連絡先、ドメインは確認できた事実だけを公開する
