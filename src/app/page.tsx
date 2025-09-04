"use client";

import { useState } from "react";
import styles from "./page.module.css";

type AudioItem = {
  type: "youtube" | "file" | "audio"; // ← audio を追加
  url: string;        // YouTubeリンク or ファイルパス
  images: string[];
  caption: string;
  sectionTitle: string;
};

const AUDIO_ITEMS: AudioItem[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/788t3AI0bBc?si=p4F8ZTVZaONYE8zP",
    images: ["/images/doutaku.jpg"],
    caption: "銅鐸の音",
    sectionTitle: "文字がない時代",
  },
  {
    type: "audio",
    url: "/audio/shisou.mp3",
    images: ["/images/shisou.jpg"],
    caption: "「音」が伝える近世思想",
    sectionTitle: "文字の壁を、音が越える時代",
  },
  {
    type: "file",
    url: "/videos/radio.mp4", // public/audio/sample.mp3 に配置
    images: ["/images/radio1.jpg", "/images/radio2.jpg"],
    caption: "ラジオの音",
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
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {AUDIO_ITEMS[activeIndex].type === "file" && (
          <video className={styles.hiddenPlayer} controls autoPlay>
            <source src={AUDIO_ITEMS[activeIndex].url} type="video/mp4" />
            お使いのブラウザは動画再生に対応していません。
          </video>
        )}

        {AUDIO_ITEMS[activeIndex].type === "audio" && (
          <audio className={styles.hiddenPlayer} controls autoPlay>
            <source src={AUDIO_ITEMS[activeIndex].url} type="audio/mpeg" />
            お使いのブラウザは音声再生に対応していません。
          </audio>
        )}
      </>
    )}
  </div>
    </div>
  );
}