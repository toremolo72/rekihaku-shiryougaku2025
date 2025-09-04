"use client";

import { useState } from "react";
import styles from "./page.module.css";

type AudioItem = {
  type: "youtube" | "file";
  url: string;
  images: string[];   // ← ここを配列に変更
  caption: string;
  sectionTitle: string;
};

const AUDIO_ITEMS: AudioItem[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/788t3AI0bBc?si=p4F8ZTVZaONYE8zP",
    images: ["/images/doutaku.jpg"], // ← 複数OK
    caption: "銅鐸の音",
    sectionTitle: "文字がない時代",
  },
  {
    type: "file",
    url: "/videos/sample2.mov",
    images: ["/images/sample2.jpg", "/images/sample2b.jpg"],
    caption: "サンプル音声 2",
    sectionTitle: "文字の壁を、音が越える時代",
  },
  {
    type: "file",
    url: "/videos/radio.mp4",
    images: ["/images/radio1.jpg", "/images/radio2.jpg"],
    caption: "街頭録音の音",
    sectionTitle: "電気が音を放送に変える時代",
  },
];

export default function Page() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 拡張子から MIME type を判定
  const getMimeType = (url: string) => {
    if (url.endsWith(".mp4")) return "video/mp4";
    if (url.endsWith(".mov")) return "video/quicktime";
    return "video/mp4";
  };

  return (
    <div className={styles.container}>
      <img src="/title-y2.png" alt="Page Title" className={styles.headerImage} />

      <h1 className={styles.title}>Audio Player Gallery</h1>

      <div className={styles.cardRow}>
      {AUDIO_ITEMS.map((item, idx) => (
        <div key={idx} className={styles.card}>
          <h2 className={styles.sectionTitle}>{item.sectionTitle}</h2>

          {/* 複数画像を表示 */}
          <div className={styles.imageGallery}>
            {item.images.map((src, i) => (
              <img key={i} src={src} alt={`${item.caption} ${i + 1}`} className={styles.image} />
            ))}
          </div>

          <p className={styles.caption}>{item.caption}</p>
          <button
            className={`${styles.linkButton} ${
              activeIndex === idx ? styles.active : ""
            }`}
            onClick={() => setActiveIndex(idx)}
          >
            音声を再生
          </button>
        </div>
      ))}
    </div>

      <div className={styles.playerWrapper}>
        {activeIndex !== null && (
          <>
            {AUDIO_ITEMS[activeIndex].type === "youtube" && (
              <iframe
                className={styles.hiddenPlayer}
                src={`${AUDIO_ITEMS[activeIndex].url}&autoplay=1`}
                title="YouTube audio player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
            {AUDIO_ITEMS[activeIndex].type === "file" && (
              <video
                className={styles.hiddenPlayer}
                controls
                autoPlay
                // muted を付けると自動再生が保証される
                // 音を出したい場合は ref を使ってクリック時に play() を呼ぶ方法もあり
              >
                <source
                  src={AUDIO_ITEMS[activeIndex].url}
                  type="video/mp4"   // mp4 は必ずこちら
                />
                お使いのブラウザは動画再生に対応していません。
              </video>
            )}
          </>
        )}
      </div>
    </div>
  );
}